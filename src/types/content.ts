export type Offer = {
  id: string;
  title: string;
  description: string;
  price?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  updatedAt: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  updatedAt: string;
};

export type SiteContent = {
  offers: Offer[];
  gallery: GalleryItem[];
};

