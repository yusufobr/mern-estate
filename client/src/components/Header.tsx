import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [isSticky, setIsSticky] = useState(false);
  // console.log(currentUser);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`z-50 w-full p-3 bg-slate-200 ${
        isSticky ? "sticky top-0" : ""
      }`}
    >
      <div className="container p-2 grid grid-cols-3 mx-auto items-center max-w-screen-xl">
        <div>
          <Link to="/">
            <div className="text-purple-700 uppercase font-bold">logo</div>
          </Link>
        </div>

        <form className="flex justify-between bg-slate-100 p-2 rounded-md">
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
          <ul className="flex gap-3 text-slate-700 items-center justify-end">
            <Link to="/">
              <li className="hidden lg:block cursor-pointer hover:text-slate-500">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden lg:block cursor-pointer hover:text-slate-500">
                About
              </li>
            </Link>
            {!currentUser ? (
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
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
