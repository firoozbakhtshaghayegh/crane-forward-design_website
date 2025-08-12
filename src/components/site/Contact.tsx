import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Contact = () => (
  <section id="contact" className="border-t">
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Contact</h2>
      <form className="max-w-xl space-y-4">
        <div>
          <label className="text-sm" htmlFor="name">Name</label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm" htmlFor="email">Email</label>
          <Input id="email" type="email" placeholder="you@company.com" />
        </div>
        <div>
          <label className="text-sm" htmlFor="message">Message</label>
          <Textarea id="message" placeholder="Tell us about your project" />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  </section>
);

export default Contact;
