import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <div className="text-black p-4 bg-gray-50 backdrop-blur-sm bg-opacity-50">
      <div className="flex flex-col gap-2 items-center sm:grid sm:grid-cols-3">
        <span className="font-bold">@Real Estate | All Rights Reserved</span>

        <nav className="hidden sm:block ">
          <ul className="flex gap-3 font-semibold items-center justify-center">
            <Link to="/">
              <li className="cursor-pointer hover:text-slate-500">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="cursor-pointer hover:text-slate-500">
                About
              </li>
            </Link>
            {!currentUser && (
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
            )}
          </ul>
        </nav>

        <div className="flex gap-2 justify-end">
          <AiFillFacebook size={24} />
          <AiFillInstagram size={24} />
          <AiFillYoutube size={24} />
          <AiFillTwitterSquare size={24} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
