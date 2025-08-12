import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import heroImg from "@/assets/hero-crane.webp";
import overheadImg from "@/assets/overhead-crane.webp";
import gantryImg from "@/assets/gantry-crane.webp";
import hoistImg from "@/assets/hoist.webp";
import caseSteel from "@/assets/case-steel.webp";

const slides = [
  { src: heroImg, alt: "Modern factory overhead crane, hero image", caption: "Premium overhead crane systems" },
  { src: overheadImg, alt: "Overhead bridge crane product", caption: "Overhead bridge cranes" },
  { src: gantryImg, alt: "Gantry crane outdoors at dusk", caption: "Rugged gantry cranes" },
  { src: hoistImg, alt: "Electric wire rope hoist close-up", caption: "Precision electric hoists" },
  { src: caseSteel, alt: "Steel mill crane in operation", caption: "Engineered for extreme environments" },
];

export const Gallery = () => (
  <section id="gallery" className="border-t">
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Gallery</h2>
      <div className="relative">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {slides.map((s) => (
              <CarouselItem key={s.alt} className="md:basis-1/2 lg:basis-1/3">
                <figure className="group rounded-lg border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <AspectRatio ratio={16/9}>
                    <img src={s.src} alt={s.alt} loading="lazy" className="h-full w-full object-cover" />
                  </AspectRatio>
                  <figcaption className="p-4 text-sm text-muted-foreground group-hover:text-foreground">{s.caption}</figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </div>
  </section>
);

export default Gallery;
