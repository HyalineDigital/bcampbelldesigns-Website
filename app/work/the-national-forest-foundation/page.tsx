"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Search, TrendingUp } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { projects } from "@/data/projects";
import ImageLightbox from "@/components/ImageLightbox";
import { useState } from "react";

export default function NationalForestFoundationPage() {
  const project = projects.find((p) => p.id === "the-national-forest-foundation") || {
    id: "the-national-forest-foundation",
    title: "The National Forest Foundation",
    category: "Case Study",
    description: "The National Forest Foundation works on behalf of the American public to inspire personal and meaningful connections to America's National Forests. NFF focuses on driving donations and gathering communities together to help with the preservation of the Nation's Forests.",
    tags: ["Non-Profit", "Web"],
    links: {
      live: "https://www.nationalforests.org/",
    },
    timeline: "December 2021 to April 2022",
    role: "UX/UI designer designing an app for The National Forest Foundation from conception to delivery.",
    stats: ["60% increase in donations", "45% improved user engagement"],
    research: {
      method: "User Interviews",
      oldVersion: "/images/projects/the-national-forest-foundation/old-version.png",
    },
    images: [
      "/images/projects/the-national-forest-foundation/ux-design-processpng.png",
      "/images/projects/the-national-forest-foundation/geran-de-klerk-qzgn45hsen0-unsplashjpg.jpg",
      "/images/projects/the-national-forest-foundation/ap21230228939305_wide-202bcd71c1916f589849f96e3aab7429898aca54-s1100-c50jpg.jpg",
      "/images/projects/the-national-forest-foundation/christian-joudrey-mwrr1xj95hg-unsplashjpg.jpg",
      "/images/projects/the-national-forest-foundation/marita-kavelashvili-ugnrxk1129g-unsplashjpg.jpg",
      "/images/projects/the-national-forest-foundation/nora-personapng.png",
      "/images/projects/the-national-forest-foundation/pine-watt-2hzmz15wgik-unsplashjpg.jpg",
      "/images/projects/the-national-forest-foundation/user-journey-jazminejpg.jpg",
      "/images/projects/the-national-forest-foundation/wireframespng.png",
      "/images/projects/the-national-forest-foundation/wireframes-prototypespng.png",
      "/images/projects/the-national-forest-foundation/annie-spratt-qyaka7w5umy-unsplashjpg.jpg",
      "/images/projects/the-national-forest-foundation/screens-compare2png.png",
      "/images/projects/the-national-forest-foundation/screens-comparepng.png",
      "/images/projects/the-national-forest-foundation/hi-fi-prototypepng.png",
      "/images/projects/the-national-forest-foundation/lukasz-szmigiel-2shvy8lf6l0-unsplashjpg.jpg",
      "/images/projects/the-national-forest-foundation/mockup-finishedpng.png",
      "/images/projects/the-national-forest-foundation/zhang-kaiyv-fmyibz2jdhu-unsplashjpg.jpg",
      "/images/projects/the-national-forest-foundation/matthew-smith-rfflri94rs8-unsplashjpg.jpg",
    ],
  };

  // Get header image - use project.image or first image from project.images
  const headerImage = project.image || (project.images && project.images.length > 0 ? project.images[0] : null);
  // Filter out header image from images array to avoid duplication
  const displayImages = project.images?.filter(img => img !== headerImage) || [];
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Collect all images for lightbox navigation
  const allImages = headerImage 
    ? [headerImage, ...displayImages]
    : displayImages;

  return (
    <main className="bg-dark-primary">
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 px-4 md:px-8 lg:px-12 relative min-h-screen">
        <div className="max-w-[1500px] mx-auto">
          {/* Back Button */}
          <ScrollAnimation direction="right" delay={0.1}>
            <Link
              href="/#work"
              className="relative inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/15 hover:border-2 transition-all mb-8"
            >
              <GlowingEffect
                disabled={false}
                proximity={50}
                spread={30}
                blur={0}
                borderWidth={3}
                movementDuration={1.5}
              />
              <ArrowLeft className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Back to Work</span>
            </Link>
          </ScrollAnimation>

          {/* Header Image */}
          {headerImage && (
            <ScrollAnimation direction="up" delay={0.15}>
              <div 
                className="mb-8 w-full cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(allImages, 0)}
              >
                <Image
                  src={headerImage}
                  alt={`${project.title} Header`}
                  width={1500}
                  height={1000}
                  className="w-full h-auto rounded-[5px]"
                  priority
                />
              </div>
            </ScrollAnimation>
          )}

          {/* Project Header */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="mb-10">
              <motion.h1 
                className="text-[1.7rem] sm:text-[2.125rem] md:text-[2.55rem] lg:text-[3.4rem] font-semibold mb-4 leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2
                }}
              >
                <span className="text-white">{project.title}</span>
              </motion.h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 text-gray-300 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Category and Timeline */}
              <div className="flex flex-wrap gap-6 md:gap-8">
                <div>
                  <span className="text-gray-400 font-medium text-sm block mb-2">Category</span>
                  <p className="text-gray-300 text-lg font-light">{project.category}</p>
                </div>
                {project.timeline && (
                  <div>
                    <span className="text-gray-400 font-medium text-sm block mb-2">Timeline</span>
                    <p className="text-gray-300 text-lg font-light">{project.timeline}</p>
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>

          {/* Overview */}
          {(project.description || project.role) && (
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Overview</h2>
                  <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                    {project.description || project.role}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Project Highlights */}
          {project.research && (
            <ScrollAnimation direction="up" delay={0.4}>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-12">Project Highlights</h2>
                
                <div className="space-y-8">
                  {/* Research */}
                  <div className="border border-gray-700/50 rounded-[10px] bg-[#FFFFFF]/5 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Search className="w-5 h-5 text-white" />
                      <h3 className="text-xl md:text-2xl font-black text-white">Research & Process</h3>
                    </div>
                    {project.research.method && (
                      <p className="text-gray-300 text-lg font-light leading-relaxed mb-6">
                        {project.research.method}
                      </p>
                    )}
                    {project.research.oldVersion && (
                      <div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox([project.research.oldVersion!], 0)}
                      >
                        <Image
                          src={project.research.oldVersion}
                          alt="Previous version"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Final Results / Key Results */}
          {project.stats && project.stats.length > 0 && (
            <ScrollAnimation direction="up" delay={0.7}>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Key Results</h2>
                <div className="space-y-6">
                  {project.stats.map((stat, index) => (
                    <div key={index} className="bg-[#FFFFFF]/5 border border-gray-300/10 rounded-xl p-6">
                      <p className="text-gray-300 text-lg font-light leading-relaxed">
                        {stat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Project Links */}
          {(project.links?.caseStudy || project.links?.repo || project.links?.live) && (
            <ScrollAnimation direction="up" delay={0.8}>
              <div className="mb-10">
                <div className="flex flex-wrap gap-4">
                  {project.links?.caseStudy && (
                    <a
                      href={project.links.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-2 text-white text-base font-medium px-5 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/5 hover:border-2 transition-all"
                    >
                      <GlowingEffect
                        disabled={false}
                        proximity={50}
                        spread={30}
                        blur={0}
                        borderWidth={3}
                        movementDuration={1.5}
                      />
                      <span className="relative z-10">View Case Study</span>
                      <ExternalLink className="w-4 h-4 relative z-10" />
                    </a>
                  )}
                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-2 text-white text-base font-medium px-5 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/5 hover:border-2 transition-all"
                    >
                      <GlowingEffect
                        disabled={false}
                        proximity={50}
                        spread={30}
                        blur={0}
                        borderWidth={3}
                        movementDuration={1.5}
                      />
                      <span className="relative z-10">View Repository</span>
                      <ExternalLink className="w-4 h-4 relative z-10" />
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-2 text-white text-base font-medium px-5 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/5 hover:border-2 transition-all"
                    >
                      <GlowingEffect
                        disabled={false}
                        proximity={50}
                        spread={30}
                        blur={0}
                        borderWidth={3}
                        movementDuration={1.5}
                      />
                      <span className="relative z-10">View Live Site</span>
                      <ExternalLink className="w-4 h-4 relative z-10" />
                    </a>
                  )}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Additional Images */}
          {displayImages.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayImages.map((image, index) => {
                  const imageIndexInAll = headerImage ? index + 1 : index;
                  return (
                    <ScrollAnimation
                      key={index}
                      direction="up"
                      delay={0.8 + index * 0.1}
                    >
                      <div 
                        className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox(allImages, imageIndexInAll)}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </ScrollAnimation>
                  );
                })}
              </div>
            </div>
          )}

          {/* Image Lightbox */}
          <ImageLightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            alt={project.title}
          />
        </div>
      </section>
    </main>
  );
}
