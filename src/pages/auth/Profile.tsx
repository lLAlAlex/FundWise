import useAuthentication from "@/hooks/auth/get/useAuthentication";
import { useUserStore } from "@/store/user/userStore";
import { useNavigate } from "react-router-dom";

function Profile() {
    // const userStore  = useUserStore();
    const { auth, user } = useAuthentication();
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