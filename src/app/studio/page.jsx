"use client";
import "./studio.css";
import { useRef } from "react";

import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";
import WhoAmI from "@/components/WhoAmI/WhoAmI";
import ProcessCards from "@/components/ProcessCards/ProcessCards";
import Footer from "@/components/Footer/Footer";
import Hero3D from "@/components/Hero3D/Hero3D";
import Marquee from "@/components/Marquee/Marquee";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const page = () => {
  const studioRef = useRef(null);

  useGSAP(() => {
    if (!studioRef.current) return;

    const studioHeroH1 = studioRef.current.querySelector(".studio-hero h1");
    const studioHeroImgWrapper = studioRef.current.querySelector(
      ".studio-hero-img-wrapper"
    );
    const missionLinkWrapper = studioRef.current.querySelector(".mission-link");

    if (studioHeroH1) {
      const split = SplitText.create(studioHeroH1, {
        type: "chars",
        charsClass: "char++",
      });

      split.chars.forEach((char) => {
        const wrapper = document.createElement("span");
        wrapper.className = "char-mask";
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
        char.parentNode.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      });

      gsap.set(split.chars, { y: "100%" });

      gsap.to(split.chars, {
        y: "0%",
        duration: 0.8,
        stagger: 0.2,
        delay: 0.85,
        ease: "power3.out",
      });
    }

    if (studioHeroImgWrapper) {
      gsap.set(studioHeroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(studioHeroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });
    }

    if (missionLinkWrapper) {
      gsap.set(missionLinkWrapper, { y: 30, opacity: 0 });

      ScrollTrigger.create({
        trigger: missionLinkWrapper.closest(".mission-intro-copy"),
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(missionLinkWrapper, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
          });
        },
      });
    }
  });

  return (
    <>
      <div className="studio" ref={studioRef}>
        <Hero3D />
        {/* Studio header section follows independently */}
        <section className="studio-header">
          <div className="studio-header-copy">
            <Copy>
              <h2>
                I’m not just building backends — I’m wiring up the entire
                machine. From APIs to automation, UIs to uptime, I care about
                the whole system working as one. Some days it’s cloud configs
                and CI pipelines, other days it's Flutter views or Shopify
                flows. I’m here to simplify the chaos and make things actually
                work — fast, clean, and scalable.
              </h2>
            </Copy>
          </div>
        </section>
        <WhoAmI />

        <section className="mission-intro">
          <div className="mission-intro-col-sm"></div>
          <div className="mission-intro-col-lg">
            <div className="mission-intro-copy">
              <Copy>
                <h3>
                  I’m Tahseen, an Infrastructure Engineer with 8+ years of
                  hands-on experience building, deploying, and scaling web
                  platforms end-to-end. Whether it’s spinning up LAMP/LEMP
                  stacks, automating with Terraform and Jenkins, or managing
                  servers with Plesk—I ensure performance and reliability stay
                  at the core.
                </h3>
                <br />
                <h3>
                  From WordPress and Shopify builds to full-stack applications
                  with Node, Express, React, and Next.js, I thrive in ecosystems
                  where cloud, code, and containers intersect. I work across
                  AWS, DigitalOcean, and Linode, tying it all together with
                  CI/CD, monitoring (Grafana), and GitOps pipelines that keep
                  products ship-ready.
                </h3>
              </Copy>

              <div className="mission-link">
                <BtnLink route="/work" label="View Work" dark />
              </div>
            </div>
          </div>
        </section>
        <Marquee>
          {"Engineer by Mind"}
          {"Builder by Habit"}
          {"Obsessed with Uptime"}
        </Marquee>

        <ProcessCards />

        <section className="recognition">
          <div className="recognition-copy">
            <Copy>
              <p className="sm caps">(Recognition)</p>
              <br />
              <h2>
                Our work has been recognized by digital platforms and design
                communities for its clarity, consistency, and attention to
                detail. We focus on building systems that go beyond visuals
                experiences.
              </h2>
            </Copy>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default page;
