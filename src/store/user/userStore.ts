import { user_backend } from '@/declarations/user_backend';
import { User } from '@/declarations/user_backend/user_backend.did'
import { AuthClient } from '@dfinity/auth-client';
import { create } from 'zustand'

interface UserState {
    data: User[] | undefined,
    is_auth: boolean,
    updateAuth: (auth: boolean) => void,
    getIdentity: () => Promise<void>,
    getData: () => Promise<boolean>,
    // fetchIdentity: () => Promise<any>,
    // fetchUser: () => Promise<any>,
}

export const useUserStore = create<UserState>()((set) => ({
    is_auth: false,
    data: undefined,
    updateAuth: (auth) => set((state) => ({ ...state, is_auth: auth })),
    getIdentity: async () => {
        let flag = false;
        try {
            const authClient = await AuthClient.create();
            // console.log(authClient.getIdentity().getPrincipal().toString());
            flag = await authClient.isAuthenticated();
        } catch (error) {
            flag = false;
        }
        set((state) => ({
            ...state,
            is_auth: flag,
        }))
    },
    getData: async () => {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
            const identity = await authClient.getIdentity();
            const principal = identity.getPrincipal();
            const user = await user_backend.getUser(principal);
            set((state) => ({
                ...state,
                user: user,
            }))
            return user !== undefined && user.length > 0;
        } else {
            set((state) => ({
                ...state,
                user: undefined,
            }))
        }
        return false;
    }
}))

export const userGetIdentity = async () => {
    let flag = false;
    try {
        const authClient = await AuthClient.create();
        // console.log(authClient.getIdentity().getPrincipal().toString());
        flag = await authClient.isAuthenticated();
    } catch (error) {
        flag = false;
    }
    useUserStore.setState((state) => ({ ...state, is_auth: flag }))
}

export const userGetData = async () => {
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const principal = identity.getPrincipal();
    const user = await user_backend.getUser(principal);
    // console.log(user);
    if (user && user.length > 0) {
        useUserStore.setState((state) => ({ ...state, user: user }))
        console.log(useUserStore.setState((state) => ({ ...state, user: user })))
    }
    else {
        useUserStore.setState((state) => ({ ...state, user: undefined }))
    }
}