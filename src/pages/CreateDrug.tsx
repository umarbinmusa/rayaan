import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DRUG } from "../graphql/mutations.js";
import toast, { Toaster } from "react-hot-toast";

export default function CreateDrug() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: ""
  });

  const [createDrug, { loading }] = useMutation(CREATE_DRUG);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createDrug({
        variables: {
          input: {
            name: form.name,
            category: form.category,
            description: form.description,
            price: Number(form.price),
            stock: Number(form.stock)
          }
        }
      });

      toast.success("Drug created successfully!");

      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: ""
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Drug
        </h2>

        <input
          name="name"
          placeholder="Drug name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mb-4"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Drug"}
        </button>
      </form>
    </div>
  );
}
