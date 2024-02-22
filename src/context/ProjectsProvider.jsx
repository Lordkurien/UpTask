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
    const [modalFormTask, setModalFormTask] = useState(false);
    const [task, setTask] = useState({});
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [collaborator, setCollaborator] = useState({});

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
        setAlert({
          msg: error.response.data.msg,
          error: true
        });

      } finally {
        setLoading(false);
      }
    };
    
    const deleteProject = async(id) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        };

        const { data } = await axiosClient.delete(`/projects/${id}`, config);

        // sync state
        const updatedProjects = projects.filter(stateProject => stateProject._id !== id);
        setProjects(updatedProjects);

        setAlert({
          msg: data.msg,
          error: false
        })

        setTimeout(() => {
          setAlert({})
          navigate("/projects")
        }, 3000);

      } catch (error) {
        console.log(error);
      }
    };
    
    const handleModalTask = () => {
      setModalFormTask(!modalFormTask);
      setTask({});
    }
    
    const taskSubmit = async(task) => {
      if (task?.id) {
        await editTask(task);
      } else {
        await createTask(task);
      }
    }
    
    const createTask = async task => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient.post("/task", task, config);

        // add task to the state
        const updateProject = { ...project };
        updateProject.tasks = [...project.tasks, data];
        setProject(updateProject);
        setAlert({});
        setModalFormTask(false);
        
      } catch (error) {
        console.log(error);
      }
    }
    
    const editTask = async task => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient.put(`/task/${task.id}`, task, config);
        console.log(data);

        const updateProject = { ...project }
        updateProject.tasks = updateProject.tasks.map(taskState => taskState._id === data._id ? data : taskState);
        setProject(updateProject);

        setAlert({});
        setModalFormTask(false);
      } catch (error) {
        console.log(error);
      }
    }
    
    const handleModalEditTask = (task) => {
      setModalFormTask(true);
      setTask(task);
    }
    
    const handleModalDeleteTask = (task) => {
      setTask(task);
      setModalDeleteTask(!modalDeleteTask);
    }
    
    const deleteTask = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient.delete(`/task/${task._id}`, config);
        
        setAlert({
          msg: data.msg,
          error:false
        });
        
        const updateProject = { ...project };
        updateProject.tasks = updateProject.tasks.filter(taskState => taskState._id !== task._id)
        
        setProject(updateProject);
        setModalDeleteTask(false);
        setTask({});

        setTimeout(() => {
          setAlert({});
        }, 3000);
        
      } catch (error) {
        console.log(error);
      }
    }
    
     const submitCollaborator = async (email) => {
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

         const { data } = await axiosClient.post("/projects/collaborators", { email }, config);
         
         setCollaborator(data);
         setAlert({});

       } catch (error) {
         
         setAlert({
           msg: error.response.data.msg,
           error: true,
         });

         setTimeout(() => {
           setAlert({});
         }, 3000);
       }

       setLoading(false);
     };
    
     const addCollaborator = async (email) => {
       try {
         const token = localStorage.getItem("token");
         if (!token) return;

         const config = {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         };

         const { data } = await axiosClient.post(`/projects/collaborators/${project._id} `, email, config);

         setAlert({
           msg: data.msg,
           error: false,
         });

         setCollaborator({});

         setTimeout(() => {
           setAlert({});
         }, 3000);

       } catch (error) {
         
         setAlert({
           msg: error.response.data.msg,
           error: true,
         });

         setTimeout(() => {
           setAlert({});
         }, 3000);
       }
     };

    return (
      <ProjectsContext.Provider
        value={{
          projects,
          showAlert,
          alert,
          submitProject,
          getProject,
          project,
          loading,
          deleteProject,
          modalFormTask,
          handleModalTask,
          taskSubmit,
          handleModalEditTask,
          task,
          handleModalDeleteTask,
          modalDeleteTask,
          deleteTask,
          submitCollaborator,
          collaborator,
          setCollaborator,
          addCollaborator,
        }}
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


