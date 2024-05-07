import Utils "canister:utils_backend";
import Company "canister:company_backend";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor Database {
  type Review = {
    id : Text;
    userid : Text;
    companyid : Text;
    title : Text;
    review : Text;
    rating : Nat;
    timestamp : Time.Time;
  };

  type ReviewInputSchema = {
    userid : Text;
    companyid : Text;
    title : Text;
    review : Text;
    rating : Nat;
  };

  let reviews = TrieMap.TrieMap<Text, Review>(Text.equal, Text.hash);

    public shared (msg) func createReview(newReview : ReviewInputSchema) : async Result.Result<Review, Text> {
        let timestamp = Time.now();
        let uuid = await Utils.generateUUID();
        let userid = Principal.toText(msg.caller);

        let review : Review = {
            id = uuid;
            userid = userid;
            companyid = newReview.companyid;
            title = newReview.title;
            review = newReview.review;
            rating = newReview.rating;
            timestamp = timestamp;
        };

        reviews.put(review.id, review);
        ignore await Company.addCompanyReview(review.companyid, review.id);
        return #ok(review);
    };

    public query func getAllReviewByCompanyId(companyid : Text) : async Result.Result<[Review], Text> {
        let reviewArray = Iter.toArray<Review>(reviews.vals());
        
        let filteredReviews = Array.filter<Review>(
            reviewArray, 
            func (review : Review) : Bool { review.companyid == companyid; }
        );

        return #ok(filteredReviews);
    };


    public query func getReviewById(id : Text) : async Result.Result<Review, Text> {
        let result = reviews.get(id);

        switch (result) {
            case null {
                return #err("Not Found!");
            };
            case (?r) {
                return #ok(r);
            };
        };
    };

    public shared (msg) func updateCompanyById(id : Text, updatedReview : ReviewInputSchema) : async Result.Result<Review, Text> {
        if (Principal.isAnonymous(msg.caller)) {
        return #err("Not Authorized!");
        };

        if (updatedReview.userid != Principal.toText(msg.caller)) {
            return #err("Not Authorized!");
        };

        switch (reviews.get(id)) {
            case null {
                return #err("Not Found!");
            };
            case (?existingReview) {
                let updatedTimestamp = Time.now();

                let updatedReviewData : Review = {
                    id = id;
                    userid = updatedReview.userid;
                    companyid = updatedReview.companyid;
                    title = updatedReview.title;
                    review = updatedReview.review;
                    rating = updatedReview.rating;
                    timestamp = updatedTimestamp;
                };

                reviews.put(id, updatedReviewData);
                return #ok(updatedReviewData);
            };
        };
    };

    public shared (msg) func deleteReviewById(id : Text, userid : Text) : async Result.Result<Text, Text> {
        if (Principal.isAnonymous(msg.caller)) {
            return #err("Not Authorized!");
        };

        if (userid != Principal.toText(msg.caller)) {
            return #err("Not Authorized!");
        };

        switch (reviews.get(id)) {
            case null {
                return #err("Not Found!");
            };
            case (?existingReview) {
                if (existingReview.userid == Principal.toText(msg.caller)) {
                ignore reviews.remove(id);
                ignore await Company.deleteCompanyReviewById(existingReview.companyid, id);
                return #ok("Review Deleted Successfully!");
                };

                return #err("Not Authorized!");
            };
        };
    };
};
