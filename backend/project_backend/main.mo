import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Vector "mo:vector/Class";
import Utils "canister:utils_backend";

actor Database {
  type Reward = {
    tier : Text;
    price : Nat;
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
    company_id : Text;
    reviews_ids : [Text];
    rewards : [Reward];
    timestamp : Time.Time;
  };

  type ProjectInputSchema = {
    name : Text;
    description : Text;
    category : Text;
    image : Text;
    deadline : Text;
    goal : Nat;
    rewards : [Reward];
    company_id : Text;
  };

  let projects = TrieMap.TrieMap<Text, Project>(Text.equal, Text.hash);

  public shared func seedProjects() : async Result.Result<Text, Text> {
    var counter = 0;
    while (counter <= 20) {
      counter := counter + 1;
      let _timestamp = Time.now();
      let uuid = await Utils.generateUUID();
      let image = "https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png";
      let a = Nat.toText(counter);
      let project : Project = {
        id = uuid;
        name = "Project Test " # a;
        description = "DESC";
        category = "TEST";
        image = image;
        progress = 0;
        deadline = "DEADLINE";
        goal = 2000;
        company_id = "asasdasd-asdasd-asdasd";
        reviews_ids = [];
        rewards = [
          { tier = "Bronze"; price = 100 },
          { tier = "Silver"; price = 200 },
          { tier = "Gold"; price = 300 },
        ];
        timestamp = _timestamp;
      };

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
      company_id = newProject.company_id;
      reviews_ids = [];
      rewards = newProject.rewards;
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
    // OFFSET KITA SET 20 dlu aja
    let offset = 20;

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

  public query func getProjectsSize() : async Nat {
    return projects.size();
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
};
