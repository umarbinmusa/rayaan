import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_OUTPATIENT_RECORD } from "../graphql/mutations";
import { GET_DRUGS } from "../graphql/query";
import { Stethoscope, Clipboard, Pill, Activity, Save, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AttendingDesk() {
  const { data: drugData } = useQuery(GET_DRUGS);
  
  // 1. State for Vitals and Notes
  const [formData, setFormData] = useState({
    temp: "",
    bp: "",
    weight: "",
    pulse: "",
    notes: "",
    diagnosis: ""
  });

  // 2. State for Prescription List
  const [prescription, setPrescription] = useState([{ drugId: "", dosage: "", duration: "" }]);

  // 3. Mutation Hook
  const [saveRecord, { loading }] = useMutation(CREATE_OUTPATIENT_RECORD, {
    onCompleted: () => toast.success("Consultation Saved Successfully!"),
    onError: (err) => toast.error(`Error: ${err.message}`)
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addDrugField = () => {
    setPrescription([...prescription, { drugId: "", dosage: "", duration: "" }]);
  };

  const updatePrescription = (index, field, value) => {
    const updated = [...prescription];
    updated[index][field] = value;
    setPrescription(updated);
  };

  // 4. Save Function
  const handleSave = async () => {
    const input = {
      ...formData,
      prescriptions: prescription.filter(p => p.drugId !== ""), // Only save if a drug was selected
      patientId: "CURRENT_PATIENT_ID", // Replace with logic to get actual ID
    };

    await saveRecord({ variables: { input } });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Stethoscope size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Outpatient Attending Desk</h1>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save & Complete
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Vitals */}
          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-rose-500" /> Patient Vitals
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <VitalInput label="Temp (°C)" name="temp" value={formData.temp} onChange={handleInputChange} />
              <VitalInput label="BP (mmHg)" name="bp" value={formData.bp} onChange={handleInputChange} />
              <VitalInput label="Weight (kg)" name="weight" value={formData.weight} onChange={handleInputChange} />
              <VitalInput label="Pulse (bpm)" name="pulse" value={formData.pulse} onChange={handleInputChange} />
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clipboard size={18} className="text-indigo-500" /> Consultation Notes
            </h3>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4} 
              className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20" 
              placeholder="Clinical history and exam findings..." 
            />
            <div className="mt-4">
              <label className="text-xs font-bold text-gray-500">Diagnosis</label>
              <input 
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                type="text" 
                className="w-full mt-2 bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm" 
                placeholder="Final diagnosis" 
              />
            </div>
          </section>
        </div>

        {/* Prescription */}
        <div className="lg:col-span-1">
          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Pill size={18} className="text-emerald-500" /> Prescription
              </h3>
              <button onClick={addDrugField} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {prescription.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-2xl space-y-3">
                  <select 
                    value={item.drugId}
                    onChange={(e) => updatePrescription(index, "drugId", e.target.value)}
                    className="w-full bg-white border-none rounded-xl text-xs py-2"
                  >
                    <option value="">Select Drug...</option>
                    {drugData?.getDrugs.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      placeholder="Dosage" 
                      value={item.dosage}
                      onChange={(e) => updatePrescription(index, "dosage", e.target.value)}
                      className="bg-white border-none rounded-xl text-[10px] py-2 px-3" 
                    />
                    <input 
                      placeholder="Days" 
                      value={item.duration}
                      onChange={(e) => updatePrescription(index, "duration", e.target.value)}
                      className="bg-white border-none rounded-xl text-[10px] py-2 px-3" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Cleanliness
const VitalInput = ({ label, name, value, onChange }) => (
  <div>
    <label className="text-[10px] font-bold text-gray-400 uppercase">{label}</label>
    <input 
      type="text" 
      name={name} 
      value={value} 
      onChange={onChange} 
      className="w-full mt-1 bg-gray-50 border-none rounded-xl py-2 text-sm" 
    />
  </div>
);