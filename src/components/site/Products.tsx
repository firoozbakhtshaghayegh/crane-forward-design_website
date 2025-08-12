import { AspectRatio } from "@/components/ui/aspect-ratio";
import overheadImg from "@/assets/overhead-crane.webp";
import gantryImg from "@/assets/gantry-crane.webp";
import hoistImg from "@/assets/hoist.webp";

const products = [
  { title: 'Overhead Cranes', desc: 'Single and double-girder systems with smart features.', img: overheadImg, alt: 'Overhead bridge crane product photo' },
  { title: 'Gantry Cranes', desc: 'Flexible indoor/outdoor heavy duty gantries.', img: gantryImg, alt: 'Gantry crane product photo' },
  { title: 'Hoists', desc: 'Electric chain and wire rope hoists with precise control.', img: hoistImg, alt: 'Electric hoist product photo' },
];

export const Products = () => (
  <section id="products" className="border-t">
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Products</h2>
      <p className="text-muted-foreground max-w-3xl">
        Overhead bridge cranes, gantry cranes, jib cranes and intelligent hoists built for demanding environments.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((card) => (
          <article key={card.title} className="group rounded-lg border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
            <AspectRatio ratio={16/9}>
              <img src={card.img} alt={card.alt} loading="lazy" className="h-full w-full object-cover" />
            </AspectRatio>
            <div className="p-6">
              <h3 className="font-medium mb-2 group-hover:text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
