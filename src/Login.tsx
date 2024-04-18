import { useState, useEffect } from 'react';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from 'react-router-dom';

function Login() {
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
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated) {
            return navigate('/');
        }

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
        try {
            const authClient = await AuthClient.create();
            await authClient.login({
                identityProvider: "https://identity.ic0.app",
                onSuccess: () => {
                    setAuthenticated(true);
                },
            });
            return navigate('/');
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div>
            This is login page
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
