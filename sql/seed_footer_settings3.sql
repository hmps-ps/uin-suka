-- SQL: Add `logo_url` to footer_settings and seed default
-- Run this in Supabase SQL editor (New query)

ALTER TABLE footer_settings
  ADD COLUMN IF NOT EXISTS logo_url text;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM footer_settings) THEN
    -- Set logo_url only if it's NULL or empty
    UPDATE footer_settings
    SET logo_url = COALESCE(NULLIF(logo_url, ''), 'https://ui-avatars.com/api/?name=HMPS+PS&background=000080&color=D4AF37&size=160&bold=true'),
        updated_at = now();
  ELSE
    INSERT INTO footer_settings (
      org_name, org_description, address, email, phone,
      instagram_url, youtube_url, linkedin_url, tiktok_url, twitter_url, whatsapp_url, contact_email, maps_embed_url, copyright_text, logo_url, updated_at
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
      'https://ui-avatars.com/api/?name=HMPS+PS&background=000080&color=D4AF37&size=160&bold=true',
      now()
    );
  END IF;
END$$;
