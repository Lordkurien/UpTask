import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordChanged, setPasswordChanged] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
   
    const checkToken = async () => {
      try {
        await axios(`http://localhost:4000/api/user/forget-password/${token}`);
        setValidToken(true);

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
    }
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "Password must be at least 6 characters long",
        error: true
      });
      return
    }

    try {
      const url = `http://localhost:4000/api/user/forget-password/${token}`
      await axios.post(url, { password });

      setAlert({
        msg: "Password changed successfully",
        error: false
      });

      setPasswordChanged(true);
  
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-5xl capitalize">
        Don&apos;t lose your
        <span className="text-5xl block text-slate-800">Access</span>
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg p-10"
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Choose your new Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Save New Password"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {passwordChanged && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Sign In
        </Link>
      )}
    </>
  );
}

export default NewPassword
