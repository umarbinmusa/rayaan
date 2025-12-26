import { useQuery, useMutation } from "@apollo/client";
import { GET_DRUGS } from "../graphql/query.js";
import { BUY_DRUG } from "../graphql/mutations.js";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Drug {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function Drugs() {
  const { data, loading, error, refetch } = useQuery(GET_DRUGS);
  const [buyDrug] = useMutation(BUY_DRUG);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  if (loading) return <div>Loading drugs...</div>;
  if (error) return <div>Error loading drugs: {error.message}</div>;

  const handleBuy = async (drugId: string) => {
    const quantity = quantities[drugId] || 1;

    try {
      await buyDrug({
        variables: { input: { drugId, quantity } },
      });
      toast.success("Drug purchased successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Available Drugs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.getDrugs.map((drug: Drug) => (
          <div
            key={drug.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{drug.name}</h2>
            <p className="mt-2">Price: ₦{drug.price}</p>
            <p className="mt-1">Stock: {drug.stock}</p>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={drug.stock}
                value={quantities[drug.id] || 1}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [drug.id]: parseInt(e.target.value),
                  })
                }
                className="border p-1 w-16 rounded"
              />
              <button
                onClick={() => handleBuy(drug.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
