import { project_backend } from "@/declarations/project_backend";
import { Project } from "@/declarations/project_backend/project_backend.did";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ProjectState = Project[] | undefined;

function ProjectDetail() {
    const actor = project_backend;
    const [project, setProject] = useState<ProjectState>();

    const params = useParams();
    const id = JSON.stringify(params.id).replace(/"/g, '');

    useEffect(() => {
        const fetchProject = async () => {
            setProject(await actor.getProject(id));
        }
        fetchProject();
    }, [])

    return (
        <div>
            <div className="mt-10">
                {project && project.length > 0 &&
                    <div className="mt-10">{project[0].name}</div>
                }
            </div>
        </div>
    );
}

export default ProjectDetail;