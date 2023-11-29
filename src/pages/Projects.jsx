import useProjects from "../hooks/useProjects"

const Projects = () => {
  const { projects } = useProjects();
  

  return (
    <>
      <h1 className="text-4xl font-black">Projects de ale</h1>

      <div className="">
        Projectos de ale 2 
      </div>
    </>
  )
}

export default Projects
