import { useEffect } from "react";
import useProjects from "../hooks/useProjects";
import FormCollaborator from "./FormCollaborator";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const AddCollaborator = () => {
    const { getProject, project, collaborator, loading, addCollaborator, alert } = useProjects();
    const params = useParams();

    useEffect(() => {
      getProject(params.id);
    }, [])

    if (!project?._id) return <Alert alert={alert} />
    
  return (
    <>
      <h1 className="text-4xl font-black">
        Add New Team Member to Project {project.name}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormCollaborator />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        collaborator?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow ">
              <h2 className="text-center mb-10 text-2xl font-bold ">
                Results:{" "}
              </h2>
              <div className="flex justify-between items-center">
                <p> {collaborator.name} </p>

                <button
                  onClick={() => addCollaborator({
                    email: collaborator.email
                  })}
                  type="button"
                  className="bg-slate-500 hover:bg-black rounded-lg px-5 py-2 uppercase text-white font-bold text-sm"
                >
                  Add to the Project
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default AddCollaborator;
