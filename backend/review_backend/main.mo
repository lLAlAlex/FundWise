import Utils "canister:utils_backend";
import Company "canister:company_backend";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

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
        let _timestamp = Time.now();
        let uuid = await Utils.generateUUID();
        let userid = Principal.toText(msg.caller);

        let review : Review = {
            id = uuid;
            userid = userid;
            companyid = newReview.companyid;
            title = newReview.title;
            review = newReview.review;
            rating = newReview.rating;
            timestamp = _timestamp;
        };

        reviews.put(review.id, review);
        ignore await Company.addCompanyReviewById(review.companyid, review.id);
        return #ok(review);
    };
}