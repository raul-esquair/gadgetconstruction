import Container from "@/components/ui/Container";
import StatsCounter from "@/components/ui/StatsCounter";
import { STATS } from "@/lib/constants";

export default function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-neutral-700 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-white">
          {STATS.map((stat, index) => (
            <StatsCounter
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
