"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { projects } from "@/data/projects";
import { useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";

export default function IcyVeinsPage() {
  const project = projects.find((p) => p.id === "icyveins") || projects[0];
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="bg-dark-primary">
      <section className="pt-32 pb-12 md:pt-28 md:pb-16 px-9 md:px-8 lg:px-12 relative min-h-screen">
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
          <ScrollAnimation direction="up" delay={0.15}>
            <div 
              className="mb-8 w-full cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(["/images/portfolio/icy-port-header.png"], 0)}
            >
              <Image
                src="/images/portfolio/icy-port-header.png"
                alt="Icy Veins Header"
                width={1500}
                height={1000}
                className="w-full h-auto rounded-[5px]"
                priority
              />
            </div>
          </ScrollAnimation>

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

          {/* The Hook (Executive Summary) */}
          <ScrollAnimation direction="up" delay={0.3}>
            <div className="mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Overview</h2>
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                    As the Lead UX & Product Designer for Enthusiast Gaming, I directed the design strategy and product execution for a diverse portfolio of high-traffic gaming properties, including Tabstats, Typeracer, MathGames, Addicting Games, and Icy Veins. My responsibilities extended well beyond visual aesthetics; I was tasked with modernizing legacy architectures, integrating complex cross-platform user flows, and identifying new monetization verticals for a network of web properties serving over 4 million daily active users.
                  </p>
                  <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                    The culmination of my tenure was spearheaded by the comprehensive digital transformation of Icy Veins. I led the initiative to bring the platform into the modern era, reconciling over a decade of technical debt to transform a text-heavy legacy database into a high-performance, multi-title content engine serving 7 million Monthly Active Users (MAU).
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Core Pillars of the Redesign */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-12">Project Highlights</h2>
              
              {/* Tab Navigation */}
              {/* Mobile: Vertical stacked tabs */}
              <div className="flex flex-col md:hidden gap-2 mb-4">
                {[
                  "Desktop & Mobile Global Redesign",
                  "News & Title Growth",
                  "Infographic System",
                  "Gear & Talent Builders",
                ].map((title, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`relative w-full flex items-center gap-3 text-sm font-medium px-4 py-3 rounded-lg transition-all border ${
                      activeTab === index
                        ? "text-white bg-[#FFFFFF]/10 border-gray-300/20"
                        : "text-gray-400 border-gray-700/50 hover:text-white hover:bg-[#FFFFFF]/5"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-left flex-1">{title}</span>
                  </button>
                ))}
              </div>
              
              {/* Desktop: Horizontal tabs */}
              <div className="hidden md:flex flex-wrap gap-0 mb-0 border-b border-gray-700/50">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-tl-[10px] rounded-tr-[10px] transition-all border-t border-l border-r ${
                    activeTab === 0
                      ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">1</span>
                    Desktop & Mobile Global Redesign
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                    activeTab === 1
                      ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">2</span>
                    News & Title Growth
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab(2)}
                  className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                    activeTab === 2
                      ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">3</span>
                    Infographic System
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab(3)}
                  className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                    activeTab === 3
                      ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">4</span>
                    Gear & Talent Builders
                  </span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px] border border-gray-700/50 md:border-t-0 rounded-lg md:rounded-b-[10px] bg-[#FFFFFF]/5 p-4 md:p-6">
                {/* Tab 1: Desktop & Mobile Global Redesign */}
                {activeTab === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-6">Desktop & Mobile Global Redesign</h3>
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <div className="flex-shrink-0 md:w-1/3">
                          <div 
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openLightbox(["/images/portfolio/icy-wow-port.png"], 0)}
                          >
                            <Image
                              src="/images/portfolio/icy-wow-port.png"
                              alt="Icy Veins World of Warcraft"
                              width={600}
                              height={800}
                              className="w-full h-auto rounded-[5px]"
                            />
                          </div>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Challenge</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              The original site was built for a 2012 web landscape. It struggled with "information overload," making complex game guides difficult to navigate on mobile devices.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Solution</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Implemented a mobile-first responsive architecture that prioritized "at-a-glance" readability. I introduced a hierarchical navigation system that allowed players to jump between "Talents," "Rotations," and "Gear" without losing their place in the guide.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Result</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Successfully migrated 10+ years of legacy content into a clean, modern UI that reduced bounce rates across all Blizzard and Square Enix titles.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 2: Expanding Reach through News & Title Growth */}
                {activeTab === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-6">Expanding Reach through News & Title Growth</h3>
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <div className="flex-shrink-0 md:w-1/3">
                          <div 
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openLightbox(["/images/portfolio/IV-news-port.png"], 0)}
                          >
                            <Image
                              src="/images/portfolio/IV-news-port.png"
                              alt="Icy Veins News"
                              width={600}
                              height={800}
                              className="w-full h-auto rounded-[5px]"
                            />
                          </div>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Innovation</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Architected a completely new News & Editorial section from the ground up.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">Expansion</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              This infrastructure allowed the brand to expand beyond World of Warcraft and previously covered games, opening up the ability to allow writers to cover general industry news and other popular new titles.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">Business Impact</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              This strategic expansion was a primary driver in scaling the site's reach, capturing new audiences and contributing to the 7M MAU milestone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 3: Visualizing Complexity (The "Infographic" System) */}
                {activeTab === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-6">Visualizing Complexity (The &quot;Infographic&quot; System)</h3>
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <div className="flex-shrink-0 md:w-1/3">
                          <div 
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openLightbox(["/images/portfolio/FFXVI Rotation Tool.png"], 0)}
                          >
                            <Image
                              src="/images/portfolio/FFXVI Rotation Tool.png"
                              alt="FFXVI Rotation Tool"
                              width={600}
                              height={800}
                              className="w-full h-auto rounded-[5px]"
                            />
                          </div>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Problem</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              High-level gaming theory is notoriously dense. New players were often overwhelmed by "walls of text" describing ability sequences.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The System</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Created a Design System for Complexity—a library of over 50 individual infographics and ability icons. I designed a standardized visual language for "Ability Rotations" that allowed theorycrafters to communicate complex sequences instantly.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">Impact</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              These infographics became the "gold standard" for the community, shared widely across social media and Discord, driving significant organic referral traffic.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 4: Product Innovation (Gear & Talent Builders) */}
                {activeTab === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-6">Product Innovation (Gear & Talent Builders)</h3>
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <div className="flex-shrink-0 md:w-1/3">
                          <div 
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openLightbox(["/images/portfolio/D4-skill-port.png"], 0)}
                          >
                            <Image
                              src="/images/portfolio/D4-skill-port.png"
                              alt="Diablo IV Skill Builder"
                              width={600}
                              height={800}
                              className="w-full h-auto rounded-[5px]"
                            />
                          </div>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">User Engagement</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Developed interactive Gear Builders and Talent Tree tools.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">Design Philosophy</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              I translated complex in-game mathematics into intuitive "drag-and-drop" interfaces, helping players optimize their characters in real-time.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </ScrollAnimation>

          {/* Final Results */}
          {(project.keyResults || project.stats) && (project.keyResults || project.stats)!.length > 0 && (
            <ScrollAnimation direction="up" delay={0.7}>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Key Results</h2>
                <div className="space-y-6">
                  {(project.keyResults || project.stats)!.map((result, index) => (
                    <div key={index} className="bg-[#FFFFFF]/5 border border-gray-300/10 rounded-xl p-6">
                      <p className="text-gray-300 text-lg font-light leading-relaxed">
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          )}

        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        alt={project.title}
      />
    </main>
  );
}


