import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsPlusCircleFill } from "react-icons/bs";
import { useRef } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  removeError,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signout,
} from "../redux/user/userSlice";
import UserListing from "../components/UserListing";
import { FaUserEdit } from "react-icons/fa";
import Statistics from "../components/Statistics";

type UserProps = {
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
};

const Profile = () => {
document.title = "My Profile";

  const { currentUser, error } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const picture = useRef<HTMLInputElement>(null);
  const [showListings, setShowListings] = useState(false);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState<string>("");

  const [successMsg, setSuccessMsg] = useState(false);
  const [formData, setFormData] = useState<UserProps>({
    profilePicture: currentUser.profilePicture,
  });

  const [deleteAccountMsg, setDeleteAccountMsg] = useState(false);

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const fileName = new Date().getTime() + file?.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
        console.log("Upload is " + progress + "% done");
      },
      (error: Error) => {
        // console.log(error.message);
        setFileUploadError(error.message);
      },
      () => {
        // console.log("Upload complete");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          // console.log("File available at", downloadURL);
          // currentUser.profilePicture = downloadURL;
          dispatch(
            updateUserSuccess({ ...currentUser, profilePicture: downloadURL })
          );
          setFormData({ ...formData, profilePicture: downloadURL });
          // console.log(formData);
        });
        setUploading(false);
        setProgress(0);
      }
    );
  };

  // console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(
        `/api/user/update/${currentUser.id}`,
        formData
      );
      console.log(res);
      if (res.status === 200) {
        dispatch(updateUserSuccess(res.data));
        setSuccessMsg(true);
        setTimeout(() => {
          setSuccessMsg(false);
        }, 3000);
        return;
      } else {
        dispatch(updateUserFailure(res.data.message));
        setTimeout(() => {
          dispatch(removeError());
        }, 3000);
      }
    } catch (error: any) {
      dispatch(updateUserFailure(error.response.data.message));
      setTimeout(() => {
        dispatch(removeError());
      }, 3000);
    }
  };

  const confirmDelete = () => {
    setDeleteAccountMsg(true);
  };

  const deleteAccount = async () => {
    try {
      const res = await axios.delete(`/api/user/delete/${currentUser.id}`);
      dispatch(deleteUserStart());
      console.log(res.data.message);
      dispatch(deleteUserSuccess());
      navigate("/signin");
    } catch (error: any) {
      dispatch(deleteUserFailure(error.response.data.message));
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.post("/api/auth/signout");
      dispatch(signout());
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col gap-8 pb-20">
      <div className="w-full pt-24 pb-4 bg-gray-200 my-profile-bg">
        
        <div className="container flex flex-col md:flex-row justify-between items-start gap-4 md:items-center p-2 mx-auto max-w-screen-xl ">
          <div className="flex gap-2 md:gap-4 items-center">
            <div className="relative">
              <img
                src={
                  currentUser.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                alt="profile"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gray-300"
                style={uploading ? { filter: "blur(2px)" } : {}}
              />
              <div
                className="absolute bottom-0 right-0 rounded-full p-1 text-white border border-gray-300 cursor-pointer backdrop-blur-sm	"
                onClick={() => picture.current?.click()}
              >
                {currentUser.profilePicture ? (
                  <FaUserEdit size={18} />
                ) : (
                  <BsPlusCircleFill size={18} />
                )}
              </div>
              {!fileUploadError && (
                <p className="text-red-500">{fileUploadError}</p>
              )}

              {uploading && (
                <div className="absolute -bottom-2 w-full flex flex-col gap-2 bg-slate-200">
                  <div
                    className="bg-purple-700 h-1"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-3xl font-semibold">
                {currentUser.username}
              </span>
              <span className="text-gray-400 text-sm md:text-base">{currentUser.email}</span>
            </div>
          </div>

          <div className="">
            <div className="flex flex-wrap justify-end gap-2 text-sm">
              <button
                type="button"
                onClick={confirmDelete}
                className="text-white bg-red-600 p-1 px-2 rounded-md focus:outline-none"
              >
                Delete Account
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-white bg-black p-1 px-2 rounded-md focus:outline-none"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container p-3 max-w-screen-xl mx-auto flex flex-col gap-10">
        <Statistics />
        
        <div className="flex flex-col-reverse gap-16 md:grid md:grid-cols-2 md:gap-8 w-full">
          <div className="flex flex-col gap-4 items-start">
            <h2 className="text-xl text-gray-600 font-semibold">Update info</h2>

            <form
              className="flex flex-col space-y-3 w-full"
              onSubmit={handleSubmit}
            >
              <input
                className="border p-3 rounded-md focus:outline-none"
                type="text"
                placeholder="Username"
                id="username"
                defaultValue={currentUser.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <input
                className="border p-3 rounded-md focus:outline-none text-gray-500"
                type="email"
                placeholder="Email"
                id="email"
                disabled
                defaultValue={currentUser.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                className="border p-3 rounded-md focus:outline-none"
                type="password"
                placeholder="Password"
                id="password"
                value={currentUser.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <input
                ref={picture}
                type="file"
                accept=".png, .jpeg"
                name="file"
                id="file"
                hidden
                onChange={(e) => setFile(e.target.files![0])}
              />
              <div className="flex gap-2 justify-end">
                <button
                  disabled={uploading}
                  className="bg-black hover:bg-gray-900 text-white p-2 px-8 rounded-md"
                >
                  {uploading ? "Uploading..." : "Update"}
                </button>
              </div>

              {successMsg && (
                <span className="text-green-500">Updated successfully</span>
              )}
              {error && <span className="text-red-500">{error}</span>}
            </form>
          </div>

          <div className="flex flex-col gap-4 items-start">
            <div className="flex justify-between w-full">
              <h2 className="text-xl text-gray-600 font-semibold">
                My Listings
              </h2>
              <span
                className=" cursor-pointer"
                onClick={() => setShowListings(!showListings)}
              >
                {showListings ? (
                  <button type="button" className="text-gray-400 bg-white px-2 border border-gray-400 rounded-sm">
                    - Hide
                  </button>
                ) : (
                  <button type="button" className="text-gray-400 bg-white px-2 border border-gray-400 rounded-sm">
                    + Show
                  </button>
                )}
              </span>
            </div>
              <UserListing id={currentUser.id} />
          </div>
        </div>
      </div>

      {deleteAccountMsg && (
        <div className="fixed inset-0 h-screen bg-black bg-opacity-80 flex gap-3 justify-center items-center z-40">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete your account?
            </h2>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setDeleteAccountMsg(false)}
                className="bg-gray-200 p-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                className="bg-red-600 text-white p-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
