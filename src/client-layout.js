"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Menu from "@/components/Menu/Menu";

gsap.registerPlugin(ScrollTrigger);

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const lenisRef = useRef(null);

  // Prevent hydration mismatch by only setting mobile state on client
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 1000;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize Lenis
  useEffect(() => {
    if (!isClient) return;

    const defaultScrollSettings = {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1,
      wheelMultiplier: 1,
      orientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
    };

    const mobileScrollSettings = {
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.05,
      wheelMultiplier: 1,
      orientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
    };

    const scrollSettings = isMobile
      ? mobileScrollSettings
      : defaultScrollSettings;

    const lenis = new Lenis(scrollSettings);

    // Integrate Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [isClient, isMobile]);

  return (
    <>
      <Menu />
      {children}
    </>
  );
}
