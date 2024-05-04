import React from "react";
import Header from "./components/ui/Header";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { project_backend } from "./declarations/project_backend";

type ProjectInputSchema = {
  name: string;
  description: string;
  category: string;
  image: string;
  deadline: bigint;
  company_id: string;
};

function Home() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<ProjectInputSchema[]>([]);

  useEffect(() => {
    const seedProjects = async () => {
      try {
        const size = await project_backend.getProjectsSize();
        // console.log(await project_backend.getAllProjects());

        if (size < 1) {
          const seedData: ProjectInputSchema[] = [
            { name: 'Startup 1', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('10'), company_id: '1' },
            { name: 'Startup 2', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '2' },
            { name: 'Startup 3', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '3' },
            { name: 'Startup 4', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '4' },
            { name: 'Startup 5', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '5' },
            { name: 'Startup 6', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '6' },
            { name: 'Startup 7', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '7' },
            { name: 'Startup 8', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '8' },
            { name: 'Startup 9', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '9' },
            { name: 'Startup 10', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '10' },
            { name: 'Startup 11', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '11' },
            { name: 'Startup 12', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: BigInt('20'), company_id: '12' }
          ];
          setProjects(seedData);

          projects.map(p => {
            project_backend.createProject(p);
          });
        }
      } catch (e) {
        console.error(e)
      }
    }
    seedProjects();

    // const deleteProjects = () => {
    //   try {
    //     projectsArray.map(p => {
    //       console.log(p)
    //     })
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }
    // deleteProjects();
  }, []);

  return (
    <div className=''>
      <Header />
      <main className='bg-[#18191A] w-full text-white py-[110px] flex flex-col items-center'>
        <div className='w-full mb-5'>
          Carousel
        </div>
      </main>
    </div>
  );
};

export default Home;
