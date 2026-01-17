"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ProjectGridProps {
  featuredOnly?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Format timeline to use 3-letter months
function formatTimeline(timeline?: string): string {
  if (!timeline) return "";
  
  const monthMap: { [key: string]: string } = {
    "January": "Jan",
    "February": "Feb",
    "March": "Mar",
    "April": "Apr",
    "May": "May",
    "June": "Jun",
    "July": "Jul",
    "August": "Aug",
    "September": "Sep",
    "October": "Oct",
    "November": "Nov",
    "December": "Dec",
  };

  let formatted = timeline;
  Object.keys(monthMap).forEach((fullMonth) => {
    const regex = new RegExp(fullMonth, "gi");
    formatted = formatted.replace(regex, monthMap[fullMonth]);
  });
  
  return formatted;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={itemVariants}
      className="project-card glass-card rounded-2xl group relative w-full"
    >
      <GlowingEffect
        disabled={false}
        proximity={50}
        spread={30}
        blur={0}
        borderWidth={3}
        movementDuration={1.5}
      />
      <Link href={`/work/${project.id}`} className="block relative z-10">
        <div className="relative h-[200px] overflow-hidden rounded-t-2xl">
          <Image
            src={project.homepageImage || project.image}
            alt={project.title}
            fill
            className="project-image absolute inset-0 w-full h-full object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          <h3 className="text-base sm:text-[1.05rem] md:text-[1.3125rem] font-medium text-white mb-4 sm:mb-5 leading-tight break-words">
            {project.title}
          </h3>
          
          {/* Stats Section */}
          {project.stats && project.stats.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 sm:gap-3">
              {project.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-300">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="font-medium break-words">{stat}</span>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light line-clamp-3 break-words">
            {project.description}
          </p>
          
          {/* Divider and Date */}
          {project.timeline && (
            <>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{formatTimeline(project.timeline)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectGrid({ featuredOnly = false }: ProjectGridProps) {
  const displayProjects = featuredOnly
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4 lg:gap-5 w-full">
        {displayProjects.map((project, index) => (
          <>
            <ProjectCard key={project.id} project={project} />
            {index === 5 && (
              <div key={`divider-${project.id}`} className="col-span-full my-12 md:my-16 lg:my-20">
                <div className="border-t border-gray-700/50"></div>
              </div>
            )}
          </>
        ))}
      </div>
    </motion.div>
  );
}

