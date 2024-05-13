import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, Reward } from '@/declarations/project_backend/project_backend.did';
import Search from '@/components/ui/search/Search';
import { CheckboxGroup, Pagination } from '@nextui-org/react';
import { project_backend } from '@/declarations/project_backend';
import GridLayout from '@/components/layout/grid/GridLayout';
import ProjectCard from '@/components/cards/projects/ProjectCard';
import { CustomCheckbox } from '@/components/ui/CustomCheckbox';


const categoryArray = ["Health", "Sport", "Fashion", "Food", "Technology"];

function ProjectPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [projects, setProjects] = useState<Project[]>([]);
  const [groupSelected, setGroupSelected] = useState<string[]>([]);

  async function fetchProjects(search: string, filter: string[], page: number) {
    try {
      setProjects([]);
      const result = await project_backend.getAllProjects([search], [[...filter]], BigInt(page));
      console.log(result)
      if ('ok' in result) {
        if (result.ok.projects.length != 0) {
          setProjects(result.ok.projects);
          setTotalPage(Number(result.ok.totalPage))
        }
      } else {
        console.error('Error fetching projects:', result.err);
      }
    } catch (error) {
      console.log(error)
      // console.error('Error fetching projects:', error);
    }
  }
  const handleSearch = () => {
    // do something with search
    setPage(1);
    fetchProjects(search, groupSelected, page)
  };

  const handleFilter = (filter: string[]) => {
    setGroupSelected(filter)
    setPage(1);
    fetchProjects(search, filter, page);
  }

  useEffect(() => {
    if (page > 0) {
      fetchProjects("", [], page);
    }
  }, [page]);

  // useEffect(() => {
  //   const fetchTotalPages = async () => {
  //     const res = await project_backend.getTotalProjectCount();
  //     setTotalPage(Math.ceil(Number(res) / 20))
  //   }

  //   fetchTotalPages()
  // }, [])


  return (
    <>
      <div className="w-full mb-5 mt-12">
        <div className="max-w-[1200px] w-9/12 mx-auto">
          <Search
            value={search}
            handleChange={(v) => setSearch(v)}
            onSubmit={handleSearch}
          />
          <div className="flex flex-col my-3 w-full">
            <CheckboxGroup
              className="gap-1"
              orientation="horizontal"
              value={groupSelected}
              onChange={(value: string[]) => handleFilter(value)}
            >
              {categoryArray.map((c, i) => (
                <CustomCheckbox value={c} key={i}>{c}</CustomCheckbox>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center w-full'>
        <GridLayout>
          {projects.map((p, idx) => (
            <ProjectCard project={p} key={idx} />
          ))}
        </GridLayout>
        <div className="py-4 w-full flex justify-center">
          {!search && ( 
            <Pagination
              total={totalPage}
              initialPage={1}
              color="secondary"
              page={page}
              onChange={(n) => setPage(n)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
