import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from '@dfinity/auth-client';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/button';
import { user_backend, canisterId, idlFactory } from "../../declarations/user_backend";
import { Actor, HttpAgent } from '@dfinity/agent';
import { User, _SERVICE } from '../../declarations/user_backend/user_backend.did';

type UserState = User[] | [];

const Header = () => {
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
    const [currentUser, setCurrentUser] = useState<UserState>([]);
    let actor = user_backend;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (authenticated) {
            return navigate('/');
        }

        const initializeAuthClient = async () => {
            try {
                const authClient = await AuthClient.create();
                const isAuthenticated = await authClient.isAuthenticated();
                setAuthenticated(isAuthenticated);

                if (isAuthenticated) {
                    const identity = await authClient.getIdentity();
                    const principal = identity.getPrincipal();
                    const user = await user_backend.getUser(principal);

                    setCurrentUser(user);
                }
            } catch (error) {
                console.error('Error initializing auth client:', error);
            }
        };
        initializeAuthClient();
    }, []);

    const handleLogin = async () => {
        const authClient = await AuthClient.create();
        try {
            await new Promise<void>((resolve, reject) => {
                authClient.login({
                    identityProvider: "https://identity.ic0.app",
                    onSuccess: () => {
                        resolve();
                        setAuthenticated(true)
                    },
                    onError: reject,
                });
            });
            const identity = authClient.getIdentity();
            const agent = new HttpAgent({ identity });
            actor = Actor.createActor<_SERVICE>(idlFactory, {
                agent,
                canisterId
            });

            if (user_backend.getUser(identity.getPrincipal()) != null) {
                return navigate('/');
            }
            return navigate('/register');
        } catch (error) {
            console.error('Login error:', error);
        }
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

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <header className="fixed w-full opacity-75 z-50">
            <nav className="bg-[#18191A] px-4 lg:px-6 py-2.5 pt-5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img src="/assets/fundwise.png" className="h-6 sm:h-9" alt="FundWise Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">FundWise</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link to="/projects">
                            <span className="self-center mx-5 text-xl font-light whitespace-nowrap text-white">Projects</span>
                        </Link>
                        <Link to="/">
                            <span className="self-center mx-5 text-xl font-light whitespace-nowrap text-white">About</span>
                        </Link>
                        {authenticated ? (
                            <div>
                                <img
                                    id="avatarButton"
                                    data-dropdown-toggle="userDropdown"
                                    data-dropdown-placement="bottom-start"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    src={currentUser.length > 0 ? currentUser[0].profile : ''}
                                    alt="User dropdown"
                                    onClick={toggleDropdown}
                                />
                                <div
                                    id="userDropdown"
                                    className={`absolute z-10 ${isDropdownOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                                >
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div>{currentUser.length > 0 ? currentUser[0].name : 'Guest'}</div>
                                        <div className="font-medium truncate">{currentUser.length > 0 ? currentUser[0].email : 'Guest'}</div>
                                    </div>
                                    <ul
                                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="avatarButton"
                                    >
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Transaction History
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a
                                            onClick={handleLogout}
                                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Sign out
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="hover:scale-105 duration-500">
                                <motion.button onClick={handleLogin} className="px-6 py-2 rounded-md relative radial-gradient flex justify-center items-center gap-2 hover:bg-[#3A3B3C]" initial={{ "--x": "100%", scale: 1 } as any} animate={{ "--x": "-100%" } as any} whileTap={{ scale: 0.97 }} transition={{ repeat: Infinity, repeatType: "loop", repeatDelay: 1, type: "spring", stiffness: 20, damping: 15, mass: 2, scale: { type: "spring", stiffness: 10, damping: 5, mass: 0.1 }, }}>
                                    <img src='./assets/icp.png' className="w-full h-full object-contain absolute opacity-50" alt="Login" />
                                    <span className="text-white tracking-wide font-medium h-full w-full block relative linear-mask text-lg">
                                        Log In
                                    </span>
                                    <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
