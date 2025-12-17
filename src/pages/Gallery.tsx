import { useEffect, useState } from "react";
import { supabase, Gallery as GalleryType } from "@/lib/supabase";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const Gallery = () => {
  const [images, setImages] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryType | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setImages(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat galeri...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Galeri Kegiatan
          </h1>
          <p className="text-lg text-muted-foreground">
            Dokumentasi kegiatan dan momen berharga HMPS Perbankan Syariah
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Belum ada foto yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={image.image_url}
                  alt={image.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/000080/D4AF37?text=HMPS';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-primary-foreground text-sm font-medium line-clamp-2">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 right-0 p-2 rounded-full bg-background/10 backdrop-blur-sm text-primary-foreground hover:bg-background/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          {selectedImage && (
            <div className="bg-card rounded-2xl overflow-hidden shadow-large">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.caption}
                className="w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/000080/D4AF37?text=HMPS';
                }}
              />
              <div className="p-6 bg-card">
                <p className="text-card-foreground font-medium">{selectedImage.caption}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date(selectedImage.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
