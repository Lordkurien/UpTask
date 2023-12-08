import useProjects from "../hooks/useProjects"
import PreviewProject from "../components/PreviewProject";

const Projects = () => {
  const { projects } = useProjects();
  
  return (
    <>
      <h1 className="text-4xl font-black">Projects de ale</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject
              key={project._id}
              project={project}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay proyectos
          </p>
        )}
      </div>
    </>
  );
}

export default Projects
