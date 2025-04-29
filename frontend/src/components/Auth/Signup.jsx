import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

// Validation Schema for SignUp
const signupSchema = Yup.object({
  username: Yup.string()
    .min(3, "Minimum 3 characters required")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters required")
    .required("Password is required"),
});

function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,  // Ensure no extra slashes
        values
      );

      toast.success("Signup successful 🎉");
      resetForm();
      setTimeout(() => navigate("/login"), 1000); // Redirect to Login after signup
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Signup Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Create Account</h2>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={signupSchema}
            onSubmit={handleSignup}
          >
            <Form className="space-y-4">
              <div>
                <Field
                  name="username"
                  placeholder="Username"
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded w-full"
              >
                Sign Up
              </button>

              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </Form>
          </Formik>
        </div>

        {/* Task Flow Section */}
        <div className="bg-blue-50 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">How it Works?</h2>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                <span className="font-bold text-lg">1</span>
              </div>
              <p className="text-gray-600">Create your account to get started</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                <span className="font-bold text-lg">2</span>
              </div>
              <p className="text-gray-600">Manage your tasks, team, and projects</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
