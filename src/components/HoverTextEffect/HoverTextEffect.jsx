import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./HoverTextEffect.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function HoverTextEffect({
  text = "Tahseen",
  className = "",
  delay = 3000,
  fontSize = "inherit",
}) {
  const textRef = useRef(null);
  const intervalHandles = useRef([]);
  const shufflingCounter = useRef(0);
  const loopTimeout = useRef(null);

  // Utility to wrap each letter in a span with blur
  const wrapLetters = (txt) => {
    if (!textRef.current) return;
    textRef.current.innerHTML = "";
    [...txt].forEach((letter) => {
      const span = document.createElement("span");
      span.style.filter = "blur(8px)";
      span.textContent = letter;
      textRef.current.appendChild(span);
    });
  };

  // Animate blur effect for each letter
  const animateBlurEffect = () => {
    const letters = textRef.current.children;
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
  const shuffleLetters = (finalText, onComplete) => {
    wrapLetters(finalText.replace(/./g, " "));
    let textArray = finalText.split("");
    shufflingCounter.current = 0;
    intervalHandles.current = [];
    function shuffle(index) {
      if (shufflingCounter.current < 30) {
        textArray[index] = ALPHABET[Math.floor(Math.random() * 26)];
        textRef.current.children[index].textContent = textArray[index];
      } else {
        textRef.current.children[index].textContent = finalText.charAt(index);
        clearInterval(intervalHandles.current[index]);
      }
    }
    for (let i = 0; i < finalText.length; i++) {
      intervalHandles.current[i] = setInterval(shuffle, 80, i);
    }
    setTimeout(() => {
      shufflingCounter.current = 30;
      for (let i = 0; i < finalText.length; i++) {
        textRef.current.children[i].textContent = finalText.charAt(i);
        clearInterval(intervalHandles.current[i]);
      }
      animateBlurEffect();
      if (onComplete) onComplete();
    }, 1000);
  };

  // Infinite loop effect
  useEffect(() => {
    let isMounted = true;
    function loop() {
      if (!isMounted) return;
      shuffleLetters(text.toUpperCase(), () => {
        loopTimeout.current = setTimeout(loop, delay);
      });
    }
    wrapLetters(text);
    loopTimeout.current = setTimeout(loop, delay);
    return () => {
      isMounted = false;
      intervalHandles.current.forEach((handle) => clearInterval(handle));
      if (loopTimeout.current) clearTimeout(loopTimeout.current);
    };
    // eslint-disable-next-line
  }, [text, delay]);

  return (
    <span
      className={`hover-text-effect ${className}`}
      ref={textRef}
      style={{ display: "inline-block", fontSize: fontSize }}
    />
  );
}
