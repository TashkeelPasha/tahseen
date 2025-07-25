"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero3D.css";

gsap.registerPlugin(ScrollTrigger);

const cubesData = {
  "cube-1": {
    initial: {
      top: 20,
      left: 20,
      rotateX: 360,
      rotateY: -360,
      rotateZ: -48,
      z: -30000,
      opacity: 0,
    },
    final: {
      top: 35,
      left: 25,
      rotateX: 0,
      rotateY: 3,
      rotateZ: 0,
      z: 0,
      opacity: 1,
    },
    delay: 0.1,
  },
  "cube-2": {
    initial: {
      top: 20,
      left: 40,
      rotateX: -360,
      rotateY: 360,
      rotateZ: 90,
      z: -30000,
      opacity: 0,
    },
    final: {
      top: 60,
      left: 35,
      rotateX: 1,
      rotateY: 2,
      rotateZ: 0,
      z: 0,
      opacity: 1,
    },
    delay: 0.2,
  },
  "cube-3": {
    initial: {
      top: 20,
      left: 60,
      rotateX: -360,
      rotateY: -360,
      rotateZ: -180,
      z: -30000,
      opacity: 0,
    },
    final: {
      top: 40,
      left: 45,
      rotateX: -1,
      rotateY: 2,
      rotateZ: 0,
      z: 0,
      opacity: 1,
    },
    delay: 0.3,
  },
  "cube-4": {
    initial: {
      top: 20,
      left: 80,
      rotateX: -360,
      rotateY: -360,
      rotateZ: -180,
      z: -30000,
      opacity: 0,
    },
    final: {
      top: 70,
      left: 55,
      rotateX: 1,
      rotateY: -2,
      rotateZ: 0,
      z: 0,
      opacity: 1,
    },
    delay: 0.4,
  },
  "cube-5": {
    initial: {
      top: 20,
      left: 100,
      rotateX: 360,
      rotateY: 360,
      rotateZ: -135,
      z: -30000,
      opacity: 0,
    },
    final: {
      top: 80,
      left: 65,
      rotateX: -1,
      rotateY: -2,
      rotateZ: 0,
      z: 0,
      opacity: 1,
    },
    delay: 0.5,
  },
  "cube-6": {
    initial: {
      top: 20,
      left: 120,
      rotateX: -180,
      rotateY: -360,
      rotateZ: -180,
      z: -30000,
      opacity: 0,
    },
    final: {
      top: 50,
      left: 75,
      rotateX: 0,
      rotateY: -3,
      rotateZ: 0,
      z: 0,
      opacity: 1,
    },
    delay: 0.6,
  },
};

const cubeImages = [
  "/images/archive/img1.jpeg",
  "/images/archive/img2.jpeg",
  "/images/who-we-are/team-1.jpg",
  "/images/archive/img4.jpeg",
  "/images/archive/img5.jpeg",
  "/images/archive/img6.jpeg",
];

