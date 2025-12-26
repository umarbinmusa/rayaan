import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../../graphql/mutations.js";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [signup, { loading, error }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signup.token);
      navigate("/dashboard");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ variables: form });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Create account
        </h1>
        <p className="text-gray-500 mb-6">
          Sign up to get started
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="full_name"
            placeholder="Full Name"
            className="input"
            value={form.full_name}
            onChange={handleChange}
          />

          <input
            name="username"
            placeholder="Username"
            className="input"
            value={form.username}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            className="input"
            value={form.role}
            onChange={handleChange}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          {error && (
            <p className="text-red-500 text-sm">{error.message}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg transition hover:bg-indigo-700"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
