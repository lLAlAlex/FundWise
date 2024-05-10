import { Features } from "@/components/ui/Features";
import { comment_backend } from "@/declarations/comment_backend";
import { Comment, Time } from "@/declarations/comment_backend/comment_backend.did";
import { project_backend } from "@/declarations/project_backend";
import { Project } from "@/declarations/project_backend/project_backend.did";
import { user_backend } from "@/declarations/user_backend";
import { Principal } from "@ic-reactor/react/dist/types";
import { Button, Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import StickyBox from "react-sticky-box";

type ProjectState = Project[] | undefined;
type CommentState = Comment[] | undefined;

function ProjectDetail() {
    const actor = project_backend;
    const comment_actor = comment_backend;
    const user_actor = user_backend;
    const [project, setProject] = useState<ProjectState>();
    const [comments, setComments] = useState<CommentState>();
    const [deadline, setDeadline] = useState(0);
    const [viewReward, setViewReward] = useState(true);
    const params = useParams();
    const id = JSON.stringify(params.id).replace(/"/g, '');

    useEffect(() => {
        const fetchProject = async () => {
            const fetchedProject = await actor.getProject(id);
            setProject(fetchedProject);
        };
        fetchProject();

        const fetchComments = async () => {
            const fetchedComments = await comment_actor.getAllCommentByProjectId(id);
            if ('ok' in fetchedComments) {
                setComments(fetchedComments.ok);
                console.log(comments);
            }
        }
        fetchComments();
    }, [id]);

    useEffect(() => {
        if (project && project.length > 0) {
            const projectDeadline = project[0].deadline;
            const parts = projectDeadline.split("-").map(Number);
            const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
            const currentDate = new Date();
            const differenceInMilliseconds = dateObj.getTime() - currentDate.getTime();
            const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            setDeadline(differenceInDays);
        }
    }, [project]);

    const handleViewReward = () => {
        setViewReward(true);
    }

    const handleViewComment = () => {
        setViewReward(false);
    }

    const scrollReward = (idx: number) => {
        const e = document.getElementById('reward' + idx);
        if (e) {
            const offset = 80;
            const { top } = e.getBoundingClientRect();
            window.scrollTo({
                top: window.scrollY + top - offset,
                behavior: 'smooth'
            });
            console.log(window.scrollY + top - offset);
        }
    };


    const getUser = async (userId: string) => {
        const user = await user_actor.getUserByTextID(userId);
        // console.log(user);
        return user[0];
    }

    useEffect(() => {
        const fetchCommentUsers = async () => {
            if (comments) {
                const updatedComments = await Promise.all(
                    comments.map(async (comment) => {
                        const user = await getUser(comment.userId);
                        return { ...comment, user };
                    })
                );
                setComments(updatedComments);
            }
        };
        fetchCommentUsers();
    }, [comments]);

    const timeAgo = (timestamp: Time) => {
        const now = Date.now();
        const diff = now - parseInt(timestamp.toString());
        const seconds = Math.floor(parseInt(diff.toString()) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };

    return (
        <div>
            <div className="mt-10">
                {project && project.length > 0 &&
                    <div className="flex-col justify-center">
                        <div className="flex-col">
                            <div className="text-xl font-bold text-center">{project[0].name}</div>
                            <div className="text-lg text-center">{project[0].description}</div>
                        </div>
                        <div className="flex justify-center mt-10">
                            <Image
                                removeWrapper
                                alt="Project Image"
                                className="z-0 w-auto h-auto object-cover"
                                src={`${project[0].image}`}
                            />
                        </div>
                        <div className="mt-10">
                            <Features.Cards
                                features={[
                                    { total: parseInt(`${project[0].progress}`), front: "US$ ", back: "", text: `funded out of US$ ${project[0].goal} goal`, color: "#EAE6FD", colorText: "#5248B5" },
                                    { total: parseInt(`${project[0].backers_ids.length}`), front: "", back: "", text: "Backers", color: "#E9FAF9", colorText: "#1F7B8F" },
                                    { total: parseInt(`${deadline}`), front: "", back: "", text: "days to go", color: "#FFE8F2", colorText: "#CF3881" },
                                ]}
                            />
                        </div>
                        <div className="flex mt-10 justify-center">
                            <Button color="secondary" className="w-full text-lg mx-64">Fund this Project</Button>
                        </div>
                        <Divider className="mt-10" />
                        <div className="flex m-3 justify-center">
                            {viewReward ? (
                                <>
                                    <div className="text-lg cursor-pointer mx-10 text-purple-700">Reward</div>
                                    <div onClick={handleViewComment} className="text-lg cursor-pointer mx-10 hover:text-purple-700">Comments</div>
                                </>
                            ) : (
                                <>
                                    <div onClick={handleViewReward} className="text-lg cursor-pointer mx-10 hover:text-purple-700">Reward</div>
                                    <div className="text-lg cursor-pointer mx-10 text-purple-700">Comments</div>
                                </>
                            )}
                        </div>
                        <Divider className="mb-10" />
                        {viewReward ? (
                            <div className="flex justify-center">
                                <StickyBox className="self-start mx-12" offsetTop={100} offsetBottom={20}>
                                    <div className="text-xl mb-4">Available rewards</div>
                                    {project[0].rewards.map((r, idx) => (
                                        <Link to={'/project/' + id + '/#reward' + (idx + 1)} onClick={() => scrollReward(idx + 1)} key={idx}>
                                            <div className="mb-5 cursor-pointer hover:bg-gray-100 p-2 rounded-xl">
                                                <div className="text-lg font-bold">{r.tier}</div>
                                                <div className="flex">
                                                    <div className="font-bold">${r.price.toString()}</div>
                                                    {BigInt(r.quantity) > 1 ? (
                                                        <div className="ml-3">{r.quantity.toString()} items included</div>
                                                    ) : (
                                                        <div className="ml-3">{r.quantity.toString()} item included</div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </StickyBox>
                                <div className="flex-col z-0">
                                    {project[0].rewards.map((r, idx) => (
                                        <>
                                            <div className="flex mx-12 mb-12 row" id={'reward' + (idx + 1)} key={idx}>
                                                <Card className="p-4">
                                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                        <Image
                                                            className="object-cover"
                                                            src={r.image}
                                                            width={200}
                                                        />
                                                    </CardHeader>
                                                    <CardBody className="overflow-visible pt-14">
                                                        <div className="flex justify-between">
                                                            <p className="uppercase font-bold text-lg">{r.tier}</p>
                                                            <p className="uppercase text-lg">${r.price.toString()}</p>
                                                        </div>
                                                        {BigInt(r.quantity) > 1 ? (
                                                            <small className="text-default-500">{r.quantity.toString()} items included</small>
                                                        ) : (
                                                            <small className="text-default-500">{r.quantity.toString()} item included</small>
                                                        )}
                                                        <Button color="secondary" className="w-auto text-base mt-6">Fund ${r.price.toString()}</Button>
                                                    </CardBody>
                                                </Card>
                                                <div className="text-lg px-12">{r.description}</div>
                                            </div >
                                            {idx + 1 != project[0].rewards.length && (
                                                <Divider className="my-10" />
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center mb-12">
                                <div className="bg-gray-100 border-2">
                                    {comments?.map((c, idx) => (
                                        <Card className="min-w-[800px] m-5">
                                            <CardHeader className="flex gap-3">
                                                <Image
                                                    height={40}
                                                    radius="sm"
                                                    src={c?.user.profile}
                                                    width={40}
                                                    className="object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <p className="text-md">{c?.user.name}</p>
                                                    <p className="text-small text-default-500">{timeAgo(c?.timestamp)}</p>
                                                </div>
                                            </CardHeader>
                                            <Divider />
                                            <CardBody>
                                                <p className="text-md">{c.content}</p>
                                            </CardBody>
                                            <Divider />
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                }
            </div>
        </div >
    );
}

export default ProjectDetail;