-- SQL: Seed initial footer_settings row (run after creating table)
-- This INSERT uses default example values — edit them before running if needed.

INSERT INTO footer_settings (
  org_name, org_description, address, email, phone,
  instagram_url, youtube_url, linkedin_url, maps_embed_url, copyright_text, updated_at
) VALUES (
  'HMPS Perbankan Syariah',
  'Organisasi mahasiswa yang bergerak di bidang ekonomi Islam dan perbankan syariah. Kami berkomitmen untuk mengembangkan potensi mahasiswa melalui kegiatan akademik, sosial, dan pengembangan diri.',
  'Kampus Universitas, Jl. Pendidikan No. 123, Kota Anda',
  'hmps@university.ac.id',
  '+62 812-3456-7890',
  'https://instagram.com/hmps_perbankansyariah',
  'https://youtube.com/@hmpsperbankansyariah',
  'https://linkedin.com/company/hmps-perbankan-syariah',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1751171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890123',
  'HMPS Perbankan Syariah. All rights reserved.',
  now()
)
ON CONFLICT DO NOTHING;
