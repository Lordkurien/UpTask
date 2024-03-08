import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Search from "./Search";

const Header = () => {
  const { handleSearch } = useProjects();

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>
        <input
          type="text"
          placeholder="Search Project"
          className="rounded-lg lg:w-96 block p-2 border"
        />
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            className="font-bold uppercase"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>

          <Link
            to="/projects"
            className="font-bold uppercase"
          >
            Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
          >
            Log out
          </button>

          <Search />
        </div>
      </div>
    </header>
  );
}

export default Header
