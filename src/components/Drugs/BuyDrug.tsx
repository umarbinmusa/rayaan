import { useState } from "react";
import { useMutation } from "@apollo/client";
import { BUY_DRUG } from "../../graphql/mutations.js";

export default function BuyDrug({ drug }: any) {
  const [quantity, setQuantity] = useState(1);

  const [buyDrug, { loading }] = useMutation(BUY_DRUG, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    onCompleted(data) {
      alert(data.buyDrug.message);
    },
    onError(err) {
      alert(err.message);
    },
  });

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-lg">{drug.name}</h3>
      <p className="text-sm text-gray-500">
        Price: ₦{drug.price} | Stock: {drug.stock}
      </p>

      <input
        type="number"
        min="1"
        className="border w-full p-2 mt-3 rounded"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button
        disabled={loading}
        onClick={() =>
          buyDrug({
            variables: {
              drugId: drug.id,
              quantity,
            },
          })
        }
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Buy Drug"}
      </button>
    </div>
  );
}
