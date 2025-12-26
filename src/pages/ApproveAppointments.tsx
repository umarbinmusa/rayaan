import { useQuery, useMutation } from "@apollo/client";
import { GET_APPOINTMENTS } from "../graphql/query.js";
import { UPDATE_APPOINTMENT_STATUS } from "../graphql/mutations.js";

export default function ApproveAppointments() {
  const { data, loading, error, refetch } = useQuery(GET_APPOINTMENTS);
  const [updateStatus] = useMutation(UPDATE_APPOINTMENT_STATUS);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error loading appointments</p>;

  const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
    await updateStatus({
      variables: {
        input: {
          appointmentId: id,
          status
        }
      }
    });

    refetch();
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Pending Appointments</h2>

      {data.getAppointments.map((appt: any) => (
        <div key={appt.id} className="border p-4 mb-4 rounded">
          <p><b>Patient:</b> {appt.patient?.full_name}</p>
          <p><b>Reason:</b> {appt.reason}</p>
          <p><b>Date:</b> {appt.appointmentDate}</p>
          <p><b>Status:</b> {appt.status}</p>

          {appt.status === "PENDING" && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleAction(appt.id, "APPROVED")}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => handleAction(appt.id, "REJECTED")}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
