// import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import logo from "../assets/mern-estate-logo.svg";
import { CiHeart } from "react-icons/ci";

const Header = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  // const [isSticky, setIsSticky] = useState(false);
  // console.log(currentUser);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.pageYOffset;
  //     setIsSticky(scrollTop > 0);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <header className={`z-50 absolute top-0 w-full p-3`}>
      <div className="container p-2 flex justify-between md:justify-normal gap-2 md:gap-0 md:grid md:grid-cols-3 mx-auto items-center max-w-screen-xl backdrop-blur-sm bg-black bg-opacity-10 rounded-full">
        <div>
          <Link to="/">
            <div className="text-purple-700 uppercase font-bold">
              <img src={logo} alt="logo" className="w-32" />
            </div>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-3 text-white font-semibold items-center justify-center">
            <li className="hidden lg:block cursor-pointer hover:text-slate-500">
              <Link to="/home">Home</Link>
            </li>
            <li className="hidden lg:block cursor-pointer hover:text-slate-500">
              <Link to="/about">About</Link>
            </li>
            {/* {!currentUser ? (
              <>
                <Link to="/signin">
                  <li className="cursor-pointer hover:text-slate-500">
                    Sign In
                  </li>
                </Link>
                <Link to="/signup">
                  <li className="cursor-pointer hover:text-slate-500">
                    Sign Up
                  </li>
                </Link>
              </>
            ) : (
              <Link to="/profile">
                <img
                  src={
                    currentUser.profilePicture ||
                    "https://via.placeholder.com/150"
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
            )} */}
          </ul>
        </nav>

        {/* <form className="flex justify-between bg-slate-100 p-2 rounded-md">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent w-24 sm:w-64 focus:outline-none"
          />
          <button type="submit" className="bg-transparent">
            <FaSearch className="text-purple-700" />
          </button>
        </form> */}
        <div>
          {!currentUser ? (
            <div className="flex gap-4 text-white font-semibold justify-end">
              <Link to="/signup">
                <span className="cursor-pointer hover:text-slate-500">
                  Sign Up
                </span>
              </Link>
              <Link to="/signin">
                <span className="cursor-pointer text-black hover:text-slate-500 p-2 px-6 bg-white rounded-full">
                  Sign In
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 items-center justify-end">
              <Link title="Create New Listing" to="/create">
                <span className="cursor-pointer font-semibold px-4 p-2 rounded-full text-white bg-black hover:bg-gray-900 ">
                  Create
                </span>
              </Link>

              <Link title="Favorites" to="/favorites">
                <div className="cursor-pointer w-9 h-9 border-2 border-white text-gray-800 bg-gray-200 rounded-full flex flex-col justify-center items-center">
                  <CiHeart size={24} />
                </div>
              </Link>
              
              <Link title="Profile" to="/profile">
                <div className="bg-gray-200 rounded-full border-2 border-white">
                  <img
                    src={
                      currentUser.profilePicture ||
                      "https://via.placeholder.com/150"
                    }
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
