import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { project_backend } from "../../declarations/project_backend";
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

const rewards: Reward[] = [
  { tier: 'Bronze', price: BigInt(100) },
  { tier: 'Silver', price: BigInt(200) },
  { tier: 'Gold', price: BigInt(300) },
];

function Home() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<ProjectInputSchema[]>([]);
  const [categories, setCategories] = useState(['Developer & IT', 'AI Services', 'Design & Creative', 'Sales & Marketing']);

  useEffect(() => {
    const seedProjects = async () => {
      try {
        const size = await project_backend.getProjectsSize();
        console.log(await project_backend.getAllProjects());

        if (size < 1) {
          const seedData: ProjectInputSchema[] = [
            { name: 'Startup 1', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '1', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 2', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '2', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 3', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '3', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 4', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '4', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 5', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '5', goal: BigInt(60000), rewards: rewards },
            { name: 'Startup 6', description: 'Tech Company', image: 'https://res.cloudinary.com/dogiichep/image/upload/v1714791015/fundwise_xfvrh5.png', category: 'Tech', deadline: "05-04-2025", company_id: '6', goal: BigInt(60000), rewards: rewards },
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
    <div className='bg-[#18191A] w-full text-white py-[110px] flex flex-col items-center'>
      <div className='w-3/5 my-20 mx-auto flex justify-between items-center'>
        <div className="flex flex-col">
          <h1 className="text-4xl font-serif">Home Fundwise Works</h1>
          <h3 className="text-md font-serif">Fund Fund Fundtek</h3>
          <Button color="secondary" variant="shadow" className="text-2xl">
            Get Started
          </Button>
        </div>
        <div>
          <img src="/assets/HomeIlustration.png" className="w-96" />
        </div>
      </div>

      <div className="flex w-3/5  my-20">
        <div className="w-full border rounded-lg shadow bg-[#242526] border-[#eceff133]">
          <div id="fullWidthTabContent" className="">
            <div className="p-4 rounded-lg md:p-8 bg-[#242526]" id="stats" role="tabpanel" aria-labelledby="stats-tab">
              <dl className="grid max-w-screen-xl gap-8 p-4 mx-auto grid-cols-3 text-white ">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">73M<span className="text-[#8E05C2]">+</span></dt>
                  <dd className="text-gray-400">Developers</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">100M<span className="text-[#8E05C2]">+</span></dt>
                  <dd className="text-gray-400">Public repositories</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">1000<span className="text-[#8E05C2]">s</span></dt>
                  <dd className="text-gray-400">Open source projects</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-3/5 my-20">
        <h1 className="text-2xl font-serif w-full">Browse Projects by category</h1>
        <div className="flex gap-10 my-10">
          {categories.map((category) => (
            <Card className="py-4 px-2 bg-[#242526] border-[#eceff133]">
              <CardHeader className="pb-0 pt-2 px-4 flex items-center">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="ms-2 text-sm font-bold text-white">4.95</p>
                </div>
                <small className="text-default-500 ml-3">1243 Projects</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2 ">
                <h4 className="font-bold text-large text-white">{category}</h4>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
