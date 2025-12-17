// ============================================
// FILE: src/pages/Home.tsx
// DESKRIPSI: Halaman Beranda Website
// ============================================
// EDIT HERO SECTION DI baris 50-100
// EDIT DATA DIVISI DI divisions array (baris 25-75)
// EDIT BERITA TERKINI DI bagian latestNews (baris 150+)
// ============================================

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Lightbulb, Megaphone, UserCog, Monitor, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase, News, Division, FooterSettings } from "@/lib/supabase";

const Home = () => {
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [footerLogo, setFooterLogo] = useState<string | null>(null);
  const [footerData, setFooterData] = useState<FooterSettings | null>(null);

  // === DATA DIVISI DEFAULT ===
  const defaultDivisions = [
    {
      id: "1",
      name: "BPH",
      slug: "bph",
      description: "Badan Pengurus Harian - Mengkoordinasikan seluruh kegiatan organisasi",
      icon: "Users",
    },
    {
      id: "2",
      name: "LITBANG", 
      slug: "litbang",
      description: "Penelitian dan Pengembangan - Kajian ilmiah ekonomi syariah",
      icon: "Lightbulb",
    },
    {
      id: "3",
      name: "HUMAS",
      slug: "humas",
      description: "Hubungan Masyarakat - Komunikasi internal dan eksternal",
      icon: "Megaphone",
    },
    {
      id: "4",
      name: "PSDM",
      slug: "psdm",
      description: "Pengembangan SDM - Meningkatkan kapasitas anggota",
      icon: "UserCog",
    },
    {
      id: "5",
      name: "MIT",
      slug: "mit",
      description: "Media dan IT - Pengelolaan media dan teknologi",
      icon: "Monitor",
    },
    {
      id: "6",
      name: "ENTRE",
      slug: "entre",
      description: "Entrepreneurship - Pengembangan wirausaha syariah",
      icon: "Briefcase",
    },
  ];

  // === FUNGSI UNTUK MENDAPATKAN ICON ===
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Users: <Users className="h-8 w-8" />,
      Lightbulb: <Lightbulb className="h-8 w-8" />,
      Megaphone: <Megaphone className="h-8 w-8" />,
      UserCog: <UserCog className="h-8 w-8" />,
      Monitor: <Monitor className="h-8 w-8" />,
      Briefcase: <Briefcase className="h-8 w-8" />,
    };
    return icons[iconName] || <Users className="h-8 w-8" />;
  };

  useEffect(() => {
    fetchLatestNews();
    fetchDivisions();
    fetchFooterLogo();
    fetchFooterSettings();
  }, []);

  const fetchFooterLogo = async () => {
    const { data } = await supabase.from("footer_settings").select("logo_url").maybeSingle();
    if (data && (data as any).logo_url) setFooterLogo((data as any).logo_url);
  };

  const fetchFooterSettings = async () => {
    const { data } = await supabase.from("footer_settings").select("*").maybeSingle();
    if (data) setFooterData(data as FooterSettings);
  };

  const fetchLatestNews = async () => {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    
    if (data) setLatestNews(data);
  };

  const fetchDivisions = async () => {
    const { data } = await supabase
      .from("divisions")
      .select("*")
      .order("created_at", { ascending: true });
    
    if (data && data.length > 0) {
      setDivisions(data);
    } else {
      // Gunakan data default jika tidak ada di database
      setDivisions(defaultDivisions as Division[]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ============================================ */}
      {/* HERO SECTION - EDIT BACKGROUND IMAGE DI SINI */}
      {/* ============================================ */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            // === EDIT URL BACKGROUND IMAGE DI SINI ===
            backgroundImage: 'url(https://hmps-ps.github.io/content/kabinettransparan.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* === EDIT JUDUL DAN DESKRIPSI HERO DI SINI === */}
          {(() => {
            const orgName = footerData?.org_name ?? "HMPS Perbankan Syariah";
            const parts = orgName.split(" ");
            const first = parts.shift() ?? orgName;
            const rest = parts.join(" ");
            return (
              <>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 tracking-tight">
                  {first}
                  {rest ? <span className="block mt-2 text-secondary">{rest}</span> : null}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                  {footerData?.org_description ?? "Organisasi Mahasiswa Program Studi Perbankan Syariah. Membangun generasi ekonom Islam yang berintegritas, profesional, dan berwawasan global."}
                </p>
              </>
            );
          })()}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/news">
              <Button size="lg" variant="secondary" className="group">
                Lihat Berita
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ABOUT SECTION - DENGAN LOGO PLACEHOLDER */}
      {/* ============================================ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            {/* ============================================ */}
            {/* LOGO PLACEHOLDER - LINGKARAN DENGAN OUTLINE BIRU */}
            {/* GANTI src DENGAN URL LOGO ORGANISASI ANDA */}
            {/* ============================================ */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary bg-background shadow-lg flex items-center justify-center overflow-hidden">
                {/* === GANTI URL LOGO DI SINI === */}
                <img
                  src={footerLogo ?? "https://ui-avatars.com/api/?name=HMPS+PS&background=000080&color=D4AF37&size=160&bold=true"}
                  alt="Logo HMPS Perbankan Syariah"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=HMPS+PS&background=000080&color=D4AF37&size=160&bold=true";
                  }}
                />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tentang Kami
            </h2>
            {/* === EDIT DESKRIPSI ORGANISASI DI SINI === */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {footerData?.org_description ?? `HMPS Perbankan Syariah adalah wadah bagi mahasiswa untuk mengembangkan potensi di bidang ekonomi Islam, perbankan syariah, dan keuangan halal melalui berbagai kegiatan akademik, sosial, dan pengembangan diri.`}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DIVISI SECTION - KARTU DIVISI ORGANISASI */}
      {/* ============================================ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Divisi Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kenali divisi-divisi yang menggerakkan HMPS Perbankan Syariah
            </p>
          </div>

          {/* === GRID KARTU DIVISI - EDIT TAMPILAN DI SINI === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((division) => (
              <Link
                key={division.id}
                to={`/divisi/${division.slug}`}
                className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {getIcon(division.icon)}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {division.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {division.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/divisi">
              <Button variant="outline" className="group">
                Lihat Semua Divisi
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BERITA TERKINI SECTION */}
      {/* ============================================ */}
      {latestNews.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Berita Terkini
              </h2>
              <Link to="/news">
                <Button variant="outline" className="group">
                  Lihat Semua
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* === GRID BERITA - EDIT TAMPILAN KARTU BERITA DI SINI === */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={news.image_url}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(news.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* CTA SECTION - EDIT PESAN AJAKAN */}
      {/* ============================================ */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* === EDIT JUDUL DAN DESKRIPSI CTA DI SINI === */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bergabung Bersama Kami
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Mari bersama-sama membangun ekosistem ekonomi syariah yang lebih baik 
            untuk masa depan Indonesia yang lebih adil dan sejahtera.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Hubungi Kami Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
