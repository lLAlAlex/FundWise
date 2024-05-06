import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Vector "mo:vector/Class";

// Actor for user
actor Database {

  // Type for user
  type User = {
    internet_identity : Principal;
    name : Text;
    email : Text;
    dob : Text;
    profile : Text;
    description : Text;
    location: Text;
    contact: Text;
    status : Text;
    timestamp : Time.Time;
  };

  // User will be saved using TrieMap
  let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  public query func getUser(p : Principal) : async ?User {
    let user = users.get(p);
    if (user == null) {
      return null;
    };
    return user;
  };

  public query func getAllUsers() : async Result.Result<[User], Text> {
    var allUsers = Vector.Vector<User>();

    for (user in users.vals()) {
      allUsers.add(user);
    };

    return #ok(Vector.toArray(allUsers));
  };

  public query func getAllUserPrincipals() : async Result.Result<[Text], Text> {
    var allPrincipals = Vector.Vector<Text>();

    for (user in users.vals()) {
      let principalString = Principal.toText(user.internet_identity);
      allPrincipals.add(principalString);
    };

    return #ok(Vector.toArray(allPrincipals));
  };

  public shared (msg) func getCurrentUser() : async Principal {
    return msg.caller;
  };

  public shared func updateUser(p : Principal, u : User) : async () {
    users.put(p, u);
  };

  public shared func deleteUser(p : Principal) : async ?User {
    return users.remove(p);
  };

  public shared func register(id : Principal, name : Text, email : Text, profile : Text, dob : Text, location : Text, contact : Text) : async Result.Result<User, Text> {
    let userID = id;

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
        profile = profile;
        location = location;
        contact = contact;
        description = "";
        status = "Private";
        timestamp = Time.now();
      };
      users.put(user.internet_identity, user);

      return #ok(user);
    } else {
      return #err("User is already registered");
    };
  };
};