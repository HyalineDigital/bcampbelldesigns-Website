"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, MapPin, Mail } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function AboutPage() {
  return (
    <section className="pt-32 pb-12 px-4 md:px-8 lg:px-12 relative min-h-screen" style={{ '--border-color': 'rgba(255, 255, 255, 0.3)' } as React.CSSProperties}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">About</span>
              <span className="text-white"> Me</span>
            </h1>
          </div>
        </ScrollAnimation>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Photos */}
          <ScrollAnimation direction="up" delay={0.15}>
            <div className="flex gap-4 md:gap-6 justify-center mb-8 flex-wrap">
              <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden glass-card">
                <Image
                  src="/images/about/01fd1c5f-8f9f-4e64-b084-f64d7fc3c8fe+%281%29.jpg"
                  alt="About me"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden glass-card">
                <Image
                  src="/images/about/52880687_580982229046485_7256658438447431680_n.jpg"
                  alt="About me"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden glass-card">
                <Image
                  src="/images/about/70420256_700047023806671_5600968934049185792_n.jpg"
                  alt="About me"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollAnimation>

          {/* Introduction */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="glass-card rounded-2xl p-8 md:p-12">
            <p className="text-lg md:text-xl leading-relaxed text-white mb-6">
              Senior Product & UX Designer with 10+ years of experience specializing in high-scale digital products across iGaming, esports, and SaaS. I have a proven track record of architecting scalable design systems and intuitive user journeys for platforms serving over 10 million monthly active users (MAU).
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-white mb-6">
              My expertise lies at the intersection of data-driven research and business growth. I successfully led the creation of multiple product features at Caesars Palace Online, helping propel the brand from #8 to a Top 3 industry ranking while also driving a 30%+ increase in First-Time Deposits (FTD) through optimized registration funnels.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-white">
              As a DGE-licensed professional, I am adept at navigating complex regulatory environments to deliver polished, compliant interfaces without compromising on performance or engagement. I am a systems thinker who has built 20+ comprehensive design libraries in Figma, focused on reducing development friction and ensuring cross-platform consistency in fast-paced Agile/Scrum environments.
            </p>
            </div>
          </ScrollAnimation>

          {/* Location & Personal */}
          <ScrollAnimation direction="up" delay={0.3}>
            <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-white" />
                  Location
                </h3>
                <p className="text-white text-lg">
                  Currently based in{" "}
                  <span className="text-white font-semibold">
                    Reno, Nevada
                  </span>
                  .
                </p>
              </div>
              <div className="pt-6 border-t border-white/20">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Beyond Design
                </h3>
                <p className="text-white text-lg leading-relaxed">
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
              <Award className="w-6 h-6 text-white" />
              Credentials & Awards
            </h3>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white font-semibold">
                <Award className="w-5 h-5" />
                Google UX Certified
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white font-semibold">
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
            <p className="text-white text-lg mb-8">
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

