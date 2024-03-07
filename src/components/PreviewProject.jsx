import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, client, creator } = project;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">

      <div className="flex items-center gap-2 ">
        <p className="flex-1">
          {name}
          <span className="text-sm text-gray-500 uppercase">
            {""} {client}
          </span>
        </p>

        {auth._id !== creator &&
          <p className="p-1 text-sm rounded-lg text-white bg-green-500 font-bold ">Collaborator</p>}
      </div>

      <Link
        className="text-gray-600 hover:text-gray-800 font-bold text-sm uppercase"
        to={`${_id}`}
      >
        View Project
      </Link>
    </div>
  );
   
};

PreviewProject.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
  }).isRequired,
};
export default PreviewProject;

