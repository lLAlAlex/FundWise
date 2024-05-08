import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth, useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from '@dfinity/auth-client';
import { Link, useNavigate } from 'react-router-dom';
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
import { ProjectInputSchema, Reward } from '@/declarations/project_backend/project_backend.did';
import { useUserStore } from '@/store/user/userStore';
import useAuthentication from '@/hooks/auth/get/useAuthentication';

const rewards: Reward[] = [
  { tier: 'Bronze', price: BigInt(100) },
  { tier: 'Silver', price: BigInt(200) },
  { tier: 'Gold', price: BigInt(300) },
];

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
  const { login } = useLogin();
  const userStore = useUserStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectInputSchema[]>([]);

  const handleLogout = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      // setAuthenticated(false);
      return navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProfile = () => {
    navigate('/profile');
  }

  useEffect(() => {
    const seedProjects = async () => {
      try {
        const size = await project_backend.getProjectsSize();
        // console.log(await project_backend.getAllProjects());

        if (size < 1) {
          const seedData: ProjectInputSchema[] = [
            { name: 'Startup 1', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '1', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 2', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '2', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 3', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '3', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 4', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '4', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 5', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '5', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 6', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '6', goal: BigInt(60000), rewards: rewards }
          ];
          setProjects(seedData);

          projects.map(p => {
            project_backend.createProject(p);
          });
        }
      } catch (e) {
        // console.log("hihi")
        console.error(e)
      }
    }
    seedProjects();
  }, [projects])

  return (
    <header className="fixed w-full opacity-85 z-50">
      <nav className="bg-[#18191A] px-4 lg:px-6 py-2.5 pt-5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/fundwise.png"
              className="h-6 sm:h-9"
              alt="FundWise Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              FundWise
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link to="/projects">
              <span className="self-center mx-5 text-xl font-semibold whitespace-nowrap text-white">
                Projects
              </span>
            </Link>
            <Link to="/">
              <span className="self-center mx-5 text-xl font-semibold whitespace-nowrap text-white">
                About
              </span>
            </Link>
            {userStore.is_auth && userStore.data ? (
              <div>
                <img
                  id="avatarButton"
                  data-dropdown-toggle="userDropdown"
                  data-dropdown-placement="bottom-start"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={userStore.data.length > 0 ? userStore.data[0].profile : ''}
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
                      {userStore.data.length > 0 ? userStore.data[0].name : 'Guest'}
                    </div>
                    <div className="font-medium truncate">
                      {userStore.data.length > 0 ? userStore.data[0].email : 'Guest'}
                    </div>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="avatarButton"
                  >
                    <li>
                      <div
                        onClick={() => { handleProfile() }}
                        className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </div>
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
