import { AuthClient } from '@dfinity/auth-client';
import { useEffect, useState } from 'react';
import { User } from '@/declarations/user_backend/user_backend.did';
import { user_backend } from '@/declarations/user_backend';


/**
 * GAK KEPAKE
 * SEKARANG AUTO CHECK UDH LOGIN / BLM DI ROOT LAYOUT
 */

type UserState = User[] | undefined;

type UserStatus = "fetching" | "found" | "empty"

const useAuthentication = () => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState<UserState>()
    const [userStatus, setUserStatus] = useState<UserStatus>("fetching")
    const fetchUser = async () => {
        setUserStatus("fetching")
        try {
            const authClient = await AuthClient.create();
            const isAuthenticated = await authClient.isAuthenticated();
            setAuth(isAuthenticated);
            if (isAuthenticated) {
                const identity = await authClient.getIdentity();
                const principal = identity.getPrincipal();
                const user = await user_backend.getUser(principal);
                if ((await user_backend.getUser(principal)).length == 0) {
                    // console.log("Masuk")
                    setUserStatus("empty")
                    setUser(undefined)
                } else {
                    setUser(user);
                    setUserStatus("found")
                }
            } else {
                setUserStatus("empty")
                setUser(undefined)
            }
        } catch (error) {
            console.error('Error initializing auth client:', error);
        }
    };

    useEffect(() => {
        fetchUser()
    }, [])

    return { auth, setAuth, user, userStatus }
}

export default useAuthentication