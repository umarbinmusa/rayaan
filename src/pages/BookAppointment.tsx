import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_APPOINTMENT } from "../graphql/mutations.js";

export default function BookAppointment() {
  const [consultantId, setConsultantId] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const [createAppointment, { loading }] =
    useMutation(CREATE_APPOINTMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createAppointment({
      variables: {
        input: {
          consultantId,
          reason,
          appointmentDate
        }
      }
    });

    alert("Appointment booked successfully");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Book Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Consultant ID"
          className="w-full border px-3 py-2 rounded"
          value={consultantId}
          onChange={(e) => setConsultantId(e.target.value)}
        />

        <textarea
          placeholder="Reason"
          className="w-full border px-3 py-2 rounded"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <input
          type="datetime-local"
          className="w-full border px-3 py-2 rounded"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
