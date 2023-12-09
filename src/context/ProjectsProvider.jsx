import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      const getProjects = async () => {
        try {
           const token = localStorage.getItem("token");
           if (!token) return;

           const config = {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
          };
          
          const { data } = await axiosClient("/projects", config);
          setProjects(data);
          
        } catch (error) {
          console.log(error);
        }
      }
      getProjects();

    }, [])
  
    const showAlert = (alert) => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({}); 
        }, 3000);
    };

    const submitProject = async (project) => {
      if (project.id) {
          await editProject(project);
      } else {
          await newProject(project);
      }
    };
    
    const editProject = async(project) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient.put(
          `/projects/${project.id}`,
          project,
          config
        );

        // Sync state
        const updatedProject = projects.map((projectState) =>
          projectState._id === data._id ? data : projectState
        );
        setProjects(updatedProject);

        //show alert
        setAlert({
          msg: " Your project has been updated",
          error: false,
        });

        //redirect
        setTimeout(() => {
          setAlert({});
          navigate("/projects");
        }, 3000);

      } catch (error) {
        console.error("Error fetching projects:", error.response || error);
      }
    };
    
  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/projects", project, config);
      setProjects([...projects, data]);

      setAlert({
        msg: "New project has been created",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
    
    const getProject = async (id) => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient(`/projects/${id}`, config);
        setProject(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <ProjectsContext.Provider
        value={{ projects, showAlert, alert, submitProject, getProject, project, loading }}
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


