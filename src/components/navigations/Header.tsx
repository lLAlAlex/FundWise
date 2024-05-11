import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth, useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from '@dfinity/auth-client';
import { Link, redirect, useNavigate } from 'react-router-dom';
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
import { project_backend } from '@/declarations/project_backend';
import {
  ProjectInputSchema,
  Reward,
} from '@/declarations/project_backend/project_backend.did';
import { useUserStore } from '@/store/user/userStore';
import useAuthentication from '@/hooks/auth/get/useAuthentication';
import { Container } from '../ui/Container';
import { Hamburger } from '../ui/Hamburger';
import classNames from 'classnames';
import { Avatar } from '@nextui-org/react';

// const rewards: Reward[] = [
//   { tier: 'Bronze', price: BigInt(100) },
//   { tier: 'Silver', price: BigInt(200) },
//   { tier: 'Gold', price: BigInt(300) },
// ];

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
  const userStore = useUserStore();
  // const { auth, setAuth, user } = useAuthentication();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  let actor = user_backend;

  const [projects, setProjects] = useState<ProjectInputSchema[]>([]);

  const handleLogout = async () => {
    userStore.logout();
    // try {
    //   const authClient = await AuthClient.create();
    //   await authClient.logout();
    //   // setAuthenticated(false);
    //   return navigate('/');
    // } catch (error) {
    //   console.error('Logout error:', error);
    // }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProfile = (userID: string) => {
    navigate('/profile/' + userID);
  };

  const walletDialog = () => {
    // (async () => {
    //   const nnsCanisterId = 'qoctq-giaaa-aaaaa-aaaea-cai';
    //   const whitelist = [nnsCanisterId];
    //   const isConnected = await window.ic.plug.requestConnect({
    //     whitelist,
    //   });
    //   const principalId = await window.ic.plug.agent.getPrincipal();
    //   console.log(`Plug's user principal Id is ${principalId}`);
    //   setConnection(isConnected);
    // })();
  };

  // useEffect(() => {
  //   if (loginStatus.status === 'success') {
  //     setAuth(true);
  //   } else if (loginStatus.status === 'failed') {
  //     // do something
  //   }
  // }, [loginStatus]);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.classList.toggle('overflow-hidden', isHamburgerOpen);
  }, [isHamburgerOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setIsHamburgerOpen(false);
    window.addEventListener('orientationchange', closeHamburgerNavigation);
    window.addEventListener('resize', closeHamburgerNavigation);
  }, [setIsHamburgerOpen]);

  return (
    <header className="text-black fixed top-0 left-0 w-full border-b border-transparent-black z-50 backdrop-blur-[12px]">
      <Container className="flex h-nav-height">
        <Link
          to="/"
          className="flex items-center md:text-lg text-md mr-3 font-bold"
        >
          <img
            src="/assets/fundwise.png"
            width="64"
            height="64"
            className="w-[2.2rem] h-[2.2rem] mr-3"
            alt="FundWise Logo"
          />{' '}
          FundWise
        </Link>

        <nav
          className={classNames(
            'h-[calc(100vh_-_var(--navigation-height))] fixed top-nav-height w-full bg-background overflow-auto transition-opacity duration-500 md:block md:relative md:top-0 left-0 md:h-nav-height md:w-auto md:bg-transparent md:overflow-hidden md:opacity-100 md:visible md:translate-x-0',
            isHamburgerOpen
              ? 'visible opacity-100 translate-x-0 bg-page-gradient'
              : 'invisible opacity-0 translate-x-[-100vw]',
          )}
        >
          <ul
            className={classNames(
              'flex h-full flex-col [&_a]:text-md [&_a]:flex [&_a]:items-center [&_a]:h-nav-height [&_a]:w-full [&_a]:duration-500 [&_a]:translate-transform [&_li]:mx-6 [&_li]:border-b md:[&_li]:border-0 [&_li]:border-gray-dark md:hover:text-gray-400',
              'md:flex-row md:items-center md:[&_a]:text-sm md:[&_li]:mx-3 md:[&_li]:h-full md:[&_li]:flex md:[&_li]:justify-center md:[&_li]:items-center md:[&_a]:translate-y-0',
              isHamburgerOpen ? '[&_a]:translate-y-0' : '[&_a]:translate-y-16',
            )}
          >
            <li className="md:hover:text-black md:hover:scale-105">
              <Link to="/projects">Explore</Link>
            </li>
            {userStore.is_auth && userStore.data && (
              <li className="md:hover:text-black md:hover:scale-105">
                <Link to="/project/create">Create Project</Link>
              </li>
            )}
            <li className="md:hover:text-black md:hover:scale-105">
              <Link
                to="/#about"
                onClick={() => {
                  const aboutElement = document.getElementById('about');
                  if (aboutElement) {
                    aboutElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                About
              </Link>
            </li>
            <li className="md:hover:text-black md:hover:scale-105">
              <Link to="#">Support</Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto h-full flex items-center">
          {userStore.is_auth && userStore.data ? (
            <div className="relative">
              <Avatar
                id="avatarButton"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                isBordered
                radius="sm"
                size="sm"
                className="text-tiny cursor-pointer mx-2"
                src={userStore.data.length > 0 ? userStore.data[0].profile : ''}
                alt="User dropdown"
                onClick={toggleDropdown}
              />
              <div
                id="userDropdown"
                className={`absolute z-10 top-[var(--navigation-height)] right-0 ${
                  isDropdownOpen ? '' : 'hidden'
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 border border-tranparent-black min-w-96`}
              >
                <div className="px-4 py-3 flex justify-between items-center">
                  <div className="mr-3">
                    <Avatar
                      id="avatarButton"
                      data-dropdown-toggle="userDropdown"
                      data-dropdown-placement="bottom-start"
                      isBordered
                      radius="sm"
                      size="sm"
                      className="text-tiny cursor-pointer mx-2"
                      src={
                        userStore.data.length > 0
                          ? userStore.data[0].profile
                          : ''
                      }
                      alt="User dropdown"
                    />
                  </div>
                  <div className="text-end">
                    <div className="text-md truncate max-w-80">
                      {userStore.data.length > 0
                        ? userStore.data[0].name
                        : 'Guest'}
                    </div>
                    <div className="text-xs truncate text-gray-500 max-w-80">
                      {userStore.data.length > 0
                        ? userStore.data[0].email
                        : 'Guest'}
                    </div>
                  </div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <div
                      onClick={() => {
                        if (userStore.data && userStore.data.length > 1)
                          handleProfile(
                            userStore.data[0].internet_identity.toString(),
                          );
                      }}
                      className="cursor-pointer block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </div>
                  </li>
                  <li>
                    <Link
                      to="https://nns.ic0.app/"
                      className="cursor-pointer block px-4 py-2 hover:bg-gray-100"
                    >
                      My Wallet
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Transaction History
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    onClick={handleLogout}
                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="hover:scale-105 duration-500 md:text-lg text-md">
              <motion.button
                onClick={login}
                className=" py-2 rounded-md relative flex justify-center items-center gap-2"
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
                  src="../../assets/icp.png"
                  className="w-full h-full object-contain absolute opacity-50"
                  alt="Login"
                />
                <span className="linear-mask">Log In</span>
              </motion.button>
            </div>
          )}
        </div>

        <button
          className="ml-6 md:hidden"
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          <Hamburger isHamburgerOpen={isHamburgerOpen} />
        </button>
      </Container>
    </header>
  );
};

export default Header;
