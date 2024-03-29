import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

let socket;

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
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
    const [search, setSearch] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth();

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
      };
      getProjects();
    }, [auth]);
  
  useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL);
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
        setAlert({});

      } catch (error) {
        navigate("/projects")
        setAlert({
          msg: error.response.data.msg,
          error: true
        });

        setTimeout(() => {
          setAlert({});
        }, 3000);

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

        setAlert({});
        setModalFormTask(false);

        //Socket io
        socket.emit("new task", data);
        
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
    
        setAlert({});
        setModalFormTask(false);

        //socket
        socket.emit("edit task", data);

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
        
        setModalDeleteTask(false);

        socket.emit("delete task", task);

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
     
     const handleDeleteCollaborator = (collaborator) => {
       setModalDeleteCollaborator(!modalDeleteCollaborator);
       setCollaborator(collaborator);
     };
     
     const deleteCollaborator = async() => {
       try {
         const token = localStorage.getItem("token");
         if (!token) return;

         const config = {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         };

         const { data } = await axiosClient.post(
           `/projects/delete-collaborator/${project._id} `,
           { id: collaborator._id },
           config
         );

         const projectUpdate = { ...project }
         projectUpdate.collaborators = projectUpdate.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id);

         setProject(projectUpdate);

         setAlert({
           msg: data.msg,
           error: false
         });

         setCollaborator({});
         setModalDeleteCollaborator(false);

         setTimeout(() => {
           setAlert({});
         }, 3000);

       } catch (error) {
         console.log(error);
       }
     }
     
     const completeTask = async(id) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient.post(`/task/state/${id}`, {}, config);

        setTask({});
        setAlert({});

        //socket
        socket.emit("completed task", data);

      } catch (error) {
        console.log(error.response);
      }
     }
     
     const handleSearch = () => {
      setSearch(!search);
     }
     
     //socket io
     const submitTaskProject = (task) => {
      
       // add task to the state
       const updateProject = { ...project };
       updateProject.tasks = [...updateProject.tasks, task];
       setProject(updateProject);
     }
     
     const deleteTaskProject = task => {
      
      const updateProject = { ...project };
      updateProject.tasks = updateProject.tasks.filter(
        (taskState) => taskState._id !== task._id
      );
      setProject(updateProject);
     }
     
     const editTaskProject = task => {
      
      const updateProject = { ...project };
      updateProject.tasks = updateProject.tasks.map((taskState) =>
        taskState._id === task._id ? task : taskState
      );
      setProject(updateProject);
     }
     
    const changeStateTask = task => {
       
      const projectUpdate = { ...project };
      projectUpdate.tasks = projectUpdate.tasks.map((taskState) =>
        taskState._id === task._id ? task : taskState
      );
      setProject({ projectUpdate });
     };
     
     const logOutProjects = () => {
       setProjects([]);
       setProject({});
       setAlert({});
     }


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
          modalDeleteCollaborator,
          handleDeleteCollaborator,
          deleteCollaborator,
          completeTask,
          handleSearch,
          search,
          submitTaskProject,
          deleteTaskProject,
          editTaskProject,
          changeStateTask,
          logOutProjects
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


