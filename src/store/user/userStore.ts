import { user_backend } from '@/declarations/user_backend';
import { User } from '@/declarations/user_backend/user_backend.did'
import { AuthClient } from '@dfinity/auth-client';
import { create } from 'zustand'

interface UserState {
    data: User[] | undefined,
    is_auth: boolean,
    updateAuth: (auth: boolean) => void,
    // fetchIdentity: () => Promise<any>,
    // fetchUser: () => Promise<any>,
}

export const useUserStore = create<UserState>()((set) =>({
    is_auth: false,
    data: undefined,
    updateAuth: (auth) => set((state) => ({ ...state, is_auth: auth })),
}))

export const userGetIdentity = async () => {
    let flag = false;
    try {
        const authClient = await AuthClient.create();
        flag = await authClient.isAuthenticated();
    } catch (error) {
        flag = false;
    }
    useUserStore.setState((state) => ({...state, is_auth: flag}))
}

export const userGetData = async()=> {
    const store = useUserStore();
    if (store.is_auth) {
        const authClient = await AuthClient.create();
        const identity = await authClient.getIdentity();
        const principal = identity.getPrincipal();
        const user = await user_backend.getUser(principal);
        if (user && user.length > 1) {
            useUserStore.setState((state) => ({...state, user: user}))
        }
    }
    useUserStore.setState((state) => ({...state, user: undefined}))
}