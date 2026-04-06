import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import researchImg from "@/assets/research-field.jpg";
import techLabImg from "@/assets/technology-lab.jpg";
import coldChainImg from "@/assets/cold-chain.jpg";
import { BookOpen, Globe, FlaskConical, FileText, Users, TreePine } from "lucide-react";

const publications = [
  {
    title: "British Columbia Reference System Report",
    date: "January 2026",
    desc: "Comprehensive analysis of BC's container seedling production as a reference system for German forestry. Covers the complete value chain from seed selection to field establishment.",
    authors: "Claus Hoelk, with review by Dr. Steven C. Grossnickle & David Swain",
  },
  {
    title: "Container vs. Bare-Root Seedling Comparison",
    desc: "Detailed comparison of containerized and bare-root seedling performance on dry, fresh, and moist sites using RGP and REL-based survival models.",
    date: "2025",
    authors: "TinPlant Research Division",
  },
  {
    title: "European Larch Blackout Experiment",
    desc: "Internal trial comparing photoperiod manipulation (blackout treatment) effects on bud set timing, plug firmness, and root biomass accumulation in Larix decidua.",
    date: "Autumn 2025",
    authors: "TinPlant Biotechnik",
  },
];

const experts = [
  {
    name: "Claus Hoelk",
    title: "Managing Director, Ing. Agr.",
    desc: "Author and lead researcher. Decades of experience in greenhouse production and forestry plant propagation.",
  },
  {
    name: "Dr. Steven C. Grossnickle",
    title: "Forest Seedling Ecophysiologist",
    desc: "Principal of NurseryToForest Solutions, BC, Canada. ~50 years of forestry experience. Author of seminal works on seedling ecophysiology.",
  },
  {
    name: "David Swain",
    title: "Former Director of Crop Production",
    desc: "Co-founder of PRT Growing Services Ltd., Victoria, BC, Canada. Contributed to production of approximately 7 billion container forest seedlings.",
  },
];

const ResearchPage = () => {
  const { ref: pubRef, isVisible: pubVisible } = useScrollAnimation();
  const { ref: expertRef, isVisible: expertVisible } = useScrollAnimation();
  const { ref: bcRef, isVisible: bcVisible } = useScrollAnimation();

  return (
    <PageLayout>
      <PageHero
        title="Research & Scientific Foundation"
        subtitle="Knowledge Base"
        description="Our work is grounded in decades of ecophysiological research. We bridge the gap between British Columbia's proven forestry science and German practice."
        backgroundImage={researchImg}
      />

      {/* BC Reference */}
      <section className="section-padding">
        <div ref={bcRef} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={bcVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-body tracking-widest uppercase">Reference System</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
              British Columbia: <span className="text-gradient">The Standard</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto font-body">
              British Columbia plants approximately 300 million seedlings annually, with over 80% being container
              seedlings in the 80-125ml volume range — the proven cost-benefit optimum.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "300M+ Annual Seedlings",
                desc: "BC's industrial-scale container seedling program has been the global standard for decades, proving that small plugs work even on harsh clearcuts.",
                img: researchImg,
              },
              {
                icon: FlaskConical,
                title: "Evidence-Based Transfer",
                desc: "Our report systematically evaluates BC's process chain — from culture management to frost chain logistics — for applicability to German conditions.",
                img: techLabImg,
              },
              {
                icon: TreePine,
                title: "Process Discipline",
                desc: "Without process discipline, a small root ball is a failure risk. With the A-E model, it becomes the most efficient tool against drought stress.",
                img: coldChainImg,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={bcVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i }}
                className="glass rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 group"
              >
                <div className="h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <item.icon className="text-primary mb-3" size={24} />
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding">
        <div className="glow-line mb-16" />
        <div ref={pubRef} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={pubVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              <span className="text-gradient">Publications</span> & Reports
            </h2>
          </motion.div>

          <div className="space-y-6">
            {publications.map((pub, i) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, x: -40 }}
                animate={pubVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 * i }}
                className="glass rounded-2xl p-8 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display font-bold text-lg">{pub.title}</h3>
                      <span className="text-primary text-xs font-body tracking-wider">{pub.date}</span>
                    </div>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-2">{pub.desc}</p>
                    <p className="text-muted-foreground/70 text-xs font-body italic">{pub.authors}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Advisors */}
      <section className="section-padding">
        <div className="glow-line mb-16" />
        <div ref={expertRef} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={expertVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Expert <span className="text-gradient">Advisory Board</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {experts.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, y: 30 }}
                animate={expertVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i }}
                className="glass rounded-2xl p-8 text-center hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-primary" size={28} />
                </div>
                <h3 className="font-display font-bold text-lg">{e.name}</h3>
                <p className="text-primary text-xs font-body tracking-wider mt-1 mb-3">{e.title}</p>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResearchPage;
