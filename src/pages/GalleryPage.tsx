import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchSiteContent } from "@/lib/content-api";

import galleryGreenhouse from "@/assets/gallery-greenhouse.jpg";
import gallerySeedlings from "@/assets/gallery-seedlings.jpg";
import galleryPlanting from "@/assets/gallery-planting.jpg";
import galleryNurseryAerial from "@/assets/gallery-nursery-aerial.jpg";
import galleryColdStorage from "@/assets/gallery-cold-storage.jpg";
import galleryLab from "@/assets/gallery-lab.jpg";
import galleryReforestation from "@/assets/gallery-reforestation.jpg";
import galleryLogistics from "@/assets/gallery-logistics.jpg";

type Category = string;

type GalleryImage = {
  src: string;
  category: string;
  titleEn: string;
  titleDe: string;
};

const fallbackImages: GalleryImage[] = [
  { src: galleryGreenhouse, category: "greenhouse", titleEn: "Modern Greenhouse Facility", titleDe: "Moderne Gewächshausanlage" },
  { src: gallerySeedlings, category: "production", titleEn: "Container Seedling Production", titleDe: "Containerpflanzen-Produktion" },
  { src: galleryPlanting, category: "field", titleEn: "Field Planting Operations", titleDe: "Pflanzarbeiten im Freiland" },
  { src: galleryNurseryAerial, category: "greenhouse", titleEn: "Nursery Aerial View", titleDe: "Baumschule aus der Luft" },
  { src: galleryColdStorage, category: "logistics", titleEn: "Cold Storage Facility", titleDe: "Kuhllagerhalle" },
  { src: galleryLab, category: "production", titleEn: "Quality Testing Laboratory", titleDe: "Qualitatspruflabor" },
  { src: galleryReforestation, category: "field", titleEn: "Successful Reforestation", titleDe: "Erfolgreiche Aufforstung" },
  { src: galleryLogistics, category: "logistics", titleEn: "Temperature-Controlled Transport", titleDe: "Temperaturkontrollierter Transport" },
];

const prettifyCategory = (value: string) =>
  value
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`)
    .join(" ");

const GalleryPage = () => {
  const { t, lang } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent,
  });

  const images = useMemo(() => {
    if (data?.gallery?.length) {
      return data.gallery.map((item) => ({
        src: item.imageUrl,
        category: item.category || "general",
        titleEn: item.title,
        titleDe: item.title,
      }));
    }

    return fallbackImages;
  }, [data?.gallery]);

  const categories = useMemo(() => {
    if (!data?.gallery?.length) {
      return [
        { key: "all", label: t("gallery.all") },
        { key: "greenhouse", label: t("gallery.greenhouse") },
        { key: "production", label: t("gallery.production") },
        { key: "field", label: t("gallery.field") },
        { key: "logistics", label: t("gallery.logisticsTab") },
      ];
    }

    const unique = Array.from(new Set(images.map((img) => img.category.toLowerCase())));
    return [{ key: "all", label: t("gallery.all") }].concat(
      unique.map((category) => ({
        key: category,
        label: prettifyCategory(category),
      })),
    );
  }, [data?.gallery?.length, images, t]);

  const filtered = activeCategory === "all" ? images : images.filter((img) => img.category.toLowerCase() === activeCategory);

  return (
    <PageLayout>
      <PageHero
        title={t("pageHero.galleryTitle")}
        subtitle={t("pageHero.gallerySubtitle")}
        description={t("pageHero.galleryDesc")}
      />

      <section className="section-padding">
        <div ref={ref} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-5 py-2 text-sm font-body font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-[var(--glow-green)]"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <div className="columns-1 space-y-5 gap-5 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={`${img.src}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl break-inside-avoid"
                  onClick={() => setLightboxIndex(images.indexOf(img))}
                >
                  <img
                    src={img.src}
                    alt={lang === "de" ? img.titleDe : img.titleEn}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-500 group-hover:bg-background/60">
                    <div className="text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ZoomIn className="mx-auto mb-2 text-primary" size={32} />
                      <p className="text-sm font-display font-bold">{lang === "de" ? img.titleDe : img.titleEn}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6 backdrop-blur-xl"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full glass transition-colors hover:bg-primary/20"
            >
              <X size={24} />
            </button>

            {lightboxIndex > 0 ? (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                className="absolute left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full glass text-2xl font-bold transition-colors hover:bg-primary/20"
              >
                {"<"}
              </button>
            ) : null}

            {lightboxIndex < images.length - 1 ? (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                className="absolute right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full glass text-2xl font-bold transition-colors hover:bg-primary/20"
              >
                {">"}
              </button>
            ) : null}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex max-h-[85vh] max-w-5xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={images[lightboxIndex].src}
                alt={lang === "de" ? images[lightboxIndex].titleDe : images[lightboxIndex].titleEn}
                className="max-h-[75vh] max-w-full rounded-xl object-contain"
              />
              <p className="mt-4 text-lg font-display font-bold">
                {lang === "de" ? images[lightboxIndex].titleDe : images[lightboxIndex].titleEn}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default GalleryPage;

