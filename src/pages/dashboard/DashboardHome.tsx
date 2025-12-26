export default function DashboardHome() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Appointments</p>
          <p className="text-xl font-bold">View & manage</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Drugs</p>
          <p className="text-xl font-bold">Buy / Manage</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Profile</p>
          <p className="text-xl font-bold">Settings</p>
        </div>
      </div>
    </div>
  );
}
