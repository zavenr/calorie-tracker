import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase"; // ✅ this should now work

export default function Login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("❌ Login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-blue-300">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          🍽️ CalorieTracker
        </h1>
        <p className="mb-6 text-gray-600">
          Sign in to track your meals & progress
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
