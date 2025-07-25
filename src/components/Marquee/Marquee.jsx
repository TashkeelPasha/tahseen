"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./Marquee.css";

const DEFAULT_TEXT = "modern creative studio";
const REPEAT_COUNT = 3; // repeat to fill loop

export default function Marquee({ children }) {
  const marqueeInnerRef = useRef(null);
  const arrowsRef = useRef([]);
  const tweenRef = useRef(null);
  const currentScroll = useRef(0);
  const isScrollingDown = useRef(true);

  // Normalize to array
  let texts = React.Children.toArray(children).filter(Boolean);
  if (texts.length === 0) texts = [DEFAULT_TEXT];

  // Repeat the parts to make it scrollable
  const repeatedParts = Array.from({ length: REPEAT_COUNT }, (_, i) =>
    texts.map((txt, j) => ({ txt, key: `${i}-${j}` }))
  ).flat();

  useEffect(() => {
    currentScroll.current = window.pageYOffset;

    // Animate the container instead of individual items
    tweenRef.current = gsap.to(marqueeInnerRef.current, {
      xPercent: -100,
      repeat: -1,
      ease: "linear",
      duration: 20,
    });

    gsap.set(marqueeInnerRef.current, { xPercent: -50 });

    const handleScroll = () => {
      const yOffset = window.pageYOffset;
      const direction = yOffset > currentScroll.current;
      isScrollingDown.current = direction;

      gsap.to(tweenRef.current, {
        timeScale: direction ? 1 : -1,
      });

      arrowsRef.current.forEach((arrow) => {
        if (!arrow) return;
        arrow.classList.toggle("active", !direction);
      });

      currentScroll.current = yOffset;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  return (
    <section className="marquee">
      <div className="marquee__inner" ref={marqueeInnerRef}>
        {repeatedParts.map(({ txt, key }, i) => (
          <div className="marquee__part" key={key}>
            {txt}
            <div className="arrow" ref={(el) => (arrowsRef.current[i] = el)}>
              <img src="/images/icons/arrow.svg" alt="arrow" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
