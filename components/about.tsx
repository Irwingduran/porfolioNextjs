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
        I am a  {" "}
        <span className="font-medium">Computer Science Engineering</span> student.
        before entering the university I learned how to program in {" "}
        <span className="font-medium">Javascript</span>.{" "}I enrolled in a
        <span className="italic">programming course and learned full web development</span>
        . I have a flexible schedule that allows me to look <span className="underline">Full Time Work</span>
        . My favorite part of programming is the feeling of finally finding a solution to a problem.
        My main stack is{" "}
        <span className="font-medium">
          React, Next.js, Node.js and MongoDB
        </span>.
        I am also familiar with TypeScript. I am always looking to
        learn new technologies. I am currently looking for a{" "}
        <span className="font-medium">Full-Time</span>position as a software
        developer.
        When I'm not coding
        <span className="italic">, I enjoy playing </span>
        videogames, watching movies and playing with my dog. I also enjoy{" "}
        <span className="font-medium">take pictures</span>.
      </p>
    </motion.section>
  );
}
