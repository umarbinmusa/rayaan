import { useQuery } from "@apollo/client";
import {
  MY_CONSULTATIONS,
  CONSULTANT_CONSULTATIONS,
  ALL_CONSULTATIONS
} from "../graphql/query";

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

  if (loading) return <p>Loading consultations...</p>;

  if (error) {
    console.error(error);
    return <p className="text-red-600">{error.message}</p>;
  }

  const consultations =
    role === "PATIENT"
      ? data?.myConsultations
      : role === "CONSULTANT"
      ? data?.consultationsForConsultant
      : data?.allConsultations;

  if (!consultations || consultations.length === 0) {
    return <p className="p-6 text-gray-500">No consultations found</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Consultations</h1>

      {consultations.map((c) => (
        <div
          key={c.id}
          className="border rounded-lg p-4 bg-white shadow-sm"
        >
          <p><strong>Symptoms:</strong> {c.symptoms}</p>
          <p><strong>Diagnosis:</strong> {c.diagnosis}</p>
          <p><strong>Patient:</strong> {c.patient?.full_name}</p>
          <p><strong>Consultant:</strong> {c.consultant?.full_name}</p>
        </div>
      ))}
    </div>
  );
}
