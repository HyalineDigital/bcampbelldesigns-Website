"use client";

import { use } from "react";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Target, Search, TrendingUp } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import ImageLightbox from "@/components/ImageLightbox";
import { useState, useEffect } from "react";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Get header image - use project.image or first image from project.images
  const headerImage = project.image || (project.images && project.images.length > 0 ? project.images[0] : null);
  // Filter out header image from images array to avoid duplication
  const displayImages = project.images?.filter(img => img !== headerImage) || [];
  
  // Tab state (for tabstats-dashboard, addicting-games-mobile, mathgames and ableton-learning-platform)
  const [activeTab, setActiveTab] = useState(0);
  
  // Reset tab when project changes
  useEffect(() => {
    setActiveTab(0);
  }, [id]);
  
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
          {headerImage && !["valorant-dashboard", "lcs-web-app-2022", "amazon-luna-concept", "cloud-mining-concept", "nft-concept-site", "paypal-redesign", "chat-application", "rocket-stream-concept"].includes(project.id) && (
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
          {(project.description || project.role || (project.id === "overlayed" && (project.overviewParagraphs?.length || project.goals?.length))) && (
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Overview</h2>
                {project.id === "overlayed" && (project.overviewParagraphs?.length || project.role || project.goals?.length) ? (
                  <div className="space-y-6">
                    {project.overviewParagraphs && project.overviewParagraphs.length > 0 && (
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-3">Project Overview</h4>
                        {project.overviewParagraphs.map((p, i) => (
                          <p key={i} className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-4 last:mb-0">
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                    {project.role && (
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-3">My role</h4>
                        <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">{project.role}</p>
                      </div>
                    )}
                    {project.goals && project.goals.length > 0 && (
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-3">Goals</h4>
                        <ul className="space-y-3">
                          {project.goals.map((goal, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-white mt-1 text-xl">•</span>
                              <span className="text-gray-300 text-lg font-light leading-relaxed">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                    {project.description || project.role}
                  </p>
                )}
              </div>
            </ScrollAnimation>
          )}

          {/* Project Highlights */}
          {(project.highlights || project.goals || project.research) && project.id !== "overlayed" && (
            <ScrollAnimation direction="up" delay={0.4}>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-12">Project Highlights</h2>
                
                {/* Check for tab systems first */}
                {project.id === "addicting-games-mobile" ? (
                  /* Tab System for addicting-games-mobile */
                  <>
                    {/* Tab Navigation */}
                    {/* Mobile: Vertical stacked tabs */}
                    <div className="flex flex-col md:hidden gap-2 mb-4">
                      {[
                        "Project Overview & Goals",
                        "User Research + Data Analysis",
                        "Solution",
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
                      {[
                        "Project Overview & Goals",
                        "User Research + Data Analysis",
                        "Solution",
                      ].map((title, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                            index === 0 ? "rounded-tl-[10px]" : ""
                          } ${
                            activeTab === index
                              ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                              : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                              {index + 1}
                            </span>
                            {title}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px] border border-gray-700/50 md:border-t-0 rounded-lg md:rounded-b-[10px] bg-[#FFFFFF]/5 p-4 md:p-6">
                      {activeTab === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">Project Overview</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed mb-4">
                                In the current state, the Addicting Games website served as our only limited mobile solution, albeit not providing a native experience. With over 1 million monthly active users, the current mobile solution was not satisfactory and led to a lot of unwanted experiences.
                              </p>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                The ideal state envisioned a mobile solution that enhances discoverability, ensuring user engagement and fostering a high retention rate. Addicting Games possess a massive library of 1000+ games; however, users encountered difficulty in finding games aligning with their preferences or those similar to their favorites.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">My Role</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                {project.role}
                              </p>
                            </div>
                            {project.goals && project.goals.length > 0 && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Goals</h4>
                                <ul className="space-y-3">
                                  {project.goals.map((goal, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <span className="text-white mt-1 text-xl">•</span>
                                      <span className="text-gray-300 text-lg font-light leading-relaxed">{goal}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">User Research + Data Analysis</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                {project.research?.method}
                              </p>
                            </div>
                            {project.research?.oldVersion && (
                              <div 
                                className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
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
                            {/* Research & Process Highlight Section */}
                            {project.highlights && project.highlights.length > 0 && project.highlights[0].title === "Research & Process" && (
                              <div className="mt-8">
                                <div className="border border-gray-700/50 rounded-[10px] bg-[#FFFFFF]/5 p-6 md:p-8">
                                  <div className="flex items-start gap-4 mb-6">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                      1
                                    </span>
                                    <div className="flex-1">
                                      <h4 className="text-lg md:text-xl font-semibold text-gray-300">Research & Process</h4>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-3 md:gap-4">
                                    {project.highlights[0].image && (
                                      <div 
                                        className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => openLightbox([project.highlights[0].image!], 0)}
                                      >
                                        <Image
                                          src={project.highlights[0].image}
                                          alt="Research & Process"
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                    )}
                                    {project.highlights[0].sections && (
                                      <div className="space-y-6">
                                        {Object.entries(project.highlights[0].sections).map(([sectionTitle, sectionContent]) => (
                                          <div key={sectionTitle}>
                                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">{sectionTitle}</h4>
                                            <p className="text-gray-300 text-lg font-light leading-relaxed">{sectionContent}</p>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {project.highlights[0].title === "Research & Process" && (
                                  <div 
                                    className="relative w-full rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                                    onClick={() => openLightbox(["/images/projects/addicting-games-mobile/mockup-finished_agpng.png"], 0)}
                                  >
                                    <Image
                                      src="/images/projects/addicting-games-mobile/mockup-finished_agpng.png"
                                      alt="Mockup Finished"
                                      width={1920}
                                      height={1080}
                                      className="w-full h-auto"
                                    />
                                  </div>
                                )}
                                {/* Key Features Section */}
                                {project.keyFeatures && project.keyFeatures.length > 0 && (
                                  <div className="mt-8">
                                    <h4 className="text-lg md:text-xl font-bold text-white mb-4">Key Features</h4>
                                    <div className="border border-gray-700/50 rounded-[10px] bg-[#FFFFFF]/5 p-6">
                                      <ul className="space-y-3">
                                        {project.keyFeatures.map((feature, index) => (
                                          <li key={index} className="flex items-start gap-3">
                                            <span className="text-white mt-1 text-xl">•</span>
                                            <span className="text-gray-300 text-lg font-light leading-relaxed">{feature}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">Solution</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed mb-6">
                                The mobile app concept centers around a functionality reminiscent of TikTok or Youtube shorts "feeds," offering a dynamic and swift approach to maintain high user retention and maximize game discoverability within the extensive AG collection.
                              </p>
                              {project.keyResults && project.keyResults.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-700/50">
                                  <h4 className="text-lg md:text-xl font-bold text-white mb-3">Results</h4>
                                  <ul className="space-y-3">
                                    {project.keyResults.map((result, index) => (
                                      <li key={index} className="flex items-start gap-3">
                                        <span className="text-white mt-1 text-xl">•</span>
                                        <span className="text-gray-300 text-lg font-light leading-relaxed">{result}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : project.id === "tabstats-dashboard" ? (
                  /* Tab System for tabstats-dashboard */
                  <>
                    {/* Tab Navigation */}
                    {/* Mobile: Vertical stacked tabs */}
                    <div className="flex flex-col md:hidden gap-2 mb-4">
                      {[
                        "Transitioning from Web to Native Desktop",
                        "Data-Driven Research & The Scoreboard 2.0",
                        "Integrity Through Design (Cheater Detection)",
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
                      {[
                        "Transitioning from Web to Native Desktop",
                        "Data-Driven Research & The Scoreboard 2.0",
                        "Integrity Through Design (Cheater Detection)",
                      ].map((title, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                            index === 0 ? "rounded-tl-[10px]" : ""
                          } ${
                            activeTab === index
                              ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                              : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                              {index + 1}
                            </span>
                            {title}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px] border border-gray-700/50 md:border-t-0 rounded-lg md:rounded-b-[10px] bg-[#FFFFFF]/5 p-4 md:p-6">
                      {activeTab === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Challenge</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Our previous overlay was restricted by the technical limitations of third-party platforms like Overwolf, resulting in a suboptimal user experience.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Mission</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Architect a future-proof, lightweight native application that provided a feature-rich experience without impeding the frame-rate or system performance of a high-intensity tactical shooter.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Design</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                I focused on a modular UI that could be easily expanded to accommodate the game's frequent seasonal updates and evolving meta
                              </p>
                            </div>
                            <div 
                              className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                              onClick={() => openLightbox(["/images/projects/tabstats-dashboard/searchresultspng.png"], 0)}
                            >
                              <Image
                                src="/images/projects/tabstats-dashboard/searchresultspng.png"
                                alt="Search Results"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Research</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                I led a multi-channel research initiative, sifting through thousands of qualitative data points from Discord, Reddit, and Twitter to identify core player pain points.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Discovery</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Competitive players needed more than just a &quot;kill-death ratio.&quot; They required in-match telemetry, specifically detailed damage-taken breakdowns per round to analyze tactical errors.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Solution</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Designed a highly detailed, quick-view in-game scoreboard. This acted as a data-heavy replacement for the standard game UI, allowing players to check teammate ranks and past performance without ever tabbing out to a browser.
                              </p>
                            </div>
                            <div 
                              className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                              onClick={() => openLightbox(["/images/projects/tabstats-dashboard/in-game-advancedscoreboardpng.png"], 0)}
                            >
                              <Image
                                src="/images/projects/tabstats-dashboard/in-game-advancedscoreboardpng.png"
                                alt="In-Game Advanced Scoreboard"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Innovation</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                One of the most sought-after features was real-time security alerts.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The UX</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                I designed a low-friction notification system that alerted players if they were currently in a lobby with a cheater, or if a player from a previous match had been flagged.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Result</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                This system turned Tabstats into an essential &quot;anti-cheat&quot; companion, driving high daily active usage and establishing deep user trust within the competitive community.
                              </p>
                            </div>
                            <div 
                              className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                              onClick={() => openLightbox(["/images/projects/tabstats-dashboard/companionapp-3png.png"], 0)}
                            >
                              <Image
                                src="/images/projects/tabstats-dashboard/companionapp-3png.png"
                                alt="Companion App"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : project.id === "mathgames" ? (
                  <>
                    <div className="flex flex-col md:hidden gap-2 mb-4">
                      {["Project Overview & Goals", "Storytelling & Gamification", "Solution"].map((title, index) => (
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
                    <div className="hidden md:flex flex-wrap gap-0 mb-0 border-b border-gray-700/50">
                      {["Project Overview & Goals", "Storytelling & Gamification", "Solution"].map((title, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                            index === 0 ? "rounded-tl-[10px]" : ""
                          } ${
                            activeTab === index
                              ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                              : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                              {index + 1}
                            </span>
                            {title}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="min-h-[400px] border border-gray-700/50 md:border-t-0 rounded-lg md:rounded-b-[10px] bg-[#FFFFFF]/5 p-4 md:p-6">
                      {activeTab === 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">Project Overview</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">{project.description}</p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">My Role</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">{project.role}</p>
                            </div>
                            {project.goals && project.goals.length > 0 && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Goals</h4>
                                <ul className="space-y-3">
                                  {project.goals.map((goal, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <span className="text-white mt-1 text-xl">•</span>
                                      <span className="text-gray-300 text-lg font-light leading-relaxed">{goal}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 1 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <div className="space-y-6">
                            {project.highlights?.[0] && project.highlights[0].title === "Research & Process" && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Research & Process</h4>
                                <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-3 md:gap-4">
                                  {project.highlights[0].image && (
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openLightbox([project.highlights[0].image!], 0)}>
                                      <Image src={project.highlights[0].image} alt="Research & Process" fill className="object-contain" />
                                    </div>
                                  )}
                                  {project.highlights[0].sections && (
                                    <div className="space-y-6">
                                      {Object.entries(project.highlights[0].sections).map(([sectionTitle, sectionContent]) => (
                                        <div key={sectionTitle}>
                                          <h4 className="text-lg md:text-xl font-bold text-white mb-3">{sectionTitle}</h4>
                                          <p className="text-gray-300 text-lg font-light leading-relaxed">{sectionContent}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            {project.storytellingGamification && (
                              <>
                                <div>
                                  <h4 className="text-lg md:text-xl font-bold text-white mb-3">Storytelling</h4>
                                  <p className="text-gray-300 text-lg font-light leading-relaxed">{project.storytellingGamification.storytelling}</p>
                                </div>
                                <div>
                                  <h4 className="text-lg md:text-xl font-bold text-white mb-3">Scaffolded Learning</h4>
                                  <p className="text-gray-300 text-lg font-light leading-relaxed">{project.storytellingGamification.scaffoldedLearning}</p>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 2 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">Solution</h4>
                              {project.keyFeatures && project.keyFeatures.length > 0 && (
                                <ul className="space-y-3 mb-6">
                                  {project.keyFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <span className="text-white mt-1 text-xl">•</span>
                                      <span className="text-gray-300 text-lg font-light leading-relaxed">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {project.keyResults && project.keyResults.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-700/50">
                                  <h4 className="text-lg md:text-xl font-bold text-white mb-3">Results</h4>
                                  <ul className="space-y-3">
                                    {project.keyResults.map((result, index) => (
                                      <li key={index} className="flex items-start gap-3">
                                        <span className="text-white mt-1 text-xl">•</span>
                                        <span className="text-gray-300 text-lg font-light leading-relaxed">{result}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : project.id === "ableton-learning-platform" ? (
                  <>
                    <div className="flex flex-col md:hidden gap-2 mb-4">
                      {["Project Overview & Solution", "User Research & Findings", "Design Process & Takeaways"].map((title, index) => (
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
                    <div className="hidden md:flex flex-wrap gap-0 mb-0 border-b border-gray-700/50">
                      {["Project Overview & Solution", "User Research & Findings", "Design Process & Takeaways"].map((title, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                            index === 0 ? "rounded-tl-[10px]" : ""
                          } ${
                            activeTab === index
                              ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                              : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                              {index + 1}
                            </span>
                            {title}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="min-h-[400px] border border-gray-700/50 md:border-t-0 rounded-lg md:rounded-b-[10px] bg-[#FFFFFF]/5 p-4 md:p-6">
                      {activeTab === 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">Project Overview</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">{project.description}</p>
                            </div>
                            {project.problemStatement && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Problem Statement</h4>
                                <p className="text-gray-300 text-lg font-light leading-relaxed mb-4">{project.problemStatement.paragraph1}</p>
                                <p className="text-gray-300 text-lg font-light leading-relaxed">{project.problemStatement.paragraph2}</p>
                              </div>
                            )}
                            {project.solution && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Solution</h4>
                                <p className="text-gray-300 text-lg font-light leading-relaxed">{project.solution}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 1 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <div className="space-y-6">
                            {project.userResearchOverview && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">User Research: Overview</h4>
                                <p className="text-gray-300 text-lg font-light leading-relaxed">{project.userResearchOverview}</p>
                              </div>
                            )}
                            {project.painPoints && project.painPoints.length > 0 && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Identifying Pain Points</h4>
                                <ul className="space-y-3">
                                  {project.painPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <span className="text-white mt-1 text-xl">•</span>
                                      <span className="text-gray-300 text-lg font-light leading-relaxed">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 2 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <div className="space-y-6">
                            {project.designProcess?.informationArchitecture && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Information Architecture</h4>
                                <p className="text-gray-300 text-lg font-light leading-relaxed">{project.designProcess.informationArchitecture}</p>
                              </div>
                            )}
                            {project.designProcess?.digitalWireframes && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Digital Wireframes</h4>
                                <p className="text-gray-300 text-lg font-light leading-relaxed">{project.designProcess.digitalWireframes}</p>
                              </div>
                            )}
                            {project.designProcess?.lowFidelityPrototype && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Low-fidelity prototype</h4>
                                <p className="text-gray-300 text-lg font-light leading-relaxed">{project.designProcess.lowFidelityPrototype}</p>
                              </div>
                            )}
                            {project.usabilityFindings?.round1 && project.usabilityFindings.round1.length > 0 && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Usability Testing Findings - Round 1</h4>
                                <ul className="space-y-3">
                                  {project.usabilityFindings.round1.map((finding, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <span className="text-white mt-1 text-xl">•</span>
                                      <span className="text-gray-300 text-lg font-light leading-relaxed">{finding}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {project.designProcess?.mockups && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Mockups</h4>
                                <p className="text-gray-300 text-lg font-light leading-relaxed">{project.designProcess.mockups}</p>
                              </div>
                            )}
                            {project.designProcess?.highFidelityPrototype && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">High-fidelity Prototype</h4>
                                <p className="text-gray-300 text-lg font-light leading-relaxed">{project.designProcess.highFidelityPrototype}</p>
                              </div>
                            )}
                            {project.usabilityFindings?.round2 && project.usabilityFindings.round2.length > 0 && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Usability Testing Findings - Round 2</h4>
                                <ul className="space-y-3">
                                  {project.usabilityFindings.round2.map((finding, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <span className="text-white mt-1 text-xl">•</span>
                                      <span className="text-gray-300 text-lg font-light leading-relaxed">{finding}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {project.takeaways && (
                              <div className="mt-6 pt-6 border-t border-gray-700/50">
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Takeaways</h4>
                                {project.takeaways.impact && (
                                  <div className="mb-4">
                                    <h5 className="text-base md:text-lg font-semibold text-white mb-2">Impact & Revenue Opportunities</h5>
                                    <p className="text-gray-300 text-lg font-light leading-relaxed">{project.takeaways.impact}</p>
                                  </div>
                                )}
                                {project.takeaways.nextSteps && project.takeaways.nextSteps.length > 0 && (
                                  <div>
                                    <h5 className="text-base md:text-lg font-semibold text-white mb-2">Next Steps</h5>
                                    <ul className="space-y-2">
                                      {project.takeaways.nextSteps.map((step, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                          <span className="text-white mt-1 text-xl">•</span>
                                          <span className="text-gray-300 text-lg font-light leading-relaxed">{step}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : project.highlights && project.highlights.length > 0 ? (
                  <div className="space-y-12">
                    {project.highlights.map((highlight, index) => (
                      <div key={index}>
                        <div className="border border-gray-700/50 rounded-[10px] bg-[#FFFFFF]/5 p-6 md:p-8">
                          <div className="flex items-start gap-4 mb-6">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              {highlight.subtitle && (
                                <h3 className="text-xl md:text-2xl font-black text-white mb-2">{highlight.subtitle}</h3>
                              )}
                              {highlight.title && (
                                <h4 className="text-lg md:text-xl font-semibold text-gray-300">{highlight.title}</h4>
                              )}
                            </div>
                          </div>
                          {/* Special layout for addicting-games-mobile Research & Process */}
                          {project.id === "addicting-games-mobile" && highlight.title === "Research & Process" ? (
                            <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-3 md:gap-4">
                              {/* Image on the left */}
                              {highlight.image && (
                                <div 
                                  className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => openLightbox([highlight.image!], 0)}
                                >
                                  <Image
                                    src={highlight.image}
                                    alt={highlight.subtitle || highlight.title || `Highlight ${index + 1}`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              {/* Text on the right */}
                              {highlight.sections && (
                                <div className="space-y-6">
                                  {Object.entries(highlight.sections).map(([sectionTitle, sectionContent]) => (
                                    <div key={sectionTitle}>
                                      <h4 className="text-lg md:text-xl font-bold text-white mb-3">{sectionTitle}</h4>
                                      <p className="text-gray-300 text-lg font-light leading-relaxed">{sectionContent}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : project.id === "mathgames" && highlight.title === "Research & Process" ? (
                            <div className="grid grid-cols-1 md:grid-cols-[1.5625fr_1fr] gap-3 md:gap-4">
                              {/* Image on the left - 25% larger */}
                              {highlight.image && (
                                <div 
                                  className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => openLightbox([highlight.image!], 0)}
                                >
                                  <Image
                                    src={highlight.image}
                                    alt={highlight.subtitle || highlight.title || `Highlight ${index + 1}`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              {/* Text on the right */}
                              {highlight.sections && (
                                <div className="space-y-6">
                                  {Object.entries(highlight.sections).map(([sectionTitle, sectionContent]) => (
                                    <div key={sectionTitle}>
                                      <h4 className="text-lg md:text-xl font-bold text-white mb-3">{sectionTitle}</h4>
                                      <p className="text-gray-300 text-lg font-light leading-relaxed">{sectionContent}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <>
                              {highlight.sections && (
                                <div className="space-y-6">
                                  {Object.entries(highlight.sections).map(([sectionTitle, sectionContent]) => (
                                    <div key={sectionTitle}>
                                      <h4 className="text-lg md:text-xl font-bold text-white mb-3">{sectionTitle}</h4>
                                      <p className="text-gray-300 text-lg font-light leading-relaxed">{sectionContent}</p>
                                      {project.id === "ableton-learning-platform" && sectionTitle === "The Method" && (
                                        <div 
                                          className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                                          onClick={() => openLightbox(["/images/projects/ableton-learning-platform/screens-compare2jpg.jpg"], 0)}
                                        >
                                          <Image
                                            src="/images/projects/ableton-learning-platform/screens-compare2jpg.jpg"
                                            alt="Screens Comparison"
                                            fill
                                            className="object-contain"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {highlight.image && (
                                <div 
                                  className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                                  onClick={() => openLightbox([highlight.image!], 0)}
                                >
                                  <Image
                                    src={highlight.image}
                                    alt={highlight.subtitle || highlight.title || `Highlight ${index + 1}`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        {/* Full-width mockup image below Research & Process for addicting-games-mobile */}
                        {project.id === "addicting-games-mobile" && highlight.title === "Research & Process" && (
                          <div 
                            className="relative w-full rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                            onClick={() => openLightbox(["/images/projects/addicting-games-mobile/mockup-finished_agpng.png"], 0)}
                          >
                            <Image
                              src="/images/projects/addicting-games-mobile/mockup-finished_agpng.png"
                              alt="Mockup Finished"
                              width={1920}
                              height={1080}
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : project.id === "tabstats-dashboard" ? (
                  /* Tab System for tabstats-dashboard */
                  <>
                    {/* Tab Navigation */}
                    {/* Mobile: Vertical stacked tabs */}
                    <div className="flex flex-col md:hidden gap-2 mb-4">
                      {[
                        "Transitioning from Web to Native Desktop",
                        "Data-Driven Research & The Scoreboard 2.0",
                        "Integrity Through Design (Cheater Detection)",
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
                      {[
                        "Transitioning from Web to Native Desktop",
                        "Data-Driven Research & The Scoreboard 2.0",
                        "Integrity Through Design (Cheater Detection)",
                      ].map((title, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                            index === 0 ? "rounded-tl-[10px]" : ""
                          } ${
                            activeTab === index
                              ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                              : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                              {index + 1}
                            </span>
                            {title}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px] border border-gray-700/50 md:border-t-0 rounded-lg md:rounded-b-[10px] bg-[#FFFFFF]/5 p-4 md:p-6">
                      {activeTab === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Challenge</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Our previous overlay was restricted by the technical limitations of third-party platforms like Overwolf, resulting in a suboptimal user experience.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Mission</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Architect a future-proof, lightweight native application that provided a feature-rich experience without impeding the frame-rate or system performance of a high-intensity tactical shooter.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Design</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                I focused on a modular UI that could be easily expanded to accommodate the game's frequent seasonal updates and evolving meta
                              </p>
                            </div>
                            <div 
                              className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                              onClick={() => openLightbox(["/images/projects/tabstats-dashboard/searchresultspng.png"], 0)}
                            >
                              <Image
                                src="/images/projects/tabstats-dashboard/searchresultspng.png"
                                alt="Search Results"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Research</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                I led a multi-channel research initiative, sifting through thousands of qualitative data points from Discord, Reddit, and Twitter to identify core player pain points.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Discovery</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Competitive players needed more than just a &quot;kill-death ratio.&quot; They required in-match telemetry, specifically detailed damage-taken breakdowns per round to analyze tactical errors.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Solution</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Designed a highly detailed, quick-view in-game scoreboard. This acted as a data-heavy replacement for the standard game UI, allowing players to check teammate ranks and past performance without ever tabbing out to a browser.
                              </p>
                            </div>
                            <div 
                              className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                              onClick={() => openLightbox(["/images/projects/tabstats-dashboard/in-game-advancedscoreboardpng.png"], 0)}
                            >
                              <Image
                                src="/images/projects/tabstats-dashboard/in-game-advancedscoreboardpng.png"
                                alt="In-Game Advanced Scoreboard"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Innovation</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                One of the most sought-after features was real-time security alerts.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The UX</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                I designed a low-friction notification system that alerted players if they were currently in a lobby with a cheater, or if a player from a previous match had been flagged.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Result</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                This system turned Tabstats into an essential &quot;anti-cheat&quot; companion, driving high daily active usage and establishing deep user trust within the competitive community.
                              </p>
                            </div>
                            <div 
                              className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
                              onClick={() => openLightbox(["/images/projects/tabstats-dashboard/companionapp-3png.png"], 0)}
                            >
                              <Image
                                src="/images/projects/tabstats-dashboard/companionapp-3png.png"
                                alt="Companion App"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : project.id === "addicting-games-mobile" ? (
                  /* Tab System for addicting-games-mobile */
                  <>
                    {/* Tab Navigation */}
                    {/* Mobile: Vertical stacked tabs */}
                    <div className="flex flex-col md:hidden gap-2 mb-4">
                      {[
                        "Project Overview & Goals",
                        "User Research + Data Analysis",
                        "Solution",
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
                      {[
                        "Project Overview & Goals",
                        "User Research + Data Analysis",
                        "Solution",
                      ].map((title, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                            index === 0 ? "rounded-tl-[10px]" : ""
                          } ${
                            activeTab === index
                              ? "text-white bg-[#FFFFFF]/10 border-gray-300/20 border-b-0 -mb-px"
                              : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                              {index + 1}
                            </span>
                            {title}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px] border border-gray-700/50 md:border-t-0 rounded-lg md:rounded-b-[10px] bg-[#FFFFFF]/5 p-4 md:p-6">
                      {activeTab === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">Project Overview</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed mb-4">
                                In the current state, the Addicting Games website served as our only limited mobile solution, albeit not providing a native experience. With over 1 million monthly active users, the current mobile solution was not satisfactory and led to a lot of unwanted experiences.
                              </p>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                The ideal state envisioned a mobile solution that enhances discoverability, ensuring user engagement and fostering a high retention rate. Addicting Games possess a massive library of 1000+ games; however, users encountered difficulty in finding games aligning with their preferences or those similar to their favorites.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">My Role</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                {project.role}
                              </p>
                            </div>
                            {project.goals && project.goals.length > 0 && (
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3">Goals</h4>
                                <ul className="space-y-3">
                                  {project.goals.map((goal, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <span className="text-white mt-1 text-xl">•</span>
                                      <span className="text-gray-300 text-lg font-light leading-relaxed">{goal}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">User Research + Data Analysis</h4>
                              <p className="text-gray-300 text-lg font-light leading-relaxed">
                                {project.research?.method}
                              </p>
                            </div>
                            {project.research?.oldVersion && (
                              <div 
                                className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mt-6"
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
                        </motion.div>
                      )}
                      {activeTab === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-white mb-3">Solution</h4>
                              {project.keyResults && project.keyResults.length > 0 && (
                                <p className="text-gray-300 text-lg font-light leading-relaxed">
                                  {project.keyResults[0]}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : (
                  /* Default layout for other projects (fallback for projects without highlights) */
                  <div className="space-y-8">
                    {/* Goals */}
                    {project.goals && project.goals.length > 0 && (
                      <div className="border border-gray-700/50 rounded-[10px] bg-[#FFFFFF]/5 p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-5 h-5 text-white" />
                          <h3 className="text-xl md:text-2xl font-black text-white">Project Goals</h3>
                        </div>
                        <ul className="space-y-4">
                          {project.goals.map((goal, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-white mt-1 text-xl">•</span>
                              <span className="text-gray-300 text-lg font-light leading-relaxed">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Research */}
                    {project.research && (
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
                  )}
                </div>
                )}
              </div>
            </ScrollAnimation>
          )}

          {/* Final Results / Key Results */}
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

          {/* Project Links */}
          {(project.links?.caseStudy || project.links?.repo || (project.links?.live && project.id !== "icyveins")) && (
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
                  {project.links?.live && project.id !== "icyveins" && (
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
          {displayImages.length > 0 && project.id !== "icyveins" && project.id !== "tabstats-dashboard" && (
            <div className="mb-12">
              {project.id === "overlayed" && displayImages.length > 0 ? (
                <>
                  <ScrollAnimation direction="up" delay={0.8}>
                    <div
                      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mb-6"
                      onClick={() => openLightbox(allImages, headerImage ? 1 : 0)}
                    >
                      <Image
                        src={displayImages[0]}
                        alt={`${project.title} - Image 1`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </ScrollAnimation>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayImages.slice(1).map((image, index) => {
                      const imageIndexInAll = headerImage ? index + 2 : index + 1;
                      return (
                        <ScrollAnimation
                          key={index}
                          direction="up"
                          delay={0.8 + (index + 1) * 0.1}
                        >
                          <div
                            className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openLightbox(allImages, imageIndexInAll)}
                          >
                            <Image
                              src={image}
                              alt={`${project.title} - Image ${index + 2}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </ScrollAnimation>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className={["valorant-dashboard", "lcs-web-app-2022", "amazon-luna-concept", "cloud-mining-concept", "nft-concept-site", "paypal-redesign", "chat-application", "rocket-stream-concept"].includes(project.id) ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
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
              )}
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
