"use client"

import { useState } from "react"
import type { Step } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Check, Clock, Camera, ChevronRight } from "lucide-react"

interface DigitalTwinProps {
  steps: Step[]
  onStepClick: (stepId: string, hasPhotos: boolean) => void
}

const phases = {
  design: "Projektiranje",
  production: "Produkcija",
  construction: "Gradnja",
}

export function DigitalTwin({ steps, onStepClick }: DigitalTwinProps) {
  const [expandedPhase, setExpandedPhase] = useState<string>("construction")

  const totalSteps = steps.length
  const completedSteps = steps.filter((s) => s.status === "completed").length
  const overallProgress = Math.round((completedSteps / totalSteps) * 100)

  const getPhaseSteps = (phase: string) => steps.filter((s) => s.phase === phase)
  const getPhaseProgress = (phase: string) => {
    const phaseSteps = getPhaseSteps(phase)
    const completed = phaseSteps.filter((s) => s.status === "completed").length
    return phaseSteps.length ? Math.round((completed / phaseSteps.length) * 100) : 0
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div>
          <p className="text-sm text-muted-foreground">Skupni napredek</p>
          <p className="mt-0.5 text-2xl font-light">{overallProgress}%</p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p>{completedSteps} / {totalSteps}</p>
          <p>korakov</p>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-2">
        {Object.entries(phases).map(([key, label]) => {
          const phaseSteps = getPhaseSteps(key)
          const progress = getPhaseProgress(key)
          const isExpanded = expandedPhase === key
          const completedCount = phaseSteps.filter((s) => s.status === "completed").length

          return (
            <div key={key} className="rounded-lg border border-border">
              <button
                onClick={() => setExpandedPhase(isExpanded ? "" : key)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                      progress === 100
                        ? "bg-[#0e3438] text-[#faf9f7]"
                        : progress > 0
                          ? "bg-[#dea068]/20 text-[#dea068]"
                          : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {progress === 100 ? <Check className="h-4 w-4" /> : `${progress}%`}
                  </div>
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">
                      {completedCount} / {phaseSteps.length} korakov
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    isExpanded && "rotate-90"
                  )}
                />
              </button>

              {isExpanded && phaseSteps.length > 0 && (
                <div className="border-t border-border">
                  {phaseSteps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => onStepClick(step.id, step.hasPhotos)}
                      disabled={!step.hasPhotos}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                        step.hasPhotos && "hover:bg-secondary/50"
                      )}
                    >
                      <StatusDot status={step.status} />
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm", step.status === "waiting" && "text-muted-foreground")}>
                          {step.name}
                        </p>
                        {step.completedDate && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(step.completedDate).toLocaleDateString("sl-SI")}
                          </p>
                        )}
                      </div>
                      {step.hasPhotos && <Camera className="h-4 w-4 text-[#dea068]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatusDot({ status }: { status: Step["status"] }) {
  if (status === "completed") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0e3438]">
        <Check className="h-3 w-3 text-[#faf9f7]" />
      </div>
    )
  }
  if (status === "in-progress") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dea068]">
        <Clock className="h-3 w-3 text-[#0e3438]" />
      </div>
    )
  }
  return <div className="h-2.5 w-2.5 rounded-full bg-border" />
}
