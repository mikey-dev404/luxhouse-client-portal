"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { Step } from "@/lib/data"
import { photos } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Calendar, User, X, Camera } from "lucide-react"

interface PhotoGalleryProps {
  steps: Step[]
  selectedStepId: string | null
}

export function PhotoGallery({ steps, selectedStepId }: PhotoGalleryProps) {
  const stepsWithPhotos = steps.filter((s) => s.hasPhotos)
  const [activeStep, setActiveStep] = useState<string>(selectedStepId || stepsWithPhotos[0]?.id || "")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (selectedStepId && stepsWithPhotos.some((s) => s.id === selectedStepId)) {
      setActiveStep(selectedStepId)
    }
  }, [selectedStepId, stepsWithPhotos])

  const currentPhotos = photos[activeStep] || []
  const currentStep = steps.find((s) => s.id === activeStep)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
  }

  const nextPhoto = () => {
    if (lightboxIndex !== null && lightboxIndex < currentPhotos.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
    }
  }

  const prevPhoto = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
    }
  }

  if (stepsWithPhotos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <Camera className="h-8 w-8 text-muted-foreground/50" />
        <p className="mt-3 text-muted-foreground">Fotografije bodo kmalu dodane</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Step Selector - Horizontal scroll on mobile */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:pb-0">
          {stepsWithPhotos.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={cn(
                "flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
                activeStep === step.id
                  ? "bg-[#0e3438] text-[#faf9f7]"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              {step.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Step Info */}
      {currentStep && (
        <p className="text-sm text-muted-foreground">
          {currentStep.completedDate
            ? `Zaključeno ${new Date(currentStep.completedDate).toLocaleDateString("sl-SI", { day: "numeric", month: "long", year: "numeric" })}`
            : "V teku"}
          {currentPhotos.length > 0 && ` • ${currentPhotos.length} fotografij`}
        </p>
      )}

      {/* Photo Grid */}
      {currentPhotos.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {currentPhotos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-secondary"
            >
              <Image
                src={photo.url || "/placeholder.svg"}
                alt={photo.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 transition-opacity group-hover:opacity-100 sm:p-3">
                <p className="line-clamp-2 text-xs text-white sm:text-sm">
                  {photo.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border">
          <p className="text-muted-foreground">Ni fotografij za ta korak</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && currentPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-white/60">
              {lightboxIndex + 1} / {currentPhotos.length}
            </p>
            <button
              onClick={closeLightbox}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Image */}
          <div className="relative flex flex-1 items-center justify-center px-4">
            <button
              onClick={prevPhoto}
              disabled={lightboxIndex === 0}
              className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-30 sm:left-4 sm:p-3"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="relative aspect-[4/3] w-full max-w-4xl">
              <Image
                src={currentPhotos[lightboxIndex].url || "/placeholder.svg"}
                alt={currentPhotos[lightboxIndex].description}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={nextPhoto}
              disabled={lightboxIndex === currentPhotos.length - 1}
              className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-30 sm:right-4 sm:p-3"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Info */}
          <div className="p-4 text-center sm:p-6">
            <p className="text-base text-white sm:text-lg">
              {currentPhotos[lightboxIndex].description}
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-white/50 sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{currentPhotos[lightboxIndex].uploadedBy}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {new Date(currentPhotos[lightboxIndex].uploadedDate).toLocaleDateString("sl-SI")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
