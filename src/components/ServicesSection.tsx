import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TreePine, Sprout, FlaskConical, Truck, ShieldCheck, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Sprout,
    title: "Container Seedlings",
    desc: "Premium quality container-grown seedlings with superior root systems for maximum survival rates in the field.",
  },
  {
    icon: TreePine,
    title: "Reforestation Planning",
    desc: "Comprehensive reforestation strategies tailored to your region's climate, soil conditions, and biodiversity goals.",
  },
  {
    icon: FlaskConical,
    title: "Research & Development",
    desc: "Cutting-edge research in plant propagation, genetic improvement, and climate-adaptive forestry solutions.",
  },
  {
    icon: Truck,
    title: "Logistics & Delivery",
    desc: "Reliable nationwide delivery with temperature-controlled transport ensuring seedlings arrive in perfect condition.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    desc: "Rigorous quality control at every stage — from seed selection to final delivery — meeting government standards.",
  },
  {
    icon: BarChart3,
    title: "Project Monitoring",
    desc: "Post-planting monitoring and reporting to track growth success and ensure long-term project outcomes.",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="section-padding relative">
      <div className="glow-line mb-20" />

      <div ref={ref} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-body tracking-widest uppercase">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            End-to-end reforestation solutions designed for government agencies and large-scale forestry projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group glass rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
