import { useState } from "react";
import API from "../services/api";

export default function CreateLeavePage() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await API.post("/leave", form);
      setMessage(res.data.message);
      setForm({ start_date: "", end_date: "", reason: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create leave");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl card shadow-lg-card hover-lift">
        <div className="card-header">
          <h2> Request Leave</h2>
        </div>

        {message && (
          <div className="alert alert-success mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card-body space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              placeholder="Enter the reason for your leave request..."
              value={form.reason}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-4 min-w-50! text-lg font-semibold text-white rounded-lg bg-linear-to-r from-blue-600 to-purple-600 shadow-md hover:opacity-90 transition"
            >
              Submit Leave Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
