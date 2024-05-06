import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/declarations/project_backend/project_backend.did';
import Search from '@/components/ui/search/Search';
import { Pagination } from '@nextui-org/react';
import useAuthentication from '@/hooks/auth/get/useAuthentication';
import { project_backend } from '@/declarations/project_backend';
import GridLayout from '@/components/layout/grid/GridLayout';
import ProjectCard from '@/components/cards/projects/ProjectCard';
// export interface Project {
//     'id' : string,
//     'name' : string,
//     'description' : string,
//     'reviews_ids' : Array<string>,
//     'deadline' : bigint,
//     'progress' : bigint,
//     'timestamp' : Time,
//     'category' : string,
//     'image' : string,
//     'company_id' : string,
//   }

const dummy: Project[] = [
  {
    id: 'asd',
    name: 'asd',
    description: 'lorem ipsum asdasdasdad',
    reviews_ids: [],
    deadline: BigInt(1231233132),
    progress: BigInt(1),
    // timestamp: new Date(),
    category: 'ASdasd',
    company_id: 'asdasd',
    image: 'https://picsum.photos/200/300',
    timestamp: BigInt(12124124),
  },
  {
    id: 'asd2',
    name: 'asd',
    description: 'lorem ipsum asdasdasdad',
    reviews_ids: [],
    deadline: BigInt(1231233132),
    progress: BigInt(1),
    // timestamp: new Date(),
    category: 'ASdasd',
    company_id: 'asdasd',
    image: 'https://picsum.photos/200/300',
    timestamp: BigInt(12124124),
  },
  {
    id: 'asd2',
    name: 'asd',
    description: 'lorem ipsum asdasdasdad',
    reviews_ids: [],
    deadline: BigInt(1231233132),
    progress: BigInt(1),
    // timestamp: new Date(),
    category: 'ASdasd',
    company_id: 'asdasd',
    image: 'https://picsum.photos/300/300',
    timestamp: BigInt(12124124),
  },
  {
    id: 'asd3',
    name: 'asd',
    description: 'lorem ipsum asdasdasdad',
    reviews_ids: [],
    deadline: BigInt(1231233132),
    progress: BigInt(1),
    // timestamp: new Date(),
    category: 'ASdasd',
    company_id: 'asdasd',
    image: 'https://picsum.photos/400/300',
    timestamp: BigInt(12124124),
  },
  // {
  //   id: 'asd4',
  //   name: 'asd',
  //   description: 'lorem ipsum asdasdasdad',
  //   reviews_ids: [],
  //   deadline: BigInt(1231233132),
  //   progress: BigInt(1),
  //   // timestamp: new Date(),
  //   category: 'ASdasd',
  //   company_id: 'asdasd',
  //   image: 'https://picsum.photos/200/300',
  //   timestamp: BigInt(12124124),
  // },
];

function ProjectPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(0);
  const { userStatus } = useAuthentication();
  const [projects, setProjects] = useState<Project[]>(dummy);

  const handleSearch = () => {
    // do something with search

    if (search) {
      // ....
    }
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const result = await project_backend.getAllProjects();

        if ('ok' in result) {
          setProjects(result.ok);
        } else {
          console.error('Error fetching projects:', result.err);
        }
      } catch (error) {
        console.log(error)
        // console.error('Error fetching projects:', error);
      }
    }
    fetchProjects();
  }, []);

  return (
    <>
      <div className="w-full mb-5">
        <div className="max-w-[1200px] w-9/12 mx-auto">
          <Search
            value={search}
            handleChange={(v) => setSearch(v)}
            onSubmit={handleSearch}
          />
        </div>
      </div>

      <GridLayout>
        {projects.map((p, idx) => (
          <ProjectCard project={p} key={idx}/>
        ))}
      </GridLayout>
      <div className="py-4">
        <Pagination
          total={10}
          initialPage={1}
          color="primary"
          page={page}
          onChange={setPage}
        />
      </div>
    </>
  );
}

export default ProjectPage;
  