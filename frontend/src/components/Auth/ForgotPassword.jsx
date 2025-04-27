import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

function ForgotPassword() {
  const navigate = useNavigate();

  const handleForgotPassword = async (values) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, values);
      toast.success('Password reset link sent to your email 🎉');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed ❌');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Forgot Password</h2>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleForgotPassword}
        >
          <Form className="space-y-4">
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded w-full"
            >
              Reset Password
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
