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

type Body = {
  action:
    | "createOffer"
    | "updateOffer"
    | "deleteOffer"
    | "createGalleryItem"
    | "updateGalleryItem"
    | "deleteGalleryItem"
    | "uploadImage";
  id?: string;
  data?: Partial<Offer> | Partial<GalleryItem>;
  filename?: string;
  dataUrl?: string;
};

const CONTENT_STORE_NAME = "tinplant-content";
const CONTENT_KEY = "site-content";
const MEDIA_STORE_NAME = "tinplant-media";

const defaultContent: SiteContent = {
  offers: [],
  gallery: [],
};

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

function getAdminToken(req: Request): string | null {
  const headerToken = req.headers.get("x-admin-token");
  if (headerToken) {
    return headerToken;
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length);
  }

  return null;
}

function isAuthorized(req: Request): boolean {
  const token = getAdminToken(req);
  const adminPassword = Netlify.env.get("ADMIN_PANEL_PASSWORD") ?? "tinplant-admin";
  return token === adminPassword;
}

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

function nowIso() {
  return new Date().toISOString();
}

async function getContentStore() {
  return getStore({ name: CONTENT_STORE_NAME, consistency: "strong" });
}

async function getMediaStore() {
  return getStore({ name: MEDIA_STORE_NAME, consistency: "strong" });
}

async function getContent(): Promise<SiteContent> {
  const store = await getContentStore();
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

async function saveContent(content: SiteContent) {
  const store = await getContentStore();
  await store.setJSON(CONTENT_KEY, content);
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function extensionFromType(contentType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
  };

  return map[contentType] ?? "bin";
}

function parseDataUrl(dataUrl: string): { contentType: string; bytes: Uint8Array } | null {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    return null;
  }

  const contentType = match[1];
  const base64 = match[2];
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return { contentType, bytes };
}

export default async (req: Request) => {
  if (!isAuthorized(req)) {
    return unauthorized();
  }

  if (req.method === "GET") {
    const content = await getContent();
    return Response.json(content);
  }

  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return badRequest("Invalid JSON body");
  }

  const content = await getContent();

  if (body.action === "createOffer") {
    const data = body.data as Partial<Offer>;
    if (!data?.title || !data?.description) {
      return badRequest("Offer title and description are required");
    }

    const offer: Offer = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      price: data.price ?? "",
      imageUrl: data.imageUrl ?? "",
      ctaText: data.ctaText ?? "Learn More",
      ctaLink: data.ctaLink ?? "/contact",
      isActive: data.isActive ?? true,
      updatedAt: nowIso(),
    };

    content.offers.unshift(offer);
    await saveContent(content);
    return Response.json({ content, item: offer });
  }

  if (body.action === "updateOffer") {
    if (!body.id) {
      return badRequest("Offer id is required");
    }

    const data = body.data as Partial<Offer>;
    content.offers = content.offers.map((offer) => {
      if (offer.id !== body.id) {
        return offer;
      }

      return {
        ...offer,
        ...data,
        id: offer.id,
        updatedAt: nowIso(),
      };
    });

    await saveContent(content);
    return Response.json({ content });
  }

  if (body.action === "deleteOffer") {
    if (!body.id) {
      return badRequest("Offer id is required");
    }

    content.offers = content.offers.filter((offer) => offer.id !== body.id);
    await saveContent(content);
    return Response.json({ content });
  }

  if (body.action === "createGalleryItem") {
    const data = body.data as Partial<GalleryItem>;
    if (!data?.title || !data?.imageUrl) {
      return badRequest("Gallery title and image are required");
    }

    const item: GalleryItem = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description ?? "",
      category: data.category?.trim() || "general",
      imageUrl: data.imageUrl,
      updatedAt: nowIso(),
    };

    content.gallery.unshift(item);
    await saveContent(content);
    return Response.json({ content, item });
  }

  if (body.action === "updateGalleryItem") {
    if (!body.id) {
      return badRequest("Gallery item id is required");
    }

    const data = body.data as Partial<GalleryItem>;
    content.gallery = content.gallery.map((item) => {
      if (item.id !== body.id) {
        return item;
      }

      return {
        ...item,
        ...data,
        id: item.id,
        category: data.category?.trim() || item.category,
        updatedAt: nowIso(),
      };
    });

    await saveContent(content);
    return Response.json({ content });
  }

  if (body.action === "deleteGalleryItem") {
    if (!body.id) {
      return badRequest("Gallery item id is required");
    }

    content.gallery = content.gallery.filter((item) => item.id !== body.id);
    await saveContent(content);
    return Response.json({ content });
  }

  if (body.action === "uploadImage") {
    if (!body.dataUrl || !body.filename) {
      return badRequest("filename and dataUrl are required");
    }

    const parsed = parseDataUrl(body.dataUrl);
    if (!parsed || !parsed.contentType.startsWith("image/")) {
      return badRequest("Invalid image data");
    }

    const ext = extensionFromType(parsed.contentType);
    const mediaKey = `uploads/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const mediaStore = await getMediaStore();
    await mediaStore.set(mediaKey, toArrayBuffer(parsed.bytes));
    await mediaStore.setJSON(`${mediaKey}.meta`, {
      contentType: parsed.contentType,
      originalName: body.filename,
      uploadedAt: nowIso(),
    });

    return Response.json({ imageUrl: `/api/media?key=${encodeURIComponent(mediaKey)}`, key: mediaKey });
  }

  return badRequest("Unknown action");
};

export const config: Config = {
  path: "/api/admin/content",
  method: ["GET", "POST"],
};
