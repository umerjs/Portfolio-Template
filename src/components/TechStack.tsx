import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import LogoLoop from "./reactbits/LogoLoop";
import TiltedCard from "./reactbits/TiltedCard";
import { svgGradientImage } from "../lib/cardArt";
import { techStack as categories } from "../data/data";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Database,
  Wrench,
};

const accentMap: Record<string, [string, string]> = {
  Frontend: ["#5be8ff", "#a78bfa"],
  Backend: ["#a78bfa", "#f472b6"],
  "Database & Deploy": ["#22d3ee", "#34d399"],
  Tools: ["#fbbf24", "#f472b6"],
};

const allSkills = categories.flatMap((c) => c.items);

const primaryLogos = allSkills.slice(0, 14).map((t) => ({
  node: (
    <span className="font-mono text-muted-foreground/60 tracking-widest">
      {t}
    </span>
  ),
}));
const secondaryLogos = [...allSkills.slice(14), ...allSkills.slice(0, 6)].map(
  (t) => ({
    node: (
      <span className="font-mono text-primary/40 tracking-widest">{t}</span>
    ),
  }),
);

export default function TechStack() {
  return (
    <section id="stack" className="py-24 md:py-32 relative scroll-mt-24">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="N°02 / Skills & Tech"
          heading="TOOLS OF THE TRADE"
          description="Passionate developer with expertise in modern web technologies and design."
        />

        {/* Dual-direction marquees */}
        <div className="space-y-3 mb-16">
          <div className="border-y border-border/50 py-4">
            <LogoLoop
              logos={primaryLogos}
              speed={60}
              logoHeight={20}
              gap={56}
              direction="left"
            />
          </div>
          <div className="border-b border-border/50 py-4">
            <LogoLoop
              logos={secondaryLogos}
              speed={45}
              logoHeight={20}
              gap={56}
              direction="right"
            />
          </div>
        </div>

        {/* 3D tilt category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            const [from, to] = accentMap[cat.title] ?? ["#5be8ff", "#a78bfa"];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-[280px]"
              >
                <TiltedCard
                  imageSrc={svgGradientImage(from, to)}
                  altText={cat.title}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageWidth="100%"
                  imageHeight="280px"
                  rotateAmplitude={10}
                  scaleOnHover={1.02}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent
                  overlayContent={
                    <div className="w-full h-[280px] p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <h3 className="font-mono text-primary text-sm tracking-wider font-semibold">
                          {cat.title}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {cat.items.map((item, j) => (
                          <motion.li
                            key={item}
                            className="text-[13px] text-muted-foreground flex items-center gap-2 group"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 + j * 0.04 + 0.3 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
                            <span className="group-hover:text-foreground transition-colors">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
