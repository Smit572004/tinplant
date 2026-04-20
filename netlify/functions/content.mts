import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

type Offer = {
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

type GalleryItem = {
  id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  updatedAt: string;
};

type SiteContent = {
  offers: Offer[];
  gallery: GalleryItem[];
};

const STORE_NAME = "tinplant-content";
const CONTENT_KEY = "site-content";

const defaultContent: SiteContent = {
  offers: [
    {
      id: "retail-10-percent-over-50",
      title: "10% Off Orders Over EUR 50",
      description:
        "Retail customers get 10% discount when buying more than EUR 50 of flowers, vegetable plants, and gardening plants. Not valid for forestry plants.",
      price: "Save 10%",
      ctaText: "Contact to Order",
      ctaLink: "/contact",
      isActive: true,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "retail-buy-10-get-1",
      title: "Buy 10 Plants, Get 1 Free",
      description:
        "Retail customers buying flowers, vegetable plants, and gardening plants can get 1 free plant when they buy 10 plants. Not valid for forestry plants.",
      price: "Buy 10 + 1 Free",
      ctaText: "Contact to Order",
      ctaLink: "/contact",
      isActive: true,
      updatedAt: new Date().toISOString(),
    },
  ],
  gallery: [],
};

async function getContent(): Promise<SiteContent> {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const saved = await store.get(CONTENT_KEY, { type: "json" });

  if (saved && typeof saved === "object") {
    const parsed = saved as SiteContent;
    return {
      offers: Array.isArray(parsed.offers) ? parsed.offers : [],
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
    };
  }

  await store.setJSON(CONTENT_KEY, defaultContent);
  return defaultContent;
}

export default async () => {
  try {
    const content = await getContent();
    return Response.json(content);
  } catch (error) {
    return Response.json(
      {
        error: "Unable to load content",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};

export const config: Config = {
  path: "/api/content",
  method: "GET",
};
