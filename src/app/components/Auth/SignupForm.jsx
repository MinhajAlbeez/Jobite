import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setTokens } from "../../../redux/authSlice";
import CircularLoader from "../../helpers/Loaders"; // Import your CircularLoader component

const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
  role: z.enum(["seeker", "recruiter"], {
    errorMap: () => ({ message: "Please select a user type" }),
  }),
});

export default function SignupForm({ toggleForm }) {
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      // const response = await fetch("http://localhost:8000/api/users/signup", {
      const response = await fetch("http://jobite-backend.vercel.app/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerError(
          errorData.error || "An error occurred. Please try again."
        );
        setLoading(false); // Stop loading if there's an error
        toast.error(serverError);
        return;
      }

      const loginResponse = await fetch(
        "http://localhost:8000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email, password: data.password }),
        }
      );

      const loginData = await loginResponse.json();
      dispatch(
        setTokens({
          accessToken: loginData.accessToken,
          refreshToken: loginData.refreshToken,
        })
      );

      reset();
      toast.success("Signed up and logged in successfully!");
    } catch (error) {
      setServerError("An error occurred. Please try again.");
      toast.error(serverError);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="w-full max-w-md px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          Create an Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join us to start your journey
        </p>
        <h3 className="text-2xl font-bold mb-6">Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-sm text-red-600 mt-1">
                {errors.username.message}
              </span>
            )}
          </div>
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
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">User Type</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("role")}
            >
              <option value="">Select user type</option>
              <option value="seeker">Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
            {errors.role && (
              <span className="text-sm text-red-600 mt-1">
                {errors.role.message}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex items-center justify-center"
              type="submit"
              disabled={loading} 
            >
              {loading ? (
                <CircularLoader variant="dotted" size="sm" color="white" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <p className="text-center mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-black font-semibold hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
}
