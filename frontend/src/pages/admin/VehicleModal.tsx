import { useState, useEffect } from "react";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
}

export function VehicleModal({ isOpen, onClose, onSave, initialData }: VehicleModalProps) {
  const [formData, setFormData] = useState<any>({
    name: "",
    category: "Cars",
    subcategory: "",
    localTariff: {},
    outstationTariff: { ac: "", nonAc: "", batta: "", minKms: "", perDayRental: "" }
  });

  const [localTariffPairs, setLocalTariffPairs] = useState<{key: string, value: string}[]>([
    { key: "", value: "" }
  ]);
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      const pairs = Object.entries(initialData.localTariff || {}).map(([key, value]) => ({ key, value: value as string }));
      setLocalTariffPairs(pairs.length > 0 ? pairs : [{ key: "", value: "" }]);
    } else {
      setFormData({
        name: "",
        category: "Cars",
        subcategory: "",
        localTariff: {},
        outstationTariff: { ac: "", nonAc: "", batta: "", minKms: "", perDayRental: "" }
      });
      setLocalTariffPairs([{ key: "", value: "" }]);
    }
    setFile(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleTariffChange = (index: number, field: "key" | "value", val: string) => {
    const newPairs = [...localTariffPairs];
    newPairs[index][field] = val;
    setLocalTariffPairs(newPairs);
  };

  const addTariffRow = () => setLocalTariffPairs([...localTariffPairs, { key: "", value: "" }]);
  const removeTariffRow = (index: number) => setLocalTariffPairs(localTariffPairs.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImg = formData.img;
      
      // Upload file if new one selected
      if (file) {
        const uploadData = new FormData();
        uploadData.append("files", file);
        const res = await api.post("/upload", uploadData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        finalImg = res.data.urls[0];
      }

      // Convert localTariff array to object
      const localTariffObj: Record<string, string> = {};
      localTariffPairs.forEach(p => {
        if (p.key.trim() && p.value.trim()) localTariffObj[p.key] = p.value;
      });

      const payload = { ...formData, img: finalImg, localTariff: localTariffObj };

      if (initialData?._id) {
        await api.put(`/vehicles/${initialData._id}`, payload);
      } else {
        await api.post("/vehicles", payload);
      }

      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold font-display">{initialData ? "Edit Vehicle" : "Add New Vehicle"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition"><X className="h-5 w-5" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-1">Vehicle Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-border rounded-lg px-4 py-2 bg-white">
                <option>Cars</option>
                <option>Luxury Cars</option>
                <option>Van Maxicab</option>
                <option>Bus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-1">Subcategory</label>
              <input type="text" value={formData.subcategory || ""} onChange={e => setFormData({...formData, subcategory: e.target.value})} className="w-full border border-border rounded-lg px-4 py-2" placeholder="e.g. SUV" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">Main Image</label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center relative cursor-pointer hover:bg-muted/50 transition">
              <input type="file" accept="image/*,video/*" onChange={e => e.target.files && setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              {file ? (
                <div className="text-sm font-semibold text-primary text-center">Selected: {file.name}</div>
              ) : formData.img ? (
                <div className="text-sm font-semibold text-center text-muted-foreground">Current: {formData.img}</div>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <Upload className="h-6 w-6 mb-2" />
                  <span className="text-sm">Upload Image/Video</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg border-b pb-2 mb-3">Local Tariff</h3>
            <div className="space-y-2">
              {localTariffPairs.map((pair, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" placeholder="Key (e.g. 5 Hrs 50 Kms)" value={pair.key} onChange={e => handleTariffChange(index, "key", e.target.value)} className="flex-1 border rounded-lg px-3 py-1.5 text-sm" />
                  <input type="text" placeholder="Value (e.g. Rs 2000)" value={pair.value} onChange={e => handleTariffChange(index, "value", e.target.value)} className="flex-1 border rounded-lg px-3 py-1.5 text-sm" />
                  <button type="button" onClick={() => removeTariffRow(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addTariffRow} className="mt-2 text-sm text-primary font-semibold flex items-center gap-1 hover:underline"><Plus className="h-4 w-4"/> Add Row</button>
          </div>

          <div>
            <h3 className="font-bold text-lg border-b pb-2 mb-3">Outstation Tariff</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">A/C (per km)</label>
                <input type="text" value={formData.outstationTariff?.ac || ""} onChange={e => setFormData({...formData, outstationTariff: {...formData.outstationTariff, ac: e.target.value}})} className="w-full border rounded-lg px-3 py-1.5 mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Non A/C (per km)</label>
                <input type="text" value={formData.outstationTariff?.nonAc || ""} onChange={e => setFormData({...formData, outstationTariff: {...formData.outstationTariff, nonAc: e.target.value}})} className="w-full border rounded-lg px-3 py-1.5 mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Batta (per day)</label>
                <input type="text" value={formData.outstationTariff?.batta || ""} onChange={e => setFormData({...formData, outstationTariff: {...formData.outstationTariff, batta: e.target.value}})} className="w-full border rounded-lg px-3 py-1.5 mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Min Kms</label>
                <input type="text" value={formData.outstationTariff?.minKms || ""} onChange={e => setFormData({...formData, outstationTariff: {...formData.outstationTariff, minKms: e.target.value}})} className="w-full border rounded-lg px-3 py-1.5 mt-1" />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg font-semibold border hover:bg-muted transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg font-semibold bg-primary text-white hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Saving..." : "Save Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
