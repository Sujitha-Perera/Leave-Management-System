import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className=" !mt-4 min-h-screen bg-linear-to-br from-slate-50 to-slate-100 px-4 py-6 flex items-center justify-center">
      <div className="w-full max-w-3xl card shadow-card">
  
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 gradient-text">
            Manager Dashboard
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Welcome back. Use quick links below to review leave requests and
            manage employees faster.
          </p>
        </div>

      
        <div className="!mt-4 rounded-xl bg-slate-50 p-4 shadow-sm  border-blue-600 text-center">
          <h2 className="!mt-2 text-xl font-bold mb-2">Quick Actions</h2>
          <p className="text-gray-500 text-sm mb-3 text-center">
            Choose an action to continue.
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm text-center">
              <div className="mb-2">
                <h3 className="text-sm font-bold mb-1">Review Requests</h3>
                <p className="text-gray-600 text-xs">
                  Approve or reject pending leave applications.
                </p>
              </div>
              <Link
                to="/leave/all"
                className="inline-flex items-center justify-center min-w-[180px] px-6 py-3 rounded-lg bg-blue-400 !text-black text-sm font-semibold shadow-md hover:bg-blue-200 hover:shadow-lg transition duration-200 mx-auto !important"
              >
                Open Requests
              </Link>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm text-center">
              <div className="mb-2">
                <h3 className="text-sm font-bold mb-1">Add Employee</h3>
                <p className="text-gray-600 text-xs">
                  Create a new employee account with role access.
                </p>
              </div>
              <Link
                to="/employees/create"
                className="!mb-2 inline-flex items-center justify-center min-w-[180px] px-6 py-3 rounded-lg bg-blue-400 !text-black text-sm font-semibold shadow-md hover:bg-blue-200 hover:shadow-lg transition duration-200 mx-auto !important"
              >
                Create Employee
              </Link>
            </div>
          </div>
        </div>
      
        </div>


      
    </div>
  );
}
