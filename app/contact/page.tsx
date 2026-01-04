"use client";

import { Mail, FileText } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function ContactPage() {
  return (
    <section className="pt-32 pb-12 md:py-16 px-4 md:px-8 lg:px-12 relative min-h-screen">
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
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <button
              onClick={() => {
                const parts = ['brandon', '@', 'bcampbelldesigns', '.', 'com'];
                const email = parts.join('');
                window.location.href = `mailto:${email}`;
              }}
              className="relative inline-flex items-center gap-4 text-white text-base font-medium px-5 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/5 hover:border-2 transition-all cursor-pointer"
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
              <FileText className="w-5 h-5 relative z-10" />
              <span className="relative z-10">View Resume</span>
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

