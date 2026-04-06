import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Technology", href: "/technology" },
  { label: "Services", href: "/services" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => (
  <footer className="border-t border-border">
    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 2L12 22M12 2C8 6 4 10 4 14C4 18.4 7.6 22 12 22M12 2C16 6 20 10 20 14C20 18.4 16.4 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-display text-lg font-bold tracking-wider">TINPLANT</span>
          </Link>
          <p className="text-muted-foreground text-sm font-body leading-relaxed">
            Biotechnik und Pflanzenvermehrung GmbH.
            Pioneering reforestation technology since 1992.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display font-bold mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-muted-foreground text-sm font-body hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold mb-4">Contact</h4>
          <div className="text-muted-foreground text-sm font-body space-y-2">
            <p>Magdeburger Landstr. 33</p>
            <p>39164 Wanzleben-Börde</p>
            <p>Sachsen-Anhalt, Germany</p>
            <p className="mt-3">Tel: +49 39209 69 69 0</p>
            <p>info@tinplant-gmbh.de</p>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-display font-bold mb-4">Legal</h4>
          <div className="text-muted-foreground text-sm font-body space-y-2">
            <p>Registergericht Stendal</p>
            <p>HRB 103512</p>
            <p>USt.-Id.: DE 139310312</p>
            <p className="mt-3">Geschäftsführer: Claus Hoelk</p>
          </div>
        </div>
      </div>

      <div className="glow-line mt-12 mb-6" />
      <p className="text-muted-foreground text-xs font-body text-center">
        © {new Date().getFullYear()} TinPlant Biotechnik und Pflanzenvermehrung GmbH. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
