// ============================================
// FILE: src/App.tsx
// DESKRIPSI: Konfigurasi Router dan Routes Aplikasi
// ============================================
// EDIT ROUTES DI bagian <Routes> (baris 25-35)
// TAMBAH HALAMAN BARU DI SINI
// ============================================

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Divisi from "./pages/Divisi";
import DivisionDetail from "./pages/DivisionDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* === HALAMAN PUBLIK === */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/divisi" element={<Layout><Divisi /></Layout>} />
          <Route path="/divisi/:slug" element={<Layout><DivisionDetail /></Layout>} />
          <Route path="/news" element={<Layout><News /></Layout>} />
          <Route path="/news/:slug" element={<Layout><NewsDetail /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          
          {/* === HALAMAN ADMIN === */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* === HALAMAN 404 === */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
