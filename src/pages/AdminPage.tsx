import { ChangeEvent, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import {
  adminLogin,
  createGalleryItem,
  createOffer,
  deleteGalleryItem,
  deleteOffer,
  updateGalleryItem,
  updateOffer,
  uploadImage,
} from "@/lib/content-api";
import { SiteContent } from "@/types/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type OfferDraft = {
  id?: string;
  title: string;
  description: string;
  price: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: boolean;
};

type GalleryDraft = {
  id?: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
};

const emptyOfferDraft: OfferDraft = {
  title: "",
  description: "",
  price: "",
  ctaText: "Request Quote",
  ctaLink: "/contact",
  imageUrl: "",
  isActive: true,
};

const emptyGalleryDraft: GalleryDraft = {
  title: "",
  description: "",
  category: "general",
  imageUrl: "",
};

const AdminPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem("tinplant-admin-token") ?? "");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<SiteContent>({ offers: [], gallery: [] });
  const [offerDraft, setOfferDraft] = useState<OfferDraft>(emptyOfferDraft);
  const [galleryDraft, setGalleryDraft] = useState<GalleryDraft>(emptyGalleryDraft);

  const sortedOffers = useMemo(
    () => [...content.offers].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [content.offers],
  );
  const sortedGallery = useMemo(
    () => [...content.gallery].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [content.gallery],
  );

  async function handleLogin() {
    try {
      setIsSaving(true);
      const nextContent = await adminLogin(token);
      setContent(nextContent);
      setIsAuthorized(true);
      localStorage.setItem("tinplant-admin-token", token);
      toast.success("Admin panel unlocked");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in");
    } finally {
      setIsSaving(false);
    }
  }

  function resetOfferForm() {
    setOfferDraft(emptyOfferDraft);
  }

  function resetGalleryForm() {
    setGalleryDraft(emptyGalleryDraft);
  }

  async function handleOfferSubmit() {
    if (!token) {
      toast.error("Admin token is required");
      return;
    }

    if (!offerDraft.title.trim() || !offerDraft.description.trim()) {
      toast.error("Offer title and description are required");
      return;
    }

    const payload = {
      title: offerDraft.title.trim(),
      description: offerDraft.description.trim(),
      price: offerDraft.price.trim(),
      ctaText: offerDraft.ctaText.trim(),
      ctaLink: offerDraft.ctaLink.trim() || "/contact",
      imageUrl: offerDraft.imageUrl.trim(),
      isActive: offerDraft.isActive,
    };

    try {
      setIsSaving(true);
      const nextContent = offerDraft.id
        ? await updateOffer(token, offerDraft.id, payload)
        : await createOffer(token, payload);
      setContent(nextContent);
      resetOfferForm();
      toast.success(offerDraft.id ? "Offer updated" : "Offer created");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save offer");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleGallerySubmit() {
    if (!token) {
      toast.error("Admin token is required");
      return;
    }

    if (!galleryDraft.title.trim() || !galleryDraft.imageUrl.trim()) {
      toast.error("Gallery title and image are required");
      return;
    }

    const payload = {
      title: galleryDraft.title.trim(),
      description: galleryDraft.description.trim(),
      category: galleryDraft.category.trim() || "general",
      imageUrl: galleryDraft.imageUrl.trim(),
    };

    try {
      setIsSaving(true);
      const nextContent = galleryDraft.id
        ? await updateGalleryItem(token, galleryDraft.id, payload)
        : await createGalleryItem(token, payload);
      setContent(nextContent);
      resetGalleryForm();
      toast.success(galleryDraft.id ? "Gallery item updated" : "Gallery item created");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save gallery item");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleOfferDelete(id: string) {
    try {
      setIsSaving(true);
      const nextContent = await deleteOffer(token, id);
      setContent(nextContent);
      toast.success("Offer deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete offer");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleGalleryDelete(id: string) {
    try {
      setIsSaving(true);
      const nextContent = await deleteGalleryItem(token, id);
      setContent(nextContent);
      toast.success("Gallery item deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete gallery item");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    target: "offer" | "gallery",
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!token) {
      toast.error("Admin token is required before upload");
      return;
    }

    try {
      setIsSaving(true);
      const imageUrl = await uploadImage(token, file);
      if (target === "offer") {
        setOfferDraft((prev) => ({ ...prev, imageUrl }));
      } else {
        setGalleryDraft((prev) => ({ ...prev, imageUrl }));
      }
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to upload image");
    } finally {
      setIsSaving(false);
    }
  }

  if (!isAuthorized) {
    return (
      <PageLayout>
        <PageHero
          title="Admin Panel"
          subtitle="Content Manager"
          description="Use the admin password token to manage offers and gallery data."
        />
        <section className="section-padding">
          <div className="container mx-auto max-w-lg">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="password"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  placeholder="Admin password"
                />
                <Button onClick={handleLogin} disabled={isSaving || !token.trim()} className="w-full">
                  {isSaving ? "Checking..." : "Unlock Admin"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero
        title="Admin Panel"
        subtitle="Offers and Gallery"
        description="Create, edit, and publish offers. Upload gallery images and update details in one place."
      />

      <section className="section-padding">
        <div className="container mx-auto grid gap-8 lg:grid-cols-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle>{offerDraft.id ? "Edit Offer" : "Add Offer"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Offer title"
                value={offerDraft.title}
                onChange={(event) => setOfferDraft((prev) => ({ ...prev, title: event.target.value }))}
              />
              <Textarea
                placeholder="Offer description"
                value={offerDraft.description}
                onChange={(event) => setOfferDraft((prev) => ({ ...prev, description: event.target.value }))}
              />
              <Input
                placeholder="Price (optional)"
                value={offerDraft.price}
                onChange={(event) => setOfferDraft((prev) => ({ ...prev, price: event.target.value }))}
              />
              <Input
                placeholder="Button text"
                value={offerDraft.ctaText}
                onChange={(event) => setOfferDraft((prev) => ({ ...prev, ctaText: event.target.value }))}
              />
              <Input
                placeholder="Button link (e.g. /contact)"
                value={offerDraft.ctaLink}
                onChange={(event) => setOfferDraft((prev) => ({ ...prev, ctaLink: event.target.value }))}
              />
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <Input
                  placeholder="Offer image URL"
                  value={offerDraft.imageUrl}
                  onChange={(event) => setOfferDraft((prev) => ({ ...prev, imageUrl: event.target.value }))}
                />
                <Input type="file" accept="image/*" onChange={(event) => void handleImageUpload(event, "offer")} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={offerDraft.isActive}
                  onChange={(event) => setOfferDraft((prev) => ({ ...prev, isActive: event.target.checked }))}
                />
                Active offer
              </label>
              <div className="flex gap-3">
                <Button onClick={() => void handleOfferSubmit()} disabled={isSaving}>
                  {offerDraft.id ? "Update Offer" : "Create Offer"}
                </Button>
                <Button type="button" variant="outline" onClick={resetOfferForm} disabled={isSaving}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>{galleryDraft.id ? "Edit Gallery Item" : "Add Gallery Item"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Gallery title"
                value={galleryDraft.title}
                onChange={(event) => setGalleryDraft((prev) => ({ ...prev, title: event.target.value }))}
              />
              <Input
                placeholder="Category (e.g. greenhouse)"
                value={galleryDraft.category}
                onChange={(event) => setGalleryDraft((prev) => ({ ...prev, category: event.target.value }))}
              />
              <Textarea
                placeholder="Description (optional)"
                value={galleryDraft.description}
                onChange={(event) => setGalleryDraft((prev) => ({ ...prev, description: event.target.value }))}
              />
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <Input
                  placeholder="Image URL"
                  value={galleryDraft.imageUrl}
                  onChange={(event) => setGalleryDraft((prev) => ({ ...prev, imageUrl: event.target.value }))}
                />
                <Input type="file" accept="image/*" onChange={(event) => void handleImageUpload(event, "gallery")} />
              </div>
              <div className="flex gap-3">
                <Button onClick={() => void handleGallerySubmit()} disabled={isSaving}>
                  {galleryDraft.id ? "Update Gallery Item" : "Create Gallery Item"}
                </Button>
                <Button type="button" variant="outline" onClick={resetGalleryForm} disabled={isSaving}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="container mx-auto mt-10 grid gap-8 lg:grid-cols-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle>All Offers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortedOffers.length === 0 ? <p className="text-sm text-muted-foreground">No offers added.</p> : null}
              {sortedOffers.map((offer) => (
                <div key={offer.id} className="rounded-md border border-border/60 bg-background/50 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{offer.title}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setOfferDraft({
                            id: offer.id,
                            title: offer.title,
                            description: offer.description,
                            price: offer.price ?? "",
                            ctaText: offer.ctaText ?? "Request Quote",
                            ctaLink: offer.ctaLink ?? "/contact",
                            imageUrl: offer.imageUrl ?? "",
                            isActive: offer.isActive,
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void handleOfferDelete(offer.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{offer.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>All Gallery Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortedGallery.length === 0 ? (
                <p className="text-sm text-muted-foreground">No gallery items added.</p>
              ) : null}
              {sortedGallery.map((item) => (
                <div key={item.id} className="rounded-md border border-border/60 bg-background/50 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{item.title}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setGalleryDraft({
                            id: item.id,
                            title: item.title,
                            description: item.description ?? "",
                            category: item.category,
                            imageUrl: item.imageUrl,
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void handleGalleryDelete(item.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.category}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminPage;

