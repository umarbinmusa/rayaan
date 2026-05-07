import { useQuery } from "@apollo/client";
import {
  MY_APPOINTMENTS,
  CONSULTANT_APPOINTMENTS,
  ALL_APPOINTMENTS
} from "../graphql/query";
import { Calendar, User, Clock, CheckCircle2, AlertCircle, ChevronRight, MoreHorizontal } from "lucide-react";

export default function Appointments() {
  const role = localStorage.getItem("role")?.toUpperCase();

  const QUERY_MAP = {
    PATIENT: MY_APPOINTMENTS,
    CONSULTANT: CONSULTANT_APPOINTMENTS,
    ADMIN: ALL_APPOINTMENTS
  };

  const { data, loading, error } = useQuery(QUERY_MAP[role], {
    fetchPolicy: "network-only"
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Syncing schedule...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
      <AlertCircle size={20} />
      <p className="text-sm font-medium">{error.message}</p>
    </div>
  );

  const appointments =
    role === "PATIENT"
      ? data?.myAppointments
      : role === "CONSULTANT"
      ? data?.consultantAppointments
      : data?.allAppointments;

  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <Calendar className="text-gray-200 mb-4" size={64} />
        <h3 className="text-lg font-bold text-gray-900">No Appointments</h3>
        <p className="text-gray-500">Your schedule is currently clear.</p>
      </div>
    );
  }

  const formatDate = (dateValue: string) => {
    if (!dateValue) return { day: "--", month: "---", year: "----" };
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return { day: "!!", month: "Err", year: "!!" };
    
    return {
      day: date.toLocaleDateString("en-GB", { day: "2-digit" }),
      month: date.toLocaleDateString("en-GB", { month: "short" }),
      year: date.toLocaleDateString("en-GB", { year: "numeric" }),
      time: date.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage and track your scheduled clinical visits.</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
          + New Appointment
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-4">
        {appointments.map((a) => {
          const { day, month, year, time } = formatDate(a.appointmentDate);
          const isApproved = a.status === "APPROVED";

          return (
            <div
              key={a.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center w-20 h-20 bg-indigo-50 rounded-2xl text-indigo-600 shrink-0">
                <span className="text-xs font-bold uppercase tracking-widest">{month}</span>
                <span className="text-2xl font-black leading-none">{day}</span>
                <span className="text-[10px] font-bold opacity-60 mt-1">{year}</span>
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1.5 ${
                    isApproved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {isApproved ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {a.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 md:hidden">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Patient Name</p>
                      <p className="text-sm font-bold text-gray-800">{a.patient?.full_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Scheduled Time</p>
                      <p className="text-sm font-bold text-gray-800">{time || "Morning Session"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    <span className="text-gray-900 font-bold mr-2 italic">Reason for visit:</span>
                    {a.reason}
                  </p>
                </div>
              </div>

              {/* Action Button Desktop */}
              <div className="hidden md:block">
                <button className="p-3 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}