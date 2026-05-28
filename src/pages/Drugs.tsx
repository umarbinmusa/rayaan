import { useQuery, useMutation } from "@apollo/client";
import { GET_DRUGS } from "../graphql/query.js";
import { BUY_DRUG } from "../graphql/mutations.js";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"; // 1. Import useSearchParams
import toast, { Toaster } from "react-hot-toast";
import { ShoppingCart, Pill, Tag, Plus, Minus, Search } from "lucide-react";

interface Drug {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
}

export default function Drugs() {
  const [searchParams] = useSearchParams(); // 2. Initialize search params
  const { data, loading, error, refetch } = useQuery(GET_DRUGS);
  const [buyDrug, { loading: buying }] = useMutation(BUY_DRUG);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // 3. Get the search term from the URL (e.g., ?search=paracetamol)
  const searchTerm = searchParams.get("search") || "";

  if (loading) return <div className="flex items-center justify-center min-h-[400px] text-gray-500 font-medium">Loading Pharmacy Inventory...</div>;
  if (error) return <div className="p-6 text-red-500 bg-red-50 rounded-xl border border-red-100">Error loading drugs: {error.message}</div>;

  // 4. Filter the drugs based on the search term
  const filteredDrugs = data?.getDrugs.filter((drug: Drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = async (drugId: string) => {
    const quantity = quantities[drugId] || 1;
    try {
      await buyDrug({
        variables: { input: { drugId, quantity } },
      });
      toast.success("Purchase confirmed! Check your order history.");
      refetch();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const updateQty = (id: string, delta: number, max: number) => {
    const current = quantities[id] || 1;
    const nextValue = Math.max(1, Math.min(max, current + delta));
    setQuantities({ ...quantities, [id]: nextValue });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pharmacy Store</h1>
          <p className="text-gray-500 mt-1">
            {searchTerm 
              ? `Showing results for "${searchTerm}"` 
              : "Browse and purchase available medications."}
          </p>
        </div>
        
        {/* We keep this search bar here for local page use, but it will sync with Topbar */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search medicine..." 
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full md:w-64 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
            value={searchTerm} // 5. Controlled by the URL
            onChange={(e) => {
                // This allows the local input to update the URL as well
                const url = new URL(window.location.href);
                url.searchParams.set("search", e.target.value);
                window.history.replaceState({}, '', url);
                // Trigger a re-render by letting the state catch up or just rely on searchParams
            }}
          />
        </div>
      </div>

      {/* Grid Layout */}
      {filteredDrugs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrugs.map((drug: Drug) => (
            <div
              key={drug.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col"
            >
              {/* Card content remains same */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Pill size={22} />
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  drug.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {drug.stock > 0 ? `${drug.stock} in stock` : 'Out of Stock'}
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{drug.name}</h2>
              <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                <Tag size={14} />
                <span className="text-sm font-medium">₦{drug.price.toLocaleString()} per unit</span>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-1.5 rounded-xl">
                  <button 
                    onClick={() => updateQty(drug.id, -1, drug.stock)}
                    className="p-1.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600 shadow-sm"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-gray-800 text-sm">{quantities[drug.id] || 1}</span>
                  <button 
                    onClick={() => updateQty(drug.id, 1, drug.stock)}
                    className="p-1.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600 shadow-sm"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  disabled={drug.stock === 0 || buying}
                  onClick={() => handleBuy(drug.id)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
                >
                  <ShoppingCart size={18} />
                  {buying ? 'Processing...' : 'Purchase Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Pill className="text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-medium">No medicines found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}