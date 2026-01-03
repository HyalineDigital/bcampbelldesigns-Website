"use client";
import React, { useState, useEffect } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

type HoverBorderGradientProps = {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
} & React.HTMLAttributes<HTMLElement> & 
  Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>> &
  Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<HoverBorderGradientProps>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  // Use Framer Motion for smooth hue animation - purple to silver tones
  const hueMotion = useMotionValue(270);
  const hueSpring = useSpring(hueMotion, {
    stiffness: 30,
    damping: 25,
  });

  // Animate hue continuously between purple (270) and silver (300)
  useEffect(() => {
    const animateHue = () => {
      hueMotion.set(300);
      setTimeout(() => {
        hueMotion.set(270);
      }, 2000);
    };
    animateHue();
    const interval = setInterval(animateHue, 4000);
    return () => clearInterval(interval);
  }, [hueMotion]);

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  // Generate chrome/metallic gradient with purple to silver tones
  const getChromeGradient = (dir: Direction, baseHue: number): string => {
    // Hue is already in 270-300 range (purple to purple-silver)
    const normalizedHue = baseHue;
    
    // Calculate saturation: high for purple (270), lower as we approach silver (300)
    // At 270: saturation ~30%, at 300: saturation ~8% (silver)
    const hueProgress = (normalizedHue - 270) / 30; // 0 to 1 as hue goes from 270 to 300
    const saturation = 30 - (hueProgress * 22); // 30% to 8%
    const lightness = 50 - (hueProgress * 3); // 50% to 47% (darker)
    
    // Chrome effect: bright highlight, darker shadow, metallic mid-tone
    const highlightHue = normalizedHue;
    const midHue = normalizedHue + 5;
    const shadowHue = normalizedHue + 10;
    
    // Create metallic chrome colors with highlight/shadow variation (darker and less prominent)
    const color1 = `hsl(${highlightHue}, ${Math.min(40, saturation + 5)}%, ${Math.min(55, lightness + 5)}%)`; // Subtle highlight
    const color2 = `hsl(${midHue}, ${saturation}%, ${lightness}%)`; // Mid-tone
    const color3 = `hsl(${shadowHue}, ${Math.max(0, saturation - 5)}%, ${Math.max(35, lightness - 10)}%)`; // Shadow
    const color4 = `hsl(${highlightHue}, ${saturation * 0.6}%, ${Math.max(30, lightness - 8)}%)`; // Darker edge
    
    switch (dir) {
      case "TOP":
        return `radial-gradient(20.7% 50% at 50% 0%, ${color1} 0%, ${color2} 25%, ${color3} 50%, ${color4} 75%, rgba(255, 255, 255, 0) 100%)`;
      case "LEFT":
        return `radial-gradient(16.6% 43.1% at 0% 50%, ${color1} 0%, ${color2} 25%, ${color3} 50%, ${color4} 75%, rgba(255, 255, 255, 0) 100%)`;
      case "BOTTOM":
        return `radial-gradient(20.7% 50% at 50% 100%, ${color1} 0%, ${color2} 25%, ${color3} 50%, ${color4} 75%, rgba(255, 255, 255, 0) 100%)`;
      case "RIGHT":
        return `radial-gradient(16.2% 41.199999999999996% at 100% 50%, ${color1} 0%, ${color2} 25%, ${color3} 50%, ${color4} 75%, rgba(255, 255, 255, 0) 100%)`;
    }
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, hsl(270, 25%, 50%) 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  // Transform hue to gradient using Framer Motion for smooth updates
  const currentHue = useTransform(hueSpring, (value) => Math.max(270, Math.min(300, value)));
  
  // Create a motion value for the gradient that updates with both hue and direction
  const [gradientState, setGradientState] = useState<string>(getChromeGradient(direction, 270));
  const gradientMotion = useMotionValue(gradientState);
  
  // Update gradient when hue or direction changes
  useEffect(() => {
    const unsubscribe = currentHue.on("change", (h) => {
      gradientMotion.set(getChromeGradient(direction, h));
    });
    return unsubscribe;
  }, [direction, currentHue, gradientMotion]);
  
  // Also update when direction changes
  useEffect(() => {
    const currentHueValue = currentHue.get();
    gradientMotion.set(getChromeGradient(direction, currentHueValue));
  }, [direction, currentHue, gradientMotion]);
  
  const gradient = gradientMotion;
  return (
    <Tag
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border-[1px] content-center bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 hover:from-gray-800/50 hover:via-gray-700/40 hover:to-gray-800/50 transition-all duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-[1px] decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto z-10 px-4 py-2 rounded-[inherit] transition-colors relative",
          !className?.includes("bg-") && "bg-gradient-to-b from-gray-900 to-black text-white",
          className
        )}
      >
        {/* Chrome shine overlay */}
        <div 
          className="absolute inset-0 rounded-[inherit] opacity-30 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(0.5px)",
          position: "absolute",
          width: "100%",
          height: "100%",
          boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.1)",
          background: hovered ? highlight : gradient,
        }}
      />
      <div className="bg-gradient-to-b from-gray-900 to-black absolute z-1 flex-none inset-[1px] rounded-[100px]" />
    </Tag>
  );
}
