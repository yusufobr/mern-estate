import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';

const Header = () => {
  const {currentUser} = useSelector((state: any) => state.user);
  console.log(currentUser);

  return (
    <header className="container mx-auto p-3 bg-slate-200">
      <div className="grid grid-cols-2 mx-auto items-center max-w-6xl">
        <div>
          <Link to="/">
            <div className="text-purple-700 uppercase font-bold">logo</div>
          </Link>
        </div>

        <div className="flex justify-between w-full items-center">
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
            <ul className="flex gap-3 text-slate-700 items-center">
              <Link to="/">
                <li className="hidden md:block cursor-pointer hover:text-slate-500">
                  Home
                </li>
              </Link>
              <Link to="/about">
                <li className="hidden md:block cursor-pointer hover:text-slate-500">
                  About
                </li>
              </Link>
              {!currentUser ? (
                <>
                  <Link to="/signin">
                    <li className="cursor-pointer hover:text-slate-500">Sign In</li>
                  </Link>
                  <Link to="/signup">
                    <li className="cursor-pointer hover:text-slate-500">Sign Up</li>
                  </Link>
                </>
              ) : (
                <Link to="/profile">
                  <img src={currentUser.profilePicture || "https://via.placeholder.com/150"} alt="profile" className="w-8 h-8 rounded-full" />
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
