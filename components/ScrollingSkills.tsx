"use client";

interface ScrollingSkillsProps {
  skills: string[];
  speed?: number;
}

export default function ScrollingSkills({ 
  skills, 
  speed = 30 
}: ScrollingSkillsProps) {
  // Duplicate skills array for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section className="relative py-8 md:py-12 overflow-hidden bg-dark-primary border-b border-white/25">
      <div className="relative">
        {/* Gradient overlays for fade effect - now using the gradient colors */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#121212] via-[#121212] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#121212] via-[#121212] to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling container */}
        <div className="flex overflow-hidden">
          <div 
            className="flex gap-8 md:gap-12 lg:gap-16 animate-scroll"
            style={{
              animationDuration: `${speed}s`,
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill}-${index}`}
                className="flex-shrink-0 flex items-center"
              >
                <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-300 whitespace-nowrap hover:text-white transition-colors">
                  {skill}
                </span>
                {index < duplicatedSkills.length - 1 && (
                  <span className="mx-4 md:mx-6 text-gray-500 text-xl">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

