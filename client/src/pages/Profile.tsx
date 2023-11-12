import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsPlusCircleFill } from "react-icons/bs";
import { useRef } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const picture = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
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
        console.log("Upload is " + progress + "% done");
        setProgress(Math.round(progress));
      },
      (error: Error) => {
        // console.log(error.message);
        setFileUploadError(error.message);
      },
      () => {
        // console.log("Upload complete");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          // console.log("File available at", downloadURL);
          currentUser.profilePicture = downloadURL;
          setFormData({ ...formData, profilePicture: downloadURL });
        });
        setUploading(false);
        setProgress(0);
      }
    );
  };

  return (
    <div className="container mt-8 p-3 max-w-2xl mx-auto flex flex-col gap-6 items-center">
      <h1 className="font-bold text-3xl">Profile</h1>
      <div className="relative">
        <img
          src={currentUser.profilePicture || "https://via.placeholder.com/150"}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover"
          style={uploading ? { filter: "blur(2px)" } : {}}
        />
        <div
          className="absolute bottom-0 border-2 border-white right-0 rounded-full text-purple-700 cursor-pointer"
          onClick={() => picture.current?.click()}
        >
          <BsPlusCircleFill size={20} />
        </div>
        {!fileUploadError && <p className="text-red-500">{fileUploadError}</p>}

        {uploading && (
          <div className="absolute -bottom-2 w-full flex flex-col gap-2 bg-slate-200">
            <div
              className="bg-purple-700 h-1"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
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
          hidden
          onChange={(e) => setFile(e.target.files![0])}
        />
        <button className="bg-purple-700 text-white p-3 rounded-md">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
