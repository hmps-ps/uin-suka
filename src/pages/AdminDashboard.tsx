// ============================================
// FILE: src/pages/AdminDashboard.tsx
// DESKRIPSI: Dashboard Admin Komprehensif untuk mengelola semua konten
// ============================================
// Tab Berita: Kelola berita (CRUD) + Edit Tanggal
// Tab Galeri: Kelola foto galeri (CRUD) + Edit Tanggal
// Tab Divisi: Kelola divisi, anggota, dan program kerja
// Tab Pesan: Lihat & kelola pesan dari pengunjung
// Tab Footer: Kelola konten footer website
// ============================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, News, Gallery, Contact, Division, Member, WorkProgram, FooterSettings } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, Plus, Edit, Trash2, Newspaper, Image, Users, Mail, 
  LayoutDashboard, User, FileText, CheckCircle, Settings, Eye, EyeOff,
  Calendar
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // === STATE UNTUK SEMUA DATA ===
  const [news, setNews] = useState<News[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [workPrograms, setWorkPrograms] = useState<WorkProgram[]>([]);
  const [footerSettings, setFooterSettings] = useState<FooterSettings | null>(null);
  
  // === STATE UNTUK DIALOG ===
  const [showNewsDialog, setShowNewsDialog] = useState(false);
  const [showGalleryDialog, setShowGalleryDialog] = useState(false);
  const [showDivisionDialog, setShowDivisionDialog] = useState(false);
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [showProgramDialog, setShowProgramDialog] = useState(false);
  
  // === STATE UNTUK EDITING ===
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [editingDivision, setEditingDivision] = useState<Division | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editingProgram, setEditingProgram] = useState<WorkProgram | null>(null);
  
  // === STATE UNTUK DIVISI YANG DIPILIH ===
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>("");

  // === FORM STATE - DENGAN TANGGAL ===
  const [newsForm, setNewsForm] = useState({ title: "", slug: "", image_url: "", content: "", created_at: "" });
  const [galleryForm, setGalleryForm] = useState({ image_url: "", caption: "", created_at: "" });
  const [divisionForm, setDivisionForm] = useState({ name: "", slug: "", description: "", icon: "Users", color: "primary" });
  const [memberForm, setMemberForm] = useState({ division_id: "", name: "", photo_url: "", biro: "", angkatan: "", is_head: false, role: "member" as "head" | "member" | "staff", position_order: 1 });
  const [programForm, setProgramForm] = useState({ division_id: "", program_name: "", person_in_charge: "", realization: "Belum", order_number: 1 });
  
  // === FOOTER FORM STATE ===
  const [footerForm, setFooterForm] = useState({
    org_name: "HMPS Perbankan Syariah",
    org_description: "",
    address: "",
    email: "",
    phone: "",
    instagram_url: "",
    youtube_url: "",
    linkedin_url: "",
    tiktok_url: "",
    twitter_url: "",
    whatsapp_url: "",
    contact_email: "",
    logo_url: "",
    maps_embed_url: "",
    copyright_text: ""
  });

  // === STATISTICS ===
  const [stats, setStats] = useState({ news: 0, gallery: 0, divisions: 0, contacts: 0, unreadContacts: 0 });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
    fetchAllData();
  }, [navigate]);

  // === FETCH SEMUA DATA ===
  const fetchAllData = async () => {
    const [newsData, galleryData, contactsData, divisionsData, membersData, programsData, footerData] = await Promise.all([
      supabase.from("news").select("*").order("created_at", { ascending: false }),
      supabase.from("gallery").select("*").order("created_at", { ascending: false }),
      supabase.from("contacts").select("*").order("created_at", { ascending: false }),
      supabase.from("divisions").select("*").order("created_at", { ascending: true }),
      supabase.from("members").select("*").order("position_order", { ascending: true }),
      supabase.from("work_programs").select("*").order("order_number", { ascending: true }),
      supabase.from("footer_settings").select("*").maybeSingle(),
    ]);

    if (newsData.data) setNews(newsData.data);
    if (galleryData.data) setGallery(galleryData.data);
    if (contactsData.data) setContacts(contactsData.data);
    if (divisionsData.data) {
      setDivisions(divisionsData.data);
      if (divisionsData.data.length > 0 && !selectedDivisionId) {
        setSelectedDivisionId(divisionsData.data[0].id);
      }
    }
    if (membersData.data) setMembers(membersData.data);
    if (programsData.data) setWorkPrograms(programsData.data);
    if (footerData.data) {
      setFooterSettings(footerData.data);
      setFooterForm({
        org_name: footerData.data.org_name || "HMPS Perbankan Syariah",
        org_description: footerData.data.org_description || "",
        address: footerData.data.address || "",
        email: footerData.data.email || "",
        phone: footerData.data.phone || "",
        instagram_url: footerData.data.instagram_url || "",
        youtube_url: footerData.data.youtube_url || "",
          linkedin_url: footerData.data.linkedin_url || "",
          tiktok_url: footerData.data.tiktok_url || "",
          twitter_url: footerData.data.twitter_url || "",
          whatsapp_url: footerData.data.whatsapp_url || "",
          contact_email: footerData.data.contact_email || "",
          logo_url: footerData.data.logo_url || "",
          maps_embed_url: footerData.data.maps_embed_url || "",
          copyright_text: footerData.data.copyright_text || ""
      });
    }

    // Update statistics
    const unreadCount = contactsData.data?.filter((c: Contact) => !c.is_read).length || 0;
    setStats({
      news: newsData.data?.length || 0,
      gallery: galleryData.data?.length || 0,
      divisions: divisionsData.data?.length || 0,
      contacts: contactsData.data?.length || 0,
      unreadContacts: unreadCount,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_username");
    toast.success("Logout berhasil");
    navigate("/admin/login");
  };

  // ============================================
  // HANDLER UNTUK BERITA - DENGAN TANGGAL
  // ============================================
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      title: newsForm.title,
      slug: newsForm.slug,
      image_url: newsForm.image_url,
      content: newsForm.content,
      created_at: newsForm.created_at || new Date().toISOString()
    };
    
    if (editingNews) {
      const { error } = await supabase.from("news").update(submitData).eq("id", editingNews.id);
      if (!error) {
        toast.success("Berita berhasil diupdate");
        setShowNewsDialog(false);
        setEditingNews(null);
        setNewsForm({ title: "", slug: "", image_url: "", content: "", created_at: "" });
        fetchAllData();
      } else {
        toast.error("Gagal mengupdate berita");
      }
    } else {
      const { error } = await supabase.from("news").insert([submitData]);
      if (!error) {
        toast.success("Berita berhasil ditambahkan");
        setShowNewsDialog(false);
        setNewsForm({ title: "", slug: "", image_url: "", content: "", created_at: "" });
        fetchAllData();
      } else {
        toast.error("Gagal menambahkan berita");
      }
    }
  };

  const deleteNews = async (id: string) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (!error) {
        toast.success("Berita berhasil dihapus");
        fetchAllData();
      }
    }
  };

  const openEditNews = (item: News) => {
    setEditingNews(item);
    setNewsForm({ 
      title: item.title, 
      slug: item.slug, 
      image_url: item.image_url, 
      content: item.content,
      created_at: item.created_at.split('T')[0] // Format untuk input date
    });
    setShowNewsDialog(true);
  };

  // ============================================
  // HANDLER UNTUK GALERI - DENGAN TANGGAL
  // ============================================
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      image_url: galleryForm.image_url,
      caption: galleryForm.caption,
      created_at: galleryForm.created_at ? new Date(galleryForm.created_at).toISOString() : new Date().toISOString()
    };
    
    if (editingGallery) {
      const { error } = await supabase.from("gallery").update(submitData).eq("id", editingGallery.id);
      if (!error) {
        toast.success("Galeri berhasil diupdate");
        setShowGalleryDialog(false);
        setEditingGallery(null);
        setGalleryForm({ image_url: "", caption: "", created_at: "" });
        fetchAllData();
      }
    } else {
      const { error } = await supabase.from("gallery").insert([submitData]);
      if (!error) {
        toast.success("Foto berhasil ditambahkan");
        setShowGalleryDialog(false);
        setGalleryForm({ image_url: "", caption: "", created_at: "" });
        fetchAllData();
      }
    }
  };

  const deleteGallery = async (id: string) => {
    if (confirm("Yakin ingin menghapus foto ini?")) {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (!error) {
        toast.success("Foto berhasil dihapus");
        fetchAllData();
      }
    }
  };

  const openEditGallery = (item: Gallery) => {
    setEditingGallery(item);
    setGalleryForm({ 
      image_url: item.image_url, 
      caption: item.caption,
      created_at: item.created_at.split('T')[0]
    });
    setShowGalleryDialog(true);
  };

  // ============================================
  // HANDLER UNTUK DIVISI
  // ============================================
  const handleDivisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDivision) {
      const { error } = await supabase.from("divisions").update(divisionForm).eq("id", editingDivision.id);
      if (!error) {
        toast.success("Divisi berhasil diupdate");
        setShowDivisionDialog(false);
        setEditingDivision(null);
        setDivisionForm({ name: "", slug: "", description: "", icon: "Users", color: "primary" });
        fetchAllData();
      }
    } else {
      const { error } = await supabase.from("divisions").insert([divisionForm]);
      if (!error) {
        toast.success("Divisi berhasil ditambahkan");
        setShowDivisionDialog(false);
        setDivisionForm({ name: "", slug: "", description: "", icon: "Users", color: "primary" });
        fetchAllData();
      }
    }
  };

  const deleteDivision = async (id: string) => {
    if (confirm("Yakin ingin menghapus divisi ini? Semua anggota dan program kerja akan ikut terhapus.")) {
      const { error } = await supabase.from("divisions").delete().eq("id", id);
      if (!error) {
        toast.success("Divisi berhasil dihapus");
        fetchAllData();
      }
    }
  };

  const openEditDivision = (item: Division) => {
    setEditingDivision(item);
    setDivisionForm({ name: item.name, slug: item.slug, description: item.description, icon: item.icon, color: item.color });
    setShowDivisionDialog(true);
  };

  // ============================================
  // HANDLER UNTUK ANGGOTA
  // ============================================
  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { ...memberForm, division_id: selectedDivisionId };
    
    if (editingMember) {
      const { error } = await supabase.from("members").update(formData).eq("id", editingMember.id);
      if (!error) {
      toast.success("Anggota berhasil diupdate");
        setShowMemberDialog(false);
        setEditingMember(null);
        setMemberForm({ division_id: "", name: "", photo_url: "", biro: "", angkatan: "", is_head: false, role: "member", position_order: 1 });
        fetchAllData();
      }
    } else {
      const { error } = await supabase.from("members").insert([formData]);
      if (!error) {
      toast.success("Anggota berhasil ditambahkan");
        setShowMemberDialog(false);
        setMemberForm({ division_id: "", name: "", photo_url: "", biro: "", angkatan: "", is_head: false, role: "member", position_order: 1 });
        fetchAllData();
      }
    }
  };

  const deleteMember = async (id: string) => {
    if (confirm("Yakin ingin menghapus anggota ini?")) {
      const { error } = await supabase.from("members").delete().eq("id", id);
      if (!error) {
        toast.success("Anggota berhasil dihapus");
        fetchAllData();
      }
    }
  };

  const openEditMember = (item: Member) => {
    setEditingMember(item);
    setMemberForm({ 
      division_id: item.division_id, 
      name: item.name, 
      photo_url: item.photo_url, 
      biro: item.biro, 
      angkatan: item.angkatan, 
      is_head: item.is_head, 
      role: item.role || "member",
      position_order: item.position_order 
    });
    setShowMemberDialog(true);
  };

  // ============================================
  // HANDLER UNTUK PROGRAM KERJA
  // ============================================
  const handleProgramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { ...programForm, division_id: selectedDivisionId };
    
    if (editingProgram) {
      const { error } = await supabase.from("work_programs").update(formData).eq("id", editingProgram.id);
      if (!error) {
        toast.success("Program kerja berhasil diupdate");
        setShowProgramDialog(false);
        setEditingProgram(null);
        setProgramForm({ division_id: "", program_name: "", person_in_charge: "", realization: "Belum", order_number: 1 });
        fetchAllData();
      }
    } else {
      const { error } = await supabase.from("work_programs").insert([formData]);
      if (!error) {
        toast.success("Program kerja berhasil ditambahkan");
        setShowProgramDialog(false);
        setProgramForm({ division_id: "", program_name: "", person_in_charge: "", realization: "Belum", order_number: 1 });
        fetchAllData();
      }
    }
  };

  const deleteProgram = async (id: string) => {
    if (confirm("Yakin ingin menghapus program kerja ini?")) {
      const { error } = await supabase.from("work_programs").delete().eq("id", id);
      if (!error) {
        toast.success("Program kerja berhasil dihapus");
        fetchAllData();
      }
    }
  };

  const openEditProgram = (item: WorkProgram) => {
    setEditingProgram(item);
    setProgramForm({ 
      division_id: item.division_id, 
      program_name: item.program_name, 
      person_in_charge: item.person_in_charge, 
      realization: item.realization, 
      order_number: item.order_number 
    });
    setShowProgramDialog(true);
  };

  // ============================================
  // HANDLER UNTUK KONTAK/PESAN
  // ============================================
  const toggleContactRead = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from("contacts").update({ is_read: !currentStatus }).eq("id", id);
    if (!error) {
      toast.success(currentStatus ? "Ditandai belum dibaca" : "Ditandai sudah dibaca");
      fetchAllData();
    }
  };

  const deleteContact = async (id: string) => {
    if (confirm("Yakin ingin menghapus pesan ini?")) {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (!error) {
        toast.success("Pesan berhasil dihapus");
        fetchAllData();
      }
    }
  };

  // ============================================
  // HANDLER UNTUK FOOTER SETTINGS
  // ============================================
  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...footerForm,
      updated_at: new Date().toISOString()
    };

    if (footerSettings?.id) {
      const { error } = await supabase.from("footer_settings").update(submitData).eq("id", footerSettings.id);
      if (!error) {
        toast.success("Pengaturan footer berhasil diupdate");
        fetchAllData();
      } else {
        toast.error("Gagal mengupdate footer");
      }
    } else {
      const { error } = await supabase.from("footer_settings").insert([submitData]);
      if (!error) {
        toast.success("Pengaturan footer berhasil disimpan");
        fetchAllData();
      } else {
        toast.error("Gagal menyimpan footer");
      }
    }
  };

  // Filter members dan programs berdasarkan divisi yang dipilih
  const filteredMembers = members.filter(m => m.division_id === selectedDivisionId);
  const filteredPrograms = workPrograms.filter(p => p.division_id === selectedDivisionId);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ============================================ */}
      {/* HEADER DASHBOARD */}
      {/* ============================================ */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Dashboard Admin</h1>
                <p className="text-primary-foreground/80 text-sm">HMPS Perbankan Syariah</p>
              </div>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* STATISTICS CARDS */}
      {/* ============================================ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Stat Card - Berita */}
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Berita</p>
                <p className="text-3xl font-bold text-foreground">{stats.news}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Newspaper className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Stat Card - Galeri */}
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Galeri</p>
                <p className="text-3xl font-bold text-foreground">{stats.gallery}</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-full">
                <Image className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </div>
          
          {/* Stat Card - Divisi */}
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Divisi</p>
                <p className="text-3xl font-bold text-foreground">{stats.divisions}</p>
              </div>
              <div className="p-3 bg-accent/20 rounded-full">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </div>
          
          {/* Stat Card - Pesan */}
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pesan Masuk</p>
                <p className="text-3xl font-bold text-foreground">{stats.contacts}</p>
                {stats.unreadContacts > 0 && (
                  <p className="text-xs text-destructive font-medium">{stats.unreadContacts} belum dibaca</p>
                )}
              </div>
              <div className="p-3 bg-green-500/20 rounded-full">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Stat Card - Settings */}
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Footer</p>
                <p className="text-lg font-bold text-foreground">{footerSettings ? "Aktif" : "Belum diatur"}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-full">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* TABS UNTUK MENGELOLA KONTEN */}
        {/* ============================================ */}
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl bg-card border border-border">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">Berita</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Galeri</span>
            </TabsTrigger>
            <TabsTrigger value="divisions" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Divisi</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2 relative">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Pesan</span>
              {stats.unreadContacts > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {stats.unreadContacts}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Footer</span>
            </TabsTrigger>
          </TabsList>

          {/* ============================================ */}
          {/* TAB BERITA - DENGAN TANGGAL */}
          {/* ============================================ */}
          <TabsContent value="news" className="mt-6">
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  Kelola Berita
                </h2>
                <Button onClick={() => {
                  setEditingNews(null);
                  setNewsForm({ title: "", slug: "", image_url: "", content: "", created_at: new Date().toISOString().split('T')[0] });
                  setShowNewsDialog(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Berita
                </Button>
              </div>

              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="bg-muted/50 p-4 rounded-lg flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      <img src={item.image_url} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{item.slug}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditNews(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteNews(item.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {news.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Belum ada berita</p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ============================================ */}
          {/* TAB GALERI - DENGAN TANGGAL */}
          {/* ============================================ */}
          <TabsContent value="gallery" className="mt-6">
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Image className="h-5 w-5 text-secondary" />
                  Kelola Galeri
                </h2>
                <Button onClick={() => {
                  setEditingGallery(null);
                  setGalleryForm({ image_url: "", caption: "", created_at: new Date().toISOString().split('T')[0] });
                  setShowGalleryDialog(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Foto
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-muted/50 rounded-lg overflow-hidden">
                    <img src={item.image_url} alt={item.caption} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <p className="text-sm mb-1 line-clamp-2">{item.caption}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.created_at).toLocaleDateString('id-ID')}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditGallery(item)} className="flex-1">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteGallery(item.id)} className="flex-1 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && (
                  <p className="col-span-full text-center text-muted-foreground py-8">Belum ada foto di galeri</p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ============================================ */}
          {/* TAB DIVISI */}
          {/* ============================================ */}
          <TabsContent value="divisions" className="mt-6 space-y-6">
            {/* Kelola Divisi */}
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Kelola Divisi
                </h2>
                <Button onClick={() => {
                  setEditingDivision(null);
                  setDivisionForm({ name: "", slug: "", description: "", icon: "Users", color: "primary" });
                  setShowDivisionDialog(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Divisi
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {divisions.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedDivisionId === item.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-muted/50 hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedDivisionId(item.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); openEditDivision(item); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); deleteDivision(item.id); }} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {divisions.length === 0 && (
                  <p className="col-span-full text-center text-muted-foreground py-8">Belum ada divisi</p>
                )}
              </div>
            </div>

            {/* Kelola Anggota Divisi */}
            {selectedDivisionId && (
              <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-secondary" />
                    Anggota Divisi: {divisions.find(d => d.id === selectedDivisionId)?.name}
                  </h2>
                  <Button onClick={() => {
                    setEditingMember(null);
                    setMemberForm({ division_id: selectedDivisionId, name: "", photo_url: "", biro: "", angkatan: "", is_head: false, role: "member", position_order: filteredMembers.length + 1 });
                    setShowMemberDialog(true);
                  }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Anggota
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMembers.map((item) => (
                    <div key={item.id} className={`bg-muted/50 rounded-lg p-4 text-center ${item.role === 'head' ? 'ring-2 ring-secondary' : ''}`}>
                      <img src={item.photo_url} alt={item.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-primary/20" />
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
                        item.role === 'head' ? 'bg-secondary text-secondary-foreground' :
                        item.role === 'staff' ? 'bg-muted text-muted-foreground' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {item.role === 'head' ? 'Kepala' : item.role === 'staff' ? 'Staff' : 'Anggota'}
                      </span>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-primary">{item.biro}</p>
                      <p className="text-xs text-muted-foreground">Angkatan {item.angkatan}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" onClick={() => openEditMember(item)} className="flex-1">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteMember(item.id)} className="flex-1 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredMembers.length === 0 && (
                    <p className="col-span-full text-center text-muted-foreground py-8">Belum ada anggota di divisi ini</p>
                  )}
                </div>
              </div>
            )}

            {/* Kelola Program Kerja */}
            {selectedDivisionId && (
              <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent-foreground" />
                    Program Kerja: {divisions.find(d => d.id === selectedDivisionId)?.name}
                  </h2>
                  <Button onClick={() => {
                    setEditingProgram(null);
                    setProgramForm({ division_id: selectedDivisionId, program_name: "", person_in_charge: "", realization: "Belum", order_number: filteredPrograms.length + 1 });
                    setShowProgramDialog(true);
                  }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Program
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">No</TableHead>
                      <TableHead>Program Kerja</TableHead>
                      <TableHead>Penanggung Jawab</TableHead>
                      <TableHead className="text-center">Realisasi</TableHead>
                      <TableHead className="w-24">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{item.program_name}</TableCell>
                        <TableCell>{item.person_in_charge}</TableCell>
                        <TableCell className="text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.realization === "Terlaksana" ? "bg-green-100 text-green-800" :
                            item.realization === "Proses" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {item.realization}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => openEditProgram(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => deleteProgram(item.id)} className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPrograms.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Belum ada program kerja di divisi ini
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* ============================================ */}
          {/* TAB PESAN - DENGAN AKSI BACA/HAPUS */}
          {/* ============================================ */}
          <TabsContent value="contacts" className="mt-6">
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                Pesan Masuk
                {stats.unreadContacts > 0 && (
                  <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                    {stats.unreadContacts} baru
                  </span>
                )}
              </h2>
              <div className="space-y-4">
                {contacts.map((item) => (
                  <div key={item.id} className={`p-4 rounded-lg border transition-all ${item.is_read ? 'bg-muted/30 border-border' : 'bg-primary/5 border-primary/30'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        {!item.is_read && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">Baru</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <Button size="sm" variant="ghost" onClick={() => toggleContactRead(item.id, item.is_read || false)}>
                          {item.is_read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteContact(item.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-primary mb-2">{item.email}</p>
                    <p className="text-sm bg-background p-3 rounded-md">{item.message}</p>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Belum ada pesan masuk</p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ============================================ */}
          {/* TAB FOOTER - PENGATURAN FOOTER WEBSITE */}
          {/* ============================================ */}
          <TabsContent value="footer" className="mt-6">
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                Pengaturan Footer Website
              </h2>
              
              <form onSubmit={handleFooterSubmit} className="space-y-6">
                {/* Informasi Organisasi */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Informasi Organisasi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nama Organisasi</Label>
                      <Input 
                        value={footerForm.org_name} 
                        onChange={(e) => setFooterForm({ ...footerForm, org_name: e.target.value })} 
                        placeholder="HMPS Perbankan Syariah"
                      />
                    </div>
                    <div>
                      <Label>Teks Copyright</Label>
                      <Input 
                        value={footerForm.copyright_text} 
                        onChange={(e) => setFooterForm({ ...footerForm, copyright_text: e.target.value })} 
                        placeholder="HMPS Perbankan Syariah. All rights reserved."
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Deskripsi Organisasi</Label>
                    <Textarea 
                      value={footerForm.org_description} 
                      onChange={(e) => setFooterForm({ ...footerForm, org_description: e.target.value })} 
                      rows={3}
                      placeholder="Deskripsi singkat tentang organisasi..."
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                    <div>
                      <Label>Logo URL</Label>
                      <Input
                        value={footerForm.logo_url}
                        onChange={(e) => setFooterForm({ ...footerForm, logo_url: e.target.value })}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    <div className="flex items-center">
                      {footerForm.logo_url ? (
                        <img src={footerForm.logo_url} alt="Logo preview" className="w-24 h-24 rounded-full object-cover border" />
                      ) : (
                        <p className="text-sm text-muted-foreground">Preview logo akan muncul di sini jika URL valid.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informasi Kontak */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Informasi Kontak</h3>
                  <div>
                    <Label>Alamat</Label>
                    <Textarea 
                      value={footerForm.address} 
                      onChange={(e) => setFooterForm({ ...footerForm, address: e.target.value })} 
                      rows={2}
                      placeholder="Alamat kampus lengkap..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input 
                        type="email"
                        value={footerForm.email} 
                        onChange={(e) => setFooterForm({ ...footerForm, email: e.target.value })} 
                        placeholder="hmps@university.ac.id"
                      />
                    </div>
                    <div>
                      <Label>Nomor Telepon</Label>
                      <Input 
                        value={footerForm.phone} 
                        onChange={(e) => setFooterForm({ ...footerForm, phone: e.target.value })} 
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>WhatsApp (link)</Label>
                      <Input
                        value={footerForm.whatsapp_url}
                        onChange={(e) => setFooterForm({ ...footerForm, whatsapp_url: e.target.value })}
                        placeholder="https://wa.me/62812..."
                      />
                    </div>
                    <div>
                      <Label>Contact Email (opsional)</Label>
                      <Input
                        type="email"
                        value={footerForm.contact_email}
                        onChange={(e) => setFooterForm({ ...footerForm, contact_email: e.target.value })}
                        placeholder="contact@domain.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Sosial */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Media Sosial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>URL Instagram</Label>
                      <Input 
                        value={footerForm.instagram_url} 
                        onChange={(e) => setFooterForm({ ...footerForm, instagram_url: e.target.value })} 
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <Label>URL YouTube</Label>
                      <Input 
                        value={footerForm.youtube_url} 
                        onChange={(e) => setFooterForm({ ...footerForm, youtube_url: e.target.value })} 
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                    <div>
                      <Label>URL LinkedIn</Label>
                      <Input 
                        value={footerForm.linkedin_url} 
                        onChange={(e) => setFooterForm({ ...footerForm, linkedin_url: e.target.value })} 
                        placeholder="https://linkedin.com/..."
                      />
                    </div>
                    <div>
                      <Label>URL TikTok</Label>
                      <Input
                        value={footerForm.tiktok_url}
                        onChange={(e) => setFooterForm({ ...footerForm, tiktok_url: e.target.value })}
                        placeholder="https://www.tiktok.com/@..."
                      />
                    </div>
                    <div>
                      <Label>URL Twitter</Label>
                      <Input
                        value={footerForm.twitter_url}
                        onChange={(e) => setFooterForm({ ...footerForm, twitter_url: e.target.value })}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Google Maps</h3>
                  <div>
                    <Label>URL Embed Google Maps</Label>
                    <Input 
                      value={footerForm.maps_embed_url} 
                      onChange={(e) => setFooterForm({ ...footerForm, maps_embed_url: e.target.value })} 
                      placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Buka Google Maps → Klik "Share" → Tab "Embed a map" → Copy URL dari src iframe
                    </p>
                  </div>
                  {footerForm.maps_embed_url && (
                    <div className="rounded-lg overflow-hidden border">
                      <iframe
                        src={footerForm.maps_embed_url}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        loading="lazy"
                      ></iframe>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Simpan Pengaturan Footer
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ============================================ */}
      {/* DIALOG FORMS */}
      {/* ============================================ */}
      
      {/* Dialog Berita - DENGAN TANGGAL */}
      <Dialog open={showNewsDialog} onOpenChange={setShowNewsDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingNews ? "Edit Berita" : "Tambah Berita"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleNewsSubmit} className="space-y-4">
            <div>
              <Label>Judul</Label>
              <Input value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} required />
            </div>
            <div>
              <Label>Slug (URL)</Label>
              <Input value={newsForm.slug} onChange={(e) => setNewsForm({ ...newsForm, slug: e.target.value })} required />
            </div>
            <div>
              <Label>URL Gambar</Label>
              <Input value={newsForm.image_url} onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })} required />
            </div>
            {/* === FIELD TANGGAL UPLOAD BERITA === */}
            <div>
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Tanggal Publikasi
              </Label>
              <Input 
                type="date" 
                value={newsForm.created_at} 
                onChange={(e) => setNewsForm({ ...newsForm, created_at: e.target.value })} 
                required 
              />
            </div>
            <div>
              <Label>Konten</Label>
              <Textarea value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} rows={10} required />
            </div>
            <Button type="submit" className="w-full">{editingNews ? "Update" : "Tambah"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Galeri - DENGAN TANGGAL */}
      <Dialog open={showGalleryDialog} onOpenChange={setShowGalleryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingGallery ? "Edit Foto" : "Tambah Foto"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleGallerySubmit} className="space-y-4">
            <div>
              <Label>URL Gambar</Label>
              <Input value={galleryForm.image_url} onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })} required />
            </div>
            <div>
              <Label>Caption</Label>
              <Textarea value={galleryForm.caption} onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })} rows={3} required />
            </div>
            {/* === FIELD TANGGAL UPLOAD GALERI === */}
            <div>
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Tanggal Upload
              </Label>
              <Input 
                type="date" 
                value={galleryForm.created_at} 
                onChange={(e) => setGalleryForm({ ...galleryForm, created_at: e.target.value })} 
                required 
              />
            </div>
            <Button type="submit" className="w-full">{editingGallery ? "Update" : "Tambah"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Divisi */}
      <Dialog open={showDivisionDialog} onOpenChange={setShowDivisionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDivision ? "Edit Divisi" : "Tambah Divisi"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDivisionSubmit} className="space-y-4">
            <div>
              <Label>Nama Divisi</Label>
              <Input value={divisionForm.name} onChange={(e) => setDivisionForm({ ...divisionForm, name: e.target.value })} required />
            </div>
            <div>
              <Label>Slug (URL)</Label>
              <Input value={divisionForm.slug} onChange={(e) => setDivisionForm({ ...divisionForm, slug: e.target.value })} required />
            </div>
            <div>
              <Label>Deskripsi</Label>
              <Textarea value={divisionForm.description} onChange={(e) => setDivisionForm({ ...divisionForm, description: e.target.value })} rows={3} required />
            </div>
            <div>
              <Label>Icon</Label>
              <Select value={divisionForm.icon} onValueChange={(value) => setDivisionForm({ ...divisionForm, icon: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Users">Users (BPH)</SelectItem>
                  <SelectItem value="Lightbulb">Lightbulb (Litbang)</SelectItem>
                  <SelectItem value="Megaphone">Megaphone (Humas)</SelectItem>
                  <SelectItem value="UserCog">UserCog (PSDM)</SelectItem>
                  <SelectItem value="Monitor">Monitor (MIT)</SelectItem>
                  <SelectItem value="Briefcase">Briefcase (Entre)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">{editingDivision ? "Update" : "Tambah"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Anggota */}
      <Dialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Anggota" : "Tambah Anggota"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleMemberSubmit} className="space-y-4">
            <div>
              <Label>Nama</Label>
              <Input value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} required />
            </div>
            <div>
              <Label>URL Foto</Label>
              <Input value={memberForm.photo_url} onChange={(e) => setMemberForm({ ...memberForm, photo_url: e.target.value })} placeholder="https://randomuser.me/api/portraits/..." required />
            </div>
            <div>
              <Label>Biro/Jabatan</Label>
              <Input value={memberForm.biro} onChange={(e) => setMemberForm({ ...memberForm, biro: e.target.value })} required />
            </div>
            <div>
              <Label>Angkatan</Label>
              <Input value={memberForm.angkatan} onChange={(e) => setMemberForm({ ...memberForm, angkatan: e.target.value })} placeholder="2023" required />
            </div>
            <div>
              <Label>Role</Label>
              <Select 
                value={memberForm.role} 
                onValueChange={(value: "head" | "member" | "staff") => setMemberForm({ 
                  ...memberForm, 
                  role: value, 
                  is_head: value === "head",
                  position_order: value === "head" ? 1 : value === "member" ? 2 : 10
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="head">Kepala Divisi</SelectItem>
                  <SelectItem value="member">Anggota</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Urutan Tampil</Label>
              <Input type="number" value={memberForm.position_order} onChange={(e) => setMemberForm({ ...memberForm, position_order: parseInt(e.target.value) })} min={1} required />
            </div>
            <Button type="submit" className="w-full">{editingMember ? "Update" : "Tambah"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Program Kerja */}
      <Dialog open={showProgramDialog} onOpenChange={setShowProgramDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProgram ? "Edit Program Kerja" : "Tambah Program Kerja"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProgramSubmit} className="space-y-4">
            <div>
              <Label>Nama Program</Label>
              <Input value={programForm.program_name} onChange={(e) => setProgramForm({ ...programForm, program_name: e.target.value })} required />
            </div>
            <div>
              <Label>Penanggung Jawab</Label>
              <Input value={programForm.person_in_charge} onChange={(e) => setProgramForm({ ...programForm, person_in_charge: e.target.value })} required />
            </div>
            <div>
              <Label>Realisasi</Label>
              <Select value={programForm.realization} onValueChange={(value) => setProgramForm({ ...programForm, realization: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Belum">Belum</SelectItem>
                  <SelectItem value="Proses">Proses</SelectItem>
                  <SelectItem value="Terlaksana">Terlaksana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Nomor Urut</Label>
              <Input type="number" value={programForm.order_number} onChange={(e) => setProgramForm({ ...programForm, order_number: parseInt(e.target.value) })} min={1} required />
            </div>
            <Button type="submit" className="w-full">{editingProgram ? "Update" : "Tambah"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
