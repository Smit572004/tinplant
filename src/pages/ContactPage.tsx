import { motion } from "framer-motion";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Send, Clock, MessageCircle, Printer } from "lucide-react";

const ContactPage = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <PageLayout>
      <PageHero
        title="Get in Touch"
        subtitle="Contact Us"
        description="Ready to discuss your reforestation project? Our team is here to help with expert consultation and customized solutions."
      />

      <section className="section-padding">
        <div ref={ref} className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Contact <span className="text-gradient">Information</span></h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  We welcome inquiries from government forestry departments, state forest enterprises,
                  and research institutions interested in container seedling solutions.
                </p>
              </div>

              {[
                { icon: MapPin, label: "Address", value: "Magdeburger Landstr. 33\n39164 Wanzleben-Börde\nSachsen-Anhalt, Germany" },
                { icon: Phone, label: "Phone", value: "+49 39209 69 69 0" },
                { icon: Printer, label: "Fax", value: "+49 39209 69 69 19" },
                { icon: MessageCircle, label: "WhatsApp", value: "+49 157 87930211" },
                { icon: Mail, label: "Email", value: "info@tinplant-gmbh.de" },
                { icon: Clock, label: "Office Hours", value: "Monday – Friday\n08:00 – 17:00 CET" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-body">{item.label}</div>
                    <div className="font-body font-medium whitespace-pre-line text-sm">{item.value}</div>
                  </div>
                </div>
              ))}

              <div className="glass rounded-xl p-5">
                <h4 className="font-display font-bold text-sm mb-2">Legal Information</h4>
                <div className="text-muted-foreground text-xs font-body space-y-1">
                  <p>TinPlant Biotechnik und Pflanzenvermehrung GmbH</p>
                  <p>Geschäftsführer: Claus Hoelk</p>
                  <p>Registergericht Stendal (HRB 103512)</p>
                  <p>USt.-Id.Nr.: DE 139310312</p>
                  <p>St.Nr.: 102/106/06438</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 glass rounded-2xl p-8 space-y-5"
            >
              <h3 className="font-display text-xl font-bold mb-2">Send Us a Message</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1.5 block">Full Name *</label>
                  <input type="text" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1.5 block">Organization</label>
                  <input type="text" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1.5 block">Email *</label>
                  <input type="email" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1.5 block">Phone</label>
                  <input type="tel" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-sm font-body text-muted-foreground mb-1.5 block">Subject</label>
                <select className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm focus:border-primary focus:outline-none transition-colors">
                  <option value="">Select a topic</option>
                  <option value="seedlings">Container Seedling Order</option>
                  <option value="consultation">Reforestation Consultation</option>
                  <option value="research">Research Collaboration</option>
                  <option value="visit">Facility Visit</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-body text-muted-foreground mb-1.5 block">Message *</label>
                <textarea rows={6} required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none" placeholder="Tell us about your reforestation project, species requirements, quantities, or any questions..." />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-[var(--glow-green)] transition-all duration-300 hover:scale-[1.02]"
              >
                {submitted ? "Message Sent ✓" : (<>Send Message <Send size={16} /></>)}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
