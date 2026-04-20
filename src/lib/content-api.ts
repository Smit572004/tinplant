import { SiteContent, Offer, GalleryItem } from "@/types/content";

const CONTENT_ENDPOINT = "/api/content";
const ADMIN_CONTENT_ENDPOINT = "/api/admin/content";

export const fallbackOffers: Offer[] = [
  {
    id: "retail-10-percent-over-50",
    title: "10% Off Orders Over EUR 50",
    description:
      "Retail customers get 10% discount when buying more than EUR 50 of flowers, vegetable plants, and gardening plants. Not valid for forestry plants.",
    price: "Save 10%",
    ctaText: "Contact to Order",
    ctaLink: "/contact",
    isActive: true,
    updatedAt: "2026-01-01T00:00:00.000Z",
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
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

async function parseJson<T>(response: Response): Promise<T> {
  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Keep default null and throw with generic message below.
  }

  if (!response.ok) {
    const message =
      typeof body === "object" && body !== null && "error" in body
        ? String((body as { error: string }).error)
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return body as T;
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const response = await fetch(CONTENT_ENDPOINT);
  return parseJson<SiteContent>(response);
}

export async function adminLogin(token: string): Promise<SiteContent> {
  const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
    headers: {
      "x-admin-token": token,
    },
  });
  return parseJson<SiteContent>(response);
}

export async function createOffer(token: string, data: Partial<Offer>): Promise<SiteContent> {
  const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify({ action: "createOffer", data }),
  });
  const payload = await parseJson<{ content: SiteContent }>(response);
  return payload.content;
}

export async function updateOffer(token: string, id: string, data: Partial<Offer>): Promise<SiteContent> {
  const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify({ action: "updateOffer", id, data }),
  });
  const payload = await parseJson<{ content: SiteContent }>(response);
  return payload.content;
}

export async function deleteOffer(token: string, id: string): Promise<SiteContent> {
  const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify({ action: "deleteOffer", id }),
  });
  const payload = await parseJson<{ content: SiteContent }>(response);
  return payload.content;
}

export async function createGalleryItem(token: string, data: Partial<GalleryItem>): Promise<SiteContent> {
  const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify({ action: "createGalleryItem", data }),
  });
  const payload = await parseJson<{ content: SiteContent }>(response);
  return payload.content;
}

export async function updateGalleryItem(token: string, id: string, data: Partial<GalleryItem>): Promise<SiteContent> {
  const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify({ action: "updateGalleryItem", id, data }),
  });
  const payload = await parseJson<{ content: SiteContent }>(response);
  return payload.content;
}

export async function deleteGalleryItem(token: string, id: string): Promise<SiteContent> {
  const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify({ action: "deleteGalleryItem", id }),
  });
  const payload = await parseJson<{ content: SiteContent }>(response);
  return payload.content;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read selected image"));
    reader.readAsDataURL(file);
  });
}

export async function uploadImage(token: string, file: File): Promise<string> {
  const dataUrl = await fileToDataUrl(file);
  const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify({
      action: "uploadImage",
      filename: file.name,
      dataUrl,
    }),
  });
  const payload = await parseJson<{ imageUrl: string }>(response);
  return payload.imageUrl;
}
