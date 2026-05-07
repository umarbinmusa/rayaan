import { useQuery } from "@apollo/client";
import { GET_ALL_CONSULTANTS } from "../graphql/query";
import { User, MessageCircle, ArrowRight, Loader2 } from "lucide-react";

export default function PatientDashboard() {
  const { loading, error, data } = useQuery(GET_ALL_CONSULTANTS);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  if (error) return <p className="text-red-500 p-4">Error loading consultants: {error.message}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Consultants</h1>
        <p className="text-gray-500">Select a professional to start your consultation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.getUsersByRole.map((consultant) => (
          <div 
            key={consultant.id} 
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <User size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {consultant.full_name}
                </h3>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-lg uppercase">
                  Available
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-6">
              Specialized in traditional herbal medicine and general clinical wellness.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                <MessageCircle size={18} />
                Profile
              </button>
              <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all">
                Book Now
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}