import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth, useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';
import {
  user_backend,
  canisterId,
  idlFactory,
} from '../../declarations/user_backend';
import {
  User,
  _SERVICE,
} from '../../declarations/user_backend/user_backend.did';
import useLogin from '@/hooks/auth/login/useLogin';
import useAuthentication from '@/hooks/auth/get/useAuthentication';


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

  const navigate = useNavigate();
  const { loginStatus, login } = useLogin();
  const { auth, setAuth, user } = useAuthentication();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let actor = user_backend;

  useEffect(() => {
    // if (auth) return navigate('/');
  }, [auth])


  const handleLogout = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      // setAuthenticated(false);
      return navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (loginStatus === 'success') {
      setAuth(true);
    } else if (loginStatus === 'failed') {
      // do something
    }
  }, [loginStatus]);

  return (
    <header className="fixed w-full opacity-85 z-50">
      <nav className="bg-[#18191A] px-4 lg:px-6 py-2.5 pt-5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="/assets/fundwise.png"
              className="h-6 sm:h-9"
              alt="FundWise Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              FundWise
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <a href="/projects">
              <span className="self-center mx-5 text-xl font-semibold whitespace-nowrap text-white">
                Projects
              </span>
            </a>
            <a href="/">
              <span className="self-center mx-5 text-xl font-semibold whitespace-nowrap text-white">
                About
              </span>
            </a>
            {auth && user ? (
              <div>
                <img
                  id="avatarButton"
                  data-dropdown-toggle="userDropdown"
                  data-dropdown-placement="bottom-start"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={user.length > 0 ? user[0].profile : ''}
                  alt="User dropdown"
                  onClick={toggleDropdown}
                />
                <div
                  id="userDropdown"
                  className={`absolute z-10 ${isDropdownOpen ? '' : 'hidden'
                    } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>
                      {user.length > 0 ? user[0].name : 'Guest'}
                    </div>
                    <div className="font-medium truncate">
                      {user.length > 0 ? user[0].email : 'Guest'}
                    </div>
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
              <div className='hover:scale-105 duration-500'>
                <motion.button
                  onClick={login}
                  className="px-6 py-2 rounded-md relative radial-gradient flex justify-center items-center gap-2 hover:bg-[#3A3B3C]"
                  initial={{ '--x': '100%', scale: 1 } as any}
                  animate={{ '--x': '-100%' } as any}
                  whileTap={{ scale: 0.97 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    repeatDelay: 1,
                    type: 'spring',
                    stiffness: 20,
                    damping: 15,
                    mass: 2,
                    scale: {
                      type: 'spring',
                      stiffness: 10,
                      damping: 5,
                      mass: 0.1,
                    },
                  }}
                >
                  <img
                    src="./assets/icp.png"
                    className="w-full h-full object-contain absolute opacity-50"
                    alt="Login"
                  />
                  <span className="text-neutral-100 tracking-wide font-medium h-full w-full block relative linear-mask text-lg">
                    Log In
                  </span>
                  <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
                </motion.button>
              </div>
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
