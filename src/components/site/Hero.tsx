import { Button } from "@/components/ui/button";
import { CraneScene } from "@/components/three/CraneScene";
const CraneSVG = () => (
  <svg viewBox="0 0 600 300" className="w-full max-w-3xl mx-auto" aria-hidden>
    <g className="animate-pulse">
      <rect x="20" y="240" width="560" height="8" className="fill-muted" />
      <line x1="100" y1="240" x2="140" y2="120" strokeWidth="2" className="stroke-[hsl(var(--muted-foreground))]" />
      <line x1="140" y1="120" x2="420" y2="120" strokeWidth="2" className="stroke-[hsl(var(--muted-foreground))]" />
      <circle cx="420" cy="120" r="6" className="fill-[hsl(var(--destructive))]">
        <animate attributeName="cy" values="120;130;120" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <line x1="420" y1="120" x2="420" y2="210" strokeWidth="2" className="stroke-[hsl(var(--destructive))]" />
      <rect x="410" y="210" width="20" height="20" className="fill-[hsl(var(--destructive))]">
        <animate attributeName="y" values="210;200;210" dur="2.5s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
);

export const Hero = () => (
  <section id="home" className="relative overflow-hidden">
    {/* Decorative gradient background for visual richness */}
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-30">
      <div className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-gradient-primary blur-3xl glow" />
      <div className="absolute -bottom-24 left-[-10%] h-96 w-96 rounded-full bg-gradient-primary blur-3xl glow" />
    </div>
    <div className="container mx-auto px-4 py-20 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Industrial Crane Manufacturer for the Future
          </h1>
          <p className="text-lg text-muted-foreground">
            Premium overhead cranes, hoists, and lifecycle services engineered for maximum uptime and safety.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#products"><Button size="lg">Explore Products</Button></a>
            <a href="#contact"><Button size="lg" variant="outline">Contact Sales</Button></a>
          </div>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <div className="hidden md:block rounded-xl border bg-card/50 p-2 shadow-lg">
            <div className="h-80 md:h-96 overflow-hidden rounded-md">
              <CraneScene />
            </div>
          </div>
          <div className="md:hidden">
            <CraneSVG />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
