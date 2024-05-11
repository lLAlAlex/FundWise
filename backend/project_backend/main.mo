import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Vector "mo:vector/Class";
import Utils "canister:utils_backend";
import Comment "canister:comment_backend";
import User "canister:user_backend";
import Fuzz "mo:fuzz";

actor Database {
  type Reward = {
    tier : Text;
    price : Nat;
    image : Text;
    description : Text;
    quantity : Nat;
  };

  type Wallet = {
    qr : Text;
    address : Text;
  };

  type Project = {
    id : Text;
    name : Text;
    description : Text;
    category : Text;
    image : Text;
    progress : Nat;
    deadline : Text;
    goal : Nat;
    user_id : Text;
    reviews_ids : [Text];
    rewards : [Reward];
    backers_ids : [Text];
    wallet : Wallet;
    timestamp : Time.Time;
  };

  type CommentInputSchema = {
    userId : Text;
    projectId : Text;
    content : Text;
  };

  type ProjectInputSchema = {
    name : Text;
    description : Text;
    category : Text;
    image : Text;
    deadline : Text;
    goal : Nat;
    rewards : [Reward];
    user_id : Text;
    wallet : Wallet;
  };

  let projects = TrieMap.TrieMap<Text, Project>(Text.equal, Text.hash);
  let items_per_page = 20;

  public shared func seedProjects() : async Result.Result<Text, Text> {
    let fuzz = Fuzz.Fuzz();
    var counter = 0;

    let categoryArray = ["Health", "Sport", "Fashion", "Food", "Technology"];

    while (counter <= 20) {
      counter := counter + 1;
      let _timestamp = Time.now();
      let uuid = await Utils.generateUUID();
      let image = "https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png";
      let randomRangeName = fuzz.nat.randomRange(5, 15);
      let randomRangeDesc = fuzz.nat.randomRange(50, 150);
      let randomCategoryIndex = fuzz.nat.randomRange(0, categoryArray.size() - 1);

      let project : Project = {
        id = uuid;
        user_id = "avqkn-guaaa-aaaaa-qaaea-cai";
        name = fuzz.text.randomText(randomRangeName);
        description = fuzz.text.randomText(randomRangeDesc);
        category = categoryArray[randomCategoryIndex];
        image = image;
        progress = fuzz.nat.randomRange(0, 50);
        deadline = "10-05-2025";
        goal = fuzz.nat.randomRange(1000, 2000);
        reviews_ids = [];
        rewards = [
          {
            tier = "Bronze";
            price = 100;
            image = "https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png";
            description = "This is bronze tier reward";
            quantity = 1;
          },
          {
            tier = "Silver";
            price = 200;
            image = "https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png";
            description = "This is silver tier reward";
            quantity = 1;
          },
          {
            tier = "Gold";
            price = 300;
            image = "https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png";
            description = "This is gold tier reward";
            quantity = 1;
          },
        ];
        backers_ids = [];
        wallet = {
          address = "7658b998f8691f26961c631cbe8388e3f5dce7ff9d6d093a9d1a89b89b3c2095";
          qr = "https://res.cloudinary.com/dogiichep/image/upload/v1715397694/download_5_bo3drk.png";
        };
        timestamp = _timestamp;
      };
      let comment : CommentInputSchema = {
        content = "Hello World";
        userId = "avqkn-guaaa-aaaaa-qaaea-cai";
        projectId = uuid;
      };
      let createComment = await Comment.createComment(comment);
      let userId : Principal.Principal = Principal.fromText("avqkn-guaaa-aaaaa-qaaea-cai");
      let createUser = await User.register(userId, "Nicholas", "nc@email.com", "https://res.cloudinary.com/dogiichep/image/upload/v1691980787/profile_xy1yuo.png", "04-12-2003", "Indonesia", "081212341234");
      projects.put(project.id, project);
    };
    return #ok("Success");
  };

  public shared (msg) func createProject(newProject : ProjectInputSchema) : async Result.Result<Project, Text> {
    let _timestamp = Time.now();
    let uuid = await Utils.generateUUID();
    let image = "https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png";

    let project : Project = {
      id = uuid;
      name = newProject.name;
      description = newProject.description;
      category = newProject.category;
      image = newProject.image;
      progress = 0;
      deadline = newProject.deadline;
      goal = newProject.goal;
      user_id = newProject.user_id;
      reviews_ids = [];
      rewards = newProject.rewards;
      backers_ids = [];
      wallet = newProject.wallet;
      timestamp = _timestamp;
    };

    projects.put(project.id, project);
    return #ok(project);
  };

  public query func getAllProjectID() : async Result.Result<[Text], Text> {
    var ids = Vector.Vector<Text>();

    for (c in projects.vals()) {
      ids.add(c.id);
    };

    return #ok(Vector.toArray(ids));
  };

  public query func getAllProjects(search : ?Text, page : Nat) : async Result.Result<[Project], Text> {
    let offset = items_per_page;

    let searchParam = Option.get(search, "");

    var allProjects = Vector.Vector<Project>();
    for (project in projects.vals()) {
      allProjects.add(project);
    };
    var arr = Vector.toArray(allProjects);

    if (searchParam != "") arr := Array.filter<Project>(arr, func p = Text.contains(p.name, #text searchParam));

    let size = arr.size();
    Debug.print(Nat.toText(size));
    let init : Nat = (page - 1) * offset;
    if (init < size) {

      let diff : Nat = size - init;
      var len : Nat = 1;
      if (size < offset) {
        len := size;
      } else if (diff < offset) {
        len := diff;
      } else {
        len := offset;
      };
      let paginate = Vector.Vector<Project>();
      var i : Nat = 0;
      while (i < len) {
        paginate.add(arr[i + init]);
        i := i + 1;
      };
      return #ok(Vector.toArray(paginate));
    } else {
      return #ok([]);
    };

  };

  public query func getAllProjectByUserId(userID : Principal) : async Result.Result<[Project], Text> {
    let userid = Principal.toText(userID);
    let projectArray = Iter.toArray<Project>(projects.vals());

    let filteredProjects = Array.filter<Project>(
      projectArray,
      func(project : Project) : Bool { project.user_id == userid },
    );

    return #ok(filteredProjects);
  };

  public query func getTotalProjectCount() : async Nat {
    return projects.size();
  };

  public shared func getTotalPages() : async Int {
    let totalProjects = await getTotalProjectCount();
    let totalPages = Float.ceil(Float.fromInt(totalProjects) / Float.fromInt(items_per_page));
    return Float.toInt(totalPages);
  };

  public shared func deleteProject(id : Text) : async ?Project {
    return projects.remove(id);
  };

  public query func getProject(id : Text) : async ?Project {
    let project = projects.get(id);
    if (project == null) {
      return null;
    };
    return project;
  };

  public query func getAllFunds() : async Result.Result<Nat, Text> {
    var totalFunds : Nat = 0;

    for (p in projects.vals()) {
      totalFunds += p.progress;
    };

    return #ok(totalFunds);
  };

  public query func addBacker(projectId : Text, project : Project) : async Result.Result<Text, Text> {
    projects.put(projectId, project);
    return #ok("Success");
  };
};
