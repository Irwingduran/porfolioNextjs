import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import findoctor from "@/public/findDoctor.jpg";
import prototype from "@/public/prototype.jpg"
import decredit from "@/public/decredt.jpg";
import governance from "@/public/governance.jpg";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Computer Science Engineering",
    location: "Puebla, Mx",
    description:
      "I have a background in computer science engineering.",
    icon: React.createElement(LuGraduationCap),
    date: "2020",
  },
  {
    title: "Sitios y Web | Web Developer",
    location: "Puebla, Mx",
    description:
      "I started as a front-end but this was my first approach to the back-end.",
    icon: React.createElement(CgWorkAlt),
    date: "2021 - 2022",
  },
  {
    title: "Formula 1 | Product Manager",
    location: "Puebla, Mx",
    description:
      "I was part of the team that managed the volunteer system at the GP Mexico City.",
    icon: React.createElement(CgWorkAlt),
    date: "2022",
  },
  {
    title: "BNN Mexico | Front-end",
    location: "Mexico City, Mx",
    description:
      "Mi equipo y yo logramos crear sitios y apps para compañías de todo el país, yo me encargaba del front-end.",
    icon: React.createElement(CgWorkAlt),
    date: "2022 - 2023",
  },
  {
    title: "Freelance Developer",
    location: "Mexico City, Mx",
    description:
      "I currently collaborate in projects both in interfaces and web2 and web3 applications.",
    icon: React.createElement(FaReact),
    date: "2024",
  },
  {
    title: "Oracle Backend Certificate",
    location: "Remote",
    description:
      "Completing my full-stack training.",
    icon: React.createElement(LuGraduationCap),
    date: "2024",
  },
] as const;

export const projectsData = [
  {
    title: "3D Personal Website",
    description:
      "Personal project was implementing my front-end knowledge and implementing some 3D models.",
    tags: ["React", "Next.js", "Vite.js", "Blender"],
    imageUrl: corpcommentImg,
    URL: "https://3d-website-gules.vercel.app/",
  },
  {
    title: "Findoctor",
    description:
      "It is a platform where doctors in Mexico can show the quality of their services.",
    tags: ["Javascript", "Express.js", "SQL"],
    imageUrl: findoctor,
    URL: "https://www.findoctor.com",
  },
  {
    title: "Freelance work (Prototype)",
    description:
      "Freelance developer working with agencies, consulting firms and business owners. (Is an example of a prototype).",
    tags: ["Javascript", "Node.js", "SQL", "NoSQL", "PHP", "Django"],
    imageUrl: prototype,
    URL: "https://template-test-one-henna.vercel.app/",
  },
  {
    title: "Neighborhood Governance (In Development)",
    description:
      "Constructive research to support the emergence of peer-governed & circulas emonomy-based cities.",
    tags: ["React", "Gitcoin Passport", "Smart Contracts", "NEAR B.O.S"],
    imageUrl: governance,
    URL: "https://near.org/near/widget/ComponentDetailsPage?src=irwing-dur.near/widget/homes",
  },
  {
    title: "deCreditScore (In Development)",
    description:
      "A constructive research that is testing an effective way to convert trust IRL (social data) into useful and measurable data in the chain for credit scoring.",
    tags: ["React", "Gitcoin", "Arbitrum", "Smart Contracts", "IPFS"],
    imageUrl: decredit,
    URL: "https://www.decreditscore.xyz",
  },

] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express.js",
  "Git",
  "PHP",
  "SQL",
  "Blockchain",
  "Tailwind",
  "MongoDB",
  "Prisma",
  "Python",
  "Django",
  "Framer Motion",
] as const;
