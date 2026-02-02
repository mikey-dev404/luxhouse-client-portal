"use client"

import { useState } from "react"
import { serviceProviders } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"

export function ServiceDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [...new Set(serviceProviders.map((sp) => sp.category))]

  const filteredProviders = serviceProviders.filter((provider) => {
    return selectedCategory === null || provider.category === selectedCategory
  })

  return (
    <div className="space-y-4">
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
            Vse ({serviceProviders.length})
          </button>
          {categories.map((category) => {
            const count = serviceProviders.filter((p) => p.category === category).length
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
                {category} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Service Providers */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="rounded-xl border border-border bg-card p-4 sm:p-5"
          >
            <div className="mb-3">
              <h3 className="font-medium text-foreground">{provider.name}</h3>
              <p className="text-sm text-[#dea068]">{provider.category}</p>
            </div>

            <div className="space-y-2 text-sm">
              <a
                href={`tel:${provider.phone}`}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{provider.phone}</span>
              </a>
              <a
                href={`mailto:${provider.email}`}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{provider.email}</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{provider.region}</span>
              </div>
              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{provider.website.replace("https://", "")}</span>
                </a>
              )}
            </div>

            {provider.note && (
              <p className="mt-3 text-xs text-muted-foreground">{provider.note}</p>
            )}

            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${provider.phone}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0e3438] py-2.5 text-sm font-medium text-[#faf9f7] transition-colors hover:bg-[#0e3438]/90"
              >
                <Phone className="h-4 w-4" />
                <span>Pokliči</span>
              </a>
              <a
                href={`mailto:${provider.email}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Mail className="h-4 w-4" />
                <span>E-pošta</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border">
          <p className="text-muted-foreground">Ni serviserjev v tej kategoriji</p>
        </div>
      )}
    </div>
  )
}
