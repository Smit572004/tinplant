import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ImpactSection from "@/components/ImpactSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import OffersSection from "@/components/OffersSection";

const Index = () => (
  <PageLayout>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <OffersSection />
    <ImpactSection />
    <WhyChooseUs />
    <ContactSection />
  </PageLayout>
);

export default Index;
