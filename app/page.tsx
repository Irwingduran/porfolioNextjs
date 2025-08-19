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
  Calendar,
  Lock,
  Sparkles,
  Terminal,
  ShoppingBag,
  BarChart,
  Trophy,
  Zap,
  Coffee,
  Keyboard,
  Puzzle,
  Shield,
  Award,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Codesandbox,
  Smile,
  Frown,
  Meh,
  Laugh,
  Asterisk,
} from "lucide-react"

export default function InteractiveDevPortfolio() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [completedChapters, setCompletedChapters] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; color: string }>>([])
  const [isMobile, setIsMobile] = useState(false)
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [terminalMode, setTerminalMode] = useState(false)
  const [avatarExpression, setAvatarExpression] = useState('default')
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement[]>([])
  const [viewedProjects, setViewedProjects] = useState(0)
  const [showAchievement, setShowAchievement] = useState<{name: string, icon: JSX.Element} | null>(null)
  const [timeOfDay, setTimeOfDay] = useState<'morning'|'day'|'night'>('day')

  // Configuración del tema según hora del día
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 9) {
      setTimeOfDay('morning')
    } else if (hour >= 9 && hour < 18) {
      setTimeOfDay('day')
    } else {
      setTimeOfDay('night')
    }
  }, [])

  const techColors = [
    "text-blue-400", "text-purple-400", "text-green-400", 
    "text-yellow-400", "text-red-400", "text-cyan-400", "text-pink-400"
  ]

  // Efectos para dispositivos móviles y partículas
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

  // Sistema de logros
  const achievements = [
    { id: 'welcome', name: 'Bienvenida', icon: <Coffee className="w-4 h-4" />, condition: () => currentChapter === 0 },
    { id: 'projects', name: 'Explorador', icon: <Codesandbox className="w-4 h-4" />, condition: () => viewedProjects >= 3 },
    { id: 'hackathon', name: 'Hackathon Master', icon: <Trophy className="w-4 h-4" />, condition: () => currentChapter === 2 },
    { id: 'terminal', name: 'Hacker Mode', icon: <Terminal className="w-4 h-4" />, condition: () => terminalMode },
    { id: 'all-chapters', name: 'Viajero Completo', icon: <Asterisk className="w-4 h-4" />, condition: () => completedChapters.length === chapters.length },
  ]

  useEffect(() => {
    const newAchievements = achievements.filter(a => 
      a.condition() && !unlockedAchievements.includes(a.id)
    )
    if (newAchievements.length > 0) {
      setUnlockedAchievements([...unlockedAchievements, ...newAchievements.map(a => a.id)])
      // Mostrar notificación del logro
      newAchievements.forEach(ach => {
        setShowAchievement({name: ach.name, icon: ach.icon})
        setTimeout(() => setShowAchievement(null), 3000)
      })
    }
  }, [currentChapter, viewedProjects, terminalMode, completedChapters])

  // Modo terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        setTerminalMode(!terminalMode)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [terminalMode])

  // Avatar expressions
  useEffect(() => {
    const expressions = {
      0: 'happy',
      1: 'coding',
      2: 'excited',
      3: 'thinking',
      4: 'smile'
    }
    setAvatarExpression(expressions[currentChapter] || 'default')
  }, [currentChapter])

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

  // Estilos según hora del día
  const timeStyles = {
    morning: {
      bg: 'from-blue-900 via-blue-800 to-indigo-900',
      text: 'text-blue-100',
      card: 'bg-blue-900/20 border-blue-700'
    },
    day: {
      bg: 'from-gray-900 via-gray-800 to-gray-900',
      text: 'text-gray-100',
      card: 'bg-gray-800/20 border-gray-700'
    },
    night: {
      bg: 'from-gray-950 via-gray-900 to-black',
      text: 'text-gray-300',
      card: 'bg-gray-900/20 border-gray-800'
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br ${timeStyles[timeOfDay].bg} transition-colors duration-1000 ${terminalMode ? 'terminal-mode' : ''}`}
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

      {/* Notificación de logro */}
      {showAchievement && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-lg px-6 py-4 flex items-center gap-3 animate-fade-in-out">
          <div className="text-yellow-400 animate-bounce">
            {showAchievement.icon}
          </div>
          <div>
            <p className="text-sm text-gray-300">Logro desbloqueado!</p>
            <p className="font-bold text-white">{showAchievement.name}</p>
          </div>
        </div>
      )}

      {/* Avatar flotante */}
      {!isMobile && (
        <div 
          className="fixed bottom-8 right-8 z-50 transition-all duration-500"
          style={{
            transform: `translateY(${Math.sin(Date.now() / 500) * 10}px)`
          }}
        >
          <div className="relative group">
            <div className="w-16 h-16 bg-gray-800 rounded-full border-2 border-blue-400 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors">
              {avatarExpression === 'default' && <Meh className="w-6 h-6 text-blue-400" />}
              {avatarExpression === 'happy' && <Smile className="w-6 h-6 text-green-400" />}
              {avatarExpression === 'coding' && <Code className="w-6 h-6 text-purple-400" />}
              {avatarExpression === 'excited' && <Zap className="w-6 h-6 text-yellow-400" />}
              {avatarExpression === 'thinking' && <BrainCircuit className="w-6 h-6 text-pink-400" />}
              {avatarExpression === 'smile' && <Laugh className="w-6 h-6 text-cyan-400" />}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              {terminalMode ? 'HACKER MODE' : 'ONLINE'}
            </div>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ¡Hazme clic!
            </div>
          </div>
        </div>
      )}

      {/* Navigation mejorada */}
      <div className="fixed top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-2xl">
        <div className={`flex items-center gap-2 md:gap-4 ${timeStyles[timeOfDay].card} backdrop-blur-xl rounded-full px-3 md:px-6 py-2 md:py-3 border shadow-lg`}>
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

      {/* Logros desbloqueados */}
      {unlockedAchievements.length > 0 && (
        <div className="fixed top-20 left-4 z-50 space-y-2">
          {unlockedAchievements.map((id) => {
            const achievement = achievements.find(a => a.id === id)
            return (
              <div 
                key={id}
                className="flex items-center gap-2 bg-gray-800/90 backdrop-blur-md px-3 py-2 rounded-full border border-gray-700 animate-fade-in"
              >
                <div className="text-yellow-400">
                  {achievement?.icon}
                </div>
                <span className="text-xs text-white">{achievement?.name}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* Modo Terminal */}
      {terminalMode && (
        <div className="absolute inset-0 bg-black/90 z-40 p-8 font-mono text-green-400 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <p className="text-green-400">$ irwing-portfolio --help</p>
              <p className="text-gray-400 ml-4">Bienvenido al modo terminal</p>
              <p className="text-gray-400 ml-4">Comandos disponibles:</p>
              <p className="text-gray-400 ml-6">--skills: Muestra mis habilidades</p>
              <p className="text-gray-400 ml-6">--projects: Lista mis proyectos</p>
              <p className="text-gray-400 ml-6">--contact: Información de contacto</p>
              <p className="text-gray-400 ml-6">exit: Salir del modo terminal</p>
            </div>
            
            <div className="mb-4">
              <p className="text-green-400">$ irwing --skills</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-4">
                {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Solidity', 'Blockchain', 'Web3', 'TailwindCSS', 'PostgreSQL'].map(skill => (
                  <span key={skill} className="text-gray-300">▹ {skill}</span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-green-400">$ irwing --contact</p>
              <div className="ml-4 space-y-1">
                <p className="text-gray-300">▹ Email: contacto@irwingduran.com</p>
                <p className="text-gray-300">▹ GitHub: github.com/irwingduran</p>
                <p className="text-gray-300">▹ LinkedIn: linkedin.com/in/irwingduran</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-green-400">$ irwing --projects --count=3</p>
              <div className="ml-4 space-y-2">
                {[
                  "Plataforma de Voto Digital en Blockchain",
                  "Sistema de Reservas Médicas",
                  "Eco-Marketplace Inteligente"
                ].map((proj, i) => (
                  <p key={i} className="text-gray-300">▹ [{i+1}] {proj}</p>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <p className="text-green-400">$ _</p>
              <div className="ml-2 h-5 w-3 bg-green-400 animate-blink"></div>
            </div>
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="absolute inset-0 pt-20 pb-16 overflow-y-auto">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${timeStyles[timeOfDay].text} ${
              index === currentChapter ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="w-full h-full overflow-y-auto px-4">
              {index === 0 && <WelcomeChapter chapter={chapter} timeOfDay={timeOfDay} />}
              {index === 1 && <ProjectsChapter chapter={chapter} setViewedProjects={setViewedProjects} timeOfDay={timeOfDay} />}
              {index === 2 && <HackathonsChapter chapter={chapter} timeOfDay={timeOfDay} />}
              {index === 3 && <AboutMeChapter chapter={chapter} timeOfDay={timeOfDay} />}
              {index === 4 && <ContactChapter chapter={chapter} timeOfDay={timeOfDay} />}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile navigation indicators */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-40 px-4 w-full max-w-md">
        <div className="text-center text-gray-400 text-xs md:text-sm">
          <p className="hidden md:block">
            Usa las flechas ← → o teclas numéricas (1-5) • Espacio para pausar/reanudar • Ctrl+` para terminal
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

function WelcomeChapter({ chapter, timeOfDay }: { chapter: any, timeOfDay: string }) {
  const [hoverEffect, setHoverEffect] = useState(false)
  const [showWorkflow, setShowWorkflow] = useState(false)
  
  const timeColors = {
    morning: 'from-blue-400 to-cyan-400',
    day: 'from-blue-500 to-indigo-500',
    night: 'from-indigo-600 to-purple-600'
  }
  
  return (
    <div className="h-full flex flex-col justify-center items-center text-center px-4 py-8">
      <div 
        className={`inline-flex p-4 md:p-6 rounded-full bg-gradient-to-r ${chapter.color} mb-6 md:mb-8 animate-float hover:scale-110 transition-transform duration-300 cursor-pointer`}
        onMouseEnter={() => setHoverEffect(true)}
        onMouseLeave={() => setHoverEffect(false)}
        onClick={() => setShowWorkflow(!showWorkflow)}
      >
        {hoverEffect ? <Zap className="w-8 h-8 md:w-12 md:h-12 animate-pulse" /> : chapter.icon}
      </div>
      <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
        <span className={`bg-gradient-to-r ${timeColors[timeOfDay]} bg-clip-text text-transparent`}>
          {chapter.title}
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 font-light">
        {chapter.subtitle}
      </p>
      <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {chapter.description}
      </p>
      
      <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          onClick={() => window.open("https://wa.me/5212229097515", "_blank")} 
          className={`bg-gradient-to-r ${timeColors[timeOfDay]} hover:opacity-90 cursor-pointer transition-all hover:shadow-lg`}
        >
          Contactarme ahora
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-600 hover:bg-gray-800/50 text-gray-300 transition-all hover:shadow-lg"
          onClick={() => setShowWorkflow(!showWorkflow)}
        >
          <GitBranch className="mr-2 w-4 h-4" />
          {showWorkflow ? 'Ocultar flujo' : 'Ver mi flujo de trabajo'}
        </Button>
      </div>
      
      {/* Flujo de trabajo interactivo */}
      {showWorkflow && (
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 max-w-2xl w-full border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Mi Proceso de Desarrollo</h3>
          <div className="space-y-4">
            {[
              {icon: <Puzzle className="w-5 h-5 text-blue-400" />, title: "Análisis de Requerimientos", description: "Entiendo profundamente el problema a resolver"},
              {icon: <GitCommit className="w-5 h-5 text-purple-400" />, title: "Planificación", description: "Divido el proyecto en tareas manejables"},
              {icon: <Code className="w-5 h-5 text-green-400" />, title: "Implementación", description: "Desarrollo iterativo con feedback constante"},
              {icon: <Shield className="w-5 h-5 text-yellow-400" />, title: "Pruebas", description: "Aseguro calidad con testing automatizado"},
              {icon: <Sparkles className="w-5 h-5 text-pink-400" />, title: "Despliegue", description: "Implementación y monitoreo continuo"}
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="p-2 bg-gray-700/50 rounded-full">
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-medium text-white">{step.title}</h4>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Sección de habilidades como planetas */}
      <div className="mt-12 grid grid-cols-3 md:grid-cols-7 gap-4">
        {['React', 'Next', 'Node', 'Web3', 'Solidity', 'Tailwind', 'TypeScript'].map((tech, i) => (
          <div 
            key={tech}
            className="flex flex-col items-center group"
          >
            <div 
              className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-xl font-mono border-2 ${
                i % 2 === 0 ? 'border-blue-400' : 'border-purple-400'
              } mb-2 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}
              style={{
                transform: `rotate(${i * 10}deg) translateY(${Math.sin(i) * 5}px)`
              }}
            >
              {tech[0]}
            </div>
            <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsChapter({ chapter, setViewedProjects, timeOfDay }: { chapter: any, setViewedProjects: any, timeOfDay: string }) {
  const projects = [
    {
      title: "Plataforma de Voto Digital en Blockchain",
      description: "Sistema descentralizado para elecciones digitales seguras, usando contratos inteligentes y verificaciones públicas.",
      tech: ["Solidity", "Ethereum", "React", "Node.js"],
      status: "Prototipo funcional",
      year: "2022",
      github: "#",
      demo: "#",
      icon: <Lock className="w-5 h-5 text-purple-400" />,
      featured: true
    },
    {
      title: "Sistema de Reservas Médicas",
      description: "Plataforma web para gestionar citas y disponibilidad de doctores, con integración de APIs de calendario.",
      tech: ["Next.js", "TypeScript", "TailwindCSS", "MongoDB"],
      status: "Producción",
      year: "2023",
      github: "#",
      demo: "#",
      icon: <Calendar className="w-5 h-5 text-green-400" />,
      featured: true
    },
    {
      title: "Eco-Marketplace Inteligente",
      description: "Marketplace sostenible con integración de pagos digitales y analíticas en tiempo real para vendedores.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe API"],
      status: "Activo",
      year: "2023",
      github: "#",
      demo: "#",
      icon: <ShoppingBag className="w-5 h-5 text-blue-400" />,
      featured: true
    },
    {
      title: "Aplicación Web3 de Microcréditos",
      description: "DApp que permite a usuarios solicitar y otorgar microcréditos con bajas tasas de interés usando Web3.",
      tech: ["Solidity", "Next.js", "Ethers.js", "IPFS"],
      status: "Prototipo",
      year: "2024",
      github: "#",
      demo: "#",
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
      featured: false
    },
    {
      title: "Sistema de Reportes Gantt",
      description: "Aplicación para generar reportes de avance quincenales en Excel a partir de diagramas de Gantt.",
      tech: ["Python", "Pandas", "OpenPyXL", "React"],
      status: "Uso interno",
      year: "2024",
      github: "#",
      demo: "#",
      icon: <BarChart className="w-5 h-5 text-red-400" />,
      featured: false
    }
  ]

  useEffect(() => {
    setViewedProjects(projects.length)
  }, [])

  const timeCardStyles = {
    morning: 'bg-blue-900/20 border-blue-700',
    day: 'bg-gray-800/20 border-gray-700',
    night: 'bg-gray-900/20 border-gray-800'
  }

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
            className={`${timeCardStyles[timeOfDay]} backdrop-blur-md hover:border-gray-600 transition-all hover:shadow-xl hover:-translate-y-1 h-full relative ${
              project.featured ? 'featured-project' : ''
            }`}
            style={{ 
              borderLeft: `4px solid ${index === 0 ? '#60a5fa' : index === 1 ? '#34d399' : '#a78bfa'}` 
            }}
            onMouseEnter={() => project.featured && setViewedProjects(prev => prev + 1)}
          >
            {project.featured && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <Award className="w-3 h-3 mr-1" />
                Destacado
              </div>
            )}
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