import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#cases", label: "Case Studies" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className={cn("container mx-auto flex h-16 items-center justify-between px-4")}> 
        <a href="#home" className="font-semibold tracking-tight">CRANECO</a>
        <div className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#contact" aria-label="Contact sales">
            <Button size="sm">Contact Sales</Button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
