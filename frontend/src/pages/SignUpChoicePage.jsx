import { useNavigate } from "react-router-dom";

export default function SignUpChoicePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-2xl">
       
        <div className="mb-12 text-center">
          <div className="inline-block p-4 bg-linear-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your role to get started
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         
          <div
            onClick={() => navigate("/signup/employee")}
            className="card shadow-lg-card hover-lift cursor-pointer transition-all duration-300 group border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
              Employee
            </h3>
            <p className="text-gray-600 mb-4">
              Sign up as an employee to request and manage your leave
              applications
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Request leave</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Track leave status</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>View leave history</span>
              </div>
            </div>
            <div className="flex justify-center !mt-4" >
            <button className="mx-auto px-8 py-4 min-w-50 text-lg font-semibold text-white rounded-lg bg-linear-to-r from-blue-600 to-purple-600 shadow-md hover:opacity-90 transition">
              Sign Up as Employee
            </button>
            </div>
          </div>

         
          <div
            onClick={() => navigate("/signup/manager")}
            className="card shadow-lg-card hover-lift cursor-pointer transition-all duration-300 group border-2 border-transparent hover:border-purple-500"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
              Manager
            </h3>
            <p className="text-gray-600 mb-4">
              Sign up as a manager to review and approve employee leave requests
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Review leave requests</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Approve/Reject leaves</span>
              </div>
              <div className="flex items-center gap-2 ">
                <span className="text-green-500">✓ </span>
                <span>Manage employees</span>
              </div>
            </div>
            <div className="flex justify-center !mt-4" >
            <button className="mx-auto px-8 py-4 min-w-50 text-lg font-semibold text-white rounded-lg bg-linear-to-r from-blue-600 to-purple-600 shadow-md hover:opacity-90 transition">
              Sign Up as Manager
            </button>
            </div>  
          </div>
        </div>

      <p className="!mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign In
        </button>
      </p>
      </div>
    </div>
  );
}
