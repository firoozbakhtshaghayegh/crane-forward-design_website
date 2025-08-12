export const Services = () => (
  <section id="services" className="border-t">
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Services</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Maintenance', desc: 'Predictive, preventive and corrective services.' },
          { title: 'Modernizations', desc: 'Upgrades for safety, productivity and compliance.' },
          { title: 'Inspections', desc: 'Certified inspections and load testing.' },
        ].map((s) => (
          <article key={s.title} className="rounded-lg border p-6 hover:bg-accent transition-colors">
            <h3 className="font-medium mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
