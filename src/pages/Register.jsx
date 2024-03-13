import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true
      });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({
        msg: "Passwords are different",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: "Password must be at least 6 characters long",
        error: true,
      });
      return;
    }
    
    setAlert({})
    
    try {
      const { data } = await axiosClient.post(`/user`,
        {
          name,
          email,
          password,
        }
      );
      
      setAlert({
        msg: data.msg,
        error: false
      });

      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");

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
      <h1
        data-cy="title"
        className="text-sky-600 text-center font-black text-5xl capitalize"
      >
        Create your Account {""}
        <span className="text-3xl block text-slate-800">
          and start to manage your Projects
        </span>
      </h1>

      {msg && (
        <Alert
          alert={alert}
        />
      )}

      <form
        data-cy="new-account"
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Name
          </label>
          <input
            data-cy="name-input"
            id="name"
            type="text"
            placeholder="What's your name?"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            data-cy="email-input"
            id="email"
            type="email"
            placeholder="Choose your Email"
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
            data-cy="password-input"
            id="password"
            type="password"
            placeholder="Choose your Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repeat your Password
          </label>
          <input
            data-cy="repeat-password-input"
            id="password2"
            type="password"
            placeholder="Repeat your Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <input
          data-cy="submit-new-account"
          type="submit"
          value="Join Now"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          data-cy="link-login"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Do you Have an account? Sign In
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
};

export default Register;
