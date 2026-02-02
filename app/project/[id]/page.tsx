import { projects, steps } from "@/lib/data"
import { notFound } from "next/navigation"
import { ProjectContent } from "@/components/project/project-content"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const project = projects.find((p) => p.id === id)
  const projectSteps = steps[id] || []

  if (!project) {
    notFound()
  }

  return <ProjectContent project={project} steps={projectSteps} />
}
