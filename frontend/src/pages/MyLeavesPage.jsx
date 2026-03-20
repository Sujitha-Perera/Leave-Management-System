import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyLeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await API.get("/leave/my");
        setLeaves(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch leaves");
      }
    };
    fetchLeaves();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: "badge badge-pending",
      APPROVED: "badge badge-approved",
      REJECTED: "badge badge-rejected",
    };
    return badges[status] || "badge";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h1 className="!mt-6 text-center !text-2xl font-bold mb-2 gradient-text">
            My Leave Requests
          </h1>
          <p className="text-center text-gray-600">Track and manage your leave requests</p>
        </div>

      
        {error && (
          <div className="alert alert-error mb-6 max-w-2xl">
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

        
        <div className="card shadow-lg-card overflow-hidden">
          {leaves.length > 0 ? (
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td className="font-semibold">
                        {new Date(leave.start_date).toLocaleDateString()}
                      </td>
                      <td className="font-semibold">
                        {new Date(leave.end_date).toLocaleDateString()}
                      </td>
                      <td>{leave.reason}</td>
                      <td>
                        <span className={getStatusBadge(leave.status)}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">No leave requests found</p>
              <a
                href="/leave/create"
                className="mx-auto mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md"
              >
                Create Your First Request
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
