import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="glow-line mb-20" />

      <div ref={ref} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-body tracking-widest uppercase">Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Ready to start your next reforestation project? Our team is here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {[
              { icon: MapPin, label: "Address", value: "Magdeburger Str. 18,\n39340 Haldensleben, Germany" },
              { icon: Phone, label: "Phone", value: "+49 3904 66170" },
              { icon: Mail, label: "Email", value: "info@tinplant.com" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-body">{item.label}</div>
                  <div className="font-body font-medium whitespace-pre-line">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 glass rounded-2xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Organization"
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Tell us about your project..."
              rows={5}
              required
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-[var(--glow-green)] transition-all duration-300 hover:scale-[1.02]"
            >
              {submitted ? "Message Sent ✓" : (
                <>Send Message <Send size={16} /></>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
