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
        <span className="font-medium">web developer based in Mexico</span>.
        Currently focused on being a  {" "}
        <span className="font-medium">full-stack </span>developer.{" "}My beginnings in web development
        started as a frontend developer where I learned <span className="underline">React, Next.js and Typescript</span>.
        Later I got involved in web applications where I worked with
        <span className="underline">Node.js, MongoDB, SQL and sometimes PHP</span>.
        My passion for creating drives me to engage in immersive and captivating digital experiences that leave
        a lasting impression and use.{" "}
        <span className="italic">In addition to my passion for technology</span>,
        I strive for collaboration and effective communication. I believe in the importance
        of working as a team to achieve exceptional results. I'm excited for the {" "}
        <span className="font-medium">opportunity
          to contribute to innovative projects and continue to grow as a professional in this
          exciting world of web development.</span>
        <span className="italic">Thanks for visiting my portfolio!</span> <br />
        If you have any questions or if there's anything I can help you with, don't hesitate to get in touch!
      </p>
    </motion.section >
  );
}
