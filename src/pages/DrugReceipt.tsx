import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { DRUG_PURCHASE_RECEIPT } from "../graphql/query.js";

export default function DrugReceipt() {
  const { id } = useParams();
  const { data, loading } = useQuery(DRUG_PURCHASE_RECEIPT, {
    variables: { id },
  });

  if (loading) return <p>Loading receipt...</p>;

  const r = data.drugPurchaseReceipt;

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow">
      <h2 className="text-center text-xl font-bold mb-4">
        Drug Purchase Receipt
      </h2>

      <p><strong>Drug:</strong> {r.drug.name}</p>
      <p><strong>Quantity:</strong> {r.quantity}</p>
      <p><strong>Unit Price:</strong> ₦{r.unitPrice}</p>
      <p><strong>Total:</strong> ₦{r.totalPrice}</p>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(r.createdAt).toLocaleString()}
      </p>

      <button
        onClick={() => window.print()}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded"
      >
        Print Receipt
      </button>
    </div>
  );
}
