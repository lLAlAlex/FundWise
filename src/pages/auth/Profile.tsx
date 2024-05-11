import { Container } from "@/components/ui/Container";
import useAuthentication from "@/hooks/auth/get/useAuthentication";
import { useUserStore } from "@/store/user/userStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StickyBox from "react-sticky-box";
import { Project } from '@/declarations/project_backend/project_backend.did';
import ProjectCard from "@/components/cards/projects/ProjectCard";
import { project_backend } from "@/declarations/project_backend";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { FaPencilAlt } from "react-icons/fa";
import { User } from "@/declarations/user_backend/user_backend.did";
import { user_backend } from "@/declarations/user_backend";

type ProjectState = Project[] | undefined;
type UserState = User[] | [];

function Profile() {
    const userStore = useUserStore();
    const [user, setUser] = useState<UserState>();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<ProjectState>();
    const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
    const params = useParams();
    const id = JSON.stringify(params.id).replace(/"/g, '');
    const actor = user_backend;

    async function fetchProjects(search: string, page: number) {
        try {
            setProjects([]);
            const result = await project_backend.getAllProjects([search], BigInt(page));
            if ('ok' in result) {
                if (result.ok.length != 0) {
                    setProjects(result.ok);
                }
            } else {
                console.error('Error fetching projects:', result.err);
            }
        } catch (error) {
            console.log(error)
            // console.error('Error fetching projects:', error);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            setUser(await actor.getUserByTextID(id));
        }
        fetchUser();

        fetchProjects("", 1);
    }, []);

    return (
        <div className="mt-10">
            {updateProfileOpen && (
                <div className="absolute w-full h-full bg-black bg-opacity-50 top-0 z-50 flex flex-col items-center justify-center" onClick={() => setUpdateProfileOpen(false)}>
                    <div className="shadow-lg max-h-[80vh] overflow-y-auto max-w-[400px] w-full min-w-[300px] bg-white  rounded-lg shadow border md:mt-0  xl:p-0 border-tranparent-black" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 space-y-4 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl w-full text-center">
                                Update
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="text" className='block mb-2 text-sm font-medium text-gray-900'>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                        placeholder="John Doe"
                                    // onChange={handleChange}
                                    // value={formData.name}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                        placeholder="name@company.com"
                                    // onChange={handleChange}
                                    // value={formData.email}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                    // onChange={handleChange}
                                    // value={formData.dob}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="text" className='block mb-2 text-sm font-medium text-gray-900'>
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                        placeholder="Indonesia"
                                    // onChange={handleChange}
                                    // value={formData.location}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="text" className='block mb-2 text-sm font-medium text-gray-900'>
                                        Contact
                                    </label>
                                    <input
                                        type="text"
                                        name="contact"
                                        id="contact"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                        placeholder="+62xxxxxxxxxxx"
                                    // onChange={handleChange}
                                    // value={formData.contact}
                                    />
                                </div>
                                <div className='w-full text-end'>
                                    <Button type="submit" className='text-end text-xs bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white'>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            )}
            {user ? (
                <Container>
                    <div className="w-full flex flex-col justify-center items-center gap-10 lg:flex-row lg:items-start">
                        <div className="lg:1/4 pt-10 h-fit">
                            <div className="bg-white border border-transparent-black rounded-xl shadow-lg relative flex flex-col h-[300px]">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 border border-transparent-black rounded-full p-1 bg-white">
                                    <img src={user[0].profile} className="w-48 h-48 rounded-full" />
                                </div>
                                {userStore.data && user[0].internet_identity.toString() === userStore.data[0].internet_identity.toString() && (
                                    <div className="absolute top-5 right-5 cursor-pointer hover:scale-110" onClick={() => setUpdateProfileOpen(true)}>
                                        <FaPencilAlt size={14} />
                                    </div>
                                )}
                                <div className="flex flex-col justify-start items-center mt-40">
                                    <span className="text-xl font-bold">{user[0].name}</span>
                                    <span className="text-sm text-gray-500">{user[0].email}</span>
                                    <hr className="h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.1)_50%,transparent)] w-full m-1" />
                                    <div className="flex justify-between w-full px-7 py-1">
                                        <div className="flex flex-col justify-start text-gray-500  gap-y-1">
                                            <span className="text-sm">Date Of Birth:</span>
                                            <span className="text-sm">Location:</span>
                                            <span className="text-sm">Contact:</span>
                                            <span className="text-sm">Status:</span>
                                        </div>
                                        <div className="flex flex-col justify-end items-end  gap-y-1">
                                            <span className="text-sm">{user[0].dob}</span>
                                            <span className="text-sm">{user[0].location}</span>
                                            <span className="text-sm">{user[0].contact}</span>
                                            <span className="text-sm">{user[0].status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:3/4 h-[80vh]">
                            <div className="flex flex-wrap gap-4 justify-end">
                                <Tabs variant="underlined" aria-label="Tabs variants" size="lg">
                                    <Tab key="My Project" title="Projects" />
                                    <Tab key="Funded Project" title="Funded Project" />
                                </Tabs>
                            </div>
                            <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 md:gap-x-10 lg:grid-cols-3 h-[75vh] overflow-y-auto">
                                {projects && projects.map((p, idx) => (
                                    userStore.data && user[0].internet_identity.toString() === p.user_id && (
                                        <ProjectCard project={p} key={idx} />
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <div>Name: {user[0].name}</div> */}

                </Container>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Profile;