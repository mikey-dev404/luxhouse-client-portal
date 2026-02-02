"use client"

import { useState } from "react"
import { faqs } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ChevronDown, Search } from "lucide-react"

export function ProjectFAQ() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [...new Set(faqs.map((f) => f.category))]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Iskanje vprašanj..."
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
            Vse
          </button>
          {categories.map((category) => (
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
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="bg-card">
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="flex w-full items-start justify-between gap-4 p-4 text-left transition-colors hover:bg-secondary/30"
            >
              <span className="text-sm text-foreground">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform",
                  openId === faq.id && "rotate-180"
                )}
              />
            </button>
            {openId === faq.id && (
              <div className="border-t border-border bg-secondary/20 px-4 py-3">
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                <span className="mt-3 inline-block rounded-full bg-[#dea068]/10 px-2.5 py-1 text-xs text-[#dea068]">
                  {faq.category}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border">
          <p className="text-muted-foreground">Ni rezultatov</p>
        </div>
      )}
    </div>
  )
}
