import { useQuery } from "@apollo/client";
import { MY_DRUG_PURCHASE_HISTORY } from "../graphql/query.js";
import { Link } from "react-router-dom";
import { ShoppingBag, FileText, Calendar, Package, ChevronRight, Loader2 } from "lucide-react";

export default function DrugPurchaseHistory() {
  const { data, loading, error } = useQuery(MY_DRUG_PURCHASE_HISTORY);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
      <Loader2 className="animate-spin mb-2" size={32} />
      <p className="font-medium">Retrieving your orders...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600">
      <p className="font-bold">Error</p>
      <p className="text-sm">Unable to load purchase history. Please try again later.</p>
    </div>
  );

  const history = data?.myDrugPurchaseHistory || [];

  if (history.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
        <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
        <p className="text-gray-500">Your drug purchase history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order History</h1>
          <p className="text-gray-500 text-sm">Manage and track your pharmacy purchases.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {history.map((p) => (
          <div 
            key={p.id} 
            className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6"
          >
            {/* Icon & Date Segment */}
            <div className="flex items-center gap-4 md:border-r md:pr-6 border-gray-50">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Package size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Status</p>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Completed</span>
              </div>
            </div>

            {/* Drug Details */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                {p.drug.name}
              </h3>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-gray-300" />
                  <span>May 06, 2026</span> {/* Replace with p.createdAt if available */}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></span>
                  <span>Qty: <span className="font-semibold text-gray-700">{p.quantity}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></span>
                  <span>Unit: ₦{p.unitPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Pricing & Receipt Action */}
            <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-2 pt-4 md:pt-0 border-t md:border-none border-gray-50">
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Total Paid</p>
                <p className="text-xl font-black text-gray-900">₦{p.totalPrice.toLocaleString()}</p>
              </div>
              
              <Link
                to={`/receipt/${p.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors group/btn"
              >
                <FileText size={16} />
                <span>Receipt</span>
                <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}