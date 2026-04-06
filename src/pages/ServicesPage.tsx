import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import nurseryImg from "@/assets/services-nursery.jpg";
import aboutImg from "@/assets/about-seedling.jpg";
import { TreePine, Sprout, FlaskConical, Truck, ShieldCheck, BarChart3, Thermometer, Droplets, Bug, Layers } from "lucide-react";

const services = [
  { icon: Sprout, title: "Container Seedling Production", desc: "Premium 1+0 container-grown seedlings in QuickPot systems (84-cell/95ml to 40-cell/270ml). Optimized root ball geometry for maximum survival rates with controlled greenhouse cultivation from seed to hardened seedling." },
  { icon: TreePine, title: "Species-Specific Programs", desc: "Specialized production for Douglas Fir, European Larch, Norway Spruce, Scots Pine, and other native species. Each program tailored with species-specific photoperiod, temperature, and nutrient protocols." },
  { icon: Thermometer, title: "Frost Chain Logistics", desc: "Complete frost storage at -2°C with seamless cold chain through transport (1-2°C target) and controlled 10-14 day thawing protocol. Ensures physiological quality preservation from harvest to planting." },
  { icon: FlaskConical, title: "RGP Quality Testing", desc: "Root Growth Potential testing using the Ritchie Scale (target index 4-5). Quantitative measurement of seedling vitality as the integrative indicator of production quality, dormancy management, and logistics discipline." },
  { icon: ShieldCheck, title: "Quality Control & Certification", desc: "Multi-point quality control chain: seed selection, greenhouse monitoring, hardening verification, frost storage validation, cold chain temperature logging, and field-level dig-up audits." },
  { icon: BarChart3, title: "Site-Matching Consultation", desc: "Hydraulic soil contact modeling using the M-Index system. We match container geometry to site moisture conditions to optimize establishment probability on dry, fresh, and moist sites." },
  { icon: Truck, title: "Nationwide Delivery", desc: "Temperature-controlled logistics with continuous monitoring. Target crate temperature 1-2°C maintained throughout transport. Standing time protocols with clear escalation criteria for delays >10 days." },
  { icon: Droplets, title: "Irrigation & Fertigation Systems", desc: "Precision fertigation stations with automated nutrient delivery calibrated to growth phase requirements. Water and nutrient profiles optimized for plug development, hardening, and reserve loading." },
  { icon: Bug, title: "Integrated Pest Management", desc: "Biological and preventive pest management in greenhouse cultivation. Clean culture protocols ensuring phytosanitary standards meet all government regulatory requirements." },
  { icon: Layers, title: "Post-Planting Monitoring", desc: "Field establishment monitoring with REL-based survival probability modeling. Scenario analysis for different planting windows and site conditions. Data-driven feedback for continuous improvement." },
];

const stats = [
  { value: 30, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "M+", label: "Seedlings Produced" },
  { value: 98, suffix: "%", label: "Survival Rate" },
  { value: 200, suffix: "+", label: "Government Projects" },
];

function StatCard({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.15 * index }}
      className="glass rounded-2xl p-8 text-center hover:border-primary/40 transition-all duration-300"
    >
      <div className="font-display text-4xl md:text-5xl font-bold text-primary">{count}{stat.suffix}</div>
      <div className="text-muted-foreground font-body text-sm mt-2">{stat.label}</div>
    </motion.div>
  );
}

const ServicesPage = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <PageLayout>
      <PageHero
        title="End-to-End Reforestation Solutions"
        subtitle="Our Services"
        description="Comprehensive container seedling production and reforestation support designed for government agencies and large-scale forestry projects."
        backgroundImage={nurseryImg}
      />

      {/* Stats */}
      <section className="section-padding">
        <div ref={statsRef} className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} isVisible={statsVisible} />)}
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="glow-line mb-16" />
        <div ref={servicesRef} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Complete <span className="text-gradient">Service Portfolio</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.06 * i, duration: 0.5 }}
                className="group glass rounded-2xl p-8 hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <s.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutImg} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div ref={ctaRef} className="relative z-10 container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="text-gradient">Project</span>?
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">
              Contact our team to discuss your reforestation requirements. We provide customized solutions for government forestry departments.
            </p>
            <a href="/contact" className="inline-block px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[var(--glow-green)] transition-all duration-300 hover:scale-105">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServicesPage;
