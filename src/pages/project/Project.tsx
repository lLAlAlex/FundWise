import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { project_backend } from '@/declarations/project_backend';
import { Project } from '@/declarations/project_backend/project_backend.did';
import useAuthentication from '@/hooks/auth/get/useAuthentication';
import { FaMagnifyingGlass, FaX } from 'react-icons/fa6';
import Search from '@/components/ui/search/Search';
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
    image: 'https://picsum.photos/200/300',
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
    image: 'https://picsum.photos/200/300',
    timestamp: BigInt(12124124),
  },
  {
    id: 'asd4',
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
];

function ProjectPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
//   const { userStatus } = useAuthentication();
  const [projects, setProjects] = useState<Project[]>(dummy);

  const handleSearch = () => {
    // do something with search

    if (search) {
      // ....
    }
  };

//   useEffect(() => {
//     console.log(userStatus)
//     if (userStatus === 'empty' || userStatus === undefined) {
//       navigate('/register');
//     }
//   }, [userStatus]);

//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         const result = await project_backend.getAllProjects();

//         if ('ok' in result) {
//           setProjects(result.ok);
//         } else {
//           console.error('Error fetching projects:', result.err);
//         }
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     }
//     fetchProjects();
//   }, []);

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

      <div className="flex flex-wrap justify-center max-w-[1300px] gap-5">
        {projects.map((p) => (
          <div
            className="max-w-[300px] bg-[#242526] border border-[#eceff133] rounded-lg shadow flex flex-col justify-center items-center cursor-pointer hover:scale-105 hover:bg-[#3A3B3C] duration-500"
            key={p.id}
          >
            <img
              className="rounded-t-lg bg-transparent max-w-[300px] pt-5"
              src={p.image}
              alt=""
            />
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  {p.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-400">{p.description}</p>
              <div className="flex justify-between items-end">
                <div className="flex flex-col pr-5">
                  <span className="font-normal text-sm text-gray-500 flex flex-wrap">
                    {p.deadline.toString()} days left
                  </span>
                  <span className="font-normal text-sm text-gray-500 flex flex-wrap">
                    {p.progress.toString()}% Funded
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 w-fit"
                >
                  Detail
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10 mt-7">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0 rounded-s-lg bg-[#242526] border-[#3A3B3C] text-gray-400 hover:bg-[#3A3B3C] hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight border bg-[#242526] border-[#3A3B3C] text-gray-400 hover:bg-[#3A3B3C] hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight border bg-[#242526] border-[#3A3B3C] text-gray-400 hover:bg-[#3A3B3C] hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight border bg-[#242526] border-[#3A3B3C] text-gray-400 hover:bg-[#3A3B3C] hover:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight border bg-[#242526] border-[#3A3B3C] text-gray-400 hover:bg-[#3A3B3C] hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight border bg-[#242526] border-[#3A3B3C] text-gray-400 hover:bg-[#3A3B3C] hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight border rounded-e-lg bg-[#242526] border-[#3A3B3C] text-gray-400 hover:bg-[#3A3B3C] hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default ProjectPage;
