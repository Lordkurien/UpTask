import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-5xl capitalize">
        Regain your access
        <span className="text-3xl block text-slate-800">
          and don&apos;t lose your projects
        </span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
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
            placeholder="Choose your Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Send Instructions"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Do you Have an account? Sign In
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >
          Don&apos;t have an account? Register now
        </Link>
      </nav>
    </>
  );
}

export default ForgetPassword
