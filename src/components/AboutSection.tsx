import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import aboutImg from "@/assets/about-seedling.jpg";
import { Leaf, Award, Globe } from "lucide-react";

const features = [
  { icon: Leaf, title: "Sustainable", desc: "Climate-friendly growing methods" },
  { icon: Award, title: "30+ Years", desc: "Expertise since 1992" },
  { icon: Globe, title: "Global Reach", desc: "Trusted across borders" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="glow-line mb-20" />

      <div ref={ref} className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden">
            <img
              src={aboutImg}
              alt="Planting seedling"
              loading="lazy"
              width={1024}
              height={768}
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-primary/10 border border-primary/20 animate-glow-pulse" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-primary text-sm font-body tracking-widest uppercase">About Us</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
            Pioneering <span className="text-gradient">Reforestation</span> Technology
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            TinPlant has been at the forefront of plant propagation and research since 1992.
            We specialize in producing high-quality container seedlings that enable efficient,
            large-scale reforestation projects for government agencies and forestry departments.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            Our advanced growing techniques ensure maximum survival rates and optimal growth,
            making reforestation more accessible and effective than ever before.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="glass rounded-xl p-4 text-center hover:border-primary/40 transition-colors duration-300"
              >
                <f.icon className="mx-auto text-primary mb-2" size={24} />
                <div className="font-display font-bold text-sm">{f.title}</div>
                <div className="text-muted-foreground text-xs mt-1">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
