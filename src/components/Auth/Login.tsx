import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useMutation(LOGIN, {
   
   onCompleted: (data) => {
  console.log("Login Response Data:", data);

  // Use optional chaining to safely get the user object
  const loginData = data?.login;
  const user = loginData?.user;

  if (loginData?.token) {
    localStorage.setItem("token", loginData.token);
    
    // FORCE CHECK: If role is missing from server, check if it's in the user object
    // If all else fails, default to "PATIENT" just so the app doesn't look broken
    const assignedRole = user?.role || "PATIENT"; 
    
    localStorage.setItem("role", assignedRole.toUpperCase());
    localStorage.setItem("user", JSON.stringify(user));

    // Force a full refresh to the dashboard
    window.location.href = "/dashboard";
  }
},
    onError: (err) => {
      console.error("Login Error:", err);
    }
  });

  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to manage your healthcare</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Username</label>
            <input
              type="text"
              className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Password</label>
            <input
              type="password"
              className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error.message}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-8">
          New to the platform?{" "}
          <Link to="/signup" className="text-indigo-600 font-bold hover:underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}