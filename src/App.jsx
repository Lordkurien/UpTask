import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";
import AddCollaborator from "./pages/AddCollaborator";

import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route
              path="/"
              element={<AuthLayout />}
            >
              <Route
                index
                element={<Login />}
              />
              <Route
                path="register"
                element={<Register />}
              />
              <Route
                path="forget-password"
                element={<ForgetPassword />}
              />
              <Route
                path="forget-password/:token"
                element={<NewPassword />}
              />
              <Route
                path="confirm/:id"
                element={<ConfirmAccount />}
              />
            </Route>

            <Route
              path="/projects"
              element={<ProtectedRoute />}
            >
              <Route
                index
                element={<Projects />}
              />

              <Route
                path="new-project"
                element={<NewProject />}
              />

              <Route
                path="add-collaborator/:id"
                element={<AddCollaborator />}
              />

              <Route
                path=":id"
                element={<Project />}
              />

              <Route
                path="edit/:id"
                element={<EditProject />}
              />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App

