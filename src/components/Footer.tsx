const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
            <path d="M12 2L12 22M12 2C8 6 4 10 4 14C4 18.4 7.6 22 12 22M12 2C16 6 20 10 20 14C20 18.4 16.4 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="font-display text-lg font-bold tracking-wider">TINPLANT</span>
      </div>
      <p className="text-muted-foreground text-sm font-body">
        Pflanzenvermehrung und Forschung seit 1992
      </p>
      <p className="text-muted-foreground text-xs font-body">
        © {new Date().getFullYear()} TinPlant GmbH. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
