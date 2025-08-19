"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Rocket,
  BrainCircuit,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Code,
  Cpu,
  Database,
  Lock,
  Sparkles,
  Terminal,
} from "lucide-react"

export default function InteractiveDevPortfolio() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [completedChapters, setCompletedChapters] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; color: string }>>([])
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement[]>([])

  const techColors = [
    "text-blue-400", "text-purple-400", "text-green-400", 
    "text-yellow-400", "text-red-400", "text-cyan-400", "text-pink-400"
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
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

        if (Math.random() < 0.15) {
          const newParticle = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            color: techColors[Math.floor(Math.random() * techColors.length)]
          }
          setParticles((prev) => [...prev.slice(-25), newParticle])
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
      id: "inicio",
      title: "¡Hola, Soy Irwing Dev!",
      subtitle: "Desarrollador Full-Stack",
      description: "Transformando ideas en experiencias digitales extraordinarias",
      icon: <Code className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "proyectos",
      title: "Mis Creaciones",
      subtitle: "Proyectos Destacados",
      description: "Soluciones innovadoras que he construido con pasión",
      icon: <Terminal className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "hackathons",
      title: "Hackathon Warrior",
      subtitle: "Logros en Competencias",
      description: "Donde la innovación y el código rápido se encuentran",
      icon: <Rocket className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "sobre-mi",
      title: "Más Que Código",
      subtitle: "Mi Filosofía",
      description: "Lo que me impulsa a crear y aprender cada día",
      icon: <BrainCircuit className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-red-500 to-pink-600",
    },
    {
      id: "contacto",
      title: "Colaboremos",
      subtitle: "Trabajemos Juntos",
      description: "Hablemos sobre cómo puedo ayudar en tu próximo proyecto",
      icon: <Sparkles className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-indigo-500 to-purple-600",
    },
  ]

  const navigateToChapter = (index: number) => {
    if (index !== currentChapter) {
      setCompletedChapters((prev) => [...new Set([...prev, currentChapter])])
      setCurrentChapter(index)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentChapter((prev) => (prev + 1) % chapters.length)
      }, 10000)
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
        case "P":
          setIsPlaying(!isPlaying)
          break
        case "0":
          navigateToChapter(0)
          break
        case "1":
          navigateToChapter(1)
          break
        case "2":
          navigateToChapter(2)
          break
        case "3":
          navigateToChapter(3)
          break
        case "4":
          navigateToChapter(4)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentChapter, isPlaying, chapters.length])

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Particle effects */}
      {!isMobile &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className={`particle animate-pulse ${particle.color} text-opacity-70`}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: `scale(${0.5 + Math.random()})`,
            }}
          />
        ))}

      {/* Navigation */}
      <div className="fixed top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-2xl">
        <div className="flex items-center gap-2 md:gap-4 bg-gray-800/90 backdrop-blur-xl rounded-full px-3 md:px-6 py-2 md:py-3 border border-gray-700/50 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToChapter(currentChapter === 0 ? chapters.length - 1 : currentChapter - 1)}
            className="rounded-full p-2 md:p-3 hover:bg-gray-700/50 transition-all"
            aria-label="Capítulo anterior"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full p-2 md:p-3 hover:bg-gray-700/50 transition-all"
            aria-label={isPlaying ? "Pausar" : "Reproducir automático"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <div className="flex flex-1 justify-center gap-1 md:gap-2">
            {chapters.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToChapter(index)}
                className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${
                  completedChapters.includes(index) 
                    ? "bg-green-400" 
                    : index === currentChapter 
                      ? "bg-white" 
                      : "bg-gray-500"
                } ${
                  index === currentChapter ? "scale-150" : "hover:scale-125"
                }`}
                aria-label={`Ir al capítulo ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToChapter((currentChapter + 1) % chapters.length)}
            className="rounded-full p-2 md:p-3 hover:bg-gray-700/50 transition-all"
            aria-label="Siguiente capítulo"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content area with proper sizing */}
      <div className="absolute inset-0 pt-20 pb-16 overflow-y-auto">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
              index === currentChapter ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="w-full h-full overflow-y-auto px-4">
              {index === 0 && <WelcomeChapter chapter={chapter} />}
              {index === 1 && <ProjectsChapter chapter={chapter} />}
              {index === 2 && <HackathonsChapter chapter={chapter} />}
              {index === 3 && <AboutMeChapter chapter={chapter} />}
              {index === 4 && <ContactChapter chapter={chapter} />}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile navigation indicators */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-40 px-4 w-full max-w-md">
        <div className="text-center text-gray-400 text-xs md:text-sm">
          <p className="hidden md:block">
            Usa las flechas ← → o teclas numéricas (1-5) • Espacio para pausar/reanudar
          </p>
          <p className="md:hidden">Toca los puntos para navegar • Botón central para auto-play</p>
        </div>
      </div>

      {/* Digital signature */}
      <div className="fixed bottom-2 right-4 text-xs text-gray-500 z-30">
        Desarrollado con ❤️ Next.js y Tailwind
      </div>
    </div>
  )
}

