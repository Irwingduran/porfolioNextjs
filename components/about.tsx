"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I'm a creative{" "}
        <span className="font-medium">Web Developer</span> from <span className="font-medium">Mexico City</span>.
        I started as a <span className="font-medium">Frontend</span> developer where I learned <span className="font-medium">Javascript: </span>
        <span className="underline">React and Typescript</span>. Later I got involved in web applications where I worked with <span className="font-medium">Backend</span> technologies:
        <span className="underline"> PHP, Express.js and Django</span>.
        Currently getting certified as an  {" "} <span className="font-medium">Oracle Backend </span>for my{" "}
        <span className="font-medium">Full Stack </span> training.
        I now collaborate with {" "}
        <span className="italic">agencies, consulting firms, projects and people from all over the world</span>.
        I believe in the importance of working as a team to achieve exceptional results. I'm excited for the {" "}
        <span className="font-medium">opportunity
          to contribute to innovative projects and continue to grow as a professional in this
          exciting world of web development. </span>
        If you have any questions or if there's anything I can help you with, don't hesitate to get in touch. <br />
        <span className="italic">Thanks for visiting my portfolio!</span>
      </p>
    </motion.section >
  );
}
