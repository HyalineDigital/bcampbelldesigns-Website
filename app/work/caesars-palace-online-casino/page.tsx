"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Award, Building2 } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { projects } from "@/data/projects";
import { useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";

export default function CaesarsPalaceOnlineCasinoPage() {
  const project = projects.find((p) => p.id === "caesars-palace-online-casino") || projects[0];
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
              onClick={() => openLightbox(["/images/portfolio/CPO-port-header.png"], 0)}
            >
              <Image
                src="/images/portfolio/CPO-port-header.png"
                alt="Caesars Palace Online Casino Header"
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
                <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                  In my role as UX & Product Designer for Caesars Palace Online (CPO), I spearheaded the strategic overhaul of the platform's core player experience across three flagship brands: Caesars Palace, Horseshoe, and Caesars Sportsbook. By dismantling technical debt and replacing fragmented sportsbook-legacy assets with a bespoke, high-performance design system, I helped the product to its most successful era in company history—propelling Caesars from #8 to a Top 3 industry ranking and breaking every major KPI record, including DAU and ARPU.
                </p>
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
                  "Reward Center & Shop",
                  "Registration Rework",
                  "Monetization & Leaderboards",
                  "Design System Build",
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
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#931E37] to-[#DF5728] flex items-center justify-center text-white font-black text-xs flex-shrink-0">
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
                      ? "text-white bg-[#FFFFFF]/5 border-gray-300/20 border-b-0 -mb-px"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#931E37] to-[#DF5728] flex items-center justify-center text-white font-black text-xs">1</span>
                    Reward Center & Shop
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                    activeTab === 1
                      ? "text-white bg-[#FFFFFF]/5 border-gray-300/20 border-b-0 -mb-px"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#931E37] to-[#DF5728] flex items-center justify-center text-white font-black text-xs">2</span>
                    Registration Rework
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab(2)}
                  className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                    activeTab === 2
                      ? "text-white bg-[#FFFFFF]/5 border-gray-300/20 border-b-0 -mb-px"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#931E37] to-[#DF5728] flex items-center justify-center text-white font-black text-xs">3</span>
                    Monetization & Leaderboards
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab(3)}
                  className={`relative inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-t-[10px] transition-all border-t border-l border-r ${
                    activeTab === 3
                      ? "text-white bg-[#FFFFFF]/5 border-gray-300/20 border-b-0 -mb-px"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[#FFFFFF]/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#931E37] to-[#DF5728] flex items-center justify-center text-white font-black text-xs">4</span>
                    Design System Build
                  </span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px] border border-gray-700/50 md:border-t-0 rounded-lg md:rounded-b-[10px] bg-[#FFFFFF]/5 p-4 md:p-6">
                {/* Tab 1: Reward Center & Credit Shop */}
                {activeTab === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-6">The Reward Center & Credit Shop (Reducing Support Load)</h3>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 md:w-[12.5rem] lg:w-[15rem]">
                          <div
                            onClick={() => openLightbox(["/images/portfolio/The Shop-portrait.png"], 0)}
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                          >
                            <Image
                              src="/images/portfolio/The Shop-portrait.png"
                              alt="The Reward Center & Credit Shop"
                              width={400}
                              height={600}
                              className="w-full h-auto rounded-[5px]"
                            />
                          </div>
                        </div>
                        <div className="space-y-6 flex-1">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">User Pain Point</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              High volume of customer support (CS) tickets regarding reward redemption and point clarity.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Solution</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Designed an intuitive Reward Center and a Reward Credit Shop where users can redeem credits for free spins and casino benefits.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">Business Impact</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Reduced customer support tickets by nearly 60% and increased engagement with the loyalty ecosystem.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 2: Registration Rework */}
                {activeTab === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-6">The Registration Rework (Revenue Driver)</h3>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 md:w-[15.625rem] lg:w-[18.75rem]">
                          <div
                            onClick={() => openLightbox(["/images/portfolio/cpo-signup.png"], 0)}
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                          >
                            <Image
                              src="/images/portfolio/cpo-signup.png"
                              alt="Registration Rework"
                              width={500}
                              height={750}
                              className="w-full h-auto rounded-[5px]"
                            />
                          </div>
                        </div>
                        <div className="space-y-6 flex-1">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Challenge</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              FTD (First Time Deposit) rates were stagnant at sub-38%.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Solution</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Led an extensive "psyche experiment" and research-backed rework of the registration flow.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Result</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Pushed FTD (First Time Deposit) conversion rates to a consistent <span className="text-white font-semibold">~45%-51%</span>, directly increasing the player base and initial revenue.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 3: Monetization & Leaderboards */}
                {activeTab === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-6">Monetization & Leaderboards (New Revenue Streams)</h3>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 md:w-[12.5rem] lg:w-[15rem]">
                          <div
                            onClick={() => openLightbox(["/images/portfolio/Leaderboard Takeover - Shamrock Fortunes.png"], 0)}
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                          >
                            <Image
                              src="/images/portfolio/Leaderboard Takeover - Shamrock Fortunes.png"
                              alt="Monetization & Leaderboards"
                              width={400}
                              height={600}
                              className="w-full h-auto rounded-[5px]"
                            />
                          </div>
                        </div>
                        <div className="space-y-6 flex-1">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">Innovation</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Completed a visual overhaul of the existing leaderboards while introducing loyalty tier exclusive leaderboards and opening the opportunity for sponsored leaderboard takeovers.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">Strategic Outcome</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Created a new advertising revenue stream by allowing external companies to purchase branded space within the competitive leaderboard UI.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 4: Design System Build */}
                {activeTab === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-6">Building for Scale: The CPO Design System</h3>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 md:w-[12.5rem] lg:w-[15rem]">
                          <div
                            onClick={() => openLightbox(["/images/portfolio/design-system-cpo.png"], 0)}
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                          >
                            <Image
                              src="/images/portfolio/design-system-cpo.png"
                              alt="CPO Design System"
                              width={400}
                              height={600}
                              className="w-full h-auto rounded-[5px]"
                            />
                          </div>
                        </div>
                        <div className="space-y-6 flex-1">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">The Artifact</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Architected a <span className="text-white font-semibold">50+ component library</span> specifically for the Online Casino brand.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3">Operational Impact</h4>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                              Drastically improved iteration speed for the dev team and ensured brand consistency across Reward Center, Credit Shop, and all game tiles.
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
          <ScrollAnimation direction="up" delay={0.7}>
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">The Final Results (The &quot;Receipts&quot;)</h2>
              <div className="space-y-6">
                <div className="bg-[#FFFFFF]/5 border border-gray-300/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Market Position</h3>
                  <p className="text-gray-300 text-lg font-light leading-relaxed">
                    Rose from <span className="text-white font-semibold">#8 to 3rd place</span> in industry rankings (E&K Report July 2025).
                  </p>
                </div>
                <div className="bg-[#FFFFFF]/5 border border-gray-300/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Category Win</h3>
                  <p className="text-gray-300 text-lg font-light leading-relaxed">
                    Claimed <span className="text-white font-semibold">4th place</span> in the "Play" category for smooth gameplay and engaging promotions.
                  </p>
                </div>
                <div className="bg-[#FFFFFF]/5 border border-gray-300/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">KPI Success</h3>
                  <p className="text-gray-300 text-lg font-light leading-relaxed">
                    Achieved the <span className="text-white font-semibold">&quot;biggest months ever&quot;</span> for all KPIs, including DAU and ARPU, beating the previous months record every month of 2025.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>


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

