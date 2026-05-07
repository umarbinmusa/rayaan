import { ArrowUpRight, Calendar, Pill, UserCheck } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Health Overview</h2>
        <p className="text-gray-500 mt-1">Welcome back! Here is what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Appointments" 
          value="View Schedule" 
          icon={<Calendar className="text-blue-600" />} 
          color="bg-blue-50" 
        />
        <StatCard 
          title="Pharmacy" 
          value="Order Meds" 
          icon={<Pill className="text-emerald-600" />} 
          color="bg-emerald-50" 
        />
        <StatCard 
          title="Profile" 
          value="Security 100%" 
          icon={<UserCheck className="text-amber-600" />} 
          color="bg-amber-50" 
        />
      </div>

      {/* Modern placeholder for recent activity */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">#0{i}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">System Notification</p>
                  <p className="text-xs text-gray-500">Updates regarding your last consultation.</p>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-400">2h ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <ArrowUpRight className="text-gray-300 group-hover:text-indigo-500 transition-colors" size={20} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}