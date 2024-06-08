import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '/src/firebase.js';

const Navbar = () => {
  const [user] = useAuthState(authInstance);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authInstance.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };
  return (
    <>
      {/* component */}
      <nav className="flex justify-between px-10 py-4 items-center bg-white">
        <h1 className="text-xl text-gray-800 font-bold" style={{ userSelect: "none" }}>
          DocFlow
        </h1>
        <div className="flex items-center">
          <ul className="flex items-center space-x-6">
            <li className="font-semibold text-gray-700">
              <Link to="/">Home</Link>
            </li>
            <li className="relative group font-semibold text-gray-700">
              <span className="cursor-pointer">Documents ▾</span>
              <ul className="absolute hidden space-y-2 bg-white border border-gray-300 text-gray-700 group-hover:block transition duration-300" style={{ width: "8rem" }}>
                <li style={{ marginLeft: "0.5rem" }}>
                  <Link to="/alldocs" className="hover:font-bold transition duration-200">All Docs</Link>
                </li>
                <li style={{ marginLeft: "0.5rem" }}>
                  <Link to="/documents" className="hover:font-bold transition duration-200">Your Docs</Link>
                </li>
              </ul>
            </li>
            <li className="font-semibold text-gray-700">
              <Link to="/logs">Logs</Link>
            </li>
            <li className="font-semibold text-gray-700">
              <Link to="/chat">Chat</Link>
            </li>
            {user ? (
              <li className="border square-full" style={{ padding: "2px 10px", borderRadius: "2px" }}>
                <button onClick={handleLogout} className="text-blue-600" style={{ fontWeight: "bold" }}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="border square-full" style={{ padding: "2px 10px", borderRadius: "2px" }}>
                <Link to="/signup" className="text-blue-600" style={{ fontWeight: "bold" }}>
                  Sign up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
