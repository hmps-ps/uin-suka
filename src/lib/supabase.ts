// ============================================
// FILE: src/lib/supabase.ts
// DESKRIPSI: Konfigurasi Supabase dan Type Definitions
// ============================================
// EDIT SUPABASE CREDENTIALS DI BAGIAN INI (baris 10-11)
// ============================================

import { createClient } from '@supabase/supabase-js';

// === EDIT SUPABASE URL DAN API KEY DI SINI ===
const supabaseUrl = 'https://trhhoqjoxjikvtdbkcte.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyaGhvcWpveGppa3Z0ZGJrY3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NjY4NjEsImV4cCI6MjA4MTQ0Mjg2MX0.lj3roQPOkMboxfWoxrQwB9eYGI986Obtmj6SvjK-B2o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// TYPE DEFINITIONS - TABEL NEWS (BERITA)
// ============================================
export type News = {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  content: string;
  created_at: string;
};

// ============================================
// TYPE DEFINITIONS - TABEL GALLERY (GALERI)
// ============================================
export type Gallery = {
  id: string;
  image_url: string;
  caption: string;
  created_at: string;
};

// ============================================
// TYPE DEFINITIONS - TABEL CONTACTS (KONTAK/PESAN)
// ============================================
export type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;        // Status dibaca
  created_at: string;
};

// ============================================
// TYPE DEFINITIONS - TABEL DIVISIONS (DIVISI)
// ============================================
export type Division = {
  id: string;
  name: string;           // Nama divisi: BPH, LITBANG, HUMAS, PSDM, MIT, ENTRE
  slug: string;           // URL slug: bph, litbang, humas, psdm, mit, entre
  description: string;    // Deskripsi divisi
  icon: string;           // Icon untuk divisi (nama icon lucide)
  color: string;          // Warna tema divisi
  created_at: string;
};

// ============================================
// TYPE DEFINITIONS - TABEL MEMBERS (ANGGOTA DIVISI)
// ============================================
// STRUKTUR: 1 Kepala Divisi + 7 Anggota + 4 Staff
// role: 'head' = Kepala, 'member' = Anggota, 'staff' = Staff
// ============================================
export type Member = {
  id: string;
  division_id: string;    // Foreign key ke tabel divisions
  name: string;           // Nama anggota
  photo_url: string;      // URL foto anggota
  biro: string;           // Biro/jabatan
  angkatan: string;       // Angkatan (tahun masuk)
  is_head: boolean;       // True jika kepala divisi
  role: 'head' | 'member' | 'staff'; // Role: head, member, atau staff
  position_order: number; // Urutan tampil
  created_at: string;
};

// ============================================
// TYPE DEFINITIONS - TABEL WORK_PROGRAMS (PROGRAM KERJA)
// ============================================
export type WorkProgram = {
  id: string;
  division_id: string;          // Foreign key ke tabel divisions
  program_name: string;         // Nama program kerja
  person_in_charge: string;     // Penanggung jawab
  realization: string;          // Status realisasi: "Terlaksana", "Belum", "Proses"
  order_number: number;         // Nomor urut
  created_at: string;
};

// ============================================
// TYPE DEFINITIONS - TABEL ADMINS
// ============================================
export type Admin = {
  id: string;
  username: string;
  password_hash: string;
  role: string;
  created_at: string;
};

// ============================================
// TYPE DEFINITIONS - TABEL FOOTER_SETTINGS (PENGATURAN FOOTER)
// Untuk mengontrol semua konten footer dari dashboard
// ============================================
export type FooterSettings = {
  id: string;
  // Informasi Organisasi
  org_name: string;           // Nama organisasi
  org_description: string;    // Deskripsi organisasi
  // Kontak
  address: string;            // Alamat kampus
  email: string;              // Email kontak
  phone: string;              // Nomor telepon
  // Social Media
  instagram_url: string;      // URL Instagram
  youtube_url: string;        // URL YouTube
    linkedin_url: string;       // URL LinkedIn
    tiktok_url: string;         // URL TikTok
    twitter_url: string;        // URL Twitter
    whatsapp_url: string;       // URL WhatsApp (wa.me/... or https://api.whatsapp.com/send?phone=...)
    contact_email: string;      // Email kontak utama (opsional override)
    logo_url: string;           // URL logo organisasi
  // Google Maps
  maps_embed_url: string;     // URL embed Google Maps
  // Copyright
  copyright_text: string;     // Teks copyright
  updated_at: string;
};
