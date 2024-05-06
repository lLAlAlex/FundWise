import Utils "canister:utils_backend";
import Company "canister:company_backend";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Option "mo:base/Option";

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
    ignore await Company.addCompanyReview(review.companyid, review.id);
    return #ok(review);
  };

  public shared (msg) func deleteReviewById(id : Text) : async Result.Result<Text, Text> {
    if (Principal.isAnonymous(msg.caller)) {
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
