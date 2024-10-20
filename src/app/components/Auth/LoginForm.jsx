import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setTokens } from "../../../redux/authSlice";
import jwt from "jsonwebtoken";
import CircularLoader from "../../helpers/Loaders"; // Import your CircularLoader component

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

export default function LoginForm({ toggleForm }) {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Inside your onSubmit function
  //  const onSubmit = async (data) => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/users/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setServerError(errorData.error || "An error occurred. Please try again.");
  //       toast.error(serverError);
  //       return;
  //     }
  //     const responseData = await response.json();
  //     console.log('Response Data:', responseData);
  //     const { accessToken, refreshToken } = responseData; // Destructure tokens
  //     console.log('Access Token:', accessToken);
  //     console.log('Refresh Token:', refreshToken);
  //     dispatch(setTokens({ accessToken, refreshToken }));
  //     toast.success("Logged in successfully!");
  //     // setTimeout(() => {
  //     //   window.location.href = "/";
  //     // }, 2000);
  //   } catch (error) {
  //     setServerError("An error occurred. Please try again.");
  //     toast.error(serverError);
  //   }
  // }; 

  const onSubmit = async (data) => {
    try {
      setLoading(true); // Start loading
      // const response = await fetch("http://localhost:8000/api/users/login", {
      const response = await fetch("http://jobite-backend.vercel.app/api/users/login", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerError(
          errorData.error || "An error occurred. Please try again."
        );
        setLoading(false); // Stop loading on error
        toast.error(serverError);
        return;
      }
      const { accessToken, refreshToken } = await response.json();
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      if (!accessToken) {
        throw new Error("Access token is undefined.");
      }
      const decoded = jwt.decode(accessToken); // Use jwt.decode here
      console.log("Decoded Token:", decoded);
      const userRole = decoded?.role || null; // Optional chaining with fallback

      const payload = {
        accessToken,
        refreshToken,
        userRole,
      };

      console.log("DispatchingsetTokenswithpayload:", payload);

      dispatch(setTokens(payload));

      toast.success("Logged in successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error(error);
      setServerError("An error occurred. Please try again.");
      toast.error(serverError);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="w-full max-w-md px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-8">
          Please enter your details
        </p>
        <h3 className="text-2xl font-bold mb-6">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex items-center justify-center"
              type="submit"
              disabled={loading} // Disable button when loading
            >
              {/* Show loader when loading, otherwise show 'Login' */}
              {loading ? (
                <CircularLoader variant="dotted" size="sm" color="white" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <p className="text-center mt-6">
          Dont have an account?{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-black font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
