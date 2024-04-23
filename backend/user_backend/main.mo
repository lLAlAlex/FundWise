import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";

// Actor for user
actor Database {

  // Type for user
  type User = {
    internet_identity : Principal;
    name : Text;
    email : Text;
    dob : Text;
    timestamp : Time.Time;
  };

  // User will be saved using TrieMap
  let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  public query func getUser(p : Principal) : async ?User {
    return users.get(p);
  };

  public shared func updateUser(p : Principal, u : User) : async () {
    users.put(p, u);
  };

  public shared (msg) func deleteUser(p : Principal) : async ?User {
    // Validation to ensure only the specified user can delete
    if (p != msg.caller) {
      return null;
    };
    return users.remove(p);
  };

  public shared (msg) func register(name : Text, email : Text, dob : Text) : async Result.Result<User, Text> {
    let userID = msg.caller;

    // Unique user validation
    if (users.get(userID) == null) {
      // Unique email validation
      for (user in users.vals()) {
        if (user.email == email) {
          return #err("Email is already registered");
        };
      };

      // Register user
      let user = {
        internet_identity = userID;
        name = name;
        email = email;
        dob = dob;
        timestamp = Time.now();
      };
      users.put(user.internet_identity, user);

      return #ok(user);
    } else {
      return #err("User is already registered");
    };
  };
};
