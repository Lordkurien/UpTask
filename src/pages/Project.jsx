import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";
import ModalFormTask from "../components/ModalFormTask";
import ModalDeleteTask from "../components/ModalDeleteTask";
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator";
import Collaborator from "../components/Collaborator";
import Task from "../components/Task";
import Alert from "../components/Alert";
import io from "socket.io-client";

let socket;

const Project = () => {
  const params = useParams();
  const {
    getProject,
    project,
    loading,
    handleModalTask,
    alert,
    submitTaskProject,
    deleteTaskProject,
    editTaskProject,
    changeStateTask,
  } = useProjects();
  const admin = useAdmin();

  useEffect(() => {
    getProject(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("open project", params.id);
  }, [])

  useEffect(() => {
    socket.on("task added", newTask => {
      if (newTask.project === project._id) {
        submitTaskProject(newTask);
      }
    });

    socket.on("delete task", (deleteTask) => {
      if (taskDelete.project === project._id) {
        deleteTaskProject(deleteTask);
      }
    });

    socket.on("edit task", editedTask => {
      if (editedTask.project === project._id) {
        editTaskProject(editedTask);
      }
    });

    socket.on("new state", newStateTask => {
      if (newStateTask.project._id === project._id) {
        changeStateTask(newStateTask);
      }
    });

  })

  const { name } = project;
  const { msg } = alert;

  if (loading)
    return (
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
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>

        {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <Link
              className="uppercase font-bold"
              to={`/projects/edit/${params.id}`}
            >
              Edit
            </Link>
          </div>
        )}
      </div>

      {admin && (
        <button
          onClick={handleModalTask}
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-600 transition-colors text-white text-center mt-5 flex gap-2 items-center justify-center"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          New Task
        </button>
      )}

      <p className="font-bold mt-10 text-xl">Project Tasks</p>

      <div className="bg-white shadow rounded-lg mt-10 font-bold">
        {project.tasks?.length ? (
          project.tasks?.map((task) => (
            <Task
              key={task._id}
              task={task}
            />
          ))
        ) : (
          <p className="text-center my-5 p-10 text-xl">
            There are no tasks in this project
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between">
            <p className="font-bold mt-10 text-xl">Team members</p>
            <Link
              className="text-gray-400 hover:text-black uppercase font-bold"
              to={`/projects/add-collaborator/${project._id}`}
            >
              Add
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg mt-10 font-bold">
            {project.collaborators?.length ? (
              project.collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))
            ) : (
              <p className="text-center my-5 p-10 text-xl">
                There are no Collaborators in this project
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormTask />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </>
  );
};

export default Project;
