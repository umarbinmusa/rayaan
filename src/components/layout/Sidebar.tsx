import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // ADMIN | PATIENT | CONSULTANT

  const linkClass =
    "block px-4 py-2 rounded-lg transition hover:bg-indigo-50 hover:text-indigo-600";

  const activeClass =
    "bg-indigo-100 text-indigo-700 font-medium";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-xl  text-indigo-600">
         Ar-Rayhaan Health ERP
        </h1>
        <p className="text-sm text-gray-500 capitalize">
          {role?.toLowerCase()} dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        {/* ================= PATIENT ================= */}
        {role === "PATIENT" && (
          <>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              My Appointments
            </NavLink>

            <NavLink
              to="/book-appointment"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Book Appointment
            </NavLink>

            <NavLink
              to="/consultations"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              My Consultations
            </NavLink>

            <NavLink
              to="/drugs"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Buy Drugs
            </NavLink>

            <NavLink
              to="/drug-history"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Drug Purchase History
            </NavLink>
          </>
        )}

        {/* ================= CONSULTANT ================= */}
        {role === "CONSULTANT" && (
          <>
            <NavLink
              to="/consultations"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Consultations
            </NavLink>

            <NavLink
              to="/create-consultation"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Create Consultation
            </NavLink>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {role === "ADMIN" && (
          <>
            <NavLink
              to="/consultations"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              All Consultations
            </NavLink>

            <NavLink
              to="/create-consultation"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Create Consultation
            </NavLink>
            <NavLink
      to="/Appointments"
      className={({ isActive }) =>
        `${linkClass} ${isActive ? activeClass : ""}`
      }
    >
      Appointments
    </NavLink>

            <NavLink
              to="/create-drug"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Create Drug
            </NavLink>

            <NavLink
              to="/drugs"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              All Drugs
            </NavLink>
          </>
        )}
        {(role === "ADMIN" || role === "CONSULTANT") && (
  <NavLink to="/consultations">Consultations</NavLink>
)}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
