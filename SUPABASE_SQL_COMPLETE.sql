-- ============================================
-- FILE: SUPABASE_SQL_COMPLETE.sql
-- DESKRIPSI: SQL lengkap untuk membuat tabel dan mengisi data contoh
-- WEBSITE: HMPS Perbankan Syariah
-- ============================================
-- JALANKAN SQL INI DI SUPABASE SQL EDITOR
-- https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql
-- ============================================

-- ============================================
-- BAGIAN 1: HAPUS TABEL LAMA (JIKA ADA)
-- ============================================
DROP TABLE IF EXISTS work_programs CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS divisions CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- ============================================
-- BAGIAN 2: BUAT TABEL ADMINS
-- ============================================
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin (username: admin, password: admin123)
INSERT INTO admins (username, password_hash, role) VALUES
('admin', 'admin123', 'admin');

-- ============================================
-- BAGIAN 3: BUAT TABEL NEWS (30 BERITA)
-- ============================================
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  image_url TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert 30 berita
INSERT INTO news (title, slug, image_url, content, created_at) VALUES
-- Berita 1-10 (Terbaru)
('Seminar Ekonomi Syariah Nasional 2025', 'seminar-ekonomi-syariah-2025', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'HMPS Perbankan Syariah sukses menggelar Seminar Ekonomi Syariah Nasional 2025 dengan menghadirkan pembicara dari Bank Indonesia, OJK, dan praktisi perbankan syariah. Acara ini dihadiri lebih dari 500 peserta dari berbagai universitas.

Seminar ini membahas tentang perkembangan ekonomi syariah di Indonesia dan peluang karir di industri keuangan syariah. Para pembicara memberikan insight mendalam tentang tren terbaru dalam perbankan syariah dan fintech halal.

Ketua HMPS menyampaikan bahwa seminar ini merupakan salah satu upaya untuk meningkatkan literasi keuangan syariah di kalangan mahasiswa. Diharapkan peserta dapat mengambil manfaat dan menerapkan ilmu yang didapat dalam kehidupan sehari-hari.

Acara berlangsung meriah dengan sesi tanya jawab yang interaktif dan pemberian door prize kepada peserta yang aktif.', NOW() - INTERVAL '1 day'),

('Pelantikan Pengurus HMPS 2025', 'pelantikan-pengurus-hmps-2025', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800', 'Pengurus HMPS Perbankan Syariah periode 2025 resmi dilantik dalam acara yang dihadiri oleh Dekan Fakultas Ekonomi dan Bisnis serta dosen pembimbing. Pelantikan ini menandai dimulainya babak baru kepemimpinan organisasi.

Ketua HMPS terpilih menyampaikan visi misinya untuk membawa organisasi lebih maju dengan program-program inovatif. Fokus utama akan diberikan pada pengembangan softskill anggota dan kolaborasi dengan industri.

Para pengurus bertekad untuk menjalankan amanah dengan sebaik-baiknya dan berkontribusi positif bagi almamater. Program kerja prioritas meliputi pelatihan kepemimpinan, kajian rutin, dan kegiatan sosial.', NOW() - INTERVAL '3 days'),

('Workshop Fintech Syariah', 'workshop-fintech-syariah', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', 'Workshop Fintech Syariah menghadirkan praktisi dari startup fintech berbasis syariah untuk berbagi pengalaman dan pengetahuan. Peserta antusias mempelajari inovasi teknologi keuangan yang sesuai dengan prinsip Islam.

Materi workshop mencakup dasar-dasar fintech syariah, regulasi yang berlaku, dan peluang bisnis di sektor ini. Peserta juga mendapat kesempatan untuk hands-on dengan platform fintech syariah.

Workshop ini menjadi salah satu program unggulan HMPS dalam upaya memperkaya wawasan anggota tentang perkembangan industri keuangan digital berbasis syariah.', NOW() - INTERVAL '5 days'),

('Kegiatan Ramadan Berbagi 1446H', 'ramadan-berbagi-1446h', 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800', 'HMPS Perbankan Syariah mengadakan kegiatan sosial Ramadan Berbagi dengan membagikan paket sembako dan takjil kepada masyarakat kurang mampu di sekitar kampus. Kegiatan ini merupakan wujud kepedulian mahasiswa.

Total 200 paket sembako dan 500 porsi takjil berhasil didistribusikan kepada yang membutuhkan. Para relawan dengan semangat tinggi turun langsung ke lapangan untuk menyalurkan bantuan.

Ketua Divisi PSDM menyampaikan bahwa kegiatan ini rutin diadakan setiap bulan Ramadan sebagai bentuk implementasi nilai-nilai keislaman dan kepedulian sosial.', NOW() - INTERVAL '10 days'),

('Diskusi Publik: Etika dan Keuangan Halal', 'diskusi-publik-keuangan-halal', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 'Diskusi publik bertema "Etika dan Keuangan Halal" menghadirkan pakar ekonomi Islam dan praktisi perbankan syariah. Forum ini membahas pentingnya etika dalam pengelolaan keuangan sesuai prinsip syariah.

Pembicara menekankan bahwa keuangan halal bukan hanya tentang menghindari riba, tetapi juga tentang keadilan, transparansi, dan keberkahan dalam setiap transaksi. Diskusi berlangsung hangat dengan berbagai pertanyaan dari peserta.

Acara ini mendapat respon positif dari mahasiswa dan masyarakat umum yang hadir. Diharapkan diskusi serupa dapat rutin diadakan untuk meningkatkan pemahaman tentang keuangan syariah.', NOW() - INTERVAL '12 days'),

('Bank Syariah Day 2024', 'bank-syariah-day-2024', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800', 'Peringatan Bank Syariah Day 2024 diselenggarakan dengan berbagai rangkaian acara menarik. Mulai dari expo perbankan syariah, talkshow, hingga kompetisi essay tentang masa depan keuangan syariah di Indonesia.

Acara ini diikuti oleh berbagai bank syariah nasional yang membuka booth informasi dan rekrutmen. Mahasiswa antusias mengunjungi booth dan mencari informasi tentang peluang karir di industri perbankan syariah.

Panitia berharap acara ini dapat menjadi jembatan antara dunia akademis dan industri perbankan syariah, serta membuka peluang kerja bagi para mahasiswa.', NOW() - INTERVAL '20 days'),

('Pelatihan Literasi Keuangan Mahasiswa', 'pelatihan-literasi-keuangan', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 'Pelatihan literasi keuangan untuk mahasiswa diadakan untuk meningkatkan pemahaman tentang pengelolaan keuangan pribadi. Materi mencakup budgeting, investasi halal, dan perencanaan keuangan jangka panjang.

Pemateri dari lembaga keuangan syariah memberikan tips praktis tentang cara mengatur keuangan di usia muda. Peserta juga belajar tentang berbagai instrumen investasi syariah yang tersedia di pasar.

Pelatihan ini sangat bermanfaat bagi mahasiswa yang ingin memulai mengelola keuangan secara mandiri dan bijak sesuai prinsip syariah.', NOW() - INTERVAL '25 days'),

('Kunjungan Studi ke OJK Syariah', 'kunjungan-studi-ojk-syariah', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', 'HMPS Perbankan Syariah melakukan kunjungan studi ke kantor OJK untuk mempelajari regulasi dan pengawasan industri keuangan syariah di Indonesia. Peserta mendapat penjelasan langsung dari pejabat OJK.

Kunjungan ini memberikan wawasan mendalam tentang peran OJK dalam mengembangkan industri keuangan syariah yang sehat dan berkelanjutan. Mahasiswa juga berkesempatan untuk berdiskusi langsung dengan para regulator.

Program study visit ini merupakan salah satu inisiatif untuk memperkaya pengalaman belajar mahasiswa di luar kelas dan mendekatkan mereka dengan dunia profesional.', NOW() - INTERVAL '30 days'),

('Pembekalan Karier Perbankan Syariah', 'pembekalan-karier-perbankan', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'Acara pembekalan karier menghadirkan alumni yang berkarir di industri perbankan syariah untuk berbagi pengalaman dan tips sukses. Peserta mendapat insight berharga tentang persiapan memasuki dunia kerja.

Para alumni memberikan gambaran tentang dinamika kerja di bank syariah, kualifikasi yang dibutuhkan, dan soft skill yang harus dikembangkan. Sesi mentoring berjalan interaktif dengan banyak pertanyaan dari peserta.

HMPS berkomitmen untuk terus mengadakan kegiatan serupa guna mempersiapkan anggotanya menghadapi dunia profesional dengan bekal yang memadai.', NOW() - INTERVAL '35 days'),

('Rapat Kerja HMPS 2024', 'rapat-kerja-hmps-2024', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800', 'Rapat Kerja HMPS 2024 diselenggarakan untuk menyusun program kerja dan strategi organisasi. Seluruh pengurus berkumpul untuk membahas rencana kegiatan satu periode ke depan.

Rapat menghasilkan berbagai program inovatif yang akan dilaksanakan sepanjang tahun. Fokus utama adalah pada pengembangan anggota, kolaborasi dengan pihak eksternal, dan penguatan basis akademik.

Dengan semangat kebersamaan, pengurus siap menjalankan amanah dan membawa HMPS ke level yang lebih tinggi.', NOW() - INTERVAL '40 days'),

-- Berita 11-20
('Kompetisi Business Plan Syariah', 'kompetisi-business-plan-syariah', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', 'HMPS menyelenggarakan kompetisi Business Plan Syariah yang diikuti oleh puluhan tim dari berbagai universitas. Kompetisi ini bertujuan mendorong kreativitas mahasiswa dalam mengembangkan ide bisnis berbasis syariah.

Pemenang mendapatkan hadiah uang tunai dan kesempatan inkubasi bisnis dari startup accelerator. Juri terdiri dari praktisi bisnis syariah dan akademisi ekonomi Islam.

Kompetisi ini diharapkan dapat melahirkan wirausahawan muda yang berkontribusi pada ekonomi syariah nasional.', NOW() - INTERVAL '45 days'),

('Kajian Rutin: Akad-akad dalam Perbankan Syariah', 'kajian-akad-perbankan-syariah', 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800', 'Kajian rutin bulanan membahas tentang berbagai akad dalam perbankan syariah seperti mudharabah, musyarakah, dan murabahah. Narasumber menjelaskan implementasi akad-akad tersebut dalam produk perbankan.

Peserta mendapat pemahaman mendalam tentang prinsip-prinsip syariah dalam transaksi keuangan dan bagaimana bank syariah menerapkannya dalam operasional sehari-hari.

Kajian ini menjadi wadah bagi anggota untuk terus mendalami ilmu ekonomi Islam secara kontinyu.', NOW() - INTERVAL '50 days'),

('Bakti Sosial di Panti Asuhan', 'bakti-sosial-panti-asuhan', 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800', 'HMPS mengadakan bakti sosial di panti asuhan dengan memberikan donasi dan mengadakan kegiatan bersama anak-anak. Kegiatan ini merupakan wujud kepedulian sosial organisasi.

Selain donasi berupa sembako dan perlengkapan sekolah, pengurus juga mengadakan games edukatif dan motivasi untuk anak-anak panti. Keceriaan terpancar dari wajah-wajah mereka.

Kegiatan sosial seperti ini akan terus digalakkan sebagai bentuk implementasi nilai-nilai kebaikan dalam Islam.', NOW() - INTERVAL '55 days'),

('Webinar Ekonomi Digital Syariah', 'webinar-ekonomi-digital-syariah', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', 'Webinar bertema Ekonomi Digital Syariah menghadirkan pembicara dari berbagai startup fintech syariah. Peserta belajar tentang perkembangan ekonomi digital yang sesuai dengan prinsip Islam.

Pembahasan mencakup e-commerce halal, pembayaran digital syariah, dan investasi berbasis teknologi. Peserta mendapat gambaran tentang peluang dan tantangan di era digital.

Webinar diikuti oleh lebih dari 300 peserta dari berbagai daerah di Indonesia.', NOW() - INTERVAL '60 days'),

('Gathering Alumni HMPS', 'gathering-alumni-hmps', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', 'HMPS mengadakan gathering alumni untuk mempererat silaturahmi antara pengurus aktif dan alumni. Acara ini menjadi momen berbagi pengalaman dan networking.

Alumni dari berbagai angkatan hadir dan berbagi cerita tentang perjalanan karir mereka di industri keuangan syariah. Banyak insight berharga yang dibagikan kepada pengurus aktif.

Gathering ini diharapkan dapat memperkuat ikatan alumni dan mendukung pengembangan organisasi ke depan.', NOW() - INTERVAL '65 days'),

('Lomba Debat Ekonomi Syariah', 'lomba-debat-ekonomi-syariah', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', 'Lomba debat ekonomi syariah tingkat regional diselenggarakan dengan tema aktual seputar ekonomi Islam kontemporer. Peserta menunjukkan kemampuan argumentasi yang impresif.

Tim dari berbagai universitas bersaing ketat dalam babak penyisihan hingga final. Dewan juri memberikan penilaian berdasarkan substansi argumen, delivery, dan teamwork.

Pemenang mendapatkan trofi dan kesempatan mengikuti kompetisi tingkat nasional.', NOW() - INTERVAL '70 days'),

('Workshop Public Speaking', 'workshop-public-speaking', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', 'Workshop public speaking diadakan untuk meningkatkan kemampuan komunikasi anggota HMPS. Pemateri profesional memberikan tips dan latihan praktis.

Peserta belajar teknik presentasi, mengelola kegugupan, dan menyampaikan pesan secara efektif. Sesi praktik langsung membantu peserta mengasah kemampuan.

Skill public speaking sangat penting untuk sukses di dunia profesional dan akademis.', NOW() - INTERVAL '75 days'),

('Sosialisasi Program HMPS ke Mahasiswa Baru', 'sosialisasi-maba', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800', 'HMPS mengadakan sosialisasi program kerja kepada mahasiswa baru untuk memperkenalkan organisasi dan mengajak bergabung. Antusiasme maba sangat tinggi.

Presentasi mencakup profil organisasi, divisi-divisi yang ada, dan berbagai kegiatan yang akan diadakan. Sesi tanya jawab berlangsung interaktif.

Pendaftaran anggota baru dibuka dan langsung direspon positif oleh puluhan mahasiswa.', NOW() - INTERVAL '80 days'),

('Kunjungan Industri ke Bank Syariah', 'kunjungan-industri-bank-syariah', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800', 'Kunjungan industri ke salah satu bank syariah nasional memberikan pengalaman langsung tentang operasional perbankan syariah. Mahasiswa diajak melihat berbagai departemen.

Staff bank menjelaskan proses bisnis, produk-produk yang ditawarkan, dan standar pelayanan. Peserta juga berkesempatan berdiskusi dengan para profesional.

Kunjungan ini memperkaya wawasan mahasiswa tentang dunia kerja di industri perbankan syariah.', NOW() - INTERVAL '85 days'),

('Festival Kuliner Halal', 'festival-kuliner-halal', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 'Festival kuliner halal diselenggarakan sebagai bentuk apresiasi terhadap industri makanan halal. Berbagai tenant UMKM kuliner halal berpartisipasi dalam acara ini.

Pengunjung dapat menikmati berbagai hidangan halal sambil belajar tentang sertifikasi halal dan bisnis kuliner. Acara ini mendapat respon positif dari masyarakat kampus.

HMPS berharap festival ini dapat mendukung pertumbuhan UMKM halal di sekitar kampus.', NOW() - INTERVAL '90 days'),

-- Berita 21-30
('Training Leadership untuk Pengurus', 'training-leadership', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 'Training leadership intensif diadakan untuk memperkuat kapasitas kepemimpinan pengurus HMPS. Materi mencakup manajemen tim, problem solving, dan pengambilan keputusan.

Peserta diajak melalui berbagai simulasi dan studi kasus untuk mengasah kemampuan leadership. Trainer berpengalaman memberikan feedback konstruktif.

Training ini menjadi bekal penting bagi pengurus dalam menjalankan tugas organisasi.', NOW() - INTERVAL '95 days'),

('Kampanye Anti Riba di Sosial Media', 'kampanye-anti-riba', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800', 'HMPS meluncurkan kampanye edukasi anti riba melalui media sosial. Konten edukatif dibuat menarik untuk menjangkau generasi muda.

Kampanye mencakup infografis, video pendek, dan sesi live dengan pakar ekonomi Islam. Engagement dari netizen sangat positif.

Upaya ini merupakan bagian dari misi HMPS untuk meningkatkan literasi keuangan syariah di masyarakat.', NOW() - INTERVAL '100 days'),

('Seminar Investasi Saham Syariah', 'seminar-saham-syariah', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800', 'Seminar investasi saham syariah menghadirkan praktisi pasar modal untuk berbagi ilmu tentang investasi yang sesuai prinsip Islam. Peserta belajar cara memilih saham syariah.

Pembicara menjelaskan kriteria saham syariah, cara analisis, dan tips investasi untuk pemula. Demo trading juga dilakukan untuk memberikan gambaran nyata.

Seminar ini membuka wawasan tentang alternatif investasi halal di pasar modal.', NOW() - INTERVAL '105 days'),

('Musyawarah Anggota Tahunan', 'musyawarah-tahunan', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', 'Musyawarah Anggota Tahunan HMPS berlangsung demokratis dengan pembahasan laporan pertanggungjawaban dan pemilihan pengurus baru. Seluruh anggota aktif berpartisipasi.

Berbagai masukan konstruktif disampaikan untuk perbaikan organisasi. Pemilihan pengurus berjalan lancar dengan kandidat-kandidat berkualitas.

MAT menjadi momentum evaluasi dan perencanaan masa depan organisasi.', NOW() - INTERVAL '110 days'),

('Workshop Penulisan Karya Ilmiah', 'workshop-karya-ilmiah', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800', 'Workshop penulisan karya ilmiah membantu mahasiswa meningkatkan kemampuan menulis paper akademik. Dosen pembimbing memberikan tips dan teknik penulisan yang baik.

Peserta belajar struktur penulisan, cara mencari referensi, dan menghindari plagiarisme. Sesi praktik menulis abstrak juga diadakan.

Kemampuan menulis ilmiah sangat penting untuk pengembangan akademis mahasiswa.', NOW() - INTERVAL '115 days'),

('Turnamen Futsal Antar Angkatan', 'turnamen-futsal', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', 'Turnamen futsal antar angkatan diadakan untuk mempererat kebersamaan dan menjaga kesehatan anggota HMPS. Pertandingan berlangsung seru dan sportif.

Tim dari berbagai angkatan bersaing ketat untuk memperebutkan trofi juara. Semangat sportivitas terlihat dari seluruh peserta.

Selain futsal, kegiatan olahraga bersama akan rutin diadakan untuk menjaga keseimbangan aktivitas fisik dan akademis.', NOW() - INTERVAL '120 days'),

('Peluncuran Buku Ekonomi Islam', 'peluncuran-buku-ekonomi-islam', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800', 'HMPS berpartisipasi dalam peluncuran buku ekonomi Islam karya dosen prodi Perbankan Syariah. Acara dihadiri oleh akademisi dan praktisi.

Buku ini membahas perkembangan ekonomi Islam di Indonesia dan prospek masa depannya. Diskusi buku berlangsung menarik dengan berbagai perspektif.

Peluncuran ini menunjukkan kontribusi akademis civitas academica dalam pengembangan ilmu ekonomi Islam.', NOW() - INTERVAL '125 days'),

('Buka Puasa Bersama HMPS', 'buka-puasa-bersama', 'https://images.unsplash.com/photo-1567416661576-659ef461e0c4?w=800', 'Buka puasa bersama HMPS diselenggarakan sebagai momen kebersamaan di bulan Ramadan. Seluruh anggota berkumpul untuk berbuka dan sholat berjamaah.

Acara diisi dengan tausiyah singkat dan sharing session tentang pengalaman ramadan. Suasana hangat terasa dari kebersamaan yang terjalin.

Tradisi buka bersama ini akan terus dilestarikan sebagai bagian dari budaya organisasi.', NOW() - INTERVAL '130 days'),

('Career Fair Perbankan Syariah', 'career-fair-perbankan', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800', 'Career fair khusus perbankan syariah menghadirkan berbagai perusahaan keuangan syariah untuk rekrutmen. Mahasiswa antusias mengikuti walk-in interview.

Booth-booth perusahaan memberikan informasi tentang lowongan dan kualifikasi yang dibutuhkan. Resume review dan tips interview juga disediakan.

Career fair ini menjadi jembatan antara dunia akademis dan industri perbankan syariah.', NOW() - INTERVAL '135 days'),

('Peringatan Milad HMPS ke-10', 'milad-hmps-ke-10', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', 'HMPS Perbankan Syariah merayakan milad ke-10 dengan rangkaian acara istimewa. Berbagai kegiatan digelar untuk memperingati satu dekade perjalanan organisasi.

Alumni, dosen, dan mahasiswa berkumpul merayakan pencapaian organisasi selama sepuluh tahun. Video dokumentasi perjalanan HMPS ditayangkan dan mengundang nostalgia.

Milad ini menjadi momentum refleksi dan semangat baru untuk dekade berikutnya.', NOW() - INTERVAL '140 days');

-- ============================================
-- BAGIAN 4: BUAT TABEL GALLERY (30 FOTO)
-- ============================================
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert 30 foto galeri
INSERT INTO gallery (image_url, caption, created_at) VALUES
('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', 'Seminar Ekonomi Syariah Nasional 2025', NOW() - INTERVAL '1 day'),
('https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600', 'Pelantikan Pengurus HMPS 2025', NOW() - INTERVAL '2 days'),
('https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600', 'Workshop Fintech Syariah', NOW() - INTERVAL '3 days'),
('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600', 'Kegiatan Ramadan Berbagi 1446H', NOW() - INTERVAL '4 days'),
('https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 'Diskusi Publik Keuangan Halal', NOW() - INTERVAL '5 days'),
('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600', 'Bank Syariah Day 2024', NOW() - INTERVAL '6 days'),
('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', 'Pelatihan Literasi Keuangan', NOW() - INTERVAL '7 days'),
('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', 'Kunjungan ke OJK Syariah', NOW() - INTERVAL '8 days'),
('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', 'Pembekalan Karier Perbankan', NOW() - INTERVAL '9 days'),
('https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600', 'Rapat Kerja HMPS 2024', NOW() - INTERVAL '10 days'),
('https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600', 'Kompetisi Business Plan', NOW() - INTERVAL '11 days'),
('https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600', 'Kajian Rutin Ekonomi Islam', NOW() - INTERVAL '12 days'),
('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600', 'Bakti Sosial Panti Asuhan', NOW() - INTERVAL '13 days'),
('https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600', 'Webinar Ekonomi Digital', NOW() - INTERVAL '14 days'),
('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600', 'Gathering Alumni HMPS', NOW() - INTERVAL '15 days'),
('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600', 'Lomba Debat Ekonomi Syariah', NOW() - INTERVAL '16 days'),
('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600', 'Sosialisasi ke Mahasiswa Baru', NOW() - INTERVAL '17 days'),
('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600', 'Kunjungan Industri Bank Syariah', NOW() - INTERVAL '18 days'),
('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600', 'Festival Kuliner Halal', NOW() - INTERVAL '19 days'),
('https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600', 'Kampanye Edukasi Anti Riba', NOW() - INTERVAL '20 days'),
('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600', 'Seminar Saham Syariah', NOW() - INTERVAL '21 days'),
('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600', 'Musyawarah Anggota Tahunan', NOW() - INTERVAL '22 days'),
('https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600', 'Workshop Karya Ilmiah', NOW() - INTERVAL '23 days'),
('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600', 'Turnamen Futsal Antar Angkatan', NOW() - INTERVAL '24 days'),
('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600', 'Peluncuran Buku Ekonomi Islam', NOW() - INTERVAL '25 days'),
('https://images.unsplash.com/photo-1567416661576-659ef461e0c4?w=600', 'Buka Puasa Bersama HMPS', NOW() - INTERVAL '26 days'),
('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600', 'Career Fair Perbankan Syariah', NOW() - INTERVAL '27 days'),
('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600', 'Peringatan Milad HMPS ke-10', NOW() - INTERVAL '28 days'),
('https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600', 'Kebersamaan Pengurus HMPS', NOW() - INTERVAL '29 days'),
('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', 'Tim HMPS di Acara Kampus', NOW() - INTERVAL '30 days');

-- ============================================
-- BAGIAN 5: BUAT TABEL CONTACTS (5 PESAN)
-- ============================================
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert 5 contoh pesan
INSERT INTO contacts (name, email, message, created_at) VALUES
('Budi Santoso', 'budi.santoso@email.com', 'Assalamualaikum, saya ingin menanyakan tentang cara bergabung dengan HMPS Perbankan Syariah. Apakah ada syarat khusus untuk menjadi anggota? Terima kasih.', NOW() - INTERVAL '1 day'),
('Siti Aminah', 'siti.aminah@student.ac.id', 'Halo, saya tertarik dengan kegiatan seminar yang akan diadakan bulan depan. Bagaimana cara mendaftar sebagai peserta? Apakah ada biaya pendaftaran?', NOW() - INTERVAL '3 days'),
('Ahmad Firdaus', 'ahmad.firdaus@gmail.com', 'Salam, saya dari media kampus ingin melakukan wawancara dengan pengurus HMPS untuk liputan kegiatan organisasi. Mohon informasi lebih lanjut. Terima kasih.', NOW() - INTERVAL '5 days'),
('Fatimah Zahra', 'fatimah.z@university.ac.id', 'Assalamualaikum, saya mahasiswa semester 3 yang ingin berkontribusi dalam kegiatan sosial HMPS. Apakah ada program volunteer yang bisa saya ikuti?', NOW() - INTERVAL '7 days'),
('Muhammad Rizki', 'mrizki@email.co.id', 'Saya alumni prodi Perbankan Syariah angkatan 2018. Ingin menjalin kerjasama untuk kegiatan career sharing dengan adik-adik mahasiswa. Mohon dapat dihubungi.', NOW() - INTERVAL '10 days');

-- ============================================
-- BAGIAN 6: BUAT TABEL DIVISIONS (6 DIVISI)
-- ============================================
CREATE TABLE divisions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) DEFAULT 'Users',
  color VARCHAR(50) DEFAULT 'primary',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert 6 divisi
INSERT INTO divisions (id, name, slug, description, icon, color) VALUES
('11111111-1111-1111-1111-111111111111', 'BPH', 'bph', 'Badan Pengurus Harian - Mengkoordinasikan seluruh kegiatan dan kebijakan organisasi HMPS Perbankan Syariah', 'Users', 'primary'),
('22222222-2222-2222-2222-222222222222', 'LITBANG', 'litbang', 'Penelitian dan Pengembangan - Mengembangkan kajian ilmiah dan riset di bidang ekonomi dan perbankan syariah', 'Lightbulb', 'secondary'),
('33333333-3333-3333-3333-333333333333', 'HUMAS', 'humas', 'Hubungan Masyarakat - Menjalin komunikasi dan relasi dengan pihak internal maupun eksternal organisasi', 'Megaphone', 'accent'),
('44444444-4444-4444-4444-444444444444', 'PSDM', 'psdm', 'Pengembangan Sumber Daya Manusia - Meningkatkan kapasitas dan kompetensi anggota organisasi', 'UserCog', 'primary'),
('55555555-5555-5555-5555-555555555555', 'MIT', 'mit', 'Media dan Informasi Teknologi - Mengelola media sosial, website, dan teknologi informasi organisasi', 'Monitor', 'secondary'),
('66666666-6666-6666-6666-666666666666', 'ENTRE', 'entre', 'Entrepreneurship - Mengembangkan jiwa wirausaha dan kegiatan bisnis berbasis syariah', 'Briefcase', 'accent');

-- ============================================
-- BAGIAN 7: BUAT TABEL MEMBERS (72 ANGGOTA = 6 DIVISI x 12)
-- Struktur: 1 Kepala + 7 Anggota + 4 Staff per divisi
-- ============================================
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  photo_url TEXT NOT NULL,
  biro VARCHAR(100) NOT NULL,
  angkatan VARCHAR(10) NOT NULL,
  is_head BOOLEAN DEFAULT FALSE,
  role VARCHAR(20) DEFAULT 'member', -- 'head', 'member', 'staff'
  position_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DIVISI BPH - 1 Kepala + 7 Anggota + 4 Staff
-- ============================================
INSERT INTO members (division_id, name, photo_url, biro, angkatan, is_head, role, position_order) VALUES
-- Kepala
('11111111-1111-1111-1111-111111111111', 'Ahmad Fauzan', 'https://randomuser.me/api/portraits/men/1.jpg', 'Ketua Umum', '2022', TRUE, 'head', 1),
-- 7 Anggota
('11111111-1111-1111-1111-111111111111', 'Siti Aisyah', 'https://randomuser.me/api/portraits/women/1.jpg', 'Wakil Ketua', '2022', FALSE, 'member', 2),
('11111111-1111-1111-1111-111111111111', 'Muhammad Rizki', 'https://randomuser.me/api/portraits/men/2.jpg', 'Sekretaris 1', '2023', FALSE, 'member', 3),
('11111111-1111-1111-1111-111111111111', 'Fatimah Zahra', 'https://randomuser.me/api/portraits/women/2.jpg', 'Sekretaris 2', '2023', FALSE, 'member', 4),
('11111111-1111-1111-1111-111111111111', 'Abdullah Rahman', 'https://randomuser.me/api/portraits/men/3.jpg', 'Bendahara 1', '2022', FALSE, 'member', 5),
('11111111-1111-1111-1111-111111111111', 'Khadijah Nur', 'https://randomuser.me/api/portraits/women/3.jpg', 'Bendahara 2', '2023', FALSE, 'member', 6),
('11111111-1111-1111-1111-111111111111', 'Umar Hadi', 'https://randomuser.me/api/portraits/men/4.jpg', 'Koordinator Internal', '2022', FALSE, 'member', 7),
('11111111-1111-1111-1111-111111111111', 'Aminah Putri', 'https://randomuser.me/api/portraits/women/4.jpg', 'Koordinator Eksternal', '2023', FALSE, 'member', 8),
-- 4 Staff
('11111111-1111-1111-1111-111111111111', 'Bilal Ahmad', 'https://randomuser.me/api/portraits/men/5.jpg', 'Staff Administrasi', '2024', FALSE, 'staff', 9),
('11111111-1111-1111-1111-111111111111', 'Zainab Dewi', 'https://randomuser.me/api/portraits/women/5.jpg', 'Staff Keuangan', '2024', FALSE, 'staff', 10),
('11111111-1111-1111-1111-111111111111', 'Hamza Malik', 'https://randomuser.me/api/portraits/men/6.jpg', 'Staff Protokoler', '2024', FALSE, 'staff', 11),
('11111111-1111-1111-1111-111111111111', 'Maryam Sari', 'https://randomuser.me/api/portraits/women/6.jpg', 'Staff Dokumentasi', '2024', FALSE, 'staff', 12),

-- ============================================
-- DIVISI LITBANG - 1 Kepala + 7 Anggota + 4 Staff
-- ============================================
-- Kepala
('22222222-2222-2222-2222-222222222222', 'Ibrahim Yusuf', 'https://randomuser.me/api/portraits/men/11.jpg', 'Kepala Divisi', '2022', TRUE, 'head', 1),
-- 7 Anggota
('22222222-2222-2222-2222-222222222222', 'Hafsa Amina', 'https://randomuser.me/api/portraits/women/11.jpg', 'Wakil Kepala', '2022', FALSE, 'member', 2),
('22222222-2222-2222-2222-222222222222', 'Salman Farisi', 'https://randomuser.me/api/portraits/men/12.jpg', 'Koordinator Riset', '2023', FALSE, 'member', 3),
('22222222-2222-2222-2222-222222222222', 'Ruqayyah Wati', 'https://randomuser.me/api/portraits/women/12.jpg', 'Koordinator Kajian', '2023', FALSE, 'member', 4),
('22222222-2222-2222-2222-222222222222', 'Hasan Basri', 'https://randomuser.me/api/portraits/men/13.jpg', 'Anggota Riset', '2022', FALSE, 'member', 5),
('22222222-2222-2222-2222-222222222222', 'Sumayyah Fitri', 'https://randomuser.me/api/portraits/women/13.jpg', 'Anggota Kajian', '2023', FALSE, 'member', 6),
('22222222-2222-2222-2222-222222222222', 'Muadz Khalid', 'https://randomuser.me/api/portraits/men/14.jpg', 'Anggota Publikasi', '2022', FALSE, 'member', 7),
('22222222-2222-2222-2222-222222222222', 'Asma Rahmah', 'https://randomuser.me/api/portraits/women/14.jpg', 'Anggota Data', '2023', FALSE, 'member', 8),
-- 4 Staff
('22222222-2222-2222-2222-222222222222', 'Thariq Zaid', 'https://randomuser.me/api/portraits/men/15.jpg', 'Staff Penelitian', '2024', FALSE, 'staff', 9),
('22222222-2222-2222-2222-222222222222', 'Safiya Nadia', 'https://randomuser.me/api/portraits/women/15.jpg', 'Staff Dokumentasi', '2024', FALSE, 'staff', 10),
('22222222-2222-2222-2222-222222222222', 'Zubair Ali', 'https://randomuser.me/api/portraits/men/16.jpg', 'Staff Analisis', '2024', FALSE, 'staff', 11),
('22222222-2222-2222-2222-222222222222', 'Halimah Syifa', 'https://randomuser.me/api/portraits/women/16.jpg', 'Staff Perpustakaan', '2024', FALSE, 'staff', 12),

-- ============================================
-- DIVISI HUMAS - 1 Kepala + 7 Anggota + 4 Staff
-- ============================================
-- Kepala
('33333333-3333-3333-3333-333333333333', 'Zainab Putri', 'https://randomuser.me/api/portraits/women/21.jpg', 'Kepala Divisi', '2022', TRUE, 'head', 1),
-- 7 Anggota
('33333333-3333-3333-3333-333333333333', 'Hamzah Yusuf', 'https://randomuser.me/api/portraits/men/21.jpg', 'Wakil Kepala', '2022', FALSE, 'member', 2),
('33333333-3333-3333-3333-333333333333', 'Maryam Saleh', 'https://randomuser.me/api/portraits/women/22.jpg', 'Koordinator Publikasi', '2023', FALSE, 'member', 3),
('33333333-3333-3333-3333-333333333333', 'Khalid Harun', 'https://randomuser.me/api/portraits/men/22.jpg', 'Koordinator Dokumentasi', '2023', FALSE, 'member', 4),
('33333333-3333-3333-3333-333333333333', 'Laila Azizah', 'https://randomuser.me/api/portraits/women/23.jpg', 'Anggota Media', '2022', FALSE, 'member', 5),
('33333333-3333-3333-3333-333333333333', 'Yusuf Hakim', 'https://randomuser.me/api/portraits/men/23.jpg', 'Anggota Relasi', '2023', FALSE, 'member', 6),
('33333333-3333-3333-3333-333333333333', 'Fatima Husna', 'https://randomuser.me/api/portraits/women/24.jpg', 'Anggota Protokol', '2022', FALSE, 'member', 7),
('33333333-3333-3333-3333-333333333333', 'Imran Fauzi', 'https://randomuser.me/api/portraits/men/24.jpg', 'Anggota Partnership', '2023', FALSE, 'member', 8),
-- 4 Staff
('33333333-3333-3333-3333-333333333333', 'Aisha Maya', 'https://randomuser.me/api/portraits/women/25.jpg', 'Staff Sosmed', '2024', FALSE, 'staff', 9),
('33333333-3333-3333-3333-333333333333', 'Rafi Maulana', 'https://randomuser.me/api/portraits/men/25.jpg', 'Staff Fotografi', '2024', FALSE, 'staff', 10),
('33333333-3333-3333-3333-333333333333', 'Nabila Rahma', 'https://randomuser.me/api/portraits/women/26.jpg', 'Staff Videografi', '2024', FALSE, 'staff', 11),
('33333333-3333-3333-3333-333333333333', 'Dimas Prasetyo', 'https://randomuser.me/api/portraits/men/26.jpg', 'Staff Desain', '2024', FALSE, 'staff', 12),

-- ============================================
-- DIVISI PSDM - 1 Kepala + 7 Anggota + 4 Staff
-- ============================================
-- Kepala
('44444444-4444-4444-4444-444444444444', 'Ibrahim Malik', 'https://randomuser.me/api/portraits/men/31.jpg', 'Kepala Divisi', '2022', TRUE, 'head', 1),
-- 7 Anggota
('44444444-4444-4444-4444-444444444444', 'Hafsa Amina', 'https://randomuser.me/api/portraits/women/31.jpg', 'Wakil Kepala', '2022', FALSE, 'member', 2),
('44444444-4444-4444-4444-444444444444', 'Yusuf Hakim', 'https://randomuser.me/api/portraits/men/32.jpg', 'Koordinator Pelatihan', '2023', FALSE, 'member', 3),
('44444444-4444-4444-4444-444444444444', 'Sarah Qolbi', 'https://randomuser.me/api/portraits/women/32.jpg', 'Koordinator Rekrutmen', '2023', FALSE, 'member', 4),
('44444444-4444-4444-4444-444444444444', 'Faris Abdullah', 'https://randomuser.me/api/portraits/men/33.jpg', 'Anggota Training', '2022', FALSE, 'member', 5),
('44444444-4444-4444-4444-444444444444', 'Hana Zahra', 'https://randomuser.me/api/portraits/women/33.jpg', 'Anggota Mentoring', '2023', FALSE, 'member', 6),
('44444444-4444-4444-4444-444444444444', 'Arif Rahman', 'https://randomuser.me/api/portraits/men/34.jpg', 'Anggota Evaluasi', '2022', FALSE, 'member', 7),
('44444444-4444-4444-4444-444444444444', 'Nisa Kamila', 'https://randomuser.me/api/portraits/women/34.jpg', 'Anggota Development', '2023', FALSE, 'member', 8),
-- 4 Staff
('44444444-4444-4444-4444-444444444444', 'Rizky Aditya', 'https://randomuser.me/api/portraits/men/35.jpg', 'Staff HR', '2024', FALSE, 'staff', 9),
('44444444-4444-4444-4444-444444444444', 'Bella Safira', 'https://randomuser.me/api/portraits/women/35.jpg', 'Staff Administrasi', '2024', FALSE, 'staff', 10),
('44444444-4444-4444-4444-444444444444', 'Galih Pratama', 'https://randomuser.me/api/portraits/men/36.jpg', 'Staff Event', '2024', FALSE, 'staff', 11),
('44444444-4444-4444-4444-444444444444', 'Dina Maharani', 'https://randomuser.me/api/portraits/women/36.jpg', 'Staff Dokumentasi', '2024', FALSE, 'staff', 12),

-- ============================================
-- DIVISI MIT - 1 Kepala + 7 Anggota + 4 Staff
-- ============================================
-- Kepala
('55555555-5555-5555-5555-555555555555', 'Salman Farisi', 'https://randomuser.me/api/portraits/men/41.jpg', 'Kepala Divisi', '2022', TRUE, 'head', 1),
-- 7 Anggota
('55555555-5555-5555-5555-555555555555', 'Ruqayyah Dewi', 'https://randomuser.me/api/portraits/women/41.jpg', 'Wakil Kepala', '2022', FALSE, 'member', 2),
('55555555-5555-5555-5555-555555555555', 'Bilal Ahmad', 'https://randomuser.me/api/portraits/men/42.jpg', 'Koordinator IT', '2023', FALSE, 'member', 3),
('55555555-5555-5555-5555-555555555555', 'Aisyah Rahma', 'https://randomuser.me/api/portraits/women/42.jpg', 'Koordinator Media', '2023', FALSE, 'member', 4),
('55555555-5555-5555-5555-555555555555', 'Fajar Hidayat', 'https://randomuser.me/api/portraits/men/43.jpg', 'Anggota Developer', '2022', FALSE, 'member', 5),
('55555555-5555-5555-5555-555555555555', 'Mutia Sari', 'https://randomuser.me/api/portraits/women/43.jpg', 'Anggota Design', '2023', FALSE, 'member', 6),
('55555555-5555-5555-5555-555555555555', 'Andi Kurniawan', 'https://randomuser.me/api/portraits/men/44.jpg', 'Anggota Network', '2022', FALSE, 'member', 7),
('55555555-5555-5555-5555-555555555555', 'Intan Permata', 'https://randomuser.me/api/portraits/women/44.jpg', 'Anggota Content', '2023', FALSE, 'member', 8),
-- 4 Staff
('55555555-5555-5555-5555-555555555555', 'Yoga Pratama', 'https://randomuser.me/api/portraits/men/45.jpg', 'Staff Web Dev', '2024', FALSE, 'staff', 9),
('55555555-5555-5555-5555-555555555555', 'Citra Dewi', 'https://randomuser.me/api/portraits/women/45.jpg', 'Staff UI/UX', '2024', FALSE, 'staff', 10),
('55555555-5555-5555-5555-555555555555', 'Bayu Setiawan', 'https://randomuser.me/api/portraits/men/46.jpg', 'Staff Database', '2024', FALSE, 'staff', 11),
('55555555-5555-5555-5555-555555555555', 'Rini Astuti', 'https://randomuser.me/api/portraits/women/46.jpg', 'Staff Sosmed', '2024', FALSE, 'staff', 12),

-- ============================================
-- DIVISI ENTRE - 1 Kepala + 7 Anggota + 4 Staff
-- ============================================
-- Kepala
('66666666-6666-6666-6666-666666666666', 'Hasan Basri', 'https://randomuser.me/api/portraits/men/51.jpg', 'Kepala Divisi', '2022', TRUE, 'head', 1),
-- 7 Anggota
('66666666-6666-6666-6666-666666666666', 'Sumayyah Fitri', 'https://randomuser.me/api/portraits/women/51.jpg', 'Wakil Kepala', '2022', FALSE, 'member', 2),
('66666666-6666-6666-6666-666666666666', 'Muadz Khalid', 'https://randomuser.me/api/portraits/men/52.jpg', 'Koordinator Bisnis', '2023', FALSE, 'member', 3),
('66666666-6666-6666-6666-666666666666', 'Zahra Amelia', 'https://randomuser.me/api/portraits/women/52.jpg', 'Koordinator Marketing', '2023', FALSE, 'member', 4),
('66666666-6666-6666-6666-666666666666', 'Ilham Wijaya', 'https://randomuser.me/api/portraits/men/53.jpg', 'Anggota Sales', '2022', FALSE, 'member', 5),
('66666666-6666-6666-6666-666666666666', 'Putri Handayani', 'https://randomuser.me/api/portraits/women/53.jpg', 'Anggota Finance', '2023', FALSE, 'member', 6),
('66666666-6666-6666-6666-666666666666', 'Rendi Saputra', 'https://randomuser.me/api/portraits/men/54.jpg', 'Anggota Product', '2022', FALSE, 'member', 7),
('66666666-6666-6666-6666-666666666666', 'Alya Kusuma', 'https://randomuser.me/api/portraits/women/54.jpg', 'Anggota Partnership', '2023', FALSE, 'member', 8),
-- 4 Staff
('66666666-6666-6666-6666-666666666666', 'Fikri Ramadan', 'https://randomuser.me/api/portraits/men/55.jpg', 'Staff Operasional', '2024', FALSE, 'staff', 9),
('66666666-6666-6666-6666-666666666666', 'Nadya Aulia', 'https://randomuser.me/api/portraits/women/55.jpg', 'Staff Keuangan', '2024', FALSE, 'staff', 10),
('66666666-6666-6666-6666-666666666666', 'Daffa Pratama', 'https://randomuser.me/api/portraits/men/56.jpg', 'Staff Marketing', '2024', FALSE, 'staff', 11),
('66666666-6666-6666-6666-666666666666', 'Lina Marlina', 'https://randomuser.me/api/portraits/women/56.jpg', 'Staff Event', '2024', FALSE, 'staff', 12);

-- ============================================
-- BAGIAN 8: BUAT TABEL WORK_PROGRAMS (PROGRAM KERJA)
-- ============================================
CREATE TABLE work_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
  program_name VARCHAR(255) NOT NULL,
  person_in_charge VARCHAR(100) NOT NULL,
  realization VARCHAR(20) DEFAULT 'Belum', -- 'Terlaksana', 'Proses', 'Belum'
  order_number INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert program kerja untuk setiap divisi
INSERT INTO work_programs (division_id, program_name, person_in_charge, realization, order_number) VALUES
-- BPH (5 program)
('11111111-1111-1111-1111-111111111111', 'Rapat Koordinasi Bulanan', 'Ahmad Fauzan', 'Terlaksana', 1),
('11111111-1111-1111-1111-111111111111', 'Evaluasi Kinerja Semester', 'Siti Aisyah', 'Terlaksana', 2),
('11111111-1111-1111-1111-111111111111', 'Musyawarah Besar', 'Ahmad Fauzan', 'Proses', 3),
('11111111-1111-1111-1111-111111111111', 'Laporan Pertanggungjawaban', 'Muhammad Rizki', 'Belum', 4),
('11111111-1111-1111-1111-111111111111', 'Serah Terima Jabatan', 'Ahmad Fauzan', 'Belum', 5),

-- LITBANG (5 program)
('22222222-2222-2222-2222-222222222222', 'Kajian Ekonomi Islam Bulanan', 'Ibrahim Yusuf', 'Terlaksana', 1),
('22222222-2222-2222-2222-222222222222', 'Penelitian Perbankan Syariah', 'Hafsa Amina', 'Proses', 2),
('22222222-2222-2222-2222-222222222222', 'Publikasi Jurnal Mahasiswa', 'Salman Farisi', 'Belum', 3),
('22222222-2222-2222-2222-222222222222', 'Seminar Hasil Penelitian', 'Ruqayyah Wati', 'Belum', 4),
('22222222-2222-2222-2222-222222222222', 'Bedah Buku Ekonomi Islam', 'Ibrahim Yusuf', 'Terlaksana', 5),

-- HUMAS (5 program)
('33333333-3333-3333-3333-333333333333', 'Sosialisasi Kegiatan HMPS', 'Zainab Putri', 'Terlaksana', 1),
('33333333-3333-3333-3333-333333333333', 'Kerjasama Eksternal', 'Hamzah Yusuf', 'Terlaksana', 2),
('33333333-3333-3333-3333-333333333333', 'Dokumentasi Kegiatan', 'Maryam Saleh', 'Proses', 3),
('33333333-3333-3333-3333-333333333333', 'Pengelolaan Media Sosial', 'Khalid Harun', 'Terlaksana', 4),
('33333333-3333-3333-3333-333333333333', 'Press Release Kegiatan', 'Zainab Putri', 'Proses', 5),

-- PSDM (5 program)
('44444444-4444-4444-4444-444444444444', 'Pelatihan Leadership', 'Ibrahim Malik', 'Terlaksana', 1),
('44444444-4444-4444-4444-444444444444', 'Workshop Soft Skills', 'Hafsa Amina', 'Terlaksana', 2),
('44444444-4444-4444-4444-444444444444', 'Open Recruitment Anggota', 'Yusuf Hakim', 'Proses', 3),
('44444444-4444-4444-4444-444444444444', 'Mentoring Angkatan', 'Sarah Qolbi', 'Terlaksana', 4),
('44444444-4444-4444-4444-444444444444', 'Evaluasi Kinerja Anggota', 'Ibrahim Malik', 'Belum', 5),

-- MIT (5 program)
('55555555-5555-5555-5555-555555555555', 'Pengelolaan Website HMPS', 'Salman Farisi', 'Terlaksana', 1),
('55555555-5555-5555-5555-555555555555', 'Konten Media Sosial', 'Ruqayyah Dewi', 'Terlaksana', 2),
('55555555-5555-5555-5555-555555555555', 'Sistem Informasi Internal', 'Bilal Ahmad', 'Proses', 3),
('55555555-5555-5555-5555-555555555555', 'Workshop Digital Marketing', 'Aisyah Rahma', 'Belum', 4),
('55555555-5555-5555-5555-555555555555', 'Database Anggota', 'Salman Farisi', 'Terlaksana', 5),

-- ENTRE (5 program)
('66666666-6666-6666-6666-666666666666', 'Bazaar Ekonomi Syariah', 'Hasan Basri', 'Terlaksana', 1),
('66666666-6666-6666-6666-666666666666', 'Workshop Kewirausahaan', 'Sumayyah Fitri', 'Terlaksana', 2),
('66666666-6666-6666-6666-666666666666', 'UMKM Binaan', 'Muadz Khalid', 'Proses', 3),
('66666666-6666-6666-6666-666666666666', 'Business Plan Competition', 'Zahra Amelia', 'Belum', 4),
('66666666-6666-6666-6666-666666666666', 'Kerjasama UMKM Halal', 'Hasan Basri', 'Proses', 5);

-- ============================================
-- BAGIAN 9: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policy untuk mengizinkan semua operasi (untuk development)
-- CATATAN: Untuk production, sesuaikan policy ini
CREATE POLICY "Allow all operations on news" ON news FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on contacts" ON contacts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on divisions" ON divisions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on members" ON members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on work_programs" ON work_programs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on admins" ON admins FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- BAGIAN 10: BUAT STORAGE BUCKETS (OPSIONAL)
-- Untuk menyimpan foto berita dan anggota
-- ============================================
-- INSERT INTO storage.buckets (id, name, public) VALUES
-- ('news-images', 'news-images', true),
-- ('member-photos', 'member-photos', true),
-- ('gallery-images', 'gallery-images', true);

-- ============================================
-- SELESAI!
-- ============================================
-- Data yang telah dimasukkan:
-- - 1 Admin (username: admin, password: admin123)
-- - 30 Berita
-- - 30 Foto Galeri
-- - 5 Pesan Kontak
-- - 6 Divisi
-- - 72 Anggota (12 per divisi: 1 kepala + 7 anggota + 4 staff)
-- - 30 Program Kerja (5 per divisi)
-- ============================================
