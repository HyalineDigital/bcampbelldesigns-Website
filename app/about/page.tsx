"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, MapPin, Mail } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function AboutPage() {
  return (
    <section className="pt-16 pb-12 px-4 md:px-8 lg:px-12 relative min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">About</span>
              <span className="gradient-text"> Me</span>
            </h1>
          </div>
        </ScrollAnimation>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="glass-card rounded-2xl p-8 md:p-12">
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 dark:text-gray-300 mb-6">
              User Experience and User Interface Designer with{" "}
              <span className="text-accent-purple font-semibold">
                over 10 years of expertise
              </span>
              , specializing in Figma and Photoshop. Accomplished in crafting
              design solutions for websites with{" "}
              <span className="text-accent-blue font-semibold">
                over 1 million MAU
              </span>{" "}
              on desktop and mobile platforms.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 dark:text-gray-300">
              Proven track record in building{" "}
              <span className="text-accent-purple font-semibold">
                20+ design systems
              </span>
              , developing style guides, and creating large reusable and flexible
              component sets. Adept at user research, journey mapping,
              wireframing, and data-driven high-fidelity design. Passionate
              about design, proficient in agile workflows, and experienced in
              utilizing JIRA/Confluence.
            </p>
            </div>
          </ScrollAnimation>

          {/* Location & Personal */}
          <ScrollAnimation direction="up" delay={0.3}>
            <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-accent-blue" />
                  Location
                </h3>
                <p className="text-gray-400 text-lg">
                  Currently based in{" "}
                  <span className="text-accent-blue font-semibold">
                    Reno, Nevada
                  </span>
                  .
                </p>
              </div>
              <div className="pt-6 border-t border-gray-800 dark:border-gray-200/20">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Beyond Design
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Music fan and gamer who knows a little bit too much about
                  both. A producer in my free time, and an occasional DJ opening
                  for some of the biggest acts in electronic music.
                </p>
              </div>
            </div>
            </div>
          </ScrollAnimation>

          {/* Credentials */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="glass-card rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-accent-purple" />
              Credentials & Awards
            </h3>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 font-semibold">
                <Award className="w-5 h-5" />
                Google UX Certified
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 font-semibold">
                <Award className="w-5 h-5" />
                Two W3C Design Awards
              </span>
            </div>
            </div>
          </ScrollAnimation>

          {/* Contact CTA */}
          <ScrollAnimation direction="up" delay={0.5}>
            <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Let&apos;s <span className="text-white">Connect</span>
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              I&apos;d love to chat more, shoot me an email!
            </p>
            <div className="flex justify-center items-center">
              <a
                href="mailto:Brandon@bcampbelldesigns.com"
                className="relative inline-flex items-center gap-4 text-white text-base font-medium px-5 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/15 hover:border-2 transition-all"
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
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

