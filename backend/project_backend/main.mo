import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Utils "canister:utils_backend";
import Vector "mo:vector/Class";

actor Database {
  type Project = {
    id : Text;
    name : Text;
    description : Text;
    category : Text;
    image : Text;
    progress : Nat;
    deadline : Nat;
    company_id : Text;
    reviews_ids : [Text];
    timestamp : Time.Time;
  };

  type ProjectInputSchema = {
    name : Text;
    description : Text;
    category : Text;
    image : Text;
    deadline : Nat;
    company_id : Text;
  };

  let projects = TrieMap.TrieMap<Text, Project>(Text.equal, Text.hash);

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
      company_id = newProject.company_id;
      reviews_ids = [];
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

  public query func getAllProjects() : async Result.Result<[Project], Text> {
    var allProjects = Vector.Vector<Project>();

    for (project in projects.vals()) {
      allProjects.add(project);
    };

    return #ok(Vector.toArray(allProjects));
  };

  public query func getProjectsSize() : async Nat {
    return projects.size();
  };

  public shared func deleteProject(id : Text) : async ?Project {
    return projects.remove(id);
  };
};
