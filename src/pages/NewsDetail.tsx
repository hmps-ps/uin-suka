import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase, News } from "@/lib/supabase";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsDetail = () => {
  const { slug } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchNews(slug);
    }
  }, [slug]);

  const fetchNews = async (slug: string) => {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single();
    
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

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Berita Tidak Ditemukan</h1>
          <Link to="/news">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Berita
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link to="/news">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Berita
          </Button>
        </Link>

        <div className="bg-card rounded-2xl overflow-hidden shadow-medium">
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/1200x675/000080/D4AF37?text=HMPS+Perbankan+Syariah';
              }}
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <time>
                {new Date(news.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-8">
              {news.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              <div className="text-card-foreground leading-relaxed whitespace-pre-line">
                {news.content}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
