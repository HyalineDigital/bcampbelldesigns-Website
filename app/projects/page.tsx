"use client";

import ProjectGrid from "@/components/ProjectGrid";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function ProjectsPage() {
  return (
    <section className="pt-32 pb-24 px-4 md:px-8 lg:px-12 relative min-h-screen">
      <div className="max-w-[1510px] mx-auto">
        {/* Section Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-20">
            <h1 className="text-[1.5rem] md:text-[1.875rem] lg:text-[2.25rem] font-medium mb-6 leading-tight">
              <span className="text-white">All</span>
              <span className="text-white"> Projects</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              A comprehensive collection of my design work
            </p>
          </div>
        </ScrollAnimation>

        {/* Project Grid */}
        <ProjectGrid featuredOnly={false} />
      </div>
    </section>
  );
}

