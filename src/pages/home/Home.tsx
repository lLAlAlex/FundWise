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
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Reward } from "@/declarations/project_backend/project_backend.did";

type ProjectInputSchema = {
  name: string;
  description: string;
  category: string;
  image: string;
  deadline: string;
  goal: bigint;
  company_id: string;
  rewards: Reward[];
};

// const rewards: Reward[] = [
//   { tier: 'Bronze', price: BigInt(100) },
//   { tier: 'Silver', price: BigInt(200) },
//   { tier: 'Gold', price: BigInt(300) },
// ];

function Home() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<ProjectInputSchema[]>([]);
  const [categories, setCategories] = useState(['Developer & IT', 'AI Services', 'Design & Creative', 'Sales & Marketing']);

  useEffect(() => {
    // const seedProjects = async () => {
    //   try {
    //     const size = await project_backend.getProjectsSize();
    //     console.log(await project_backend.getAllProjects());

    //     if (size < 1) {
    //       const seedData: ProjectInputSchema[] = [
    //         { name: 'Startup 1', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '1', goal: BigInt(60000), rewards: rewards },
    //         { name: 'Startup 2', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '2', goal: BigInt(60000), rewards: rewards },
    //         { name: 'Startup 3', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '3', goal: BigInt(60000), rewards: rewards },
    //         { name: 'Startup 4', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '4', goal: BigInt(60000), rewards: rewards },
    //         { name: 'Startup 5', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '5', goal: BigInt(60000), rewards: rewards },
    //         { name: 'Startup 6', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '6', goal: BigInt(60000), rewards: rewards },
    //       ];
    //       setProjects(seedData);

    //       projects.map(p => {
    //         project_backend.createProject(p);
    //       });
    //     }
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }
    // seedProjects();

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
