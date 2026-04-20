import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { fallbackOffers, fetchSiteContent } from "@/lib/content-api";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OffersPage = () => {
  const { lang } = useLanguage();
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent,
  });

  const offers = (data?.offers?.length ? data.offers : fallbackOffers).filter((offer) => offer.isActive);

  return (
    <PageLayout>
      <PageHero
        title={lang === "de" ? "Angebote" : "Offers"}
        subtitle={lang === "de" ? "Sonderaktionen" : "Special Deals"}
        description={
          lang === "de"
            ? "Angebote für Privatkunden bei Blumen-, Gemüse- und Gartenpflanzen. Nicht für Forstpflanzen."
            : "Offers for retail customers on flowers, vegetable plants, and gardening plants. Not valid for forestry plants."
        }
      />

      <section className="section-padding">
        <div className="container mx-auto">
          {offers.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold">{lang === "de" ? "Aktuell keine Angebote" : "No offers available yet"}</h2>
              <p className="mt-3 text-muted-foreground">
                {lang === "de"
                  ? "Neue Angebote werden bald veröffentlicht."
                  : "New promotions and offers will be published soon."}
              </p>
              <Button asChild className="mt-6">
                <Link to="/contact">{lang === "de" ? "Kontaktieren" : "Contact Team"}</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <Card key={offer.id} className="glass border-primary/20">
                  {offer.imageUrl ? (
                    <img src={offer.imageUrl} alt={offer.title} className="h-52 w-full rounded-t-lg object-cover" />
                  ) : null}
                  <CardHeader>
                    <CardTitle className="text-xl">{offer.title}</CardTitle>
                    {offer.price ? <p className="text-primary font-semibold">{offer.price}</p> : null}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{offer.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link to={offer.ctaLink || "/contact"}>{offer.ctaText || (lang === "de" ? "Anfragen" : "Enquire")}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default OffersPage;