function WelcomeChapter({ chapter }: { chapter: any }) {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center px-4 py-8">
      <div className={`inline-flex p-4 md:p-6 rounded-full bg-gradient-to-r ${chapter.color} mb-6 md:mb-8 animate-float`}>
        {chapter.icon}
      </div>
      <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {chapter.title}
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 font-light">
        {chapter.subtitle}
      </p>
      <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {chapter.description}
      </p>
      
      <div className="mt-8 md:mt-12 flex justify-center gap-4">
        <Button onClick={() => window.open("https://wa.me/5212229097515", "_blank")} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 cursor-pointer">
          Contactarme ahora
        </Button>
      </div>
    </div>
  )
}

function ProjectsChapter({ chapter }: { chapter: any }) {
  const projects = [
    {
      title: "Sistema de Gestión Empresarial",
      description: "Plataforma integral para gestión de clientes, inventario y facturación",
      tech: ["React", "Node.js", "MongoDB", "GraphQL"],
      status: "Producción",
      year: "2023",
      github: "#",
      demo: "#",
      icon: <Database className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Aplicación de Finanzas Personales",
      description: "Solución para seguimiento de gastos e inversiones con análisis predictivo",
      tech: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
      status: "Activo",
      year: "2024",
      github: "#",
      demo: "#",
      icon: <Lock className="w-5 h-5 text-green-400" />
    },
    {
      title: "Marketplace de NFTs",
      description: "Plataforma para creación y comercio de tokens digitales coleccionables",
      tech: ["Solidity", "Ethereum", "IPFS", "Web3.js"],
      status: "Prototipo",
      year: "2023",
      github: "#",
      demo: "#",
      icon: <Sparkles className="w-5 h-5 text-purple-400" />
    },
  ]

  return (
    <div className="h-full flex flex-col items-center pt-28 px-4 py-8 overflow-y-auto">
      <div className="text-center mb-8 max-w-2xl">
        <div className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-4 md:mb-6`}>
          {chapter.icon}
        </div>
        <h2 className="font-bold text-3xl md:text-4xl mb-3 text-white">{chapter.title}</h2>
        <p className="text-lg text-gray-300">{chapter.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl pb-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="bg-gray-800/80 backdrop-blur-md border-gray-700 hover:border-gray-600 transition-all hover:shadow-xl hover:-translate-y-1 h-full"
            style={{ 
              borderLeft: `4px solid ${index === 0 ? '#60a5fa' : index === 1 ? '#34d399' : '#a78bfa'}` 
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2 gap-2">
                <Badge variant="outline" className="border-gray-600 bg-gray-700/50 text-gray-300">
                  {project.year}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`${
                    project.status === "Producción" ? "border-green-400 text-green-400" :
                    project.status === "Activo" ? "border-blue-400 text-blue-400" :
                    "border-purple-400 text-purple-400"
                  } bg-gray-800/50`}
                >
                  {project.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                {project.icon}
                <CardTitle className="text-lg md:text-xl text-white">{project.title}</CardTitle>
              </div>
              <CardDescription className="text-gray-400">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="bg-gray-700/50 text-gray-300 hover:bg-gray-700/70"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  <Github className="mr-2 w-4 h-4" />
                  Código
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 hover:bg-gray-700/50 text-gray-300"
                  onClick={() => window.open(project.demo, "_blank")}
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
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
  const hackathons = [
    {
      name: "Blockchain aplicado al voto digital en México",
      place: "1er Lugar - Cámara de Diputados",
      date: "Nov 2022",
      description: "Desarrollamos un sistema de voto digital con blockchain, garantizando seguridad, transparencia y verificabilidad.",
      achievements: [
        "Reconocimiento oficial en la Cámara de Diputados",
        "Prototipo funcional de voto digital descentralizado"
      ],
      tech: ["Solidity", "Ethereum", "React", "Node.js"],
      icon: <Sparkles className="w-5 h-5 text-purple-400" />
    },
    {
      name: "ETH5DMayo Hackathon",
      place: "Ganador - Puebla",
      date: "May 2023",
      description: "Construimos una aplicación Web3 innovadora con enfoque en adopción masiva.",
      achievements: [
        "Top 1 entre proyectos Web3",
        "Implementación de contratos inteligentes en tiempo récord"
      ],
      tech: ["Solidity", "Next.js", "Hardhat", "TailwindCSS"],
      icon: <Cpu className="w-5 h-5 text-green-400" />
    },
    {
      name: "AngelHack México",
      place: "Top 3 Global",
      date: "Ago 2023",
      description: "Proyecto destacado con proyección internacional y validación de la comunidad global de desarrolladores.",
      achievements: [
        "Top 3 global entre decenas de equipos",
        "Validación técnica y de mercado"
      ],
      tech: ["React", "Express.js", "MongoDB", "Web3 APIs"],
      icon: <BrainCircuit className="w-5 h-5 text-blue-400" />
    },
    {
      name: "TalentLand Hackathon",
      place: "Finalista - Guadalajara",
      date: "Abr 2024",
      description: "Participación en uno de los hackathons más grandes de Latinoamérica con un proyecto de innovación tecnológica.",
      achievements: [
        "Seleccionado finalista entre cientos de equipos",
        "Prototipo funcional presentado ante jurado especializado"
      ],
      tech: ["TypeScript", "Next.js", "Firebase", "Blockchain"],
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />
    }
  ]  

  return (
    <div className="h-full flex flex-col items-center px-4 pt-28 py-8 overflow-y-auto">
      <div className="text-center mb-8 max-w-2xl">
        <div className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-4 md:mb-6`}>
          {chapter.icon}
        </div>
        <h2 className="font-bold text-3xl md:text-4xl mb-3 text-white">{chapter.title}</h2>
        <p className="text-lg text-gray-300">{chapter.description}</p>
      </div>

      <div className="space-y-6 w-full max-w-2xl pb-8">
        {hackathons.map((hack, index) => (
          <div 
            key={index}
            className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm 
                      border border-gray-700 rounded-xl overflow-hidden
                      hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`absolute -right-8 top-4 w-32 py-1 text-center text-xs font-bold rotate-45 
                            ${index === 0 ? 'bg-yellow-500 text-yellow-900' : 
                              index === 1 ? 'bg-gray-300 text-gray-800' : 
                              'bg-green-500 text-green-900'}`}>
              {hack.place.split('-')[0].trim()}
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4 mb-3">
                <div className={`p-2 rounded-lg ${index === 0 ? 'bg-purple-500/20' : 
                                              index === 1 ? 'bg-blue-500/20' : 
                                              'bg-green-500/20'}`}>
                  {hack.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{hack.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">{hack.date}</span>
                    <span className="text-gray-600">•</span>
                    <span className={`font-medium ${
                      index === 0 ? 'text-yellow-400' : 
                      index === 1 ? 'text-gray-300' : 
                      'text-green-400'
                    }`}>
                      {hack.place.includes('-') ? hack.place.split('-')[1].trim() : hack.place}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 pl-2 border-l-2 border-gray-600/50">{hack.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">LOGROS CLAVE</h4>
                  <ul className="space-y-2">
                    {hack.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">▹</span>
                        <span className="text-gray-400 text-sm">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">TECNOLOGÍAS</h4>
                  <div className="flex flex-wrap gap-2">
                    {hack.tech.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-700/70"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 hover:bg-gray-700/50 text-gray-300"
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 hover:bg-gray-700/50 text-gray-300"
                >
                  <Github className="mr-2 w-4 h-4" />
                  Código
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center w-full max-w-2xl">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">3</div>
          <div className="text-gray-400 text-sm">Premios Ganados</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">120+</div>
          <div className="text-gray-400 text-sm">Horas de Coding</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-green-400">8</div>
          <div className="text-gray-400 text-sm">Prototipos Funcionales</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-purple-400">5K+</div>
          <div className="text-gray-400 text-sm">Usuarios Impactados</div>
        </div>
      </div>
    </div>
  )
}

function AboutMeChapter({ chapter }: { chapter: any }) {
  return (
    <div className="h-full flex flex-col items-center pt-28 px-4 py-8 overflow-y-auto">
      <div className="text-center max-w-2xl">
        <div className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-6 md:mb-8`}>
          {chapter.icon}
        </div>
        <h2 className="font-bold text-3xl md:text-4xl mb-4 text-white">{chapter.title}</h2>
        <p className="text-lg text-gray-300 mb-8">{chapter.description}</p>
      </div>

      <div className="prose prose-invert mx-auto text-left w-full max-w-2xl">
        <p className="text-gray-300 leading-relaxed mb-6">
          Como desarrollador, mi misión va más allá de escribir código. Busco crear soluciones que impacten 
          positivamente en la vida de las personas. Me apasiona la intersección entre tecnología y diseño, 
          donde la funcionalidad se encuentra con la elegancia.
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          Fuera del mundo digital, disfruto de la fotografía, el mundo cripto y aprender sobre inteligencia artificial. 
          Creo firmemente que los mejores desarrolladores son aquellos que mantienen curiosidad por el mundo que los rodea.
        </p>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Mi Filosofía de Desarrollo</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>El código limpio es arte</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>La experiencia del usuario es prioridad</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Aprendizaje continuo como estilo de vida</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Simplificar lo complejo es la mayor habilidad</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ContactChapter({ chapter }: { chapter: any }) {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("contacto@irwingduran.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full flex flex-col items-center px-4 pt-28 py-8 overflow-y-auto">
      <div className="text-center max-w-2xl">
        <div className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r ${chapter.color} mb-6 md:mb-8`}>
          {chapter.icon}
        </div>
        <h2 className="font-bold text-3xl md:text-4xl mb-4 text-white">{chapter.title}</h2>
        <p className="text-lg text-gray-300 mb-8">{chapter.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 w-full max-w-md">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 w-full"
          onClick={copyEmail}
        >
          <Mail className="mr-2 w-5 h-5" />
          {copied ? "¡Copiado!" : "Copiar Email"}
        </Button>
        
        <div className="flex gap-3 w-full justify-center">
          <Button
                    onClick={() => window.open("https://www.github.com/irwingduran", "_blank")}
            variant="outline"
            size="lg"
            className="border-gray-600 hover:bg-gray-800/50 text-gray-300 p-4 cursor-pointer"
          >
            <Github className="w-5 h-5" />
          </Button>
          <Button
          onClick={() => window.open("https://www.linkedin.com/in/irwingduran/", "_blank")}
            variant="outline"
            size="lg"
            className="border-gray-600 hover:bg-gray-800/50 text-gray-300 p-4 cursor-pointer"
          >
            <Linkedin className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 w-full max-w-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Disponibilidad</h3>
          <p className="text-gray-300 mb-4">
            Actualmente estoy disponible para proyectos freelance y oportunidades a tiempo completo.
            Mi horario de respuesta es de 24 horas días hábiles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center ">
            <Button onClick={() => window.open("https://calendar.app.google/QbtVQeU2voPJyLsKA","_blank")} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer">
              Agendar llamada
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}