import { useEffect } from "react";
import useProjects from "../hooks/useProjects"
import PreviewProject from "../components/PreviewProject";
import Alert from "../components/Alert";

const Projects = () => {
  const { projects, alert } = useProjects();

  const { msg } = alert;
  
  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>

      {msg && <Alert alert={alert} />}
      
      <div data-cy="list-projects" className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject
              key={project._id}
              project={project}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No Projects
          </p>
        )}
      </div>
    </>
  );
}

export default Projects;
