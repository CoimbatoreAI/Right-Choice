import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, UPLOADS_URL } from "@/lib/api";
import { Helmet } from "react-helmet-async";
import { LogOut, Plus, Trash2, Edit } from "lucide-react";
import { VehicleModal } from "./VehicleModal";
import { PackageModal } from "./PackageModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"vehicles" | "packages">("vehicles");
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [isPackageModalOpen, setPackageModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vRes, pRes] = await Promise.all([
        api.get("/vehicles"),
        api.get("/packages")
      ]);
      setVehicles(vRes.data);
      setPackages(pRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await api.delete(`/vehicles/${id}`);
      fetchData();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      await api.delete(`/packages/${id}`);
      fetchData();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const getImgUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("/uploads/")) return `${UPLOADS_URL}${path}`;
    return path; // static assets
  };

  const handleAdd = () => {
    setEditingItem(null);
    if (activeTab === "vehicles") setVehicleModalOpen(true);
    else setPackageModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    if (activeTab === "vehicles") setVehicleModalOpen(true);
    else setPackageModalOpen(true);
  };

  // Group vehicles by category
  const groupedVehicles = vehicles.reduce((acc: Record<string, any[]>, v) => {
    const cat = v.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(v);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-muted/20">
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      
      <header className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-10 object-contain" />
            <div className="h-6 w-px bg-border" />
            <h1 className="font-display font-bold text-lg hidden sm:block">Admin Dashboard</h1>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-4 mb-8 border-b border-border">
          <button 
            className={`pb-4 px-2 font-semibold text-sm border-b-2 transition ${activeTab === "vehicles" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab("vehicles")}
          >
            Manage Fleet
          </button>
          <button 
            className={`pb-4 px-2 font-semibold text-sm border-b-2 transition ${activeTab === "packages" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab("packages")}
          >
            Manage Packages
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground">Loading data...</div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-display">{activeTab === "vehicles" ? "Fleet Vehicles" : "Tour Packages"}</h2>
              <button 
                onClick={handleAdd}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition"
              >
                <Plus className="h-4 w-4" /> Add New
              </button>
            </div>

            {activeTab === "vehicles" ? (
              <div className="space-y-12">
                {Object.entries(groupedVehicles).map(([category, items]: [string, any]) => (
                  <div key={category}>
                    <h3 className="text-xl font-bold font-display mb-4 pb-2 border-b border-border">{category}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((v: any) => (
                        <div key={v._id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col group">
                          <div className="aspect-video relative overflow-hidden bg-secondary">
                            {v.img?.endsWith(".mp4") ? (
                              <video src={getImgUrl(v.img)} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                            ) : (
                              <img src={getImgUrl(v.img)} alt={v.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{v.category} &bull; {v.subcategory}</div>
                            <h3 className="font-display font-bold text-lg mb-4">{v.name}</h3>
                            
                            <div className="mt-auto pt-4 border-t border-border flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                              <button onClick={() => handleEdit(v)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="h-4 w-4" /></button>
                              <button onClick={() => handleDeleteVehicle(v._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map(p => (
                  <div key={p._id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col group">
                    <div className="aspect-video relative overflow-hidden bg-secondary">
                      <img src={getImgUrl(p.img)} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-lg">{p.name}</h3>
                      <div className="text-sm font-medium text-muted-foreground mt-1">{p.days}</div>
                      <div className="font-bold text-primary mt-2">{p.price}</div>
                      
                      <div className="mt-auto pt-4 border-t border-border flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button onClick={() => handleEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="h-4 w-4" /></button>
                        <button onClick={() => handleDeletePackage(p._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <VehicleModal 
        isOpen={isVehicleModalOpen} 
        onClose={() => setVehicleModalOpen(false)} 
        onSave={fetchData} 
        initialData={editingItem} 
      />
      
      <PackageModal 
        isOpen={isPackageModalOpen} 
        onClose={() => setPackageModalOpen(false)} 
        onSave={fetchData} 
        initialData={editingItem} 
      />
    </div>
  );
}
