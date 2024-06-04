import { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { user_backend, canisterId, idlFactory } from "@/declarations/user_backend";
import { Actor, HttpAgent } from '@dfinity/agent';
import { _SERVICE } from '@/declarations/user_backend/user_backend.did';
import { canisterId as internetIdentityCanisterID } from '@/declarations/internet_identity';
import { useUserStore } from '@/store/user/userStore';

type LoginState = {
    status: "initial" | "loading" | "success" | "failed" | "not registered",
    error: any,
}

const useLogin = () => {

    const userStore = useUserStore();
    const [loginStatus, setLoginStatus] = useState<LoginState>({
        status: "initial",
        error: undefined
    })
    const login = async () => {
        setLoginStatus({
            ...loginStatus,
            status: "loading"
        });
        const authClient = await AuthClient.create();
        try {
            await new Promise<void>((resolve, reject) => {
                authClient.login({
                    identityProvider: `http://${internetIdentityCanisterID}.localhost:4943/`,
                    // identityProvider: "https://identity.ic0.app",
                    onSuccess: () => {
                        resolve();
                    },
                    onError: () => {
                        reject("error");
                    },
                });
            });
            const identity = authClient.getIdentity();
            const agent = new HttpAgent({ identity });
            const actor = Actor.createActor<_SERVICE>(idlFactory, {
                agent,
                canisterId
            });

            if ((await user_backend.getUser(identity.getPrincipal())).length != 0) {
                setLoginStatus({
                    ...loginStatus,
                    status: "success"
                });
            } else {
                setLoginStatus({
                    ...loginStatus,
                    status: "not registered"
                });
            }
           const data = await userStore.getData();
           console.log(data)
        } catch (error) {
            setLoginStatus({
                error: error,
                status: "failed"
            });
        }
    };

    return { loginStatus, login };
}

export default useLogin;