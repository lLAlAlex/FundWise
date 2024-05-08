import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Link,
} from '@nextui-org/react';
import { Project } from '@/declarations/project_backend/project_backend.did';
import { redirect } from 'react-router-dom';

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  project: Project;
  className?: string;
}

export default function ProjectCard(props: Props) {
  const { project } = props;

  const handleRedirect = (projectID: string) => {
    return redirect('/project/' + projectID)
  }

  return (
    <Card
      isFooterBlurred
      className={`w-full h-[240px] lg:h-[360px] lg:w-[220px] hover:scale-105 overflow-hidden shadow-sm shadow-gray-300 bg-gray-800 ${props.className}`}
      key={project.id}
    >
      <CardHeader className="absolute z-10 top-0 flex-col items-start bg-gray-600/50 p-1 md:p-3">
        <div className="text-sm text-white/60 uppercase font-bold hidden sm:block py-1">
          {project.description}
        </div>
        <div className="text-black font-medium lg:text-lg text-base">
          {project.name}
        </div>
      </CardHeader>
      <Image
        removeWrapper
        alt="Project Image"
        className="z-0 w-full h-full object-cover"
        src={`${project.image}`}
      />
      <CardFooter
        className="absolute bg-black/5 bottom-0 border-t-1 border-zinc-100/50 z-10 
        flex flex-col md:flex-row 
        justify-end md:justify-between 
        p-1 md:p-3"
      >
        <div className="hidden md:block">
          <p className="text-gray-400 text-sm">
            {project.deadline.toString()} days left
          </p>
          <p className="text-gray-400 text-sm">
            {project.progress.toString()}% Funded
          </p>
        </div>
        <Link
          href={'/project/' + project.id.toString()}
          className="text-lg text-white hover:text-blue-500 transition-colors ease-linear"
        >
          Detail
        </Link>
      </CardFooter>
    </Card>
  );
}
