import { useState, useEffect, createContext, useContext } from "react";
import axiosClient from "../config/axiosClient";
import PropTypes from "prop-types";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState([]);

    const showAlert = (alert) => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({}); 
        }, 3000);
    };

    const submitProject = async (project) => {
        console.log(project);
    };

    return (
      <ProjectsContext.Provider
        value={{ projects, showAlert, alert, submitProject }}
      >
        {children}
      </ProjectsContext.Provider>
    );
};

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
    ProjectsProvider
}

export default ProjectsContext;


