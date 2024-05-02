import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";

actor Database {
    type Review = {
        id : Text;
        userid : Text;
        companyid : Text;
        title : Text;
        review : Text;
        rating : Nat;
    };

    let reviews = TrieMap.TrieMap<Text, Review>(Text.equal, Text.hash);

}