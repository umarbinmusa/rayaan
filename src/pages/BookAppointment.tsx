import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_APPOINTMENT } from "../graphql/mutations.js";
import { Calendar, User, MessageSquare, CheckCircle, Loader2 } from "lucide-react";

export default function BookAppointment() {
  // 1. Updated state to use Name instead of ID
  const [consultantName, setConsultantName] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [success, setSuccess] = useState(false);

  const [createAppointment, { loading, error }] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: () => {
      setSuccess(true);
      // Reset form
      setConsultantName("");
      setReason("");
      setAppointmentDate("");
      setTimeout(() => setSuccess(false), 5000);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await createAppointment({
      variables: {
        input: {
          consultantName, // 2. Sending string name to match new backend
          reason,
          appointmentDate
        }
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
            <Calendar size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
            <p className="text-gray-500 text-sm">Schedule a session with your preferred consultant</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Consultant Name Input */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Consultant Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="e.g. Dr. Smith"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
                value={consultantName}
                onChange={(e) => setConsultantName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Reason for Appointment */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Reason for visit
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
              <textarea
                placeholder="Tell us a bit about why you're booking..."
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 min-h-[120px]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Date and Time */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Preferred Date & Time
            </label>
            <input
              type="datetime-local"
              className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
              {error.message}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold border border-emerald-100 animate-in fade-in zoom-in duration-300">
              <CheckCircle size={18} />
              Appointment request sent successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}