"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./work.css";
import HoverTextEffect from "@/components/HoverTextEffect/HoverTextEffect";
import { portfolio } from "./portfolio";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import { useTransitionRouter } from "next-view-transitions";
import { useGSAP } from "@gsap/react";
import { skillsData } from "./portfolio";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const workRef = useRef(null);
  const router = useTransitionRouter();

  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0.2, transform: "translateY(-30%) scale(0.90)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  useGSAP(
    () => {
      const workProjects = workRef.current.querySelectorAll(".work-project");
      gsap.set(workProjects, { y: 100, opacity: 0 });
      gsap.to(workProjects, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: workRef }
  );

  return (
    <>
      <div className="work" ref={workRef}>
        <div className="work-sidebar"></div>

        <div className="work-main">
          <div className="work-year">
            <Copy>
              <HoverTextEffect text="EXPERIENCE" fontSize="8vw" />
            </Copy>
          </div>

          {portfolio.map((yearData, yearIndex) => (
            <div key={yearIndex} className="work-container">
              <div className="work-projects-container">
                {yearData.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className="work-project"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="work-project-img">
                      <img src={project.img} alt={project.name} />
                    </div>
                    <div className="work-project-info">
                      <p className="sm work-project-info-name">
                        {project.name}
                      </p>
                      <p className="sm work-project-info-tags">
                        {project.tags}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {skillsData.map((skill, index) => (
        <section key={index} className="sp-copy">
          <div className="sp-copy-wrapper">
            <div className="sp-col-lg">
              <div className="sp-copy-title">
                <Copy>
                  <h3>{skill.company}</h3>
                </Copy>
              </div>
              <div className="img-placeholder">
                <img
                  src={skill.image}
                  alt={skill.title}
                  style={{
                    top: "50%",
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="sp-col-sm">
              <div className="sp-copy-description">
                <Copy>
                  <h3>{skill.title}</h3>
                </Copy>
                <Copy>
                  {skill.description.map((paragraph, pIndex) => (
                    <React.Fragment key={pIndex}>
                      <p className="skill-description">{paragraph}</p>
                    </React.Fragment>
                  ))}
                </Copy>
              </div>
            </div>
          </div>
        </section>
      ))}
      <Footer />
    </>
  );
};

export default page;
