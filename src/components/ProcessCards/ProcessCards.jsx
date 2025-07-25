"use client";
import "./ProcessCards.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingSkills from "@/components/RotatingSkills/RotatingSkills";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ProcessCards = () => {
  const processCardsData = [
    {
      index: "01",
      title: "Principles",
      skills: [
        {
          name: "React",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
        },
        {
          name: "Next.js",
          icon: "https://www.openxcell.com/wp-content/uploads/2021/11/dango-inner-2.png",
        },
        {
          name: "TypeScript",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
        },
        {
          name: "JavaScript",
          icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        },
        {
          name: "HTML5",
          icon: "https://icon2.cleanpng.com/20190125/hxp/kisspng-computer-icons-html5-scalable-vector-graphics-port-socialpack-chocolate-icon-5c4b3bbc625d12.0297681315484343644029.jpg",
        },
        {
          name: "CSS3",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/1024px-CSS3_logo.svg.png",
        },
        {
          name: "Tailwind",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png",
        },
        {
          name: "GSAP",
          icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
        },
      ],
      description:
        "We design with restraint and intention. Every decision is shaped by a set of values—clarity, structure, and calm execution.",
    },
    {
      index: "02",
      title: "Approach",
      skills: [
        {
          name: "Node.js",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png",
        },
        {
          name: "Express",
          icon: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
        },
        {
          name: "MongoDB",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png",
        },
        {
          name: "PostgreSQL",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png",
        },
        {
          name: "Redis",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Logo-redis.svg/2560px-Logo-redis.svg.png",
        },
        {
          name: "Docker",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_Logo.svg/2560px-Docker_Logo.svg.png",
        },
        {
          name: "AWS",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png",
        },
        {
          name: "Vercel",
          icon: "https://assets.vercel.com/image/upload/q_auto/front/assets/design/vercel-triangle-black.svg",
        },
      ],
      description:
        "Our process is iterative and deliberate. We prioritize simplicity over excess, and build systems that scale with clarity.",
    },
    {
      index: "03",
      title: "Practice",
      skills: [
        {
          name: "Figma",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png",
        },
        {
          name: "Adobe XD",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/2101px-Adobe_XD_CC_icon.svg.png",
        },
        {
          name: "Sketch",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sketch_Logo.svg/2560px-Sketch_Logo.svg.png",
        },
        {
          name: "InVision",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/InVision_logo.svg/2560px-InVision_logo.svg.png",
        },
        {
          name: "Principle",
          icon: "https://principleformac.com/images/icon.png",
        },
        {
          name: "Framer",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Framer_Logo.svg/2560px-Framer_Logo.svg.png",
        },
        {
          name: "Webflow",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Webflow_logo.svg/2560px-Webflow_logo.svg.png",
        },
        {
          name: "Notion",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Notion_app_logo.png/2048px-Notion_app_logo.png",
        },
      ],
      description:
        "We work at the intersection of design and code. Every detail is shaped by consistency, rhythm, and quiet precision.",
    },
    {
      index: "04",
      title: "Vision",
      skills: [
        {
          name: "Git",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1280px-Git-logo.svg.png",
        },
        {
          name: "GitHub",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png",
        },
        {
          name: "Jira",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Jira_Software_%282019%29.svg/2560px-Jira_Software_%282019%29.svg.png",
        },
        {
          name: "Slack",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png",
        },
        {
          name: "Trello",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Trello_logo.svg/2560px-Trello_logo.svg.png",
        },
        {
          name: "Linear",
          icon: "https://linear.app/favicon/favicon-196x196.png",
        },
        {
          name: "Discord",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Discord_logo.svg/2560px-Discord_logo.svg.png",
        },
        {
          name: "Zoom",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Zoom_logo.svg/2560px-Zoom_logo.svg.png",
        },
      ],
      description:
        "We believe the web should feel honest and effortless. Our aim is to create digital experiences that stand the test of time.",
    },
  ];

  // Refs for each rotating skills
  const skillsRefs = useRef([]);

  useGSAP(() => {
    const processCards = document.querySelectorAll(".process-card");
    processCards.forEach((card, i) => {
      card.style.zIndex = i + 1; // base stacking order
    });
    processCards.forEach((card, index) => {
      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: processCards[processCards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          id: `card-pin-${index}`,
          onEnter: () => {
            card.style.zIndex = processCards.length + 10; // bring to top
          },
          onLeave: () => {
            card.style.zIndex = index + 1; // restore base order
          },
          onEnterBack: () => {
            card.style.zIndex = processCards.length + 10;
          },
          onLeaveBack: () => {
            card.style.zIndex = index + 1;
          },
        });
      }
      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: processCards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.25;
            const rotation = (index % 2 === 0 ? 5 : -5) * progress;
            const afterOpacity = progress;
            gsap.set(card, {
              scale: scale,
              rotation: rotation,
              "--after-opacity": afterOpacity,
            });
            if (skillsRefs.current[index]) {
              gsap.to(skillsRefs.current[index], {
                y: progress * 60,
                scale: 1 + progress * 0.15,
                rotate: progress * 40,
                duration: 0.2,
                overwrite: true,
              });
            }
          },
        });
      }
    });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="process-cards">
      {processCardsData.map((cardData, index) => (
        <div key={index} className="process-card">
          <div className="process-card-index">
            <h1>{cardData.index}</h1>
          </div>
          <div className="process-card-content new-layout">
            {/* Heading at the top, full width */}
            <div className="process-card-heading">
              <h1 className="process-card-header">{cardData.title}</h1>
            </div>
            {/* Row with yellow (left) and green (right) blocks */}
            <div className="process-card-block-row">
              <div className="process-card-block process-card-block-yellow">
                <div className="process-card-copy-title">
                  <p className="caps">(About the state)</p>
                </div>
                <div className="process-card-copy-description">
                  <p>{cardData.description}</p>
                </div>
              </div>
              <div className="process-card-block process-card-block-green">
                <div ref={(el) => (skillsRefs.current[index] = el)}>
                  <RotatingSkills skills={cardData.skills} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessCards;
