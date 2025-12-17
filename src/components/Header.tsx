// ============================================
// FILE: src/components/Header.tsx
// DESKRIPSI: Komponen Header/Navbar Website
// ============================================
// EDIT MENU NAVIGASI DI BAGIAN navLinks (baris 15-21)
// EDIT LOGO/NAMA ORGANISASI DI BAGIAN Link (baris 33-38)
// ============================================

import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // === EDIT MENU NAVIGASI DI SINI ===
  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Divisi", path: "/divisi" },      // Menu Divisi baru
    { name: "Berita", path: "/news" },
    { name: "Galeri", path: "/gallery" },
    { name: "Kontak", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const { data } = await supabase.from("footer_settings").select("logo_url").maybeSingle();
        if (data && (data as any).logo_url) setLogoUrl((data as any).logo_url);
      } catch (e) {
        // ignore
      }
    };
    fetchLogo();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* === LOGO / NAMA ORGANISASI (gunakan logo_url jika tersedia) === */}
          <Link to="/" className="flex items-center space-x-3">
            {logoUrl ? (
              <img src={logoUrl} alt="HMPS Perbankan Syariah" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary">HMPS</span>
                <span className="ml-2 text-xl font-bold text-secondary">Perbankan Syariah</span>
              </div>
            )}
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-foreground">HMPS Perbankan Syariah</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin/login">
              <Button variant="outline" size="sm" className="ml-4">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Admin
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
