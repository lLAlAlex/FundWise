import { useState, useEffect } from 'react';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate, useParams } from 'react-router-dom';
import { user_backend } from './declarations/user_backend';
import { Principal } from '@ic-reactor/react/dist/types';
import { User } from './declarations/user_backend/user_backend.did';
import Header from './components/ui/Header';

type UserState = User[] | [];

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
    const [currentUser, setCurrentUser] = useState<UserState>([]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authClient = await AuthClient.create();
                const isAuthenticated = await authClient.isAuthenticated();
                setAuthenticated(isAuthenticated);

                if (isAuthenticated) {
                    const identity = await authClient.getIdentity();
                    const principal = identity.getPrincipal();
                    const user = await user_backend.getUser(principal);

                    setCurrentUser(user);

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
        <div className=''>
            <Header/>
            <main className='bg-black w-full h-[150vh] text-white pt-[100px] flex flex-col  items-center'>
                
                <a href="#" className="flex flex-col items-center border rounded-lg shadow md:flex-row md:max-w-xl border-gray-700 bg-black hover:bg-gray-900">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/assets/fundwise.png" alt=""/>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Binus</h5>
                        <p className="mb-3 font-normal text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <p className="mb-3 font-normal text-gray-400">Ended 107% Funded</p>
                    </div>
                </a>

                This is home page
                <br></br>
                {authenticated ? (
                    <div>Welcome, {currentUser.at(0)?.name.toString()}</div>
                ) : (
                    <div>You are not logged in yet</div>
                )}
                {authenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </main>
        </div>
    );
}

export default HomePage;