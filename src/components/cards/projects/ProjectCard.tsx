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
    <Link 
      href={'/project/' + project.id.toString()}
      className="group"
      >
      <Card
        isFooterBlurred
        className={`w-full h-[240px] lg:h-[360px] lg:w-[240px] hover:scale-105 cursor-pointer overflow-hidden shadow-lg bg-tranparent-black border border-tranparent-black ${props.className}`}
        key={project.id}
      >
        <Image
          removeWrapper
          alt="Project Image"
          className="z-0 w-full h-full object-cover"
          src={`${project.image}`}
        />
        <CardFooter
          className="absolute bg-gray-800/50 bottom-0 border-t-1 border-zinc-100/50 z-10 
          lg:h-1/4 md:h-1/3 group-hover:h-full group-hover:gap-y-2 duration-500 flex flex-col p-3 text-white items-start"
        >
          <div className='xl:text-md md:text-sm font-bold'>
            {project.name}
          </div>
          <div className='hidden group-hover:block xl:text-md md:text-sm text-gray-200'>
            {project.description}
          </div>
          <div className="text-end w-full h-full flex flex-col justify-end">
            <p className="text-gray-50 xl:text-sm md:text-xs">
              {project.progress.toString()}% Funded
            </p>
            <p className="text-gray-50 xl:text-sm md:text-xs">
              {project.deadline.toString()} days left
            </p>
          </div>
            
        </CardFooter>
      </Card>
    </Link>
  );
}
