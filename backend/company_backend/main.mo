import Utils "canister:utils_backend";
import Text "mo:base/Text";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Blob "mo:base/Blob";

actor Database {

    type Company = {
        id : Text;
        name : Text;
        profile_description : Text;
        category : Text;
        location : [Text];
        image : Blob;
        company_contact_ids : [Text];
        reviews_ids : [Text];
        timestamp : Time.Time;
    };

    type CompanyInputSchema = {
        name : Text;
        profile_description : Text;
        category : Text;
        location : [Text];
    };

    let companies = TrieMap.TrieMap<Text, Company>(Text.equal, Text.hash);

    public shared (_msg) func registerCompany(company : CompanyInputSchema) : async Result.Result<Company, Text> {
        let _timestamp = Time.now();
        let uuid = await Utils.generateUUID();
        let imageBlob = Blob.fromArray([0]);

        let newCompany : Company = {
            id = uuid;
            name = company.name;
            profile_description = company.profile_description;
            category = company.category;
            location = company.location;
            image = imageBlob;
            company_contact_ids = [];
            reviews_ids = [];
            timestamp = _timestamp;
        };

        companies.put(newCompany.id, newCompany);
        return #ok(newCompany);
    };

};