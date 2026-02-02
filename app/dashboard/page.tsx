"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, ArrowRight } from "lucide-react"
import { projects, currentUser } from "@/lib/data"
import type { Project } from "@/lib/data"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function DashboardPage() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)

  const userProjects = projects.filter((p) => currentUser.projectIds.includes(p.id))

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsNavigating(true)
    setTimeout(() => {
      router.push(`/project/${project.id}`)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="border-b border-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0e3438]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold text-[#dea068]">L</span>
            </motion.div>
            <span className="text-lg font-light tracking-wide text-foreground">LuxOS</span>
          </Link>
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dea068]/15"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium text-[#0e3438]">
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </motion.div>
        </div>
      </motion.header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Portal</p>
          <h1 className="mt-1 text-3xl font-light text-foreground sm:text-4xl">Vaši projekti</h1>
        </motion.div>

        <motion.div
          className="mt-10 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {userProjects.map((project, index) => (
            <motion.button
              key={project.id}
              variants={itemVariants}
              onClick={() => handleProjectClick(project)}
              className="group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-[#dea068]/40 sm:p-6"
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              layoutId={`project-${project.id}`}
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#dea068]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                initial={false}
              />

              {/* Image */}
              <motion.div
                className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32"
                layoutId={`project-image-${project.id}`}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>

              {/* Info */}
              <div className="relative min-w-0 flex-1">
                <motion.p className="text-xs font-medium text-[#dea068]">{project.type}</motion.p>
                <motion.h3
                  className="mt-1 truncate text-lg font-medium text-foreground"
                  layoutId={`project-name-${project.id}`}
                >
                  {project.name}
                </motion.h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="relative hidden flex-shrink-0 text-right sm:block">
                <AnimatedProgress value={project.progress} />
                <div className="mt-2 h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-[#dea068]"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Arrow */}
              <motion.div
                className="relative flex-shrink-0"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-[#dea068]" />
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {userProjects.length === 0 && (
          <motion.div
            className="py-20 text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Trenutno nimate aktivnih projektov
          </motion.div>
        )}
      </main>

      {/* Navigation overlay */}
      <AnimatePresence>
        {isNavigating && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="relative h-32 w-40 overflow-hidden rounded-2xl"
                layoutId={`project-image-${selectedProject.id}`}
              >
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.p
                className="text-xl font-light text-foreground"
                layoutId={`project-name-${selectedProject.id}`}
              >
                {selectedProject.name}
              </motion.p>
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#dea068]"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AnimatedProgress({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(eased * value))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    const timeout = setTimeout(animate, 500)
    return () => clearTimeout(timeout)
  }, [value])

  return <p className="text-2xl font-light tabular-nums text-foreground">{displayValue}%</p>
}
