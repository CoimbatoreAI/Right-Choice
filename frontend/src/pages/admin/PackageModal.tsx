import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { api, UPLOADS_URL } from "@/lib/api";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
}

export function PackageModal({ isOpen, onClose, onSave, initialData }: PackageModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    days: "",
    price: "",
    img: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", days: "", price: "", img: "" });
    }
    setFile(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

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

      const payload = { ...formData, img: finalImg };

      if (initialData?._id) {
        await api.put(`/packages/${initialData._id}`, payload);
      } else {
        await api.post("/packages", payload);
      }

      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold font-display">{initialData ? "Edit Package" : "Add New Package"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition"><X className="h-5 w-5" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">Package Name</label>
            <input 
              required type="text" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border border-border rounded-lg px-4 py-2 outline-none focus:border-primary"
              placeholder="e.g. Ooty"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">Duration (Days)</label>
            <input 
              required type="text" 
              value={formData.days} onChange={e => setFormData({...formData, days: e.target.value})}
              className="w-full border border-border rounded-lg px-4 py-2 outline-none focus:border-primary"
              placeholder="e.g. 4 Days / 3 Nights"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">Price</label>
            <input 
              required type="text" 
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full border border-border rounded-lg px-4 py-2 outline-none focus:border-primary"
              placeholder="e.g. Rs. 34,800"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-1">Thumbnail Image</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center relative cursor-pointer hover:bg-muted/50 transition">
              <input 
                type="file" 
                accept="image/*"
                onChange={e => e.target.files && setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {file ? (
                <div className="text-sm font-semibold text-primary text-center">
                  Selected: {file.name} <br/> (Click to change)
                </div>
              ) : formData.img ? (
                <div className="text-sm font-semibold text-center">
                  Current: {formData.img} <br/> (Click to change)
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium text-muted-foreground">Click or drag image to upload</span>
                </>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t border-border flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg font-semibold border border-border hover:bg-muted transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Saving..." : "Save Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
