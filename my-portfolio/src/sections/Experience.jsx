import {
  motion,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const experiences = [
  {
    title: "Web Developer Intern",
    company: "Elite Softwares",
    period: "2022–2023",
    description: "Gained knowledge about Django, MySQL",
  },
  {
    title: "GenAI Intern",
    company: "Tech Mahindra",
    period: "2024",
    description:
      "Worked with RAG, LLMs, SLMs and chatbot development",
  },
  {
    title: "Full Stack Developer",
    company: "Fulcrum Digital",
    period: "2025–Present",
    description:
      "Working with Agentic AI, FastAPI and scalable systems",
  },
];

const ExperienceSection = () => {
  const progress = useMotionValue(0);
  const glowOpacity = useTransform(progress, [0, 1], [0.3, 1]);

  useEffect(() => {
    animate(progress, 1, {
      duration: 6,
      ease: "easeInOut",
    });
  }, []);

  return (
    <section id="experience" className="relative min-h-screen bg-black/90 text-white flex items-center justify-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-16 text-4xl font-semibold tracking-wide"
      >
        Experience
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-[80%] max-w-6xl mt-40"
      >
        <div className="relative h-1 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            style={{
              scaleX: progress,
              transformOrigin: "0% 50%",
              opacity: glowOpacity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-white via-[#b8a1ff] to-white rounded-full shadow-[0_0_25px_rgba(184,161,255,0.6)]"
          />
        </div>

        <div className="relative flex justify-between mt-14">
          {experiences.map((exp, i) => {
            const point = i / (experiences.length - 1);
            const isActive = useTransform(
              progress,
              [point - 0.05, point],
              [0.3, 1]
            );

            return (
              <div
                key={i}
                className="relative flex flex-col items-center"
                onMouseEnter={() =>
                  animate(progress, point, { duration: 0.6 })
                }
              >
                <motion.div
                  style={{ opacity: isActive }}
                  className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-6"
                />

                <motion.div
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow:
                      "0 20px 40px rgba(184,161,255,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-72 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                  <h3 className="text-lg font-semibold mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-3">
                    {exp.company} • {exp.period}
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(184,161,255,0.12),transparent_65%)]" />
    </section>
  );
};

export default ExperienceSection;
