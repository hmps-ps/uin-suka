// ============================================
// FILE: src/pages/DivisionDetail.tsx
// DESKRIPSI: Halaman detail divisi dengan kartu anggota dan program kerja
// ============================================
// STRUKTUR ANGGOTA: 1 Kepala + 7 Anggota + 4 Staff
// DESIGN KARTU: Profesional dengan efek gradient dan shadow
// TANPA ICON CROWN/USER - design clean dan minimalis
// ============================================

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, Division, Member, WorkProgram } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DivisionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [division, setDivision] = useState<Division | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [workPrograms, setWorkPrograms] = useState<WorkProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchDivisionData(slug);
    }
  }, [slug]);

  // ============================================
  // FUNGSI FETCH DATA DARI SUPABASE
  // Data otomatis sinkron dengan database
  // ============================================
  const fetchDivisionData = async (divisionSlug: string) => {
    setLoading(true);

    // Ambil data divisi dari database
    const { data: divisionData } = await supabase
      .from("divisions")
      .select("*")
      .eq("slug", divisionSlug)
      .maybeSingle();

    if (divisionData) {
      setDivision(divisionData);

      // Ambil members berdasarkan division_id
      const { data: membersData } = await supabase
        .from("members")
        .select("*")
        .eq("division_id", divisionData.id)
        .order("position_order", { ascending: true });
      
      if (membersData) setMembers(membersData);

      // Ambil work programs berdasarkan division_id
      // INI SINKRON - ketika ditambah di dashboard, otomatis muncul di sini
      const { data: programsData } = await supabase
        .from("work_programs")
        .select("*")
        .eq("division_id", divisionData.id)
        .order("order_number", { ascending: true });
      
      if (programsData) setWorkPrograms(programsData);
    }

    setLoading(false);
  };

  // === FUNGSI UNTUK WARNA STATUS REALISASI ===
  const getRealizationColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "terlaksana":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "proses":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "belum":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!division) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Divisi tidak ditemukan</h1>
        <Link to="/divisi">
          <Button>Kembali ke Daftar Divisi</Button>
        </Link>
      </div>
    );
  }

  // ============================================
  // FILTER ANGGOTA BERDASARKAN ROLE
  // head = Kepala Divisi (1 orang)
  // member = Anggota (7 orang)
  // staff = Staff (4 orang)
  // ============================================
  const headMember = members.find((m) => m.is_head || m.role === 'head');
  const regularMembers = members.filter((m) => !m.is_head && m.role === 'member');
  const staffMembers = members.filter((m) => m.role === 'staff');

  return (
    <div className="min-h-screen bg-background">
      {/* ============================================ */}
      {/* HEADER SECTION - EDIT WARNA DAN STYLE DI SINI */}
      {/* ============================================ */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/divisi" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Divisi
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Divisi {division.name}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            {division.description}
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION KEPALA DIVISI - DESIGN PREMIUM */}
      {/* ============================================ */}
      {headMember && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Kepala Divisi</h2>
            
            {/* KARTU KEPALA DIVISI - DESIGN PROFESIONAL PREMIUM */}
            <div className="flex justify-center">
              <div className="relative bg-gradient-to-br from-primary/5 via-card to-secondary/5 rounded-3xl p-8 shadow-xl border border-secondary/30 text-center max-w-sm overflow-hidden">
                {/* Background Decorative */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                {/* Foto dengan ring gradient */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-secondary rounded-full p-1 animate-pulse"></div>
                  <img
                    src={headMember.photo_url}
                    alt={headMember.name}
                    className="relative w-36 h-36 rounded-full object-cover border-4 border-background"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(headMember.name)}&background=000080&color=fff&size=150`;
                    }}
                  />
                </div>
                
                {/* Info */}
                <h4 className="text-xl font-bold text-card-foreground mb-2">{headMember.name}</h4>
                <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-full text-sm font-semibold mb-3">
                  {headMember.biro}
                </div>
                <p className="text-muted-foreground text-sm">Angkatan {headMember.angkatan}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECTION ANGGOTA (7 ORANG) - DESIGN MODERN */}
      {/* ============================================ */}
      {regularMembers.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Anggota</h2>
            
            {/* GRID KARTU ANGGOTA - DESIGN PROFESIONAL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularMembers.map((member, index) => (
                <div 
                  key={member.id}
                  className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-xl transition-all duration-500 text-center border border-border hover:-translate-y-2 overflow-hidden relative"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Foto dengan border gradient */}
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="relative w-28 h-28 rounded-full object-cover border-3 border-primary/20 group-hover:border-transparent transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=D4AF37&color=fff&size=120`;
                        }}
                      />
                    </div>
                    
                    <h4 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">{member.name}</h4>
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {member.biro}
                    </div>
                    <p className="text-muted-foreground text-xs">Angkatan {member.angkatan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECTION STAFF (4 ORANG) - DESIGN COMPACT */}
      {/* ============================================ */}
      {staffMembers.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Staff</h2>
            
            {/* GRID KARTU STAFF - DESIGN COMPACT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {staffMembers.map((staff) => (
                <div 
                  key={staff.id}
                  className="group bg-gradient-to-br from-card to-muted/20 rounded-xl p-5 shadow-soft hover:shadow-lg transition-all duration-300 text-center border border-border/50 hover:-translate-y-1"
                >
                  {/* Foto */}
                  <div className="relative inline-block mb-3">
                    <img
                      src={staff.photo_url}
                      alt={staff.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-secondary/30 group-hover:border-secondary transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name)}&background=000080&color=fff&size=100`;
                      }}
                    />
                  </div>
                  
                  <h4 className="text-base font-bold text-card-foreground mb-1 group-hover:text-secondary transition-colors duration-300">{staff.name}</h4>
                  <p className="text-secondary font-medium text-xs mb-1">{staff.biro}</p>
                  <p className="text-muted-foreground text-xs">Angkatan {staff.angkatan}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECTION PROGRAM KERJA */}
      {/* DATA SINKRON DENGAN DATABASE - OTOMATIS UPDATE */}
      {/* ============================================ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Program Kerja</h2>
          
          {/* TABEL PROGRAM KERJA - EDIT TAMPILAN DI SINI */}
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden max-w-5xl mx-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead className="font-bold text-foreground w-16">No</TableHead>
                  <TableHead className="font-bold text-foreground">Program Kerja</TableHead>
                  <TableHead className="font-bold text-foreground">Penanggung Jawab</TableHead>
                  <TableHead className="font-bold text-foreground text-center">Realisasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workPrograms.map((program, index) => (
                  <TableRow key={program.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{program.program_name}</TableCell>
                    <TableCell>{program.person_in_charge}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRealizationColor(program.realization)}`}>
                        {program.realization}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {workPrograms.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      Belum ada program kerja
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DivisionDetail;
