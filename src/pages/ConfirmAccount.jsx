import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/user/confirm/${id}`;
        const { data } = await axiosClient(url);

        setAlert({
          msg: data.msg,
          error: false
        });

        setAccountConfirmed(true);

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
    };

    confirmAccount();
    
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-5xl capitalize">
        Confirm your
        <span className="text-5xl block text-slate-800"> Account</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-lg bg-white">
        {msg && <Alert alert={alert} />}

        {accountConfirmed && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Sign In
          </Link>
        )}
      </div>
    </>
  );
}

export default ConfirmAccount
