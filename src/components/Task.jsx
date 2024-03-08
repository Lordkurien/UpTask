import { FormatDate } from "../helpers/Date";
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";
import PropTypes from "prop-types";

const Task = ({ task }) => {
  const { handleModalEditTask, handleModalDeleteTask, completeTask } = useProjects();

  const { description, name, priority, createdAt, _id, state } = task;
  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-2 text-xl "> {name} </p>
        <p className="mb-2 text-sm text-gray-500 uppercase "> {description} </p>
        <p className="mb-2 text-gray-600 "> Priority: {priority} </p>
        <p className="mb-2 text-sm "> {FormatDate(createdAt)}</p>
        {state && task.completed && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Completed by: {task.completed.name}
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            onClick={() => handleModalEditTask(task)}
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >
            edit
          </button>
        )}

        <button
          onClick={() => completeTask(_id)}
          className={`${
            state ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >
          {state ? "Complete" : "Incomplete"}
        </button>

        {admin && (
          <button
            onClick={() => handleModalDeleteTask(task)}
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    priority: PropTypes.oneOf(["low", "middle", "high"]),
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    state: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Task;
