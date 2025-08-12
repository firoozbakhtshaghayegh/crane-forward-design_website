export const Footer = () => (
  <footer className="border-t">
    <div className="container mx-auto px-4 py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CRANECO. All rights reserved.</p>
      <div className="flex items-center gap-4 text-sm">
        <a className="hover:text-foreground text-muted-foreground" href="#" aria-label="LinkedIn profile">LinkedIn</a>
        <a className="hover:text-foreground text-muted-foreground" href="#" aria-label="YouTube channel">YouTube</a>
        <a className="hover:text-foreground text-muted-foreground" href="#" aria-label="X (Twitter)">X</a>
      </div>
    </div>
  </footer>
);

export default Footer;
