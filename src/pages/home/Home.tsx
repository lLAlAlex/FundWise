import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { project_backend } from "../../declarations/project_backend";
import { Container } from "@/components/ui/Container";
import { BackgroundContainer } from "@/components/ui/BackgroundContainer";
import HeroHome from "@/components/section/HeroHome";
import AboutHome from "@/components/section/AboutHome";
import CategoriesHome from "@/components/section/CategoriesHome";
import { StarsIllustration } from "@/components/Stars";

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
  const [categories, setCategories] = useState(['Developer & IT','AI Services','Design & Creative','Sales & Marketing']);

  useEffect(() => {
    const seedProjects = async () => {
      try {
        const size = await project_backend.getProjectsSize();
        console.log(await project_backend.getAllProjects());

        console.log(size)
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
    <BackgroundContainer>
      <Container>
        <HeroHome/>
      </Container>
      <AboutHome/>
      <CategoriesHome/>
    </BackgroundContainer>
  );
};

export default Home;
