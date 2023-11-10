import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  type User = {
    email: string;
    password: string;
  };

  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signin", user);
      if (res.data.success === false) {
        setError(res.data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }

  };

  return (
    <div className="container mt-8 p-3 max-w-2xl mx-auto flex flex-col gap-6 items-center">
      <h1 className="font-bold text-3xl">Sign In</h1>
      <form className="flex flex-col space-y-3 w-full" onSubmit={handleSubmit}>
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
          {loading ? "Signing In.." : "Sign In"}
        </button>
        <p className="text-red-600">{error}</p>
      </form>
      <span>
        Dont have an account?{"  "}
        <Link to="/signup" className="text-purple-900 font-bold">
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default SignIn;
