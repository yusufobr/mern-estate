import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container mx-auto p-3 bg-slate-200">
      <div className="flex justify-between mx-auto items-center max-w-6xl">
        <Link to="/">
        <div className="text-purple-700 uppercase font-bold">logo</div>
        </Link>

        <form className="bg-slate-100 p-2 rounded-md">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent w-24 sm:w-64 focus:outline-none"
          />
          <button type="submit" className="bg-transparent">
            <FaSearch className="text-purple-700" />
          </button>
        </form>
        
        <nav className="">
          <ul className="flex gap-3 text-slate-700">
            <Link to="/">
            <li className="hidden md:block cursor-pointer hover:text-slate-500">Home</li>
            </Link>
            <Link to="/about">
            <li className="hidden md:block cursor-pointer hover:text-slate-500">About</li>
            </Link>
            <Link to="/signin">
            <li className="cursor-pointer hover:text-slate-500">Sign In</li>
            </Link>
            {/* <li>Profile</li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
