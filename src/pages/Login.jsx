import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true
      });
      return
    }

    try {
      const { data } = await axiosClient.post("/user/login", { email, password });
      setAlert({});
      localStorage.setItem("token", data.token);
      setAuth(data);

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-6xl capitalize">
        Manage your
        <span className="text-6xl text-slate-800"> Projects</span>
      </h1>

      {msg && <Alert alert={alert}/>}

      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registration Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Write your Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Sign In"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >
          Don&apos;t have an account? Register now
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forget-password"
        >
          Forget my password
        </Link>
      </nav>
    </>
  );
}

export default Login
