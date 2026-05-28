import { useQuery } from "@apollo/client";
import { GET_ALL_PATIENTS } from "../graphql/query";
import { User, Mail, Calendar, Search, MoreVertical, Trash2, ShieldCheck } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function AdminPatientList() {
  const [searchParams] = useSearchParams();
  const { data, loading, error } = useQuery(GET_ALL_PATIENTS);
  
  const searchTerm = searchParams.get("search") || "";

  if (loading) return <div className="p-8 text-center text-gray-500">Loading patients...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;

  const patients = data?.getUsersByRole.filter(p => 
    p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-500 mt-1">View and manage all registered patients in the system.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 flex items-center gap-2">
          <ShieldCheck className="text-indigo-600" size={20} />
          <span className="text-sm font-bold text-indigo-700">{patients.length} Total Patients</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Patient Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Username</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                      {patient.full_name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{patient.full_name}</p>
                      <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                        <Mail size={12} />
                        {patient.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-600">@{patient.username}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Calendar size={14} />
                    {new Date(patient.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-400 hover:text-indigo-600 transition-all">
                      <MoreVertical size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {patients.length === 0 && (
          <div className="py-20 text-center">
            <User className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-500 font-medium">No patients found.</p>
          </div>
        )}
      </div>
    </div>
  );
}