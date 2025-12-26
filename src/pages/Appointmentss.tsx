import { useQuery } from "@apollo/client";
import {
  MY_APPOINTMENTS,
  CONSULTANT_APPOINTMENTS,
  ALL_APPOINTMENTS
} from "../graphql/query";

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

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-red-600">{error.message}</p>;

  const appointments =
    role === "PATIENT"
      ? data?.myAppointments
      : role === "CONSULTANT"
      ? data?.consultantAppointments
      : data?.allAppointments;

  if (!appointments || appointments.length === 0) {
    return <p className="p-6 text-gray-500">No appointments found</p>;
  }

  const formatDate = (dateValue: string) => {
    if (!dateValue) return "N/A";
    const date = new Date(dateValue); // ✅ correct
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">My Appointments</h1>

      {appointments.map((a) => (
        <div
          key={a.id}
          className="border rounded-lg p-4 bg-gray-50 flex justify-between"
        >
          <div>
            <p><strong>Date:</strong> {formatDate(a.appointmentDate)}</p>
            <p><strong>Patient:</strong> {a.patient?.full_name}</p>
            <p><strong>Reason:</strong> {a.reason}</p>
          </div>

          <span
            className={`font-semibold ${
              a.status === "APPROVED"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {a.status}
          </span>
        </div>
      ))}
    </div>
  );
}
