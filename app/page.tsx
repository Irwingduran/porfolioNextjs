"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Users,
  Zap,
  Rocket,
  Brain,
  Target,
  Trophy,
  Star,
  Play,
  Pause,
  SkipForward,
  SkipBack,
} from "lucide-react"

export default function RevolutionaryPortfolio() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [completedChapters, setCompletedChapters] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])
  const [achievements, setAchievements] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (!isMobile) {
        cursorTrailRef.current.forEach((trail, index) => {
          if (trail) {
            setTimeout(() => {
              trail.style.left = `${e.clientX - 10}px`
              trail.style.top = `${e.clientY - 10}px`
              trail.style.opacity = `${0.8 - index * 0.1}`
            }, index * 50)
          }
        })

        if (Math.random() < 0.1) {
          const newParticle = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
          }
          setParticles((prev) => [...prev.slice(-20), newParticle])
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
          }))
          .filter((particle) => Math.abs(particle.vx) > 0.1 || Math.abs(particle.vy) > 0.1),
      )
    }

    const interval = setInterval(animateParticles, 16)
    return () => clearInterval(interval)
  }, [])

  const chapters = [
    {
      id: "genesis",
      title: "The Genesis",
      subtitle: "Where Innovation Begins",
      description: "Every revolutionary journey starts with a single line of code...",
      icon: <Zap className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-emerald-500 to-teal-600",
      achievement: "Explorer",
    },
    {
      id: "projects",
      title: "Digital Realms",
      subtitle: "Crafted Experiences",
      description: "Step into the worlds I've built, each one a story of innovation",
      icon: <Rocket className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-teal-500 to-cyan-600",
      achievement: "Builder",
    },
    {
      id: "hackathons",
      title: "Battle Arena",
      subtitle: "Victory Chronicles",
      description: "Where ideas clash and innovation emerges victorious",
      icon: <Trophy className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-cyan-500 to-blue-600",
      achievement: "Champion",
    },
    {
      id: "workshops",
      title: "Knowledge Nexus",
      subtitle: "Sharing Wisdom",
      description: "Empowering others to build the future they envision",
      icon: <Brain className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-blue-500 to-indigo-600",
      achievement: "Mentor",
    },
    {
      id: "about",
      title: "The Architect",
      subtitle: "Beyond the Code",
      description: "Discover the mind behind the innovation",
      icon: <Target className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-indigo-500 to-purple-600",
      achievement: "Visionary",
    },
    {
      id: "contact",
      title: "The Collaboration",
      subtitle: "Let's Build Together",
      description: "Ready to create something extraordinary?",
      icon: <Star className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-purple-500 to-pink-600",
      achievement: "Collaborator",
    },
  ]

  const unlockAchievement = useCallback(
    (achievement: string) => {
      if (!achievements.includes(achievement)) {
        setAchievements((prev) => [...prev, achievement])
        console.log(`[v0] Achievement unlocked: ${achievement}`)
      }
    },
    [achievements],
  )

  const navigateToChapter = (index: number) => {
    if (index !== currentChapter) {
      setCompletedChapters((prev) => [...new Set([...prev, currentChapter])])
      setCurrentChapter(index)
      unlockAchievement(chapters[index].achievement)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentChapter((prev) => (prev + 1) % chapters.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, chapters.length])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          navigateToChapter((currentChapter + 1) % chapters.length)
          break
        case "ArrowLeft":
          navigateToChapter(currentChapter === 0 ? chapters.length - 1 : currentChapter - 1)
          break
        case "p":
          setIsPlaying(!isPlaying)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentChapter, isPlaying, chapters.length])

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-background via-muted/30 to-secondary/20"
    >
      {!isMobile &&
        Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cursorTrailRef.current[i] = el
            }}
            className="cursor-trail"
          />
        ))}

      {!isMobile &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="particle animate-matrix-rain"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
            }}
          />
        ))}

      <div className="fixed top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-50 px-4">
        <div className="flex items-center gap-2 md:gap-4 bg-card/80 backdrop-blur-xl rounded-full px-3 md:px-6 py-2 md:py-3 border border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToChapter(currentChapter === 0 ? chapters.length - 1 : currentChapter - 1)}
            className="rounded-full p-2 md:p-3"
          >
            <SkipBack className="w-3 h-3 md:w-4 md:h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full p-2 md:p-3"
          >
            {isPlaying ? <Pause className="w-3 h-3 md:w-4 md:h-4" /> : <Play className="w-3 h-3 md:w-4 md:h-4" />}
          </Button>

          <div className="flex gap-1 md:gap-2">
            {chapters.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToChapter(index)}
                className={`progress-orb ${
                  completedChapters.includes(index) ? "completed" : index === currentChapter ? "active" : ""
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToChapter((currentChapter + 1) % chapters.length)}
            className="rounded-full p-2 md:p-3"
          >
            <SkipForward className="w-3 h-3 md:w-4 md:h-4" />
          </Button>

          {achievements.length > 0 && (
            <div className="hidden md:flex items-center gap-1 ml-2 pl-2 border-l border-border/30">
              <Trophy className="w-3 h-3 text-primary/60" />
              <span className="text-xs text-primary/80 font-medium">{achievements.length}</span>
            </div>
          )}
        </div>
      </div>

      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className={`chapter-container ${index === currentChapter ? "active" : index < currentChapter ? "prev" : ""}`}
        >
          {index === 0 && <GenesisChapter chapter={chapter} />}
          {index === 1 && <ProjectsChapter chapter={chapter} />}
          {index === 2 && <HackathonsChapter chapter={chapter} />}
          {index === 3 && <WorkshopsChapter chapter={chapter} />}
          {index === 4 && <AboutChapter chapter={chapter} />}
          {index === 5 && <ContactChapter chapter={chapter} />}
        </div>
      ))}

      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-40 px-4">
        <div className="text-center text-muted-foreground text-xs md:text-sm max-w-sm md:max-w-none">
          <p className="hidden md:block">
            Use ← → arrows or click orbs to navigate • Press P to auto-play • Move mouse to create particles
          </p>
          <p className="md:hidden">Tap orbs to navigate • Tap play button for auto-play</p>
          {achievements.length > 0 && (
            <p className="mt-1 text-primary/70">
              <Trophy className="inline w-3 h-3 mr-1" />
              {achievements.length} achievement{achievements.length !== 1 ? "s" : ""} unlocked
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function GenesisChapter({ chapter }: { chapter: any }) {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 md:px-8">
      <div
        className={`inline-flex p-4 md:p-6 rounded-full bg-gradient-to-r ${chapter.color} animate-pulse-glow mb-6 md:mb-8`}
      >
        {chapter.icon}
      </div>
      <h1 className="font-sans font-bold text-4xl md:text-6xl lg:text-8xl mb-4 md:mb-6 animate-text-reveal">
        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          {chapter.title}
        </span>
      </h1>
      <p className="text-lg md:text-2xl lg:text-3xl text-muted-foreground mb-6 md:mb-8 animate-float-3d">
        {chapter.subtitle}
      </p>
      <p className="text-sm md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed px-4">
        Welcome to an interactive journey through innovation. This isn't just a portfolio—it's an immersive experience
        that breaks every conventional rule. Navigate through chapters, unlock achievements, and discover the story
        behind each creation.
      </p>
    </div>
  )
}

function ProjectsChapter({ chapter }: { chapter: any }) {
  const projects = [
    {
      title: "Neural DeFi Protocol",
      description: "AI-powered decentralized finance platform with predictive analytics",
      tech: ["React", "Web3.js", "TensorFlow", "Solidity"],
      status: "Revolutionary",
      impact: "10M+ TVL",
      github: "https://github.com/yourusername/neural-defi-protocol",
    },
    {
      title: "Quantum Dashboard",
      description: "Real-time data visualization with quantum-inspired algorithms",
      tech: ["Next.js", "D3.js", "WebGL", "Python"],
      status: "Innovative",
      impact: "500K+ Users",
      github: "https://github.com/yourusername/quantum-dashboard",
    },
    {
      title: "Metaverse Marketplace",
      description: "Cross-reality NFT trading platform with AR/VR integration",
      tech: ["Three.js", "Ethereum", "IPFS", "WebXR"],
      status: "Disruptive",
      impact: "1M+ Transactions",
      github: "https://github.com/yourusername/metaverse-marketplace",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <div className="text-center mb-8 md:mb-16">
        <div className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-4 md:mb-6`}>
          {chapter.icon}
        </div>
        <h2 className="font-sans font-bold text-3xl md:text-5xl mb-3 md:mb-4">{chapter.title}</h2>
        <p className="text-lg md:text-xl text-muted-foreground px-4">{chapter.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="interactive-element bg-card/50 backdrop-blur-xl border-primary/20 hover:border-primary/40 animate-chapter-transition"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex justify-between items-start mb-2 gap-2">
                <Badge variant="outline" className="border-accent text-accent text-xs">
                  {project.status}
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                  {project.impact}
                </Badge>
              </div>
              <CardTitle className="font-sans text-lg md:text-xl">{project.title}</CardTitle>
              <CardDescription className="text-sm md:text-base">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-secondary/20 text-secondary text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-sm md:text-base"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  <Github className="mr-2 w-3 h-3 md:w-4 md:h-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-primary/30 hover:bg-primary/10 text-sm md:text-base bg-transparent"
                >
                  <ExternalLink className="mr-2 w-3 h-3 md:w-4 md:h-4" />
                  Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function HackathonsChapter({ chapter }: { chapter: any }) {
  const victories = [
    { event: "ETHGlobal 2024", place: "🥇 1st Place", project: "Cross-Chain Bridge", prize: "$50K" },
    { event: "Web3 Innovation", place: "🥈 2nd Place", project: "ZK Identity", prize: "$25K" },
    { event: "AI for Good", place: "🥇 Winner", project: "Climate Oracle", prize: "$30K" },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
      <div
        className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-6 md:mb-8 animate-pulse-glow`}
      >
        {chapter.icon}
      </div>
      <h2 className="font-sans font-bold text-3xl md:text-5xl mb-4 md:mb-6">{chapter.title}</h2>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 px-4">{chapter.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {victories.map((victory, index) => (
          <Card
            key={index}
            className="interactive-element bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur-xl border-primary/30 animate-chapter-transition"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <CardHeader className="text-center pb-3 md:pb-6">
              <div className="text-2xl md:text-4xl mb-2">{victory.place}</div>
              <CardTitle className="font-sans text-base md:text-lg">{victory.event}</CardTitle>
              <CardDescription className="text-primary font-semibold text-sm md:text-base">
                {victory.project}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="outline" className="w-full justify-center border-accent text-accent text-xs md:text-sm">
                {victory.prize}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function WorkshopsChapter({ chapter }: { chapter: any }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
      <div className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-6 md:mb-8`}>
        {chapter.icon}
      </div>
      <h2 className="font-sans font-bold text-3xl md:text-5xl mb-4 md:mb-6">{chapter.title}</h2>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 px-4">{chapter.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {[
          { title: "Web3 Mastery", attendees: "500+", type: "Workshop Series" },
          { title: "React Revolution", attendees: "300+", type: "Masterclass" },
          { title: "DeFi Deep Dive", attendees: "200+", type: "Technical Talk" },
          { title: "Full-Stack Future", attendees: "400+", type: "Bootcamp" },
        ].map((workshop, index) => (
          <Card
            key={index}
            className="interactive-element bg-card/60 backdrop-blur-xl border-primary/20 animate-chapter-transition"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <Badge variant="outline" className="border-accent text-accent text-xs">
                  {workshop.type}
                </Badge>
              </div>
              <CardTitle className="font-sans text-base md:text-lg">{workshop.title}</CardTitle>
              <CardDescription className="text-primary font-semibold text-sm md:text-base">
                {workshop.attendees} participants
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AboutChapter({ chapter }: { chapter: any }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
      <div
        className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-6 md:mb-8 animate-float-3d`}
      >
        {chapter.icon}
      </div>
      <h2 className="font-sans font-bold text-3xl md:text-5xl mb-4 md:mb-6">{chapter.title}</h2>
      <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">{chapter.description}</p>

      <div className="prose prose-sm md:prose-lg mx-auto text-foreground/90 max-w-none">
        <p className="text-lg md:text-xl leading-relaxed mb-4 md:mb-6 px-4">
          I believe in breaking boundaries, not just in code, but in how we experience digital narratives. This
          portfolio itself is a testament to that philosophy—an interactive journey that challenges conventional design
          patterns.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 px-4">
          When I'm not revolutionizing user experiences, you'll find me exploring the intersection of AI and blockchain,
          mentoring the next generation of developers, or contributing to open-source projects that push the boundaries
          of what's possible.
        </p>
        <p className="text-base md:text-lg leading-relaxed px-4">
          My mission is simple: create technology that doesn't just function, but inspires and empowers others to build
          the future they envision.
        </p>
      </div>
    </div>
  )
}

function ContactChapter({ chapter }: { chapter: any }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
      <div
        className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-6 md:mb-8 animate-pulse-glow`}
      >
        {chapter.icon}
      </div>
      <h2 className="font-sans font-bold text-3xl md:text-5xl mb-4 md:mb-6">{chapter.title}</h2>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 px-4">{chapter.description}</p>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 md:mb-12 px-4">
        <Button
          size="lg"
          className="interactive-element bg-primary hover:bg-primary/90 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto"
        >
          <Mail className="mr-2 w-4 h-4 md:w-5 md:h-5" />
          Start a Conversation
        </Button>
        <div className="flex gap-3 md:gap-4">
          <Button
            variant="outline"
            size="lg"
            className="interactive-element border-primary/30 hover:bg-primary/10 bg-transparent p-3 md:p-4"
          >
            <Github className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="interactive-element border-primary/30 hover:bg-primary/10 bg-transparent p-3 md:p-4"
          >
            <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>

      <Card className="bg-card/60 backdrop-blur-xl border-primary/20 max-w-2xl mx-auto">
        <CardContent className="pt-4 md:pt-6 px-4 md:px-6 pb-4 md:pb-6">
          <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
            Ready to build something extraordinary? I'm always excited to collaborate on revolutionary projects, explore
            new opportunities, and push the boundaries of what's possible in web development.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
