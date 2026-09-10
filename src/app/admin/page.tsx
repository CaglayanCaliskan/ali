"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  Search,
  ExternalLink,
  Download,
  Lock,
  LogOut,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Layers,
  Image as ImageIcon,
  Activity,
  History,
} from "lucide-react";
import { TesbihProduct } from "@/data/products";
import { downloadSvgAsPng, compressImageFile } from "@/lib/clientUtils";
import { AdminLogEntry } from "@/lib/storage";

const DEFAULT_PRODUCT_FORM: TesbihProduct = {
  serial: "",
  certificateNo: "",
  name: "",
  subtitle: "",
  category: "Özel Koleksiyon",
  craftsman: "Ali Sıralıoğlu",
  edition: "Tek ve Eşsiz Parça (1/1)",
  description: "",
  artisanNote: "",
  specs: {
    material: "",
    beadCount: "33 Habbe",
    beadCut: "Beyzi Kesim",
    beadSize: "",
    imame: "",
    tassel: "",
    thread: "İpek İplik",
    weight: "",
    productionYear: new Date().getFullYear().toString(),
    origin: "İstanbul",
  },
  craftSteps: [
    { title: "Malzeme Seçimi & Eşleştirme", description: "En saf ve damarsız kütükler/taşlar özenle ayrıldı." },
    { title: "El Tornası & Şekillendirme", description: "Habbeler eşit mikron hassasiyetiyle el keskisiyle işlendi." },
    { title: "İmame & Püskül Birleşimi", description: "Özel el işi imame ve gümüş püskül donanımı giydirildi." },
  ],
  highlights: [
    "Kişiye Özel Seri Numaralı ve Sertifikalı",
    "El İşçiliği & Usta İmzalı",
  ],
  images: ["/images/product1.jpg"],
  featuredImage: "/images/product1.jpg",
  certificateDate: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const [products, setProducts] = useState<TesbihProduct[]>([]);
  const [logs, setLogs] = useState<AdminLogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "logs">("products");
  const [loading, setLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSerial, setEditingSerial] = useState<string | null>(null);
  const [formData, setFormData] = useState<TesbihProduct>(DEFAULT_PRODUCT_FORM);
  const [formMsg, setFormMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [qrModalProduct, setQrModalProduct] = useState<TesbihProduct | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch admin activity logs
  const fetchLogs = async () => {
    setLogsLoading(true);
    const activePass = storedPassword || localStorage.getItem("ali_admin_pass") || "";
    try {
      const res = await fetch("/api/logs", {
        headers: { "x-admin-password": activePass },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.logs) {
          setLogs(data.logs);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLogsLoading(false);
    }
  };

  // Handle local file picker for product images
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          const compressedBase64 = await compressImageFile(file, 1200, 0.85);
          newImages.push(compressedBase64);
        }
      }

      if (newImages.length > 0) {
        setFormData((prev) => {
          // If previous images were default dummy, replace them; otherwise append
          const existing = prev.images.filter((img) => !img.startsWith("/images/product1.jpg") || prev.images.length > 1);
          const combined = [...existing, ...newImages];
          return {
            ...prev,
            images: combined,
            featuredImage: combined[0] || "/images/product1.jpg",
          };
        });
      }
    } catch (err) {
      console.error("Görsel yüklenirken hata oluştu:", err);
      alert("Görsel işlenirken bir hata oluştu.");
    } finally {
      setIsUploading(false);
      // Reset input value so same files can be re-selected if needed
      e.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const updated = prev.images.filter((_, idx) => idx !== indexToRemove);
      const safeList = updated.length > 0 ? updated : ["/images/product1.jpg"];
      return {
        ...prev,
        images: safeList,
        featuredImage: safeList[0],
      };
    });
  };

  const handleSetFeatured = (imgUrl: string) => {
    setFormData((prev) => {
      const reordered = [imgUrl, ...prev.images.filter((img) => img !== imgUrl)];
      return {
        ...prev,
        images: reordered,
        featuredImage: imgUrl,
      };
    });
  };

  // Check saved session
  useEffect(() => {
    const saved = localStorage.getItem("ali_admin_pass");
    if (saved) {
      setStoredPassword(saved);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch products (with cache buster)
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch admin activity logs (with cache buster)
  const fetchLogs = async () => {
    setLogsLoading(true);
    const activePass = storedPassword || localStorage.getItem("ali_admin_pass") || "";
    try {
      const res = await fetch(`/api/logs?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "x-admin-password": activePass },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.logs) {
          setLogs(data.logs);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLogsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchLogs();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === "logs") {
      fetchLogs();
    }
  }, [activeTab, isAuthenticated]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem("ali_admin_pass", password);
        setStoredPassword(password);
        setIsAuthenticated(true);
      } else {
        setAuthError("Geçersiz yönetici şifresi!");
      }
    } catch {
      setAuthError("Giriş yapılırken bağlantı hatası oluştu.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ali_admin_pass");
    setStoredPassword("");
    setIsAuthenticated(false);
  };

  // Generate Serial Helper
  const generateSerial = () => {
    const year = new Date().getFullYear();
    const count = products.length + 1;
    const padded = String(count).padStart(3, "0");
    const suggestedSerial = `AS-${year}-${padded}`;
    const suggestedCert = `AS-CERT-${Math.floor(1000 + Math.random() * 9000)}`;

    setFormData((prev) => ({
      ...prev,
      serial: suggestedSerial,
      certificateNo: suggestedCert,
    }));
  };

  // Open modal for new product
  const handleNewProduct = () => {
    setEditingSerial(null);
    const newForm = { ...DEFAULT_PRODUCT_FORM };
    const year = new Date().getFullYear();
    const count = products.length + 1;
    newForm.serial = `AS-${year}-${String(count).padStart(3, "0")}`;
    newForm.certificateNo = `AS-CERT-${Math.floor(1000 + Math.random() * 9000)}`;
    newForm.certificateDate = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    setFormData(newForm);
    setFormMsg(null);
    setIsFormOpen(true);
  };

  // Open modal for editing
  const handleEditProduct = (prod: TesbihProduct) => {
    setEditingSerial(prod.serial);
    setFormData(JSON.parse(JSON.stringify(prod)));
    setFormMsg(null);
    setIsFormOpen(true);
  };

  // Save / Update product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg(null);

    if (!formData.serial.trim() || !formData.name.trim()) {
      setFormMsg({ type: "error", text: "Lütfen seri no ve ürün adını doldurunuz." });
      return;
    }

    const activePass = storedPassword || localStorage.getItem("ali_admin_pass") || "";
    const savedProduct = { ...formData, serial: formData.serial.trim().toUpperCase() };

    // 1. Optimistic UI update for instant feel
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.serial === savedProduct.serial);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = savedProduct;
        return copy;
      }
      return [savedProduct, ...prev];
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": activePass,
        },
        body: JSON.stringify(savedProduct),
      });

      if (res.ok) {
        setFormMsg({ type: "success", text: "Ürün başarıyla kaydedildi!" });
        // Refresh products and logs in background
        fetchProducts();
        fetchLogs();
        setTimeout(() => {
          setIsFormOpen(false);
        }, 600);
      } else {
        const d = await res.json();
        setFormMsg({ type: "error", text: d.error || "Kaydedilemedi." });
        // Revert on failure
        fetchProducts();
      }
    } catch {
      setFormMsg({ type: "error", text: "Sunucu hatası oluştu." });
      fetchProducts();
    }
  };

  // Delete product
  const handleDelete = async (serial: string) => {
    if (!confirm(`${serial} seri numaralı ürünü silmek istediğinize emin misiniz?`)) {
      return;
    }

    const activePass = storedPassword || localStorage.getItem("ali_admin_pass") || "";

    // 1. Optimistic UI delete: remove from list instantly without waiting
    setProducts((prev) => prev.filter((p) => p.serial !== serial));

    try {
      const res = await fetch(`/api/products?serial=${encodeURIComponent(serial)}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": activePass,
        },
      });

      if (res.ok) {
        // Refresh logs and products in background
        fetchProducts();
        fetchLogs();
      } else {
        const d = await res.json().catch(() => ({}));
        alert(d.error || "Silme işlemi başarısız oldu.");
        // Rollback state if server failed
        fetchProducts();
      }
    } catch {
      alert("Hata oluştu.");
      fetchProducts();
    }
  };

  // Filtered products
  const filteredProducts = products.filter(
    (p) =>
      p.serial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0d0c0a] text-[#f5f2eb] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#161411] border border-[#c9a45e]/30 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#c9a45e]/15 border border-[#c9a45e]/30 flex items-center justify-center mx-auto text-[#c9a45e]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-light text-[#f5f2eb]">
              Yönetici Girişi
            </h1>
            <p className="text-xs text-[#a69e92]">
              Özel seri numarası ve ürün detaylarını yönetmek için şifrenizi giriniz.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Yönetici Şifresi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d0c0a] border border-[#c9a45e]/30 focus:border-[#c9a45e] text-[#f5f2eb] px-4 py-3 rounded-xl outline-none text-sm placeholder-[#736c62]"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded-lg text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Panele Giriş Yap
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-[#736c62] hover:text-[#c9a45e] transition-colors">
                ← Ana Sayfaya Dön
              </Link>
            </div>
          </form>
        </div>
      </main>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <main className="min-h-screen bg-[#0d0c0a] text-[#f5f2eb] pb-24">
      {/* Top Bar */}
      <header className="border-b border-[#c9a45e]/20 bg-[#161411]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c9a45e]/15 border border-[#c9a45e]/30 flex items-center justify-center text-[#c9a45e]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg text-[#f5f2eb]">
                Ali Sıralıoğlu · Ürün & Seri No Paneli
              </h1>
              <p className="text-[11px] text-[#a69e92]">
                Toplam {products.length} Kayıtlı Özel Eser
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg border border-[#c9a45e]/25 text-xs text-[#d9bf87] hover:bg-[#1c1915] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Siteyi Gör</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs hover:bg-rose-900/50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* Navigation Tabs & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#c9a45e]/15 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#c9a45e] text-[#0d0c0a] shadow-lg"
                  : "bg-[#161411] border border-[#c9a45e]/25 text-[#a69e92] hover:text-[#f5f2eb]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Eserler ({products.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("logs");
                fetchLogs();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "logs"
                  ? "bg-[#c9a45e] text-[#0d0c0a] shadow-lg"
                  : "bg-[#161411] border border-[#c9a45e]/25 text-[#a69e92] hover:text-[#f5f2eb]"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>İşlem Logları ({logs.length})</span>
            </button>
          </div>

          {activeTab === "products" && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search className="w-3.5 h-3.5 text-[#c9a45e] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Seri no veya eser ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#161411] border border-[#c9a45e]/25 focus:border-[#c9a45e] text-[#f5f2eb] pl-9 pr-3 py-2 rounded-xl outline-none text-xs placeholder-[#736c62]"
                />
              </div>

              <button
                onClick={handleNewProduct}
                className="px-4 py-2 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Yeni Eser Ekle</span>
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: PRODUCTS LIST */}
        {activeTab === "products" && (
          <>
            {loading ? (
              <div className="text-center py-20 text-[#a69e92] text-sm">
                Eserler yükleniyor...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-[#c9a45e]/20 rounded-2xl p-8 space-y-3">
                <p className="text-[#a69e92] text-sm">Kayıtlı ürün bulunamadı.</p>
                <button
                  onClick={handleNewProduct}
                  className="text-xs text-[#c9a45e] hover:underline cursor-pointer"
                >
                  Hemen yeni bir eser ekleyin
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((p) => (
                  <div
                    key={p.serial}
                    className="bg-[#161411] border border-[#c9a45e]/20 hover:border-[#c9a45e]/50 rounded-2xl p-5 space-y-4 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#c9a45e]/15 border border-[#c9a45e]/30 text-[#c9a45e] text-[11px] font-mono font-bold">
                          {p.serial}
                        </span>
                        <span className="text-[11px] text-[#736c62]">
                          {p.specs.productionYear}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-lg text-[#f5f2eb] leading-snug line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="text-xs text-[#d9bf87] line-clamp-1 italic font-serif">
                          {p.subtitle || p.category}
                        </p>
                      </div>

                      <p className="text-xs text-[#a69e92] line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="text-[11px] text-[#736c62] space-y-0.5 pt-2 border-t border-[#c9a45e]/10">
                        <div>Malzeme: <span className="text-[#a69e92]">{p.specs.material}</span></div>
                        <div>Habbe: <span className="text-[#a69e92]">{p.specs.beadCount} ({p.specs.beadSize})</span></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#c9a45e]/15 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/urun/${p.serial}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-[#0d0c0a] hover:bg-[#1c1915] border border-[#c9a45e]/20 text-[#c9a45e] text-xs transition-colors"
                          title="Özel Doğrulama Sayfasını Gör"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => setQrModalProduct(p)}
                          className="p-2 rounded-lg bg-[#0d0c0a] hover:bg-[#1c1915] border border-[#c9a45e]/20 text-[#d9bf87] text-xs transition-colors cursor-pointer"
                          title="QR Kod İndir"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="px-3 py-1.5 rounded-lg bg-[#1c1915] hover:bg-[#c9a45e]/20 border border-[#c9a45e]/30 text-[#f5f2eb] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3 text-[#c9a45e]" />
                          <span>Düzenle</span>
                        </button>

                        <button
                          onClick={() => handleDelete(p.serial)}
                          className="p-2 rounded-lg bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/30 text-rose-400 text-xs transition-colors cursor-pointer"
                          title="Eseri Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* TAB 2: AUDIT LOGS LIST */}
        {activeTab === "logs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#f5f2eb] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#c9a45e]" />
                  <span>Admin İşlem Geçmişi (Denetim Kayıtları)</span>
                </h3>
                <p className="text-xs text-[#a69e92]">
                  Yapılan tüm ürün ekleme, güncelleme ve silme işlemleri anlık olarak burada listelenir.
                </p>
              </div>

              <button
                onClick={fetchLogs}
                disabled={logsLoading}
                className="px-3 py-1.5 rounded-xl border border-[#c9a45e]/30 bg-[#161411] hover:bg-[#1c1915] text-[#d9bf87] text-xs transition-colors cursor-pointer"
              >
                {logsLoading ? "Yenileniyor..." : "Yenile"}
              </button>
            </div>

            {logsLoading ? (
              <div className="text-center py-16 text-[#a69e92] text-xs">
                Loglar yükleniyor...
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#c9a45e]/20 rounded-2xl p-8 space-y-2">
                <p className="text-[#a69e92] text-xs">Henüz kayıtlı bir işlem geçmişi bulunmuyor.</p>
              </div>
            ) : (
              <div className="bg-[#161411] border border-[#c9a45e]/20 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1c1915] border-b border-[#c9a45e]/15 text-[#c9a45e] uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4 font-semibold">Tarih / Saat</th>
                        <th className="py-3.5 px-4 font-semibold">İşlem Türü</th>
                        <th className="py-3.5 px-4 font-semibold">Seri No</th>
                        <th className="py-3.5 px-4 font-semibold">Eser Adı</th>
                        <th className="py-3.5 px-4 font-semibold">Detay</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c9a45e]/10 text-[#f5f2eb]">
                      {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#1c1915]/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-[#a69e92] whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                log.action === "CREATE"
                                  ? "bg-emerald-950/70 border border-emerald-800/60 text-emerald-400"
                                  : log.action === "UPDATE"
                                  ? "bg-amber-950/70 border border-amber-800/60 text-amber-400"
                                  : "bg-rose-950/70 border border-rose-800/60 text-rose-400"
                              }`}
                            >
                              {log.action === "CREATE"
                                ? "Yeni Eklendi"
                                : log.action === "UPDATE"
                                ? "Güncellendi"
                                : "Silindi"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-semibold text-[#c9a45e] whitespace-nowrap">
                            {log.serial}
                          </td>
                          <td className="py-3.5 px-4 font-serif font-medium text-[#f5f2eb]">
                            {log.productName}
                          </td>
                          <td className="py-3.5 px-4 text-[#a69e92] max-w-xs truncate">
                            {log.details || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: CREATE / EDIT PRODUCT */}
      {isFormOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0d0c0a]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in"
        >
          <div
            className="bg-[#161411] border border-[#c9a45e]/40 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative my-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#c9a45e]/20 flex items-center justify-between bg-[#1c1915]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c9a45e]" />
                <h3 className="font-serif text-lg text-[#f5f2eb]">
                  {editingSerial ? `Eseri Düzenle (${editingSerial})` : "Yeni Özel Eser Tanımla"}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-[#a69e92] hover:text-[#f5f2eb] hover:bg-[#161411] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              {formMsg && (
                <div
                  className={`p-3 rounded-xl flex items-center gap-2 ${
                    formMsg.type === "success"
                      ? "bg-emerald-950/50 border border-emerald-800/40 text-emerald-300"
                      : "bg-rose-950/50 border border-rose-800/40 text-rose-300"
                  }`}
                >
                  {formMsg.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{formMsg.text}</span>
                </div>
              )}

              {/* 1. Seri No & Başlık */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-[#c9a45e] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Temel Kimlik & Seri Numarası
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] text-[#a69e92] uppercase">Seri Numarası *</label>
                      {!editingSerial && (
                        <button
                          type="button"
                          onClick={generateSerial}
                          className="text-[11px] text-[#c9a45e] hover:underline"
                        >
                          Öneri Üret
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.serial}
                      onChange={(e) => setFormData({ ...formData, serial: e.target.value.toUpperCase() })}
                      placeholder="Örn: AS-2024-005"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] font-mono outline-none focus:border-[#c9a45e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Sertifika No</label>
                    <input
                      type="text"
                      value={formData.certificateNo}
                      onChange={(e) => setFormData({ ...formData, certificateNo: e.target.value })}
                      placeholder="Örn: AS-CERT-9405"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] font-mono outline-none focus:border-[#c9a45e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Eser / Ürün Adı *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Örn: Zümrüt-ü Anka · Damla Kehribar"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                    >
                      <option value="Kehribar">Kehribar</option>
                      <option value="Doğal Ağaç">Doğal Ağaç</option>
                      <option value="Değerli Taş">Değerli Taş</option>
                      <option value="Özel Koleksiyon">Özel Koleksiyon</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Alt Başlık / Vurgu Cümlesi</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Örn: Milyon Yıllık Fosilleşmiş Çam Reçinesi & 925 Ayar Kazaziye"
                    className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Eser Hikayesi / Açıklaması</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Eserin oluşumu, menşei ve anlamı..."
                    className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 p-3 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Ustanın Notu (Ali Sıralıoğlu)</label>
                  <textarea
                    rows={2}
                    value={formData.artisanNote}
                    onChange={(e) => setFormData({ ...formData, artisanNote: e.target.value })}
                    placeholder="Bu eseri işlerken ustanın duygu ve düşünceleri..."
                    className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 p-3 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                  />
                </div>
              </div>

              {/* 2. Malzeme ve Teknik Detaylar */}
              <div className="space-y-4 pt-4 border-t border-[#c9a45e]/15">
                <h4 className="text-xs uppercase tracking-wider text-[#c9a45e] font-semibold flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  Teknik ve Malzeme Özellikleri
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Ana Malzeme</label>
                    <input
                      type="text"
                      value={formData.specs.material}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, material: e.target.value } })}
                      placeholder="Örn: Baltık Damla Kehribar"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Habbe Ölçüsü</label>
                    <input
                      type="text"
                      value={formData.specs.beadSize}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, beadSize: e.target.value } })}
                      placeholder="Örn: 11.5 x 8.5 mm"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Habbe Kesimi</label>
                    <input
                      type="text"
                      value={formData.specs.beadCut}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, beadCut: e.target.value } })}
                      placeholder="Örn: Beyzi (Yumurta) Kesim"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Net Ağırlık</label>
                    <input
                      type="text"
                      value={formData.specs.weight}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, weight: e.target.value } })}
                      placeholder="Örn: 42.8 Gram"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">İmame & Hitame İşçiliği</label>
                    <input
                      type="text"
                      value={formData.specs.imame}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, imame: e.target.value } })}
                      placeholder="Örn: Yekpare Kehribar & İnce Gümüş Kakma"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-[#a69e92] uppercase block mb-1">Püskül & Donanım</label>
                    <input
                      type="text"
                      value={formData.specs.tassel}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, tassel: e.target.value } })}
                      placeholder="Örn: 925 Ayar Kazaziye El Örmesi Gümüş Püskül"
                      className="w-full bg-[#0d0c0a] border border-[#c9a45e]/25 px-3 py-2 rounded-xl text-[#f5f2eb] outline-none focus:border-[#c9a45e]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Görseller */}
              <div className="space-y-4 pt-4 border-t border-[#c9a45e]/15">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider text-[#c9a45e] font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    Eser Fotoğrafları
                  </h4>
                  <span className="text-[11px] text-[#a69e92]">
                    {formData.images.length} Fotoğraf Yüklendi
                  </span>
                </div>

                {/* File Upload Zone */}
                <div className="border-2 border-dashed border-[#c9a45e]/30 hover:border-[#c9a45e] rounded-2xl p-6 text-center bg-[#0d0c0a]/60 hover:bg-[#0d0c0a] transition-all">
                  <input
                    id="admin-image-upload-input"
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleImageFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#c9a45e]/15 border border-[#c9a45e]/30 flex items-center justify-center text-[#c9a45e]">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-[#f5f2eb]">
                        {isUploading ? "Fotoğraflar işleniyor ve optimize ediliyor..." : "Bilgisayarınızdan Fotoğraf Ekleyin"}
                      </p>
                      <p className="text-[11px] text-[#736c62] mt-1">
                        JPG, PNG veya WEBP (Birden fazla dosya seçebilirsiniz)
                      </p>
                    </div>

                    <label
                      htmlFor="admin-image-upload-input"
                      className="px-4 py-2 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer transition-colors shadow-md flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isUploading ? "Yükleniyor..." : "Dosya Seç"}</span>
                    </label>
                  </div>
                </div>

                {/* Uploaded Images Preview Grid */}
                {formData.images.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-[11px] text-[#a69e92] uppercase block">
                      Yüklü Fotoğraflar (Kapak yapmak için fotoğrafa tıklayabilirsiniz):
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {formData.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`relative aspect-square rounded-xl overflow-hidden bg-[#0d0c0a] border group transition-all ${
                            formData.featuredImage === img || (idx === 0 && !formData.featuredImage)
                              ? "border-[#c9a45e] ring-2 ring-[#c9a45e]/40 shadow-lg"
                              : "border-[#c9a45e]/20 hover:border-[#c9a45e]/50"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Eser görseli ${idx + 1}`}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => handleSetFeatured(img)}
                          />

                          {/* Featured badge */}
                          {(formData.featuredImage === img || (idx === 0 && !formData.featuredImage)) && (
                            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#c9a45e] text-[#0d0c0a] text-[9px] font-bold uppercase tracking-wider">
                              Kapak
                            </div>
                          )}

                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(idx);
                            }}
                            className="absolute top-1.5 right-1.5 p-1 rounded-md bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 transition-all opacity-80 hover:opacity-100"
                            title="Fotoğrafı Kaldır"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-[#c9a45e]/20 flex items-center justify-end gap-3 sticky bottom-0 bg-[#161411] py-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#c9a45e]/25 text-xs text-[#a69e92] hover:text-[#f5f2eb] transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingSerial ? "Değişiklikleri Kaydet" : "Eseri Sisteme Ekle"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QR DOWNLOAD / PRINT */}
      {qrModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0d0c0a]/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in"
          onClick={() => setQrModalProduct(null)}
        >
          <div
            className="bg-[#161411] border border-[#c9a45e]/40 p-8 rounded-3xl max-w-sm w-full text-center space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a45e] font-semibold">
                Sertifika QR Kartı
              </span>
              <h3 className="font-serif text-2xl text-[#f5f2eb]">
                {qrModalProduct.name}
              </h3>
              <p className="text-xs font-mono text-[#d9bf87]">
                Seri: {qrModalProduct.serial}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl inline-block shadow-inner">
              <QRCodeSVG
                id="product-qr-svg"
                value={typeof window !== "undefined" ? `${window.location.origin}/urun/${qrModalProduct.serial}` : `https://alisiralioglu.com/urun/${qrModalProduct.serial}`}
                size={200}
                level="H"
              />
            </div>

            <p className="text-xs text-[#a69e92] font-light leading-relaxed">
              Müşteri bu QR kodu okuttuğunda doğrudan bu esere özel hazırlanan doğrulama ve detay sayfasına gidecektir.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  downloadSvgAsPng("product-qr-svg", `QR-${qrModalProduct.serial}.png`);
                }}
                className="w-full py-2.5 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>QR Kodu İndir (PNG)</span>
              </button>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setQrModalProduct(null)}
                  className="flex-1 py-2 border border-[#c9a45e]/30 text-xs uppercase tracking-wider rounded-xl text-[#a69e92] hover:text-[#f5f2eb]"
                >
                  Kapat
                </button>
                <Link
                  href={`/urun/${qrModalProduct.serial}`}
                  target="_blank"
                  className="flex-1 py-2 bg-[#1c1915] hover:bg-[#c9a45e]/20 border border-[#c9a45e]/30 text-[#d9bf87] text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <span>Sayfayı Gör</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
