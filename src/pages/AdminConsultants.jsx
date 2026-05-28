import { useQuery } from "@apollo/client";
import { GET_ALL_CONSULTANTS } from "../graphql/query";
import { useSearchParams } from "react-router-dom";
import { 
  Stethoscope, Mail, Calendar, 
  MoreHorizontal, ShieldAlert, Loader2, Search 
} from "lucide-react";

export default function AdminConsultantList() {
  const [searchParams] = useSearchParams();
  const { loading, error, data } = useQuery(GET_ALL_CONSULTANTS);
  
  // Get search term from Topbar
  const searchTerm = searchParams.get("search") || "";

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="animate-spin text-emerald-600" size={40} />
    </div>
  );

  if (error) return <p className="text-red-500 p-4 font-semibold text-center">Error: {error.message}</p>;

  // Filter staff by name or email based on search - Type annotations removed for JS compatibility
  const consultants = data?.getUsersByRole?.filter((c) =>
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Clinical Staff</h1>
          <p className="text-gray-500 mt-1">Manage and monitor all registered medical consultants.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100 font-bold text-sm shadow-sm">
          {consultants.length} Active Staff
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Medical Professional</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {consultants.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                        <Stethoscope size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{staff.full_name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">ID: {staff.id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Mail size={14} className="text-gray-400" />
                        {staff.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-tighter">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Authorized
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-gray-100">
                        <MoreHorizontal size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <ShieldAlert size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {consultants.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Search className="text-gray-300" size={48} />
            </div>
            <p className="text-gray-500 font-semibold text-lg">No results found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search filters in the top bar.</p>
          </div>
        )}
      </div>
    </div>
  );
}