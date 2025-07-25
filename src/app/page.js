"use client";
import "./home.css";
import { useState, useEffect } from "react";

import InteractiveGradient from "@/components/InteractiveGradient/InteractiveGradient";
import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";
import HoverTextEffect from "@/components/HoverTextEffect/HoverTextEffect";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if this is the first visit to the site
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowPreloader(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = showPreloader ? 6.2 : 0.9;

    if (showPreloader) {
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: "hop",
        },
      });

      const counts = document.querySelectorAll(".count");
      const progressBar = document.querySelector(".progress-bar");
      const preloaderOverlay = document.querySelector(".preloader-overlay");

      const progressTl = gsap.timeline({
        delay: 0.3,
      });

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-120%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }

        progressTl.to(
          progressBar,
          {
            scaleY: (index + 1) / counts.length,
            duration: 1,
            ease: "hop",
          },
          index * 1
        );
      });

      progressTl
        .set(progressBar, {
          transformOrigin: "top",
        })
        .to(progressBar, {
          scaleY: 0,
          duration: 0.75,
          ease: "hop",
        })
        .to(preloaderOverlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            preloaderOverlay.style.display = "none";
          },
        });
    }

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }
  }, [showPreloader]);

  return (
    <>
      {isClient && showPreloader && (
        <div className="preloader-overlay">
          <div className="progress-bar"></div>
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>2</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>6</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>8</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>9</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="hero">
        <InteractiveGradient
          color1="#1a1a1a"
          color2="#2d2d2d"
          color3="#404040"
          color4="#535353"
          brushSize={25.0}
          brushStrength={0.4}
          distortionAmount={2.0}
          fluidDecay={0.98}
          trailLength={0.85}
          stopDecay={0.88}
          colorIntensity={0.9}
          softness={0.6}
        />

        <div className="hero-content">
          <div className="hero-header">
            <div className="hero-header-col-lg"></div>
            <div className="hero-header-col-sm">
              <Copy
                animateOnScroll={false}
                delay={isClient && showPreloader ? 6.2 : 0.9}
              >
                <h3>
                  From provisioning to deployment, I build the systems your
                  product runs on.
                </h3>
              </Copy>
            </div>
          </div>

          <div className="hero-footer">
            <div className="hero-footer-col-lg">
              <Copy
                animateOnScroll={false}
                delay={isClient && showPreloader ? 6.2 : 0.9}
              >
                <p className="sm caps mono">Studios</p>
                <p className="sm caps mono">Toronto and Copenhagen</p>
              </Copy>
            </div>
            <div className="hero-footer-col-sm">
              <div className="hero-tags">
                <Copy
                  animateOnScroll={false}
                  delay={isClient && showPreloader ? 6.2 : 0.9}
                >
                  <ul className="hero-tags-list">
                    <li>
                      <HoverTextEffect text="DevOps" className="sm caps mono" />
                    </li>
                    <li>
                      <HoverTextEffect text="CI/CD" className="sm caps mono" />
                    </li>
                    <li>
                      <HoverTextEffect
                        text="Kubernetes"
                        className="sm caps mono"
                      />
                    </li>
                    <li>
                      <HoverTextEffect text="Docker" className="sm caps mono" />
                    </li>
                    <li>
                      <HoverTextEffect
                        text="Terraform"
                        className="sm caps mono"
                      />
                    </li>
                  </ul>
                </Copy>
              </div>

              <div className="hero-link">
                <BtnLink route="/contact" label="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
