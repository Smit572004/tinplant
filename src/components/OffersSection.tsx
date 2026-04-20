import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fallbackOffers, fetchSiteContent } from "@/lib/content-api";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OffersSection = () => {
  const { lang } = useLanguage();
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent,
  });

  const offers = (data?.offers?.length ? data.offers : fallbackOffers)
    .filter((offer) => offer.isActive)
    .slice(0, 3);

  if (offers.length === 0) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <p className="text-primary uppercase tracking-[0.18em] text-sm">
            {lang === "de" ? "Aktuelle Angebote" : "Current Offers"}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">
            {lang === "de" ? "Angebote für Privatkunden" : "Offers for Retail Customers"}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.id} className="glass border-primary/20">
              {offer.imageUrl ? (
                <img src={offer.imageUrl} alt={offer.title} className="h-44 w-full rounded-t-lg object-cover" />
              ) : null}
              <CardHeader>
                <CardTitle className="text-xl">{offer.title}</CardTitle>
                {offer.price ? <p className="text-primary font-semibold">{offer.price}</p> : null}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{offer.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button asChild>
                  <Link to={offer.ctaLink || "/contact"}>{offer.ctaText || (lang === "de" ? "Details" : "Details")}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to="/offers">{lang === "de" ? "Alle Angebote anzeigen" : "View All Offers"}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
