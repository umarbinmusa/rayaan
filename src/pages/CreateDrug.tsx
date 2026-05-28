import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DRUG } from "../graphql/mutations.js";
import toast, { Toaster } from "react-hot-toast";
import { Pill, Plus, DollarSign, Package, FileText, Loader2, Tag } from "lucide-react";

export default function CreateDrug() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: ""
  });

  const [createDrug, { loading }] = useMutation(CREATE_DRUG);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submitting negative numbers early on the client-side
    if (Number(form.price) < 0 || Number(form.stock) < 0) {
      toast.error("Price and stock cannot be negative values.");
      return;
    }

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

      toast.success("Inventory updated successfully!");

      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: ""
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Toaster position="top-right" />
      
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
             <Pill size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Medication</h1>
        </div>
        <p className="text-gray-500 font-medium">Update the pharmacy inventory with new stock items.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Live Preview Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-6">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
              <Plus size={28} />
            </div>
            
            <div className="space-y-1 mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 w-fit px-2 py-0.5 rounded">
                {form.category || 'Category'}
              </p>
              <h3 className="text-xl font-bold text-gray-900 break-words">
                {form.name || 'Drug Name'}
              </h3>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">Unit Price</span>
                <span className="text-lg font-bold text-gray-900">${form.price ? Number(form.price).toFixed(2) : '0.00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">In Stock</span>
                <span className="text-sm font-bold px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                  {form.stock || '0'} Units
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-2 px-1">
                   <Pill size={14} className="text-indigo-500" /> Drug Name
                </label>
                <div className="relative">
                   <input
                    name="name"
                    type="text"
                    placeholder="Enter medication name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500 focus:bg-white rounded-2xl px-4 py-3.5 text-sm transition-all outline-none"
                  />
                </div>
              </div>

              {/* Category Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-2 px-1">
                   <Tag size={14} className="text-indigo-500" /> Category
                </label>
                <input
                  name="category"
                  type="text"
                  placeholder="e.g. Antibiotics"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500 focus:bg-white rounded-2xl px-4 py-3.5 text-sm transition-all outline-none"
                />
              </div>

              {/* Price Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-2 px-1">
                   <DollarSign size={14} className="text-indigo-500" /> Price per Unit ($)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500 focus:bg-white rounded-2xl px-4 py-3.5 text-sm transition-all outline-none"
                />
              </div>

              {/* Stock Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-2 px-1">
                   <Package size={14} className="text-indigo-500" /> Stock Quantity
                </label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500 focus:bg-white rounded-2xl px-4 py-3.5 text-sm transition-all outline-none"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 flex items-center gap-2 px-1">
                  <FileText size={14} className="text-indigo-500" /> Product Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe dosage, usage, and side effects..."
                value={form.description}
                onChange={handleChange}
                className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500 focus:bg-white rounded-2xl p-4 text-sm transition-all outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Plus size={20} strokeWidth={3} />
                  <span>Register Medication</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}