import { useQuery } from "@apollo/client";
import { GET_ALL_OUTPATIENT_RECORDS } from "../graphql/query";
import { ClipboardList, User, Calendar, ExternalLink, Loader2 } from "lucide-react";

export default function AdminConsultationMonitor() {
  const { loading, error, data } = useQuery(GET_ALL_OUTPATIENT_RECORDS);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Consultation Logs</h1>
        <p className="text-gray-500">Monitor all clinical outpatient activities and prescriptions.</p>
      </header>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Date/Time</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Patient</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Consultant</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Diagnosis</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data?.getAllOutpatientRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    {new Date(record.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 text-sm">
                  {record.patientName}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                      DR
                    </div>
                    <span className="text-sm text-gray-700">{record.consultantName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase">
                    {record.diagnosis}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                    <ExternalLink size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}