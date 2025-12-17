// ============================================
// FILE: src/components/Footer.tsx
// DESKRIPSI: Footer website dengan data dinamis dari Supabase
// ============================================
// Data footer diambil dari tabel footer_settings
// Jika tidak ada data, gunakan default
// ============================================

import { Instagram, Youtube, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, FooterSettings } from "@/lib/supabase";

// === DEFAULT FOOTER DATA - EDIT JIKA TIDAK ADA DI DATABASE ===
const defaultFooterData: Omit<FooterSettings, 'id' | 'updated_at'> = {
  org_name: "HMPS Perbankan Syariah",
  org_description: "Organisasi mahasiswa yang bergerak di bidang ekonomi Islam dan perbankan syariah. Kami berkomitmen untuk mengembangkan potensi mahasiswa melalui kegiatan akademik, sosial, dan pengembangan diri.",
  address: "Kampus Universitas, Jl. Pendidikan No. 123, Kota Anda",
  email: "hmps@university.ac.id",
  phone: "+62 812-3456-7890",
  instagram_url: "https://instagram.com/hmps_perbankansyariah",
  youtube_url: "https://youtube.com/@hmpsperbankansyariah",
  linkedin_url: "https://linkedin.com/company/hmps-perbankan-syariah",
  maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1751171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890123",
  copyright_text: "HMPS Perbankan Syariah. All rights reserved."
};

const Footer = () => {
  const [footerData, setFooterData] = useState<Omit<FooterSettings, 'id' | 'updated_at'>>(defaultFooterData);

  useEffect(() => {
    fetchFooterSettings();
  }, []);

  const fetchFooterSettings = async () => {
    const { data } = await supabase
      .from("footer_settings")
      .select("*")
      .maybeSingle();
    
    if (data) {
      setFooterData(data);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ============================================ */}
          {/* ABOUT SECTION - Nama dan deskripsi organisasi */}
          {/* ============================================ */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span>HMPS</span>
              <span className="ml-2 text-secondary">Perbankan Syariah</span>
            </h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {footerData.org_description}
            </p>
          </div>

          {/* ============================================ */}
          {/* CONTACT SECTION - Alamat, email, telepon */}
          {/* ============================================ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <div className="space-y-3 text-sm">
              {/* Alamat */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-primary-foreground/80">
                  {footerData.address}
                </p>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <a href={`mailto:${footerData.email}`} className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {footerData.email}
                </a>
              </div>
              {/* Telepon */}
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <a href={`tel:${footerData.phone.replace(/\s/g, '')}`} className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {footerData.phone}
                </a>
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* SOCIAL MEDIA SECTION */}
          {/* ============================================ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Media Sosial</h3>
            <div className="flex space-x-4">
              {footerData.instagram_url && (
                <a
                  href={footerData.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}

              {footerData.youtube_url && (
                <a
                  href={footerData.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-200"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}

              {/* TikTok: inline SVG since not available in lucide */}
              {footerData.tiktok_url && (
                <a
                  href={footerData.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-5 w-5" fill="currentColor">
                    <path d="M179.6 64.5c-5.1-1.8-10.4-3-15.8-3.5v36.4c0 26.2 0 59.1 0 59.1s-20-3.5-35.6-14.8c-15.6-11.3-27.2-27.7-27.2-27.7s10.7 1.1 20.6-2.2c9.9-3.3 17.6-9.2 23.3-16.7c5.7-7.5 8.9-16.7 8.9-16.7V36h27.8c.1 0 .1 28.9 0 28.5z" />
                  </svg>
                </a>
              )}

              {footerData.twitter_url && (
                <a
                  href={footerData.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}

              {footerData.whatsapp_url && (
                <a
                  href={footerData.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-200"
                >
                  {/* WhatsApp inline SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5" fill="currentColor">
                    <path d="M380.9 97.1C339-7.4 253.5-23.4 168 7.6 96.6 34.7 41.1 90.2 14 161.6-17.5 241.8 6.1 328.9 86.6 375.8l-16.7 61.1 62.8-16.5c45 24.6 96.6 27.5 143.7 5.6 71.4-32.1 126.9-87.6 153.9-159 29-77.7 13-164.2-48.2-212.4zM224 373c-35.4 0-69.7-9.7-99.8-28.1l-7.1-4.5-46.5 12.2 12.5-45.6-4.6-7.3C46 260 40 218.3 58 182 74.2 150 103.6 128 138 118c87.8-24.8 172.3 31.7 176 121.2 1.9 45.1-31.6 82.8-80 92z" />
                  </svg>
                </a>
              )}

              { (footerData.contact_email || footerData.email) && (
                <a
                  href={`mailto:${footerData.contact_email ?? footerData.email}`}
                  className="p-3 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-200"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* GOOGLE MAPS EMBED */}
        {/* ============================================ */}
        {footerData.maps_embed_url && (
          <div className="mt-8 rounded-2xl overflow-hidden shadow-large">
            <iframe
              src={footerData.maps_embed_url}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}

        {/* ============================================ */}
        {/* QUICK LINKS & COPYRIGHT */}
        {/* ============================================ */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <Link to="/" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Beranda
              </Link>
              <Link to="/news" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Berita
              </Link>
              <Link to="/gallery" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Galeri
              </Link>
              <Link to="/divisi" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Divisi
              </Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Kontak
              </Link>
            </div>
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} {footerData.copyright_text}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
