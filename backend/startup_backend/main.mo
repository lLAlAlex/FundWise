import Time "mo:base/Time";
import Blob "mo:base/Blob";
actor Startup {

  // Type for user
  type Startup = {
    id : Text;
    name : Text;
    image : Blob;
    description : Text;
    timestamp : Time.Time;
  };
};
