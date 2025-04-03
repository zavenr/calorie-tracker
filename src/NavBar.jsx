import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NavBar() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-6 fixed">
      <h1 className="text-2xl font-bold mb-10">🍽️ CalorieTracker</h1>
      <nav className="flex flex-col gap-4 flex-grow">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/foodlog" className="hover:text-blue-400">
          Food Log
        </Link>
        <Link to="/chatbot" className="hover:text-blue-400">
          ChatBot
        </Link>
      </nav>
      {user && (
        <div className="mt-auto">
          <p className="text-sm mb-2">Hi, {user.displayName?.split(" ")[0]}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
