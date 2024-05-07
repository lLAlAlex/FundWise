import { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { user_backend, canisterId, idlFactory } from "@/declarations/user_backend";
import { Actor, HttpAgent } from '@dfinity/agent';
import { _SERVICE } from '@/declarations/user_backend/user_backend.did';
import { canisterId as internetIdentityCanisterID } from '@/declarations/internet_identity';

type LoginStatus = "initial" | "loading" | "success" | "failed";

const useLogin = () => {
    const [loginStatus, setLoginStatus] = useState<LoginStatus>("initial")
    const login = async () => {
        setLoginStatus("loading");
        const authClient = await AuthClient.create();
        try {
            await new Promise<void>((resolve, reject) => {
                authClient.login({
                    identityProvider: `http://${internetIdentityCanisterID}.localhost:4943/`,
                    // identityProvider: "https://identity.ic0.app",
                    onSuccess: () => {
                        resolve();
                    },
                    onError: reject,
                });
            });
            const identity = authClient.getIdentity();
            const agent = new HttpAgent({ identity });
            const actor = Actor.createActor<_SERVICE>(idlFactory, {
                agent,
                canisterId
            });

            if ((await user_backend.getUser(identity.getPrincipal())).length != 0) {
                setLoginStatus("success");
            } else {
                setLoginStatus("failed")
            }
        } catch (error) {
            setLoginStatus("failed");
        }
    };

    return { loginStatus, login };
}

export default useLogin;