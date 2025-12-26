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
      const { token, user } = data.login;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      
      navigate("/dashboard");
    },
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome back
        </h1>
        <p className="text-gray-500 mb-6">Sign in to your account</p>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error.message}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
