import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Products from "@/components/site/Products";
import Services from "@/components/site/Services";
import Gallery from "@/components/site/Gallery";
import CaseStudies from "@/components/site/CaseStudies";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Services />
        <Gallery />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
