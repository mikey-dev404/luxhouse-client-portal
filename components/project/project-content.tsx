"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Hammer,
  Camera,
  HelpCircle,
  Wallet,
  FolderOpen,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DigitalTwin } from "./digital-twin"
import { PhotoGallery } from "./photo-gallery"
import { ProjectFAQ } from "./project-faq"
import { Finances } from "./finances"
import { DocumentVault } from "./document-vault"
import { ServiceDirectory } from "./service-directory"
import type { Project, Step } from "@/lib/data"

const tabs = [
  { id: "twin", label: "Gradnja", icon: Hammer },
  { id: "photos", label: "Foto", icon: Camera },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "finances", label: "Finance", icon: Wallet },
  { id: "vault", label: "Dokumenti", icon: FolderOpen },
  { id: "services", label: "Servis", icon: Wrench },
]

interface ProjectContentProps {
  project: Project
  steps: Step[]
}

export function ProjectContent({ project, steps }: ProjectContentProps) {
  const [activeTab, setActiveTab] = useState("twin")
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)

  const handleStepClick = (stepId: string, hasPhotos: boolean) => {
    if (hasPhotos) {
      setSelectedStepId(stepId)
      setActiveTab("photos")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="border-b border-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
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
          <Link href="/dashboard">
            <motion.div
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              whileHover={{ x: -3 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Nazaj</span>
            </motion.div>
          </Link>
        </div>
      </motion.header>

      <main className="mx-auto max-w-5xl px-5 py-6 sm:py-8">
        {/* Project Info */}
        <motion.div
          className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            className="relative aspect-video w-full overflow-hidden rounded-2xl sm:aspect-[4/3] sm:w-48 sm:flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#0e3438]/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </motion.div>
          <div className="flex-1">
            <motion.p
              className="text-sm font-medium text-[#dea068]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.type}
            </motion.p>
            <motion.h1
              className="mt-1 text-2xl font-medium text-foreground sm:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {project.name}
            </motion.h1>
            <motion.div
              className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(project.expectedCompletion).toLocaleDateString("sl-SI", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </motion.div>
            {/* Progress */}
            <motion.div
              className="mt-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Napredek</span>
                <motion.span
                  className="text-lg font-medium tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {project.progress}%
                </motion.span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-[#dea068]"
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="relative mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-1 overflow-x-auto pb-px sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition-colors",
                    isActive
                      ? "text-[#0e3438]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#dea068]"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "twin" && <DigitalTwin steps={steps} onStepClick={handleStepClick} />}
            {activeTab === "photos" && <PhotoGallery steps={steps} selectedStepId={selectedStepId} />}
            {activeTab === "faq" && <ProjectFAQ />}
            {activeTab === "finances" && <Finances />}
            {activeTab === "vault" && <DocumentVault />}
            {activeTab === "services" && <ServiceDirectory />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
