"use client";

import { Mail, FileText } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import ShaderBackground from "@/components/ShaderBackground";

export default function ContactPage() {
  return (
    <section className="h-screen flex relative" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
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
      
      {/* Content Container - Centered */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-8 lg:px-12 relative flex-1 flex items-center justify-center z-20">
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Let&apos;s <span className="text-white">Connect</span>
            </h2>
            <p className="text-white text-lg mb-8">
              I&apos;d love to chat more, shoot me an email!
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <button
                onClick={() => {
                  const parts = ['brandon', '@', 'bcampbelldesigns', '.', 'com'];
                  const email = parts.join('');
                  window.location.href = `mailto:${email}`;
                }}
                className="relative inline-flex items-center gap-4 text-white text-base font-medium px-5 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/15 hover:border-2 transition-all cursor-pointer"
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
              </button>
              <a
                href="/Brandon-Campbell-UX-Product-Designer-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
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
                <FileText className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View Resume</span>
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

