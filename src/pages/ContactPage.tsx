import { motion } from "framer-motion";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Phone, Mail, Send, Clock, MessageCircle, Printer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ContactPage = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const { error } = await supabase.from("contact_submissions").insert({
      full_name: fd.get("full_name") as string,
      organization: (fd.get("organization") as string) || null,
      email: fd.get("email") as string,
      phone: (fd.get("phone") as string) || null,
      subject: (fd.get("subject") as string) || null,
      message: fd.get("message") as string,
    });

    setLoading(false);
    if (error) {
      toast.error(t("contact.error"));
    } else {
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const contactItems = [
    { icon: MapPin, label: t("contact.address"), value: "Magdeburger Landstr. 33\n39164 Wanzleben-Börde\nSachsen-Anhalt, Germany" },
    { icon: Phone, label: t("contact.phone"), value: "+49 39209 69 69 0" },
    { icon: Printer, label: "Fax", value: "+49 39209 69 69 19" },
    { icon: MessageCircle, label: "WhatsApp", value: "+49 157 87930211" },
    { icon: Mail, label: t("contact.email"), value: "info@tinplant-gmbh.de" },
    { icon: Clock, label: t("contact.officeHours"), value: t("contact.officeHoursValue") },
  ];

  return (
    <PageLayout>
      <PageHero title={t("pageHero.contactTitle")} subtitle={t("pageHero.contactSubtitle")} description={t("pageHero.contactDesc")} />

      <section className="section-padding">
        <div ref={ref} className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">{t("contact.contactInfo")} </h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{t("contact.contactInfoDesc")}</p>
              </div>
              {contactItems.map((item) => (
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
                <h4 className="font-display font-bold text-sm mb-2">{t("contact.legalInfo")}</h4>
                <div className="text-muted-foreground text-xs font-body space-y-1">
                  <p>TinPlant Biotechnik und Pflanzenvermehrung GmbH</p>
                  <p>Geschäftsführer: Claus Hoelk</p>
                  <p>Registergericht Stendal (HRB 103512)</p>
                  <p>USt.-Id.Nr.: DE 139310312</p>
                  <p>St.Nr.: 102/106/06438</p>
                </div>
              </div>
            </motion.div>

            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 40 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="lg:col-span-3 glass rounded-2xl p-8 space-y-5">
              <h3 className="font-display text-xl font-bold mb-2">{t("contact.sendUsMessage")}</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.fullName")} *</label>
                  <input name="full_name" type="text" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.organization")}</label>
                  <input name="organization" type="text" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.email")} *</label>
                  <input name="email" type="email" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.phonePlaceholder")}</label>
                  <input name="phone" type="tel" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.subject")}</label>
                <select name="subject" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm focus:border-primary focus:outline-none transition-colors">
                  <option value="">{t("contact.selectTopic")}</option>
                  <option value="seedlings">{t("contact.seedlingOrder")}</option>
                  <option value="consultation">{t("contact.consultation")}</option>
                  <option value="research">{t("contact.researchCollab")}</option>
                  <option value="visit">{t("contact.facilityVisit")}</option>
                  <option value="other">{t("contact.other")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.message")} *</label>
                <textarea name="message" rows={6} required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none" placeholder={t("contact.message")} />
              </div>
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-[var(--glow-green)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-70">
                {loading ? t("contact.sending") : submitted ? t("contact.sent") : (<>{t("contact.send")} <Send size={16} /></>)}
              </button>
            </motion.form>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-primary" size={22} />
              {t("contact.findUs")}
            </h3>
            <div className="glass rounded-2xl overflow-hidden">
              <iframe
                title="TinPlant Location"
                src="https://www.google.com/maps?q=TINPLANT+Biotechnik+und+Pflanzenvermehrung+GmbH,+Wanzleben-B%C3%B6rde&ll=52.0675243,11.3744741&z=16&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-5 py-3 flex items-center justify-between bg-muted/30">
                <p className="text-sm font-body text-muted-foreground">
                  Magdeburger Landstr. 33, 39164 Wanzleben-Börde, Sachsen-Anhalt
                </p>
                <a
                  href="https://www.google.com/maps/place/TINPLANT+Biotechnik+und+Pflanzenvermehrung+GmbH/@52.0669878,11.3724041,16z/data=!4m6!3m5!1s0x47a58952ebbd52b3:0x4ad1143cdea23acb!8m2!3d52.0675243!4d11.3744741!16s%2Fg%2F1tdq046n?authuser=0&entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body text-primary hover:underline shrink-0 ml-4"
                >
                  {t("contact.findUs")} →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
