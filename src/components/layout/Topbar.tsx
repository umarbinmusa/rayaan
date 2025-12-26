import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="font-semibold">Welcome</h1>
      <button
        onClick={logout}
        className="px-4 py-2 border rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </header>
  );
}
