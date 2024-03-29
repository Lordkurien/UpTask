import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return
            }

            const config = {
                Headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient("/user/profile", config);
                setAuth(data);
                
                if (data._id && location.pathname === "/") {
                  navigate("/proyectos");
                }
                
            } catch (error) {
                setAuth({})
            }

            setLoading(false);
        };

        authenticateUser();
    }, []);

    const logOutAuth = () => {
        setAuth({});
    }

    return (
      <AuthContext.Provider value={{ setAuth, auth, loading, logOutAuth }}>
        {children}
      </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };

export default AuthContext;