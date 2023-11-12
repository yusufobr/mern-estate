import { useSelector } from "react-redux";
import { BsPlusCircleFill } from "react-icons/bs";
import { useRef } from "react";

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const picture = useRef<HTMLInputElement>(null);

  return (
    <div className="container mt-8 p-3 max-w-2xl mx-auto flex flex-col gap-6 items-center">
      <h1 className="font-bold text-3xl">Profile</h1>
      <div className="relative">
        <img
          src={currentUser.profilePicture || "https://via.placeholder.com/150"}
          alt="profile"
          className="w-24 h-24 rounded-full"
        />
        <div
          className="absolute bottom-0 border-2 border-white right-0 rounded-full text-purple-700 cursor-pointer"
          onClick={() => picture.current?.click()}
        >
          <BsPlusCircleFill size={20} />
        </div>
      </div>
      <form className="flex flex-col space-y-3 w-full">
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="text"
          placeholder="Username"
          id="username"
          value={currentUser.username}
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="email"
          placeholder="Email"
          id="email"
          value={currentUser.email}
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="password"
          placeholder="Password"
          id="password"
          value={currentUser.password}
        />
        <input
          ref={picture}
          type="file"
          accept=".png, .jpeg"
          name="file"
          id="file"
          className="hidden"
        />
        <button className="bg-purple-700 text-white p-3 rounded-md">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
