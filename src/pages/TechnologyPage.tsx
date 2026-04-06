import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import techLabImg from "@/assets/technology-lab.jpg";
import coldChainImg from "@/assets/cold-chain.jpg";
import { Thermometer, Droplets, TreePine, FlaskConical, ShieldCheck, BarChart3 } from "lucide-react";

const processSteps = [
  {
    icon: FlaskConical,
    title: "A. Physiological Reserve (RGP)",
    subtitle: "Root Growth Potential",
    desc: "The RGP is the seedling's ability to rapidly form new active fine root tips after planting, re-coupling water uptake and growth. We ensure maximum vitality through precisely controlled greenhouse production, achieving RGP indices of 4-5 on the Ritchie Scale (>11-30 new roots under standard conditions).",
  },
  {
    icon: Thermometer,
    title: "B. Thermal Exposition (REL)",
    subtitle: "Stress Load Management",
    desc: "After thawing, plant metabolism starts consuming physiological reserves through respiration. We manage controlled slow thawing over 10-14 days at 2-8°C, maintaining crate temperatures at 1-2°C during transport and intermediate storage.",
  },
  {
    icon: Droplets,
    title: "C. Site Water & Root Geometry",
    subtitle: "Hydraulic Supply Matching",
    desc: "We match container geometry to site conditions using the M-Index classification. Dry sites (M=2) get compact 95-125ml plugs (QuickPot 84), while nutrient-rich competitive sites receive 220-270ml containers (QuickPot 40) for growth advantage.",
  },
  {
    icon: TreePine,
    title: "D. Hydraulic Soil Contact",
    subtitle: "Root Emergence Timing",
    desc: "Survival depends on root emergence into mineral soil before plug desiccation. Planting depth must place plug top 10mm (±5mm) below mineral soil to prevent wicking. We verify firm contact via pull-test and ensure 20-30cm radius competition clearance.",
  },
  {
    icon: BarChart3,
    title: "E. Establishment Success",
    subtitle: "Survival Probability Model",
    desc: "Our REL-based model predicts establishment success: March planting on moist sites achieves 99.5% survival. Even with 5-day delays, success holds at 99.2%. The model quantifies how timing, site moisture, and process discipline determine outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Control Chain",
    subtitle: "End-to-End Verification",
    desc: "BC-standard quality control at every stage: seed selection, greenhouse culture, hardening verification, frost storage validation, cold chain monitoring, transport temperature logging, and post-planting field audits with dig-up inspections.",
  },
];

const TechnologyPage = () => {
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation();
  const { ref: coldRef, isVisible: coldVisible } = useScrollAnimation();

  return (
    <PageLayout>
      <PageHero
        title="The Science Behind Our Seedlings"
        subtitle="Technology & Research"
        description="Our production system is built on decades of ecophysiological research from British Columbia, adapted for German forestry conditions through rigorous scientific methodology."
        backgroundImage={techLabImg}
      />

      {/* Process Model */}
      <section className="section-padding">
        <div ref={processRef} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-body tracking-widest uppercase">The Process</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
              From Physiological Potential to <span className="text-gradient">Forest Success</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto font-body">
              Our five-stage model ensures every seedling has the maximum probability of successful establishment,
              based on the proven British Columbia reference system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={processVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="group glass rounded-2xl p-8 hover:border-primary/40 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="text-primary" size={24} />
                </div>
                <div className="text-primary text-xs font-body tracking-widest uppercase mb-1">{step.subtitle}</div>
                <h3 className="font-display font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cold Chain */}
      <section className="section-padding">
        <div className="glow-line mb-16" />
        <div ref={coldRef} className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={coldVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-body tracking-widest uppercase">Critical Innovation</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6">
              The <span className="text-gradient">Frost Chain</span> Advantage
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              The seamless cold and frost chain is the key lever of the BC system. It enables conservation of
              seedlings at their physiological optimum (advanced hardening, high reserve storage) through
              temperature-stable storage at −2°C.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              This decouples planting logistics from short-term weather: the planting date can be chosen
              site- and weather-dependently, and shifted within a window without losing plant quality
              through uncontrolled intermediate conditions.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Storage Temp", value: "-2°C" },
                { label: "Transport Target", value: "1-2°C" },
                { label: "Thaw Period", value: "10-14 days" },
                { label: "Thaw Range", value: "2-8°C" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <div className="text-primary font-display text-2xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground text-xs font-body mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={coldVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden">
              <img src={coldChainImg} alt="Cold chain facility" loading="lazy" width={1024} height={768} className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-2xl bg-primary/10 border border-primary/20 animate-float" />
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TechnologyPage;
