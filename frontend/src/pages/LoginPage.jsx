import { useState, useEffect } from "react";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuccessMessage(location.state.successMessage);
      // Auto-clear success message after 5 seconds
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
    if (location.state?.email) {
      setForm((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/login", form);
      login(res.data.token, res.data.user);

      if (res.data.user.role === "MANAGER") {
        navigate("/dashboard");
      } else {
        navigate("/leave/my");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 text-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold gradient-text">Leave Management</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="card shadow-lg-card p-8">
          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success mb-6">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {successMessage}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="alert alert-error mb-6 text-center">{error}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-center ">
              <button
                type="submit"
                className="px-8 py-4 min-w-35 text-lg font-semibold text-white rounded-lg bg-linear-to-r from-blue-600 to-purple-600 shadow-md hover:opacity-90 transition"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="!mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
