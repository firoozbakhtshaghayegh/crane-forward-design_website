import { AspectRatio } from "@/components/ui/aspect-ratio";
import caseSteel from "@/assets/case-steel.webp";

const cases = [
  { title: 'Automotive Plant Uptime +18%', desc: 'Smart hoists and remote monitoring reduced downtime.', img: caseSteel, alt: 'Automotive plant crane case study' },
  { title: 'Steel Mill Safety Upgrade', desc: 'Modernization improved safety compliance and control.', img: caseSteel, alt: 'Steel mill crane modernization case study' },
];

export const CaseStudies = () => (
  <section id="cases" className="border-t">
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Case Studies</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {cases.map((c) => (
          <article key={c.title} className="rounded-lg border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
            <AspectRatio ratio={16/9}>
              <img src={c.img} alt={c.alt} loading="lazy" className="h-full w-full object-cover" />
            </AspectRatio>
            <div className="p-6">
              <h3 className="font-medium mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
