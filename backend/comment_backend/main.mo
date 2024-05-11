import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Utils "canister:utils_backend";

actor Database {
  type Comment = {
    id : Text;
    userId : Text;
    projectId : Text;
    content : Text;
    timestamp : Time.Time;
  };

  type CommentInputSchema = {
    userId : Text;
    projectId : Text;
    content : Text;
  };

  let comments = TrieMap.TrieMap<Text, Comment>(Text.equal, Text.hash);

  public shared func createComment(newComment : CommentInputSchema) : async Result.Result<Comment, Text> {
    let timestamp = Time.now();
    let uuid = await Utils.generateUUID();

    let comment : Comment = {
      id = uuid;
      userId = newComment.userId;
      projectId = newComment.projectId;
      content = newComment.content;
      timestamp = timestamp;
    };
    comments.put(comment.id, comment);

    return #ok(comment);
  };

  public query func getAllCommentByProjectId(projectId : Text) : async Result.Result<[Comment], Text> {
    let arr = Iter.toArray<Comment>(comments.vals());

    let filteredComments = Array.filter<Comment>(
      arr,
      func(comment : Comment) : Bool { comment.projectId == projectId },
    );

    return #ok(filteredComments);
  };
};
