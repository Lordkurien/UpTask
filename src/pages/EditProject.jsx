import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import FormProject from "../components/FormProject";

const EditProject = () => {
    const params = useParams();
    const { getProject, project, loading } = useProjects();

    useEffect(() => {
      getProject(params.id);
    }, []);

    const { name } = project;

    if(loading) return (
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <h1 className="font-black text-4xl">Edit: {name}</h1>
        <div className="mt-10 flex justify-center">
          <FormProject />
        </div>
      </>
    );
};

export default EditProject
