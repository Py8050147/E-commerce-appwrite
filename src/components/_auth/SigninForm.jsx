import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";

function SigninForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const userLoginAccount = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      console.log(session)
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData)
          if (userData) dispatch(authLogin({userData}));
           navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full border border-red-600">
      <div
        className={`mx-auto mx-20 w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 my-32`}
      >
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(userLoginAccount)} className="mt-8">
          <div className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Enter your email...."
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              className={`w-full p-3 border ${
                error.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-blue-500`}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password...."
              className={`w-full p-3 border ${
                error.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-blue-500`}
              {...register("password", {
                required: true,
              })}
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Sign-in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninForm;
