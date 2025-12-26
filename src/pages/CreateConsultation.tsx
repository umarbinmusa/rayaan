import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONSULTATION } from "../graphql/mutations.js";

export default function CreateConsultation() {
  const [patientId, setPatientId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const [createConsultation, { loading, error, data }] =
    useMutation(CREATE_CONSULTATION);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    createConsultation({
      variables: {
        patientId,
        symptoms,
        diagnosis,
        prescription: [],
        followUpDate
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Create Consultation
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full border rounded-lg p-3"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        />

        <textarea
          className="w-full border rounded-lg p-3"
          placeholder="Symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-3"
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />

        <input
          type="date"
          className="w-full border rounded-lg p-3"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm">
            {error.message}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Create Consultation"}
        </button>
      </form>

      {data && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <p className="text-green-700 font-medium">
            Consultation created successfully ✅
          </p>
        </div>
      )}
    </div>
  );
}
