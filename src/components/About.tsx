import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Server, Database, Rocket, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "./ui/SectionHeading";
import TiltedCard from "./reactbits/TiltedCard";
import CountUp from "./reactbits/CountUp";
import { svgGradientImage } from "../lib/cardArt";
import {
  personalInfo,
  aboutBio,
  aboutTags,
  stats,
  services,
} from "../data/data";

const iconMap: Record<string, LucideIcon> = { Code2, Server, Database, Rocket };

const serviceAccent: Record<string, [string, string]> = {
  "Web Apps": ["#5be8ff", "#a78bfa"],
  "REST APIs": ["#a78bfa", "#f472b6"],
  "Database Design": ["#22d3ee", "#34d399"],
  Deployment: ["#fbbf24", "#f472b6"],
};

export default function About() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const imgRotate = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden scroll-mt-24"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="N°03 / About Me"
          heading="WHO'S BEHIND THE SCREEN"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* 3D Photo */}
          <motion.div
            ref={imgRef}
            style={{ scale: imgScale, rotateY: imgRotate, perspective: 1000 }}
            className="relative group max-w-md mx-auto lg:mx-0 h-[420px] w-full"
          >
            <div
              className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.2))",
              }}
            />
            <TiltedCard
              imageSrc={personalInfo.avatarUrl}
              altText={personalInfo.name}
              containerHeight="100%"
              containerWidth="100%"
              imageWidth="100%"
              imageHeight="420px"
              rotateAmplitude={8}
              scaleOnHover={1.03}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent
              overlayContent={
                <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-mono text-xs text-muted-foreground">
                      Fig. 01 — {personalInfo.name}
                    </p>
                  </div>
                </div>
              }
            />
          </motion.div>

          {/* Bio with stagger */}
          <motion.div
            className="flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.p
              className="text-muted-foreground leading-relaxed text-lg"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {aboutBio[0]}
            </motion.p>
            <motion.p
              className="text-muted-foreground leading-relaxed text-lg mt-5"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {aboutBio[1]}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-2 mt-8"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.4 } },
              }}
            >
              {aboutTags.map((t) => (
                <motion.span
                  key={t}
                  className="px-4 py-1.5 rounded-full text-xs font-mono border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all cursor-default"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats with glow */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-y border-border/50 mb-24 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-xl" />
          {stats.map((s) => (
            <div key={s.label} className="text-center relative">
              <p className="text-4xl md:text-5xl font-bold">
                <CountUp to={s.value} duration={1.6} />
                <span className="text-primary">{s.suffix}</span>
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-2 tracking-widest uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Services - 3D cards */}
        <div>
          <h3 className="font-mono text-sm text-primary mb-10 tracking-widest">
            WHAT I DO
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon];
              const [from, to] = serviceAccent[s.title] ?? [
                "#5be8ff",
                "#a78bfa",
              ];
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-[220px]"
                >
                  <TiltedCard
                    imageSrc={svgGradientImage(from, to, 400, 220)}
                    altText={s.title}
                    containerHeight="100%"
                    containerWidth="100%"
                    imageWidth="100%"
                    imageHeight="220px"
                    rotateAmplitude={10}
                    scaleOnHover={1.03}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent
                    overlayContent={
                      <div className="w-full h-[220px] p-6 text-center">
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon size={24} className="text-primary" />
                        </motion.div>
                        <h4 className="font-bold text-lg">{s.title}</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          {s.desc}
                        </p>
                      </div>
                    }
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
