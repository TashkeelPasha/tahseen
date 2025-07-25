"use client";
import "./RotatingSkills.css";

const RotatingSkills = ({ skills = [] }) => {
  // Default skills if none provided
  const defaultSkills = [
    {
      name: "React",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
    },
    {
      name: "Next.js",
      icon: "https://www.openxcell.com/wp-content/uploads/2021/11/dango-inner-2.png",
    },
    {
      name: "JavaScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    },
    {
      name: "TypeScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    },
    {
      name: "PHP",
      icon: "https://cdn.freebiesupply.com/logos/large/2x/php-1-logo-png-transparent.png",
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
  ];

  const skillsToUse = skills.length > 0 ? skills : defaultSkills;

  return (
    <div className="circle-wrapper">
      <div className="circle">
        {skillsToUse.map((skill, index) => (
          <div
            key={index}
            className="icon"
            style={{ "--i": index }}
            title={skill.name}
          >
            <img src={skill.icon} alt={skill.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingSkills;
