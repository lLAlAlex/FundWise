import Text "mo:base/Text";
import SourceV4 "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

actor Utils {
    public shared func generateUUID() : async Text {
        let source = SourceV4.Source();
        let uuidGenerator = await source.new();
        return UUID.toText(uuidGenerator);
    };
}

