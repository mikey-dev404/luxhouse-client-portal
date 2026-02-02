"use client"

import { useState } from "react"
import { documents } from "@/lib/data"
import { cn } from "@/lib/utils"
import { FileText, Download, Search, FolderOpen } from "lucide-react"

const categoryLabels: Record<string, string> = {
  permits: "Dovoljenja",
  plans: "Načrti",
  manuals: "Navodila",
  certificates: "Certifikati",
}

const categoryIcons: Record<string, string> = {
  permits: "bg-[#0e3438]",
  plans: "bg-[#dea068]",
  manuals: "bg-muted-foreground",
  certificates: "bg-success",
}

export function DocumentVault() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Object.keys(categoryLabels)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchQuery === "" || doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === null || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const groupedDocuments = categories.reduce(
    (acc, category) => {
      acc[category] = filteredDocuments.filter((doc) => doc.category === category)
      return acc
    },
    {} as Record<string, typeof documents>
  )

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Iskanje dokumentov..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#dea068] focus:outline-none"
        />
      </div>

      {/* Category Filter - Horizontal scroll on mobile */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:pb-0">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
              selectedCategory === null
                ? "bg-[#0e3438] text-[#faf9f7]"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
          >
            Vse ({documents.length})
          </button>
          {categories.map((category) => {
            const count = documents.filter((d) => d.category === category).length
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
                  selectedCategory === category
                    ? "bg-[#0e3438] text-[#faf9f7]"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {categoryLabels[category]} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Documents by Category */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryDocs = groupedDocuments[category]
          if (selectedCategory !== null && selectedCategory !== category) return null
          if (categoryDocs.length === 0) return null

          return (
            <div key={category}>
              <div className="mb-2 flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", categoryIcons[category])} />
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {categoryLabels[category]}
                </span>
              </div>
              <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                {categoryDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 bg-card p-3 transition-colors hover:bg-secondary/30 sm:p-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.uploadedDate).toLocaleDateString("sl-SI", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-[#dea068]/10 hover:text-[#dea068]">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-border">
          <FolderOpen className="h-8 w-8 text-muted-foreground/50" />
          <p className="mt-2 text-muted-foreground">Ni dokumentov</p>
        </div>
      )}
    </div>
  )
}
