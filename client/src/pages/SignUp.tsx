import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import OAuth from "../components/OAuth";

const SignUp = () => {
  type User = {
    username: string;
    email: string;
    password: string;
  };

  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", user);
      if (res.data.success === false) {
        setError(res.data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/signin");
    } catch (error: any) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }

    // setLoading(true);
    // const res = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });
    // const data = await res.json();
    // if (data.success === false) {
    //   setLoading(false);
    //   setError(data.message);
    // } else {
    // setLoading(false);
    // navigate("/signin");
    // }
  };

  return (
    <div>
      <PageHeader pageTitle="Sign Up" />
      <div className="container mt-8 p-3 max-w-2xl mx-auto flex flex-col gap-10 items-center">
        <div className="text-center">
          <h2 className="font-bold text-2xl">Create an account</h2>
          <span>
            Unlock endless real estate opportunities by signing up now!
          </span>
        </div>

        <OAuth />

        <span className="text-gray-400 font-semibold -my-8">Or :</span>

        <form
          className="flex flex-col space-y-3 w-full"
          onSubmit={handleSubmit}
        >
          <input
            value={user.username}
            className="border p-3 rounded-md focus:outline-none"
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            value={user.email}
            className="border p-3 rounded-md focus:outline-none"
            type="email"
            placeholder="Email"
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            value={user.password}
            className="border p-3 rounded-md focus:outline-none"
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className="p-3 rounded-md bg-purple-900 font-semibold text-white"
            type="submit"
          >
            {loading ? "Signing Up.." : "Sign Up"}
          </button>
          <p className="text-red-600">{error}</p>
        </form>
        <span>
          Already have an account?{"  "}
          <Link to="/signin" className="text-purple-900 font-bold">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
