import Utils "canister:utils_backend";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Blob "mo:base/Blob";
import Order "mo:base/Order";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Int "mo:base/Int";

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

    public shared (msg) func registerCompany(newCompany : CompanyInputSchema) : async Result.Result<Company, Text> {
        let _timestamp = Time.now();
        let uuid = await Utils.generateUUID();
        let imageBlob = Blob.fromArray([0]);
        let contactId = Principal.toText(msg.caller);

        let company : Company = {
            id = uuid;
            name = newCompany.name;
            profile_description = newCompany.profile_description;
            category = newCompany.category;
            location = newCompany.location;
            image = imageBlob;
            company_contact_ids = [contactId];
            reviews_ids = [];
            timestamp = _timestamp;
        };

        companies.put(company.id, company);
        return #ok(company);
    };

    public shared query func getAllCompany() : async Result.Result<[Company], Text> {
        let result : [Company] = Iter.toArray(companies.vals());

        // Sorted By Company Name
        // let sorted_companies = Array.sort(result, func (a : Company, b : Company) : Order.Order {
        //     Text.compare(a.name, b.name);
        // });

        return #ok(result);
    };

};