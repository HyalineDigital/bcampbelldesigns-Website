"use client";

import { Mail, FileText } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function ContactPage() {
  return (
    <section className="pt-32 pb-12 px-4 md:px-8 lg:px-12 relative min-h-screen" style={{ '--border-color': 'rgba(255, 255, 255, 0.15)' } as React.CSSProperties}>
      <div className="max-w-4xl mx-auto">
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

