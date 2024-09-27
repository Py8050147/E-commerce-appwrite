/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const accountCreate = async (data) => {
    setError(""); // Clear any previous errors
    try {
      const userData = await authService.createAccount(data);
      console.log(userData)
      if (userData) {
        const userData = await authService.getCurrentUser();
        console.log(userData)
        if (userData) dispatch(login(userData));
          navigate("/login");
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      setError(error.message || "Failed to create account. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">Sign up to create an account</h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(accountCreate)} className="space-y-6">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter your full name"
              aria-label="Full name"
              {...register("name", { required: "Full name is required" })}
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address",
                }
              })}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Enter your password"
              aria-label="Password"
              {...register("password", { required: "Password is required" })}
              className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
