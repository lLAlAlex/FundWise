import { useState, useEffect } from 'react';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate, useParams } from 'react-router-dom';
import { backend } from './declarations/backend';
import { Principal } from '@ic-reactor/react/dist/types';

function HomePage() {
    const navigate = useNavigate();

    const { data: count, call: refetchCount } = useQueryCall({
        functionName: 'get',
    });

    const { call: increment, loading } = useUpdateCall({
        functionName: 'inc',
        onSuccess: () => {
            refetchCount();
        },
    });

    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<Principal | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authClient = await AuthClient.create();
                const isAuthenticated = await authClient.isAuthenticated();
                setAuthenticated(isAuthenticated);

                if (isAuthenticated) {
                    const identity = await authClient.getIdentity();
                    const principal = identity.getPrincipal();
                    const user = await backend.getUser(principal);

                    const result = await backend.getCurrentUser();
                    setCurrentUser(result);

                    if (user.length < 1) {
                        // return navigate('/register');
                    }
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };
        checkAuthentication();

        const initializeAuthClient = async () => {
            try {
                const authClient = await AuthClient.create();
                const isAuthenticated = await authClient.isAuthenticated();
                setAuthenticated(isAuthenticated);
            } catch (error) {
                console.error("Error initializing auth client:", error);
            }
        };
        initializeAuthClient();
    }, []);

    const handleLogin = async () => {
        return navigate('/login');
    };

    const handleLogout = async () => {
        try {
            const authClient = await AuthClient.create();
            await authClient.logout();
            setAuthenticated(false);
            return navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            This is home page
            <br></br>
            {currentUser?.toString()}
            <br></br>
            {authenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}

export default HomePage;