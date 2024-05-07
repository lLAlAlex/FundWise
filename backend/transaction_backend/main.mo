import Utils "canister:utils_backend";
import Text "mo:base/Text";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Array "mo:base/Array";

actor Database {
    type Transacton = {
        id : Text;
        userid : Text;
        projectid : Text;
        status : Text;
        timestamp : Time.Time;
    };

    type TransactonInputSchema = {
        userid : Text;
        projectid : Text;
    };

    let transactions = TrieMap.TrieMap<Text, Transacton>(Text.equal, Text.hash);

    public shared (msg) func createTransaction(newTransaction : TransactonInputSchema) : async Result.Result<Transacton, Text> {
        let timestamp = Time.now();
        let uuid = await Utils.generateUUID();
        let userid = Principal.toText(msg.caller);

        let transaction : Transacton = {
            id = uuid;
            userid = userid;
            projectid = newTransaction.projectid;
            status = "Pending";
            timestamp = timestamp;
        };

        transactions.put(transaction.id, transaction);
        return #ok(transaction);
    };

    public query (msg) func getAllTransactonByUserId() : async Result.Result<[Transacton], Text> {
        let userid = Principal.toText(msg.caller);
        let transactionArray = Iter.toArray<Transacton>(transactions.vals());
        
        let filteredTransactions = Array.filter<Transacton>(
            transactionArray, 
            func (transaction : Transacton) : Bool { transaction.userid == userid; }
        );

        return #ok(filteredTransactions);
    };

    public query func getTransactionById(id : Text) : async Result.Result<Transacton, Text> {
        let result = transactions.get(id);

        switch (result) {
            case null {
                return #err("Not Found!");
            };
            case (?t) {
                return #ok(t);
            };
        };
    };
}

