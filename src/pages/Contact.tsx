import { useEffect, useState } from "react";
import { supabase, FooterSettings } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [footerData, setFooterData] = useState<Partial<FooterSettings> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Mohon lengkapi semua field");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("contacts")
      .insert([formData]);

    setLoading(false);

    if (error) {
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
      console.error(error);
    } else {
      toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  useEffect(() => {
    const fetchFooter = async () => {
      const { data } = await supabase.from("footer_settings").select("*").maybeSingle();
      if (data) setFooterData(data);
    };

    fetchFooter();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-muted-foreground">
            Punya pertanyaan atau ingin bergabung? Jangan ragu untuk menghubungi kami
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-card-foreground mb-6">
              Kirim Pesan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tulis pesan Anda di sini..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base"
              >
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-card rounded-2xl p-8 shadow-soft mb-6">
              <h2 className="text-2xl font-semibold text-card-foreground mb-6">
                Informasi Kontak
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Alamat</h3>
                    <p className="text-muted-foreground text-sm">
                      {footerData?.address ? (
                        <span dangerouslySetInnerHTML={{ __html: footerData.address.replace(/\n/g, "<br />") }} />
                      ) : (
                        <>
                          Kampus Universitas<br />
                          Jl. Pendidikan No. 123<br />
                          Kota Anda, Indonesia
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Email</h3>
                    <a
                      href={`mailto:${footerData?.email ?? "hmps@university.ac.id"}`}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {footerData?.email ?? "hmps@university.ac.id"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Telepon</h3>
                    <a
                      href={`tel:${(footerData?.phone ?? "+62 812-3456-7890").replace(/\s/g,"")}`}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {footerData?.phone ?? "+62 812-3456-7890"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-soft">
              <iframe
                src={footerData?.maps_embed_url ?? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1751171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890123"}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