function interpolate(start, end, progress) {
  return start + (end - start) * progress;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const Hero3D = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const cubesRef = useRef([]);
  const setCubeRef = (el, i) => {
    if (el) {
      cubesRef.current[i] = el;
    }
  };
  const header1Ref = useRef(null);
  const header2Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const header1 = header1Ref.current;
    const header2 = header2Ref.current;

    if (!container || !logo || !header1 || !header2) {
      console.warn("Hero3D: Some required elements are missing");
      return;
    }

    // Set initial cube positions immediately to prevent (0,0) flash
    Object.entries(cubesData).forEach(([cubeClass, data], i) => {
      const cube = cubesRef.current[i];
      if (cube) {
        const { initial } = data;
        cube.style.top = `${initial.top}%`;
        cube.style.left = `${initial.left}%`;
        cube.style.opacity = initial.opacity;
        cube.style.transform = `
          translate3d(-50%, -50%, ${initial.z}px)
          rotateX(${initial.rotateX}deg)
          rotateY(${initial.rotateY}deg)
          rotateZ(${initial.rotateZ}deg)
        `;
      }
    });

    // Enhanced scroll-based animation with more height
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        try {
          const progress = self.progress;
          const easedProgress = easeInOutCubic(progress);

          // Enhanced logo effects with smoother transitions
          const logoBlur = Math.min(progress * 12, 18);
          const logoScale = 1 - progress * 0.08;
          logo.style.filter = `blur(${logoBlur}px)`;
          logo.style.opacity = 1 - progress * 0.6;
          logo.style.transform = `translate(-50%, -50%) scale(${logoScale})`;

          // Enhanced header 1 effects with better timing
          const header1Progress = Math.min(progress * 2.5, 1);
          const header1Scale = 1 + header1Progress * 0.35;
          const header1Blur = Math.min(header1Progress * 18, 22);
          header1.style.transform = `translate(-50%, -50%) scale(${header1Scale})`;
          header1.style.filter = `blur(${header1Blur}px)`;
          header1.style.opacity = 1 - header1Progress * 0.85;

          // Enhanced header 2 effects with smoother fade-in
          const header2StartProgress = Math.max(0, (progress - 0.2) * 2.2);
          const header2Progress = Math.min(header2StartProgress, 1);
          const header2Scale = 0.7 + header2Progress * 0.3;
          const header2Blur = 12 - header2Progress * 12;
          header2.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
          header2.style.filter = `blur(${header2Blur}px)`;
          header2.style.opacity = header2Progress;

          // Enhanced cube animations with staggered timing and opacity
          Object.entries(cubesData).forEach(([cubeClass, data], i) => {
            const cube = cubesRef.current[i];
            if (!cube) return;

            const { initial, final, delay } = data;
            const cubeProgress = Math.max(
              0,
              Math.min((progress - delay) * 2.5, 1)
            );
            const easedCubeProgress = easeInOutCubic(cubeProgress);

            const currentTop = interpolate(
              initial.top,
              final.top,
              easedCubeProgress
            );
            const currentLeft = interpolate(
              initial.left,
              final.left,
              easedCubeProgress
            );
            const currentRotateX = interpolate(
              initial.rotateX,
              final.rotateX,
              easedCubeProgress
            );
            const currentRotateY = interpolate(
              initial.rotateY,
              final.rotateY,
              easedCubeProgress
            );
            const currentRotateZ = interpolate(
              initial.rotateZ,
              final.rotateZ,
              easedCubeProgress
            );
            const currentZ = interpolate(initial.z, final.z, easedCubeProgress);
            const currentOpacity = interpolate(
              initial.opacity,
              final.opacity,
              easedCubeProgress
            );

            // Enhanced floating animation with more subtle movement
            const floatOffset =
              Math.sin(progress * Math.PI * 1.5 + i * 0.5) * 1.5;

            cube.style.top = `${currentTop + floatOffset}%`;
            cube.style.left = `${currentLeft}%`;
            cube.style.opacity = currentOpacity;
            cube.style.transform = `
              translate3d(-50%, -50%, ${currentZ}px)
              rotateX(${currentRotateX}deg)
              rotateY(${currentRotateY}deg)
              rotateZ(${currentRotateZ}deg)
            `;
          });
        } catch (error) {
          console.error("Hero3D animation error:", error);
        }
      },
    });

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section className="hero3d-studio" ref={containerRef}>
      {/* New Logo Design - Geometric Pattern */}
      <div className="logo" ref={logoRef}>
        <div className="logo-container">
          <div className="logo-circle"></div>
          <div className="logo-square"></div>
          <div className="logo-triangle"></div>
          <div className="logo-diamond"></div>
          <div className="logo-line"></div>
        </div>
      </div>

      <div className="cubes">
        {[...Array(6)].map((_, i) => (
          <div
            className={`cube cube-${i + 1}`}
            key={i}
            ref={(el) => setCubeRef(el, i)}
          >
            {[...Array(2)].map((_, j) => (
              <div key={j} className={["front", "back"][j]}>
                <img src={cubeImages[i % cubeImages.length]} alt="cube face" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="header-1" ref={header1Ref}>
        <h1>
          Infrastructure, automation, and backend logic — designed for
          reliability at scale.
        </h1>
      </div>

      <div className="header-2" ref={header2Ref}>
        <h2>Where innovation meets precision.</h2>
        <p>
          I specialize in infrastructure, automation, and backend systems built
          for reliability at scale. From provisioning servers to setting up
          CI/CD pipelines and container orchestration, I focus on creating
          systems that are efficient, resilient, and ready for growth. My goal
          is to simplify complexity and empower teams to ship confidently.
        </p>
      </div>
    </section>
  );
};

export default Hero3D;
