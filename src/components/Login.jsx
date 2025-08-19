import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { connectSocket } from "../utils/socketSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();

  // Allow login page always
  if (!user?._id && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
 
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
          console.log(res.data)
      dispatch(addUser(res.data));
      dispatch(connectSocket(res.data._id)); // 🔗 Connect socket here
      console.log(res.data)
      return navigate("/");
    } catch (err) {
      console.log("Login Error:", err?.response?.data);
      setError(err?.response?.data || { error: "Something went wrong" });
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      console.log(res.data.data)
      return navigate("/formFillUp");
    } catch (err) {
      console.log("Signup Error:", err?.response?.data);
      setError(err?.response?.data || { error: "Something went wrong" });
    }
  };

  return (
    <> 
       <Navbar/>
       <div className="flex justify-center items-center min-h-screen bg-[#0e112e] px-4">
      <div className="w-full max-w-md bg-[#1e2561] text-white p-6 rounded-2xl shadow-lg relative">
        <button
          onClick={() => setIsLoginForm((prev) => !prev)}
          className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          <span className="text-3xl">💖</span>{" "}
          {isLoginForm ? "Welcome Back" : "Create Your Account"}
        </h2>

        {!isLoginForm && (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 mb-3 rounded bg-[#2c3374] text-white placeholder-gray-400 focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 mb-3 rounded bg-[#2c3374] text-white placeholder-gray-400 focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-4 py-2 mb-3 rounded bg-[#2c3374] text-white placeholder-gray-400 focus:outline-none"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        {/* Password Field with toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="w-full px-4 py-2 rounded bg-[#2c3374] text-white placeholder-gray-400 focus:outline-none pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 cursor-pointer text-xl text-gray-300"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {/* Confirm Password */}
        {!isLoginForm && (
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded bg-[#2c3374] text-white placeholder-gray-400 focus:outline-none pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 cursor-pointer text-xl text-gray-300"
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm text-center mb-2">
            {typeof error === "string"
              ? error
              : error?.error || "Something went wrong"}
          </p>
        )}

        <button
          onClick={isLoginForm ? handleLogin : handleSignUp}
          className="w-full py-2 mb-4 rounded bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition font-semibold"
        >
          {isLoginForm ? "Sign In" : "Create Account"}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-400"></div>
          <span className="mx-2 text-gray-300">or</span>
          <div className="flex-grow h-px bg-gray-400"></div>
        </div>

        <button className="w-full py-2 mb-3 rounded bg-[#2c3374] hover:bg-[#3d4689] transition flex items-center justify-center gap-2">
          <FaGithub size={18} /> Continue with GitHub
        </button>

        <button className="w-full py-2 rounded bg-[#2c3374] hover:bg-[#3d4689] transition flex items-center justify-center gap-2">
          <MdEmail size={18} /> Continue with Google
        </button>

        <p className="text-sm text-center text-pink-300 mt-6">
          {isLoginForm ? (
            <>
              Don’t have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setIsLoginForm(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setIsLoginForm(true)}
              >
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
      </div>
      <Footer/>
    
    
    </>
  
  );
};

export default Login;
