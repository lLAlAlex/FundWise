import { user_backend } from '@/declarations/user_backend';
import { User } from '@/declarations/user_backend/user_backend.did'
import { AuthClient } from '@dfinity/auth-client';
import { create } from 'zustand'

interface UserState {
    data: User[] | undefined,
    is_auth: boolean,
    updateAuth: (auth: boolean) => void,
    getData: () => Promise<boolean>,
    logout: () => Promise<void>,
}

export const useUserStore = create<UserState>()((set) => ({
    is_auth: false,
    data: undefined,
    updateAuth: (auth) => set((state) => ({ ...state, is_auth: auth })),
    getData: async () => {
        try {
            const authClient = await AuthClient.create();
            if (await authClient.isAuthenticated()) {
                const identity = await authClient.getIdentity();
                const principal = identity.getPrincipal();
                console.log(principal)
                const user = await user_backend.getUser(principal);
                set((state) => ({
                    ...state,
                    is_auth: true,
                    data: user,
                }))
                // console.log(user)
                return user !== undefined && user.length > 0;
            } else {
                set((state) => ({
                    ...state,
                    is_auth: false,
                    data: undefined,
                }))
            }

        } catch (error) {
            // console.log("hai")
            console.log(error)
            set((state) => ({
                ...state,
                is_auth: false,
                data: undefined,
            }))
        }
        return false;
    },
    logout: async () => {
        try {
            const authClient = await AuthClient.create();
            await authClient.logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
        set((state) => ({
            ...state,
            is_auth: false,
            data: undefined,
        }))
    }
}))
