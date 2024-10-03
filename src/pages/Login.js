import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data: users } = await axios.get("http://localhost:3001/users");
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (err) {
      toast.error("Login error", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Login</button>
        </form>
        <div className="mt-2">
          <span>don't have an account?</span>
          <Link to="/signup">signUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
