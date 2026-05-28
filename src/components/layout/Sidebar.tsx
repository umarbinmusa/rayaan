import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Calendar, Stethoscope, 
  Pill, History, PlusCircle, LogOut, Activity,
  ClipboardList, CheckSquare, Users // Added Users icon
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  
  const storedRole = localStorage.getItem("role");
  const role = storedRole ? storedRole.trim().toUpperCase() : null;

  const linkClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-indigo-50 hover:text-indigo-600 text-gray-600";
  const activeClass = "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:text-white";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const NavItem = ({ to, icon: Icon, children }) => (
    <NavLink to={to} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
      <Icon size={20} />
      <span className="font-medium text-sm">{children}</span>
    </NavLink>
  );

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">NAGWALE</h1>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 w-fit px-2 py-0.5 rounded mt-2">
          {role || 'NOT LOGGED IN'} PANEL
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <NavItem to="/dashboard" icon={LayoutDashboard}>Dashboard</NavItem>

        {/* --- PATIENT ROLE --- */}
        {role === "PATIENT" && (
          <div className="animate-in fade-in slide-in-from-left duration-500">
            <div className="pt-4 pb-2 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Medical Care</div>
            
            {/* Added: Consultant List Link */}
            <NavItem to="/consultants" icon={Users}>Consultants</NavItem> 
            
            <NavItem to="/appointments" icon={Calendar}>Appointments</NavItem>
            <NavItem to="/book-appointment" icon={PlusCircle}>Book Now</NavItem>
            <NavItem to="/consultations" icon={Stethoscope}>My History</NavItem>
            
            <div className="pt-4 pb-2 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Pharmacy</div>
            <NavItem to="/drugs" icon={Pill}>Pharmacy Store</NavItem>
            <NavItem to="/drug-history" icon={History}>Orders</NavItem>
          </div>
        )}

        {/* --- CONSULTANT ROLE --- */}
        {role === "CONSULTANT" && (
          <div className="animate-in fade-in slide-in-from-left duration-500">
            <div className="pt-4 pb-2 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Clinical Tasks</div>
            <NavItem to="/appointments" icon={CheckSquare}>Manage Schedule</NavItem>
            <NavItem to="/consultant/attend" icon={Stethoscope}>Attend Patient</NavItem>
            <NavItem to="/create-consultation" icon={PlusCircle}>New Consultation</NavItem>
            <NavItem to="/consultations" icon={ClipboardList}>Patient Records</NavItem>
            
            <div className="pt-4 pb-2 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Inventory</div>
            <NavItem to="/drugs" icon={Pill}>Drug Directory</NavItem>
          </div>
        )}

        {/* --- ADMIN ROLE --- */}
        {role === "ADMIN" && (
          <div className="animate-in fade-in slide-in-from-left duration-500">
            <div className="pt-4 pb-2 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Management</div>
            <NavItem to="/appointments" icon={Calendar}>All Appointments</NavItem>
            <NavItem to="/admin/consultation-logs" icon={ClipboardList}>Consultation Logs</NavItem>
            <NavItem to="/adminconsultants" icon={Stethoscope}>Consultant List</NavItem>
            <NavItem to="/patients" icon={Users}>Patient List</NavItem>
            <NavItem to="/consultations" icon={Stethoscope}>All Consultations</NavItem>
            <NavItem to="/drugs" icon={Pill}>Inventory</NavItem>
            <NavItem to="/create-drug" icon={PlusCircle}>Add Product</NavItem>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}