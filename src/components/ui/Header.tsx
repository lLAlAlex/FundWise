import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';
import { Boxes } from '@/components/BackgroundBoxes';
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
                    <a href="/" className="flex items-center">
                        <img src="/assets/fundwise.png" className="h-6 sm:h-9" alt="FundWise Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">FundWise</span>
                    </a>
                    <div className="flex justify-around">
                        <a href="/projects">
                            <span className="self-center mx-5 text-xl font-semibold whitespace-nowrap text-white">Projects</span>
                        </a>
                        <a href="/">
                            <span className="self-center mx-5 text-xl font-semibold whitespace-nowrap text-white">About</span>
                        </a>
                    </div>
                    <div className="flex items-center lg:order-2 hover:scale-105 duration-500">
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
                            <motion.button onClick={handleLogin} className="px-6 py-2 rounded-md relative radial-gradient flex justify-center items-center gap-2 hover:bg-[#3A3B3C]" initial={{ "--x": "100%", scale: 1 } as any} animate={{ "--x": "-100%" } as any} whileTap={{ scale: 0.97 }} transition={{ repeat: Infinity, repeatType: "loop", repeatDelay: 1, type: "spring", stiffness: 20, damping: 15, mass: 2, scale: { type: "spring", stiffness: 10, damping: 5, mass: 0.1 }, }}>
                                <img src='./assets/icp.png' className="w-full h-full object-contain absolute opacity-50" alt="Login" />
                                <span className="text-neutral-100 tracking-wide font-medium h-full w-full block relative linear-mask text-lg">
                                    Log In
                                </span>
                                <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
                            </motion.button>
                        )}
                        {/* <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-700" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button> */}
                    </div>
                    {/* <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 mt-2" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 text-lg">
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0">Menu A</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0">Menu B</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0">Menu C</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0">Contact</a>
                        </li>
                    </ul>
                </div> */}
                </div>
            </nav>
        </header>
    );
};

export default Header;
