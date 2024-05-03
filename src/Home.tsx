import { useState, useEffect } from 'react';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate, useParams } from 'react-router-dom';
import { user_backend } from './declarations/user_backend';
import { Principal } from '@ic-reactor/react/dist/types';
import { User } from './declarations/user_backend/user_backend.did';
import Header from './components/ui/Header';

type UserState = User[] | [];

function HomePage() {
    const navigate = useNavigate();

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
    const [currentUser, setCurrentUser] = useState<UserState>([]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authClient = await AuthClient.create();
                const isAuthenticated = await authClient.isAuthenticated();
                setAuthenticated(isAuthenticated);

                if (isAuthenticated) {
                    const identity = await authClient.getIdentity();
                    const principal = identity.getPrincipal();
                    const user = await user_backend.getUser(principal);

                    if (user.length < 1) {
                        return navigate('/register');
                    }
                    setCurrentUser(user);

                    console.log(user);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };
        checkAuthentication();

        const initializeAuthClient = async () => {
            try {
                const authClient = await AuthClient.create();
                const isAuthenticated = await authClient.isAuthenticated();
                setAuthenticated(isAuthenticated);
            } catch (error) {
                console.error("Error initializing auth client:", error);
            }
        };
        initializeAuthClient();
    }, []);

    const [data, setData] = useState([
        { name: 'Apple', date: '2024-04-30' },
        { name: 'Google', date: '2024-04-29' },
        { name: 'Microsoft', date: '2024-04-28' },
        { name: 'Amazon', date: '2024-04-27' },
        { name: 'Facebook', date: '2024-04-26' },
        { name: 'Tesla', date: '2024-04-25' },
        { name: 'Netflix', date: '2024-04-24' },
        { name: 'Intel', date: '2024-04-23' },
        { name: 'Adobe', date: '2024-04-22' },
        { name: 'Salesforce', date: '2024-04-21' },
        { name: 'Twitter', date: '2024-04-22' },
        { name: 'Shopify', date: '2024-04-21' }
    ]);

    return (
        <div className=''>
            <Header />
            <main className='bg-black w-full text-white py-[110px] flex flex-col items-center'>
                <div className='w-full mb-5'>
                    <form className="max-w-[1200px] w-9/12 mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-12 text-sm border rounded-lg bg-[#161616] border-gray-600 placeholder-gray-400 text-white" placeholder="Search Projects, Categories..." required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>

                <div className='flex flex-wrap justify-center max-w-[1300px] gap-5'>
                    {data.map((eachData) => (
                        <div className="max-w-[300px] border border-[#eceff133] rounded-lg shadow flex flex-col justify-center items-center cursor-pointer hover:scale-105 hover:bg-[#161616] duration-500">
                            <img className="rounded-t-lg bg-transparent max-w-[300px] pt-5" src="/assets/fundwise.png" alt="" />
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{eachData.name}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                <div className='flex justify-between items-end'>
                                    <div className='flex flex-col'>
                                        <span className="font-normal text-sm text-gray-500 flex flex-wrap">20 days left</span>
                                        <span className="font-normal text-sm text-gray-500 flex flex-wrap">100% Funded</span>
                                    </div>
                                    <a href="#" className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 w-fit">
                                        Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-base h-10 mt-7">
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0 rounded-s-lg bg-black border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight border bg-black border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight border bg-black border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight border bg-black border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight border bg-black border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight border bg-black border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight border rounded-e-lg bg-black border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </main>
        </div>
    );
}

export default HomePage;