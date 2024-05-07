import { useUserStore } from "@/store/user/userStore";
import { useNavigate } from "react-router-dom";

function Profile() {
    const userStore  = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="mt-10">
            {userStore.data ? (
                <div>Name: {userStore.data[0].name}</div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Profile;