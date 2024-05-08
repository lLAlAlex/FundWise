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
      className={`w-full h-[180px] md:w-[240px] md:h-auto hover:scale-105 overflow-hidden shadow-sm shadow-gray-300 bg-black ${props.className}`}
      key={project.id}
    >
      <CardHeader className="absolute z-10 top-0 flex-col items-start bg-gray-600/50 p-1 md:p-3">
        <p className="text-tiny text-white/60 uppercase font-bold hidden sm:block">
          {project.description}
        </p>
        <h4 className="text-black font-medium lg:text-2xl text-tiny">
          {project.name}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Project Image"
        className="z-0 w-full h-full object-cover"
        src={`${project.image}`}
      />
      <CardFooter
        className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 
        flex flex-col md:flex-row 
        justify-end md:justify-between 
        p-1 md:p-3"
      >
        <div className="hidden md:block">
          <p className="text-white text-tiny">
            {project.deadline.toString()} days left
          </p>
          <p className="text-white text-tiny">
            {project.progress.toString()}% Funded
          </p>
        </div>
        <Link
          href={'/project/' + project.id.toString()}
          className="text-tiny md:text-base text-blue-600 hover:text-blue-500 transition-colors ease-linear"
        >
          Detail
        </Link>
      </CardFooter>
    </Card>
  );
}
