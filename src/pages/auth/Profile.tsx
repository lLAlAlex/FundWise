import useAuthentication from "@/hooks/auth/get/useAuthentication";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user } = useAuthentication();
    const navigate = useNavigate();

    return (
        <div className="mt-10">
            {user ? (
                <div>Name: {user[0].name}</div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Profile;