import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

// Validation Schema for Login
const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,  // Ensure no extra slashes
        values
      );

      // Store Token if Remember Me is checked
      if (values.rememberMe) {
        localStorage.setItem("token", res.data.token); // Store token in localStorage for "Remember Me"
      } else {
        sessionStorage.setItem("token", res.data.token); // Store token in sessionStorage otherwise
      }

      toast.success("Login successful 🎉");
      resetForm();
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect to Dashboard after login
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Login Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back!</h2>

          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            <Form className="space-y-4">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Remember Me Checkbox and Forgot Password Link in one line */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>

                {/* Forgot Password link */}
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded w-full"
              >
                Login
              </button>

              <div className="text-sm text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>

        {/* Optional: Right side motivational quote or image */}
        <div className="bg-blue-50 hidden md:flex flex-col items-center justify-center p-8">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Manage Your Tasks</h3>
          <p className="text-center text-gray-600">
            Organize your work, stay focused, and get things done efficiently!
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
