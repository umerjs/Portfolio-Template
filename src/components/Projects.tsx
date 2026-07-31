import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import TiltedCard from "./reactbits/TiltedCard";
import Magnet from "./reactbits/Magnet";
import DecryptedText from "./reactbits/DecryptedText";
import { svgGradientImage } from "../lib/cardArt";
import { projects, type Project } from "../data/projects";

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="py-24 md:py-32 relative scroll-mt-24">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="N°03 / Selected Work"
          heading="PROJECTS"
          description="A selection of recent work spanning e-commerce, landing pages, and interactive applications."
        />
        <FeaturedProject project={featured} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {rest.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-px rounded-2xl overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity"
          style={{
            background: `conic-gradient(from 0deg, ${project.accent}40, transparent, ${project.accent}20, transparent, ${project.accent}40)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative bg-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <motion.span
            className="font-mono text-xs tracking-[0.3em]"
            style={{ color: project.accent }}
          >
            {project.num} — FEATURED
          </motion.span>
          <h3 className="text-4xl md:text-5xl font-bold mt-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-mono text-sm text-muted-foreground mt-2">
            {project.subtitle}
          </p>
          <p className="text-muted-foreground mt-6 leading-relaxed text-lg">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full text-xs font-mono border"
                style={{
                  borderColor: `${project.accent}30`,
                  color: project.accent,
                  background: `${project.accent}08`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Magnet magnetStrength={0.3} padding={60}>
              <span className="inline-flex items-center gap-2 font-mono text-sm text-primary group-hover:gap-4 transition-all">
                View Project{" "}
                <ArrowUpRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform"
                />
              </span>
            </Magnet>
          </div>
        </div>
        <motion.div
          className="w-full md:w-96 h-56 md:h-auto rounded-xl overflow-hidden relative"
          style={{
            y: imageY,
            background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}05)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-mono text-4xl font-bold opacity-20"
              style={{ color: project.accent }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {project.title}
            </motion.span>
          </div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${project.accent}15, transparent 70%)`,
            }}
          />
        </motion.div>
      </div>
    </motion.a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-[380px]"
    >
      <TiltedCard
        imageSrc={svgGradientImage(project.accent, "#5be8ff", 480, 380)}
        altText={project.title}
        containerHeight="100%"
        containerWidth="100%"
        imageWidth="100%"
        imageHeight="380px"
        rotateAmplitude={9}
        scaleOnHover={1.03}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent
        overlayContent={
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group w-full h-[380px]"
          >
            <div className="h-44 flex items-center justify-center relative overflow-hidden">
              <span
                className="font-mono text-2xl font-bold relative z-10"
                style={{ color: project.accent }}
              >
                <DecryptedText
                  text={project.title}
                  animateOn="hover"
                  speed={40}
                  maxIterations={12}
                />
              </span>
              <div
                className="absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                style={{ borderColor: `${project.accent}40` }}
              >
                <ExternalLink size={12} style={{ color: project.accent }} />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-mono text-[10px] tracking-[0.3em]"
                  style={{ color: project.accent }}
                >
                  {project.num}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/40">
                  {project.subtitle}
                </span>
              </div>
              <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                    style={{
                      background: `${project.accent}10`,
                      color: `${project.accent}cc`,
                    }}
                  >
                    {t}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent text-muted-foreground">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </a>
        }
      />
    </motion.div>
  );
}
