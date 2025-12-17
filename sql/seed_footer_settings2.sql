-- SQL: Upgrade + Seed footer_settings
-- 1) Tambah kolom sosial baru jika belum ada
-- 2) Jika ada row, lakukan UPDATE; jika belum ada, INSERT
-- Jalankan di Supabase SQL editor (New query)

ALTER TABLE footer_settings
  ADD COLUMN IF NOT EXISTS tiktok_url text,
  ADD COLUMN IF NOT EXISTS twitter_url text,
  ADD COLUMN IF NOT EXISTS whatsapp_url text,
  ADD COLUMN IF NOT EXISTS contact_email text;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM footer_settings) THEN
    UPDATE footer_settings SET
      org_name = 'HMPS Perbankan Syariah',
      org_description = 'Organisasi mahasiswa yang bergerak di bidang ekonomi Islam dan perbankan syariah. Kami berkomitmen untuk mengembangkan potensi mahasiswa melalui kegiatan akademik, sosial, dan pengembangan diri.',
      address = 'Kampus Universitas, Jl. Pendidikan No. 123, Kota Anda',
      email = 'hmps@university.ac.id',
      phone = '+62 812-3456-7890',
      instagram_url = 'https://instagram.com/hmps_perbankansyariah',
      youtube_url = 'https://youtube.com/@hmpsperbankansyariah',
      linkedin_url = 'https://linkedin.com/company/hmps-perbankan-syariah',
      tiktok_url = 'https://www.tiktok.com/@hmps_perbankansyariah',
      twitter_url = 'https://twitter.com/hmps_ps',
      whatsapp_url = 'https://wa.me/6281234567890',
      contact_email = 'hmps@university.ac.id',
      maps_embed_url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1751171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890123',
      copyright_text = 'HMPS Perbankan Syariah. All rights reserved.',
      updated_at = now();
  ELSE
    INSERT INTO footer_settings (
      org_name, org_description, address, email, phone,
      instagram_url, youtube_url, linkedin_url, tiktok_url, twitter_url, whatsapp_url, contact_email, maps_embed_url, copyright_text, updated_at
    ) VALUES (
      'HMPS Perbankan Syariah',
      'Organisasi mahasiswa yang bergerak di bidang ekonomi Islam dan perbankan syariah. Kami berkomitmen untuk mengembangkan potensi mahasiswa melalui kegiatan akademik, sosial, dan pengembangan diri.',
      'Kampus Universitas, Jl. Pendidikan No. 123, Kota Anda',
      'hmps@university.ac.id',
      '+62 812-3456-7890',
      'https://instagram.com/hmps_perbankansyariah',
      'https://youtube.com/@hmpsperbankansyariah',
      'https://linkedin.com/company/hmps-perbankan-syariah',
      'https://www.tiktok.com/@hmps_perbankansyariah',
      'https://twitter.com/hmps_ps',
      'https://wa.me/6281234567890',
      'hmps@university.ac.id',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1751171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890123',
      'HMPS Perbankan Syariah. All rights reserved.',
      now()
    );
  END IF;
END$$;
