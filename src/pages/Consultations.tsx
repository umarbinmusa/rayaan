import { useQuery } from "@apollo/client";
import {
  MY_CONSULTATIONS,
  CONSULTANT_CONSULTATIONS,
  ALL_CONSULTATIONS
} from "../graphql/query";
import { Stethoscope, User, Calendar, ClipboardList, Clock, ChevronRight } from "lucide-react";

export default function Consultations() {
  const role = localStorage.getItem("role")?.toUpperCase();

  const QUERY_MAP = {
    PATIENT: MY_CONSULTATIONS,
    CONSULTANT: CONSULTANT_CONSULTATIONS,
    ADMIN: ALL_CONSULTATIONS
  };

  const { data, loading, error } = useQuery(QUERY_MAP[role], {
    fetchPolicy: "network-only"
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="animate-spin text-indigo-600"><Stethoscope size={40} /></div>
      <p className="text-gray-500 font-medium">Retrieving medical records...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600">
      <p className="font-bold">Access Error</p>
      <p className="text-sm">{error.message}</p>
    </div>
  );

  const consultations =
    role === "PATIENT"
      ? data?.myConsultations
      : role === "CONSULTANT"
      ? data?.consultationsForConsultant
      : data?.allConsultations;

  if (!consultations || consultations.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <ClipboardList className="mx-auto text-gray-300 mb-4" size={48} />
        <h3 className="text-lg font-semibold text-gray-900">No records found</h3>
        <p className="text-gray-500">You don't have any consultation history yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Consultation History</h1>
          <p className="text-gray-500 mt-1">Review your clinical visits and diagnoses.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 text-sm font-bold border border-indigo-100">
          {consultations.length} Total Records
        </div>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {consultations.map((c) => (
          <div
            key={c.id}
            className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6"
          >
            {/* Date/Icon Side */}
            <div className="flex md:flex-col items-center gap-4 md:border-r md:pr-6 border-gray-50">
              <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Calendar size={24} />
              </div>
              <div className="text-left md:text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</p>
                <p className="text-sm font-bold text-gray-900">May 06</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider">Clinical Notes</p>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {c.symptoms.length > 50 ? `${c.symptoms.substring(0, 50)}...` : c.symptoms}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">Diagnosis:</span>
                  <span>{c.diagnosis}</span>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <User size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Patient</p>
                    <p className="text-sm font-semibold text-gray-800">{c.patient?.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Stethoscope size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Consultant</p>
                    <p className="text-sm font-semibold text-gray-800">{c.consultant?.full_name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* View Detail Arrow */}
            <div className="hidden md:block">
              <button className="p-2 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}