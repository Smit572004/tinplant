import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Building2, Handshake, Clock, BadgeCheck } from "lucide-react";
import nurseryImg from "@/assets/services-nursery.jpg";

const reasons = [
  { icon: Building2, title: "Government Trusted", desc: "Preferred partner for federal and state forestry departments" },
  { icon: BadgeCheck, title: "Certified Quality", desc: "ISO certified processes meeting all regulatory requirements" },
  { icon: Handshake, title: "End-to-End Partner", desc: "From planning to planting to post-care monitoring" },
  { icon: Clock, title: "Reliable Delivery", desc: "On-time delivery with 99.5% reliability track record" },
];

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="glow-line mb-20" />

      <div ref={ref} className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary text-sm font-body tracking-widest uppercase">Why TinPlant</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-10 leading-tight">
            The Trusted Choice for <span className="text-gradient">Government</span> Projects
          </h2>

          <div className="space-y-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="flex gap-4 items-start group"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <r.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">{r.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden">
            <img
              src={nurseryImg}
              alt="Modern nursery facility"
              loading="lazy"
              width={1024}
              height={768}
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 animate-float" />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
