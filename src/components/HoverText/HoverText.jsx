import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./HoverText.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function HoverText({
  mainText = "CGPRO",
  subheader = "ONE SUBSCRIPTION. ENDLESS WEB DESIGNS.",
  hoverItems = [
    { text: "ideas", subheader: "top-notch web design components." },
    { text: "about", subheader: "forging ahead with elite web designs." },
    { text: "save", subheader: "take the fast lane to mastery." },
    {
      text: "contact",
      subheader: "bring your projects to life, quicker than ever.",
    },
  ],
}) {
  const containerRef = useRef(null);
  const placeholderRef = useRef(null);
  const subheaderRef = useRef(null);
  const intervalHandles = useRef([]);
  const shufflingCounter = useRef(0);

  // Utility to wrap each letter in a span with blur
  const wrapLetters = (text) => {
    if (!placeholderRef.current) return;
    placeholderRef.current.innerHTML = "";
    [...text].forEach((letter) => {
      const span = document.createElement("span");
      span.style.filter = "blur(8px)";
      span.textContent = letter;
      placeholderRef.current.appendChild(span);
    });
  };

  // Animate blur effect for each letter
  const animateBlurEffect = () => {
    const letters = placeholderRef.current.children;
    let index = 0;
    function clearNextLetter() {
      if (index < letters.length) {
        gsap.to(letters[index], { filter: "blur(0px)", duration: 0.5 });
        index++;
        if (index < letters.length) {
          setTimeout(clearNextLetter, 100);
        }
      }
    }
    setTimeout(clearNextLetter, 0);
  };

  // Shuffle animation for letters
  const shuffleLetters = (finalText) => {
    wrapLetters(finalText.replace(/./g, " "));
    let textArray = finalText.split("");
    shufflingCounter.current = 0;
    intervalHandles.current = [];
    function shuffle(index) {
      if (shufflingCounter.current < 30) {
        textArray[index] = ALPHABET[Math.floor(Math.random() * 26)];
        placeholderRef.current.children[index].textContent = textArray[index];
      } else {
        placeholderRef.current.children[index].textContent =
          finalText.charAt(index);
        clearInterval(intervalHandles.current[index]);
      }
    }
    for (let i = 0; i < finalText.length; i++) {
      intervalHandles.current[i] = setInterval(shuffle, 80, i);
    }
    setTimeout(() => {
      shufflingCounter.current = 30;
      for (let i = 0; i < finalText.length; i++) {
        placeholderRef.current.children[i].textContent = finalText.charAt(i);
        clearInterval(intervalHandles.current[i]);
      }
      animateBlurEffect();
    }, 1000);
  };

  // Animate scale
  const animateScale = (scaleValue) => {
    gsap.fromTo(
      placeholderRef.current,
      { scale: 1 },
      { scale: scaleValue, duration: 2, ease: "power1.out" }
    );
  };

  // Color change handlers
  const changeColors = () => {
    gsap.to(containerRef.current, { backgroundColor: "#000", duration: 0.5 });
    gsap.to(
      [
        placeholderRef.current,
        subheaderRef.current,
        ...containerRef.current.querySelectorAll(".hover-item"),
      ],
      { color: "#fff", duration: 0.5 }
    );
  };
  const revertColors = () => {
    gsap.to(containerRef.current, {
      backgroundColor: "#e3e3e3",
      duration: 0.5,
    });
    gsap.to(
      [
        placeholderRef.current,
        subheaderRef.current,
        ...containerRef.current.querySelectorAll(".hover-item"),
      ],
      { color: "#000", duration: 0.5 }
    );
  };

  // Handlers for hover
  const handleMouseOver = (item, idx) => {
    changeColors();
    if (subheaderRef.current)
      subheaderRef.current.textContent =
        hoverItems[idx].subheader.toUpperCase();
    animateScale(1.25);
    shuffleLetters(item.text.toUpperCase());
  };
  const handleMouseOut = () => {
    revertColors();
    if (subheaderRef.current) subheaderRef.current.textContent = subheader;
    animateScale(1.25);
    shuffleLetters(mainText);
  };

  // Initial mount
  useEffect(() => {
    if (subheaderRef.current) subheaderRef.current.textContent = subheader;
    shuffleLetters(mainText);
    // Clean up intervals on unmount
    return () => {
      intervalHandles.current.forEach((handle) => clearInterval(handle));
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="hovertext-container" ref={containerRef}>
      <nav className="hovertext-nav">
        {hoverItems.slice(0, 2).map((item, idx) => (
          <div
            className="hover-item"
            key={item.text}
            onMouseOver={() => handleMouseOver(item, idx)}
            onMouseOut={handleMouseOut}
          >
            {item.text}
          </div>
        ))}
      </nav>
      <footer className="hovertext-footer">
        {hoverItems.slice(2).map((item, idx) => (
          <div
            className="hover-item"
            key={item.text}
            onMouseOver={() => handleMouseOver(item, idx + 2)}
            onMouseOut={handleMouseOut}
          >
            {item.text}
          </div>
        ))}
      </footer>
      <div className="hovertext-header">
        <div className="placeholder" ref={placeholderRef}></div>
        <p ref={subheaderRef} className="hovertext-subheader"></p>
      </div>
    </div>
  );
}
