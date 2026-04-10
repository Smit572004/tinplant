import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const MEDIA_STORE_NAME = "tinplant-media";

type MediaMeta = {
  contentType?: string;
};

export default async (req: Request) => {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (!key || key.endsWith(".meta")) {
    return Response.json({ error: "Invalid media key" }, { status: 400 });
  }

  const store = getStore({ name: MEDIA_STORE_NAME, consistency: "strong" });
  const data = await store.get(key, { type: "arrayBuffer" });
  if (!data) {
    return Response.json({ error: "Image not found" }, { status: 404 });
  }

  const meta = (await store.get(`${key}.meta`, { type: "json" })) as MediaMeta | null;

  return new Response(data as ArrayBuffer, {
    headers: {
      "Content-Type": meta?.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

export const config: Config = {
  path: "/api/media",
  method: "GET",
};
