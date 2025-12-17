// ============================================
// FILE: src/pages/Divisi.tsx
// DESKRIPSI: Halaman daftar semua divisi organisasi
// ============================================
// EDIT DATA DIVISI DEFAULT DI defaultDivisions (baris 20-80)
// EDIT TAMPILAN KARTU DIVISI DI bagian return (baris 100+)
// ============================================

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, Division } from "@/lib/supabase";
import { 
  Users, Lightbulb, Megaphone, UserCog, Monitor, Briefcase, ArrowRight 
} from "lucide-react";

const Divisi = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);

  // === DATA DIVISI DEFAULT (JIKA TIDAK ADA DI DATABASE) ===
  const defaultDivisions: Division[] = [
    {
      id: "1",
      name: "BPH",
      slug: "bph",
      description: "Badan Pengurus Harian - Mengkoordinasikan seluruh kegiatan dan kebijakan organisasi HMPS Perbankan Syariah",
      icon: "Users",
      color: "primary",
      created_at: new Date().toISOString(),
    },
    {
      id: "2", 
      name: "LITBANG",
      slug: "litbang",
      description: "Penelitian dan Pengembangan - Mengembangkan kajian ilmiah dan riset di bidang ekonomi dan perbankan syariah",
      icon: "Lightbulb",
      color: "secondary",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "HUMAS",
      slug: "humas",
      description: "Hubungan Masyarakat - Menjalin komunikasi dan relasi dengan pihak internal maupun eksternal organisasi",
      icon: "Megaphone",
      color: "accent",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "PSDM",
      slug: "psdm",
      description: "Pengembangan Sumber Daya Manusia - Meningkatkan kapasitas dan kompetensi anggota organisasi",
      icon: "UserCog",
      color: "primary",
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "MIT",
      slug: "mit",
      description: "Media dan Informasi Teknologi - Mengelola media sosial, website, dan teknologi informasi organisasi",
      icon: "Monitor",
      color: "secondary",
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      name: "ENTRE",
      slug: "entre",
      description: "Entrepreneurship - Mengembangkan jiwa wirausaha dan kegiatan bisnis berbasis syariah",
      icon: "Briefcase",
      color: "accent",
      created_at: new Date().toISOString(),
    },
  ];

  // === FUNGSI UNTUK MENDAPATKAN ICON BERDASARKAN NAMA ===
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Users: <Users className="h-10 w-10" />,
      Lightbulb: <Lightbulb className="h-10 w-10" />,
      Megaphone: <Megaphone className="h-10 w-10" />,
      UserCog: <UserCog className="h-10 w-10" />,
      Monitor: <Monitor className="h-10 w-10" />,
      Briefcase: <Briefcase className="h-10 w-10" />,
    };
    return icons[iconName] || <Users className="h-10 w-10" />;
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const fetchDivisions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("divisions")
      .select("*")
      .order("created_at", { ascending: true });
    
    if (error || !data || data.length === 0) {
      // Gunakan data default jika tidak ada data di database
      setDivisions(defaultDivisions);
    } else {
      setDivisions(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* === HEADER SECTION === */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Divisi Organisasi</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Kenali lebih dekat divisi-divisi yang ada di HMPS Perbankan Syariah
          </p>
        </div>
      </section>

      {/* === GRID KARTU DIVISI === */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {divisions.map((division) => (
                // === KARTU DIVISI - EDIT TAMPILAN DI SINI ===
                <Link
                  key={division.id}
                  to={`/divisi/${division.slug}`}
                  className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border border-border"
                >
                  {/* Icon Divisi */}
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {getIcon(division.icon)}
                  </div>
                  
                  {/* Nama Divisi */}
                  <h3 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    {division.name}
                  </h3>
                  
                  {/* Deskripsi Divisi */}
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {division.description}
                  </p>
                  
                  {/* Link ke Detail */}
                  <div className="flex items-center text-primary font-medium">
                    Lihat Detail
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Divisi;
