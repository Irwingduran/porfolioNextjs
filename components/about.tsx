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
  I began my career as a <span className="font-medium">Frontend Developer</span>, mastering <span className="font-medium">JavaScript, React, and TypeScript</span>. My journey then led me to explore <span className="font-medium">Backend</span> technologies, where I gained experience with <span className="underline">PHP, Express.js, and Django</span>. Currently, I am getting certified as an <span className="font-medium">Oracle Java Backend Developer</span>, further enhancing my <span className="font-medium">Full-Stack</span> skills. <br />
  Over the years, I've had the privilege of collaborating with <span className="italic">agencies, consulting firms, and individuals</span> on diverse projects, including those in the <span className="italic">blockchain space</span>. I believe in the power of teamwork to achieve exceptional results and am passionate about contributing to innovative projects.
  I am actively seeking a <span className="font-medium">full-time position</span> as a <span className="font-medium">Software Developer</span>, eager to bring my expertise to new challenges. <br /> Thank you for visiting my portfolio!
</p>
    </motion.section >
  );
}
