import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PreviewProject = ({ project }) => {
  const { name, _id, client } = project;

    return (
        <div className="border-b p-5 flex">
            <p className="flex-1">
                {name}
                <span className="text-sm text-gray-500 uppercase">
                    {""} {client}
                </span>
            </p>
            <Link className="text-gray-600 hover:text-gray-800 font-bold text-sm uppercase" to={`${_id}`}>View Project</Link>
        </div>
    )
   
};

PreviewProject.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
  }).isRequired,
};
export default PreviewProject;

