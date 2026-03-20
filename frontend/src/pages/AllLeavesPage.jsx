import { useCallback, useEffect, useState } from "react";
import API from "../services/api";

export default function AllLeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await API.get("/leave");
      setLeaves(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch all leaves");
    }
  }, []);

  useEffect(() => {
    void fetchLeaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approveLeave = async (id) => {
    setLoadingId(id);
    try {
      const res = await API.put(`/leave/${id}/approve`);
      setMessage(res.data.message);
      fetchLeaves();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve leave");
    } finally {
      setLoadingId(null);
    }
  };

  const rejectLeave = async (id) => {
    setLoadingId(id);
    try {
      const res = await API.put(`/leave/${id}/reject`);
      setMessage(res.data.message);
      fetchLeaves();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reject leave");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: "badge badge-pending",
      APPROVED: "badge badge-approved",
      REJECTED: "badge badge-rejected",
    };
    return badges[status] || "badge";
  };

  return (
    <div className="!mt-4 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className=" text-center !text-1xl font-bold mb-2 gradient-text">
            Leave Requests
          </h1>
          <p className="text-center text-gray-600">
            Review and manage all employee leave requests
          </p>
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

        <div className="card shadow-lg-card overflow-hidden">
          {leaves.length > 0 ? (
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td className="font-semibold">{leave.user?.full_name}</td>
                      <td>{new Date(leave.start_date).toLocaleDateString()}</td>
                      <td>{new Date(leave.end_date).toLocaleDateString()}</td>
                      <td className="max-w-xs truncate">{leave.reason}</td>
                      <td>
                        <span className={getStatusBadge(leave.status)}>
                          {leave.status}
                        </span>
                      </td>
                      <td>
                        {leave.status === "PENDING" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveLeave(leave.id)}
                              disabled={loadingId === leave.id}
                              className="px-8 py-4 min-w-35 text-lg font-semibold text-white rounded-lg bg-linear-to-r from-blue-600 to-purple-600 shadow-md hover:opacity-90 transition disabled:opacity-60"
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => rejectLeave(leave.id)}
                              disabled={loadingId === leave.id}
                              className="px-8 py-4 min-w-35 text-lg font-semibold text-white rounded-lg bg-linear-to-r from-blue-600 to-purple-600 shadow-md hover:opacity-90 transition disabled:opacity-60"
                            >
                              ✕ Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">
                            No action
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">
                No leave requests at this time
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
