import { Features } from "@/components/ui/Features";
import { project_backend } from "@/declarations/project_backend";
import { Project } from "@/declarations/project_backend/project_backend.did";
import { Button, Divider, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StickyBox from "react-sticky-box";

type ProjectState = Project[] | undefined;

function ProjectDetail() {
    const actor = project_backend;
    const [project, setProject] = useState<ProjectState>();
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

    const handleViewReview = () => {
        setViewReward(false);
    }

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
                        {/* <div className="flex mt-10 justify-center">
                            <Button color="secondary" className="w-full text-lg mx-64">Fund this Project</Button>
                        </div> */}
                        <Divider className="mt-10" />
                        <div className="flex m-3 justify-center">
                            {viewReward ? (
                                <>
                                    <div className="text-lg cursor-pointer mx-10 text-purple-700">Reward</div>
                                    <div onClick={handleViewReview} className="text-lg cursor-pointer mx-10 hover:text-purple-700">Reviews</div>
                                </>
                            ) : (
                                <>
                                    <div onClick={handleViewReward} className="text-lg cursor-pointer mx-10 hover:text-purple-700">Reward</div>
                                    <div className="text-lg cursor-pointer mx-10 text-purple-700">Reviews</div>
                                </>
                            )}
                        </div>
                        <Divider className="mb-10" />
                        <div className="flex justify-center">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <div>Sidebar</div>
                            </StickyBox>
                            <div className="flex-col">
                                {project[0].rewards.map((r, idx) => (
                                    <div className="text-lg mx-12">Tes</div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProjectDetail;