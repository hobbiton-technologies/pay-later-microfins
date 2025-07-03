import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, CircularProgress } from "@mui/material";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface FormValues {
  username: string;
  password: string;
}

const SignInForm = () => {
  const { login } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    username: Yup.string().min(2).required("username is required"),
    password: Yup.string()
      .min(2, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      setError(null);

      try {
        await login(formik.values);
      } catch (err) {
        setError("Login failed. Please check your credentials.");
        console.log(err);
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }

      // redirect('/');
    },
  });

  const hasError = (field: keyof FormValues) =>
    formik.touched[field] && Boolean(formik.errors[field]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center ">
      <div className="relative w-full max-w-md p-8 rounded-lg shadow-sm bg-white/10 backdrop-blur-md border border-white/20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm items-center justify-center text-center">
          {/* Lipila-Later MicroFins Portal */}
          <div className=" ">
            <div className="md:pl-22 flex items-center   gap-2 justify-start mb-2 ml-4 mt-4">
              <img
                src="../../../public/images/lipilaLater.png"
                alt="logo"
                style={{ width: "60%" }}
              />
            </div>
          </div>

          <h2 className="mt-5 text-center text-sm font-medium leading-5 tracking-tight text-gray-700">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-2">
                <TextField
                  id="username"
                  name="username"
                  type="text"
                  size="small"
                  required
                  autoComplete="username"
                  className="w-full rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-2 py-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  error={hasError("username")}
                  helperText={
                    hasError("username") ? formik.errors.username : ""
                  }
                  fullWidth
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-2">
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  size="small"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-2 py-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={hasError("password")}
                  helperText={
                    hasError("password") ? formik.errors.password : ""
                  }
                  fullWidth
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center items-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-blue-900 transition duration-300 ease-in-out"
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            <div className="text-sm flex justify-start">
              <Link to="/ForgotPassword">
                <h1 className="font-semibold text-[#711850/90] hover:text-blue-400 transition duration-200 ease-in-out">
                  Forgot password?
                </h1>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <motion.div
        className="w-full h-full min-h-10 text-[10px] text-black flex justify-center items-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        © 2025 Hobbiton. All Rights Reserved.
      </motion.div>
    </div>
  );
};

export default SignInForm;
