import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONSULTATION } from "../graphql/mutations.js";

export default function CreateConsultation() {
  // 1. Updated state name to match the "Search by Name" logic
  const [patientName, setPatientName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  
  // Example of how to structure prescription state if needed later
  const [prescription] = useState([]); 

  const [createConsultation, { loading, error, data }] =
    useMutation(CREATE_CONSULTATION);

  const submit = (e) => {
    e.preventDefault();

    createConsultation({
      variables: {
        patientName, // 2. Send the string name instead of ID
        symptoms,
        diagnosis,
        prescription, // Sent as an empty array [PrescriptionInput]
        followUpDate
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          New Consultation
        </h2>
        <p className="text-gray-500">Record clinical details for the patient.</p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Patient Full Name</label>
          <input
            className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
            placeholder="e.g. John Doe"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Symptoms</label>
          <textarea
            className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
            placeholder="Describe the symptoms..."
            rows={3}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Diagnosis</label>
          <textarea
            className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
            placeholder="Enter medical diagnosis..."
            rows={3}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Follow-up Date</label>
          <input
            type="date"
            className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
            {error.message}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Saving Record..." : "Create Consultation"}
        </button>
      </form>

      {data && (
        <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100 animate-pulse">
          <p className="text-green-700 font-bold text-center">
            Consultation recorded successfully! ✅
          </p>
        </div>
      )}
    </div>
  );
}