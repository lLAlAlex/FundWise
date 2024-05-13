import React, { useEffect, useState } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Features } from "../ui/Features";
import { project_backend } from "@/declarations/project_backend";
import { Project } from "@/declarations/project_backend/project_backend.did";
import GridLayout from "../layout/grid/GridLayout";
import ProjectCard from "../cards/projects/ProjectCard";

const TopProjects = () => {
    const project_actor = project_backend;
    const [topProjects, setTopProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchTopProjects = async () => {
            const res = await project_actor.getAllProjectsNoFilter()
            if ('ok' in res) {
                const projects = res.ok;

                const sortedProjects = projects.slice().sort((a, b) => {
                    const progressRatioA = (parseInt(a.progress.toString()) / parseInt(a.goal.toString())) * 100;
                    const progressRatioB = (parseInt(b.progress.toString()) / parseInt(b.goal.toString())) * 100;

                    return progressRatioB - progressRatioA;
                });
                const top4Projects = sortedProjects.slice(0, 4);
                setTopProjects(top4Projects);
            }
        }
        fetchTopProjects();
    }, []);

    return (
        <div id="about" className="relative">
            <h2 className="text-gradient mb-32 translate-y-[40%] text-center text-6xl [transition:transform_1000ms_cubic-bezier(0.3,_1.17,_0.55,_0.99)_0s] md:text-8xl [.is-visible_&]:translate-y-0">
                Top Projects
            </h2>
            <div className='flex flex-col items-center w-full'>
                <GridLayout>
                    {topProjects.map((p, idx) => (
                        <ProjectCard project={p} key={idx} />
                    ))}
                </GridLayout>
            </div>
            <hr className="my-[3.2rem] h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.1)_50%,transparent)]" />
        </div>
    );
};

export default TopProjects;
