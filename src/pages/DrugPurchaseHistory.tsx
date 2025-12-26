import { useQuery } from "@apollo/client";
import { MY_DRUG_PURCHASE_HISTORY } from "../graphql/query.js";
import { Link } from "react-router-dom";

export default function DrugPurchaseHistory() {
  const { data, loading, error } = useQuery(MY_DRUG_PURCHASE_HISTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading history</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Drug Purchase History</h2>

      {data.myDrugPurchaseHistory.map((p: any) => (
        <div key={p.id} className="border-b py-3 flex justify-between">
          <div>
            <p className="font-semibold">{p.drug.name}</p>
            <p className="text-sm text-gray-500">
              Qty: {p.quantity} | ₦{p.unitPrice}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold">₦{p.totalPrice}</p>
            <Link
              to={`/receipt/${p.id}`}
              className="text-indigo-600 text-sm"
            >
              View Receipt
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
