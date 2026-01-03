"use client";

import ProjectGrid from "@/components/ProjectGrid";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ShaderBackground from "@/components/ShaderBackground";
import ScrollingSkills from "@/components/ScrollingSkills";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Mail } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {
  return (
    <main className="bg-dark-primary">
      {/* Hero Section */}
      <section className="h-screen flex relative" style={{ paddingTop: '100px', paddingBottom: '180px' }}>
        {/* Background Shader - Full width, behind borders */}
        <div 
          className="absolute top-0 h-full z-0"
          style={{
            left: '0',
            right: '0',
            width: '100vw',
            marginLeft: 'calc((100% - 100vw) / 2)',
            marginRight: 'calc((100% - 100vw) / 2)'
          }}
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          >
            <source src="/images/sarcastic_remix.webm" type="video/webm" />
          </video>
          <ShaderBackground />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" style={{ zIndex: 1 }}></div>
        </div>
        
        {/* Vertical borders - 1px from browser edges, aligned with logo and LinkedIn areas */}
        {/* Left border - 1px from browser left edge */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-gray-400/25 hidden lg:block pointer-events-none z-10"
          style={{
            left: '-1px',
          }}
        ></div>
        
        {/* Right border - 1px from browser right edge */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-gray-400/25 hidden lg:block pointer-events-none z-10"
          style={{
            right: '-1px',
          }}
        ></div>
        
        {/* Bottom border - Full width */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{
            left: '0',
            right: '0',
            width: '100vw',
            marginLeft: 'calc((100% - 100vw) / 2)',
            marginRight: 'calc((100% - 100vw) / 2)',
            backgroundColor: 'rgba(255, 255, 255, 0.25)'
          }}
        ></div>
        
        {/* Content Container - Constrained by borders */}
        <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 relative flex-1 flex items-center justify-center z-20">
          {/* Content */}
          <div className="text-center relative">
            <motion.h1 
              className="text-[1.7rem] sm:text-[2.125rem] md:text-[2.55rem] lg:text-[3.4rem] font-semibold mb-3 leading-tight px-2 sm:px-0"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            >
              <motion.span 
                className="text-white inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Brandon
              </motion.span>
              {" "}
              <motion.span 
                className="text-white inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Campbell
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-base sm:text-[1.0625rem] md:text-[1.275rem] lg:text-[1.59375rem] text-gray-300 font-light mb-3 px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5
              }}
            >
              UI/UX & Product Designer
            </motion.p>
            <motion.div 
              className="text-sm sm:text-[0.95625rem] md:text-[1.0625rem] text-gray-400 leading-relaxed font-light text-center px-4 sm:px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1],
                delay: 2.2
              }}
            >
              {/* Mobile: Static text on two lines */}
              <div className="flex flex-col items-center justify-center md:hidden">
                <span className="text-gray-300">Crafting thoughtful digital experiences</span>
                <span className="mt-1">through user-centered design and modern aesthetics.</span>
              </div>
              
              {/* Desktop: Rotating text */}
              <div className="hidden md:flex flex-row items-center justify-center gap-0 sm:inline-flex flex-wrap sm:flex-nowrap max-w-full">
                <span className="whitespace-nowrap">Crafting</span>
                <span className="inline-block min-w-[55px] md:min-w-[64px] text-center sm:ml-1 max-w-[calc(100%-2rem)] sm:max-w-none overflow-visible">
                  <FlipWords
                    words={[
                      "thoughtful digital experiences",
                      "intuitive user interfaces",
                      "beautiful web applications",
                      "engaging mobile apps",
                      "seamless interactions",
                    ]}
                    duration={3000}
                    className="text-gray-300 px-0"
                  />
                </span>
                <span className="text-center sm:text-left whitespace-normal"> through user-centered design and modern aesthetics.</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="absolute bottom-[40px] left-0 right-0 z-20">
          <div className="max-w-[1500px] mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[
                { number: "10+", label: "Years Experience" },
                { number: "200+", label: "Projects" },
                { number: "10M+", label: "MAU Designed" },
                { number: "100+", label: "Clients Served" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-3 sm:p-4 md:p-6 text-center border-r border-white/25 last:border-r-0 bg-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-light leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Scrolling Skills Section */}
      <ScrollingSkills 
        skills={[
          "UI/UX Design",
          "Product Design",
          "Figma",
          "Photoshop",
          "User Research",
          "Prototyping",
          "Design Systems",
          "Wireframing",
          "Visual Design",
          "Interaction Design",
          "Mobile Design",
          "Web Design",
        ]}
        speed={30}
      />
      
      {/* Featured Projects Section */}
      <section id="work" className="pt-12 pb-12 md:pt-16 md:pb-16 px-4 md:px-8 lg:px-12 relative">
        <div className="max-w-[1500px] mx-auto">
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[2.25rem] font-black mb-[10px] leading-tight">
                <span className="text-white">Selected</span>
                <span className="text-white"> Works</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                A curated selection of recent design work
              </p>
            </div>
          </ScrollAnimation>
          <ProjectGrid featuredOnly={true} />
          
          {/* View All Button */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="flex justify-center mt-16">
              <Link
                href="/projects"
                className="relative inline-flex items-center gap-4 text-white text-base font-medium px-5 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/5 hover:border-2 transition-all"
              >
                <GlowingEffect
                  disabled={false}
                  proximity={50}
                  spread={30}
                  blur={0}
                  borderWidth={3}
                  movementDuration={1.5}
                />
                <span className="relative z-10">
                  View 20+ Featured Projects
                </span>
                <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Built With Section */}
      <section className="hidden md:block py-[50px] px-4 md:px-8 lg:px-12 relative border-t border-b border-white/25">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url(/images/textures/section-bg.jpg)',
            zIndex: 0
          }}
        ></div>
        <div className="max-w-[1500px] mx-auto relative z-10">
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-lg md:text-xl lg:text-2xl font-black mb-6 leading-tight">
                <span className="text-white">This Website Was Built With:</span>
              </h2>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="grid grid-cols-2 md:flex md:flex-nowrap justify-center items-center gap-3 md:gap-12 lg:gap-16">
            <div className="flex items-center justify-center h-6 md:h-8 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/images/tech-logos/Figma.png"
                alt="Figma"
                width={120}
                height={40}
                quality={100}
                className="h-full w-auto object-contain"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-center h-6 md:h-8 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/images/tech-logos/Cursor.png"
                alt="Cursor"
                width={120}
                height={40}
                quality={100}
                className="h-full w-auto object-contain"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-center h-6 md:h-8 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/images/tech-logos/Vercel.png"
                alt="Vercel"
                width={120}
                height={40}
                quality={100}
                className="h-full w-auto object-contain"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-center h-6 md:h-8 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/images/tech-logos/Nextjs.png"
                alt="Next.js"
                width={120}
                height={40}
                quality={100}
                className="h-full w-auto object-contain"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-center h-6 md:h-8 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity col-span-2 md:col-span-1 justify-self-center md:justify-self-auto">
              <Image
                src="/images/tech-logos/Supabase.png"
                alt="Supabase"
                width={120}
                height={40}
                quality={100}
                className="h-full w-auto object-contain"
                unoptimized
              />
            </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-16 px-4 md:px-8 lg:px-12 relative border-t border-white/25 md:border-t-0">
        <div className="max-w-[1500px] mx-auto">
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[2.25rem] font-black mb-[10px] leading-tight">
                <span className="text-white">Let&apos;s</span>
                <span className="text-white"> Connect</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                I&apos;d love to chat more, shoot me an email!
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="flex justify-center items-center">
              <a
                href="mailto:Brandon@bcampbelldesigns.com"
                className="relative inline-flex items-center gap-4 text-white text-base font-medium px-5 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/5 hover:border-2 transition-all"
              >
                <GlowingEffect
                  disabled={false}
                  proximity={50}
                  spread={30}
                  blur={0}
                  borderWidth={3}
                  movementDuration={1.5}
                />
                <Mail className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Email Me</span>
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
}

