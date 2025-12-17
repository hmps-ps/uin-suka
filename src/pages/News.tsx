import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, News as NewsType } from "@/lib/supabase";
import { Calendar } from "lucide-react";

const News = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setNews(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Berita & Kegiatan
          </h1>
          <p className="text-lg text-muted-foreground">
            Informasi terkini seputar kegiatan dan program HMPS Perbankan Syariah
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Belum ada berita yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {news.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000080/D4AF37?text=HMPS';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(item.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {item.content.substring(0, 150)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
