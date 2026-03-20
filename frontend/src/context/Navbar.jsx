import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Leave <span className="text-blue-800">Management</span>
        </Link>

        
        {user && (
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700 text-base">
            {user.role === "EMPLOYEE" && (
              <>
                <Link
                  to="/leave/create"
                  className="hover:text-blue-500 transition duration-200"
                >
                  Request Leave
                </Link>
                <Link
                  to="/leave/my"
                  className="hover:text-blue-500 transition duration-200"
                >
                  My Leaves
                </Link>
              </>
            )}

            {user.role === "MANAGER" && (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-500 transition duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/leave/all"
                  className="hover:text-blue-500 transition duration-200"
                >
                  All Requests
                </Link>
              </>
            )}
          </nav>
        )}

       
        <div className="flex items-center gap-4">
          {!user ? (
            <>
            
              <Link
                to="/login"
                className="inline-flex min-w-32 items-center justify-center px-6 py-2.5 rounded-lg bg-blue-300 text-black! font-bold hover:bg-blue-100 transition duration-200 shadow"
              >
                Login
              </Link>

              
              <Link
                to="/signup"
                className="inline-flex min-w-32 items-center justify-center px-6 py-2.5 rounded-lg bg-blue-300 text-center text-black! font-bold hover:bg-blue-100 transition duration-200 shadow"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {user.full_name?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.full_name}
                </span>
              </div>

              
              <button
                onClick={handleLogout}
                className="inline-flex min-w-32 items-center justify-center px-6 py-2.5 rounded-lg bg-blue-300 text-black! font-bold hover:bg-blue-100 transition duration-200 shadow"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
