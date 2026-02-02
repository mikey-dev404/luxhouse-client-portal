"use client"

import { invoices } from "@/lib/data"
import { Download, Check, Clock, AlertCircle } from "lucide-react"

export function Finances() {
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("sl-SI", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <p className="text-xs text-muted-foreground sm:text-sm">Skupaj</p>
          <p className="mt-1 text-xl font-light text-foreground sm:text-2xl">
            {formatCurrency(totalAmount)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <p className="text-xs text-muted-foreground sm:text-sm">Plačano</p>
          <p className="mt-1 text-xl font-light text-[#0e3438] sm:text-2xl">
            {formatCurrency(paidAmount)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <p className="text-xs text-muted-foreground sm:text-sm">Preostalo</p>
          <p className="mt-1 text-xl font-light text-[#dea068] sm:text-2xl">
            {formatCurrency(totalAmount - paidAmount)}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Napredek plačil</span>
          <span className="font-medium text-foreground">
            {Math.round((paidAmount / totalAmount) * 100)}%
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-[#0e3438] transition-all duration-500"
            style={{ width: `${(paidAmount / totalAmount) * 100}%` }}
          />
        </div>
      </div>

      {/* Invoices */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Računi</h3>
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center gap-3 bg-card p-3 sm:gap-4 sm:p-4"
            >
              <StatusIcon status={invoice.status} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {invoice.phase}
                </p>
                <p className="text-xs text-muted-foreground">
                  {invoice.number}
                  <span className="mx-1.5">·</span>
                  {invoice.status === "paid"
                    ? `Plačano ${new Date(invoice.paidDate!).toLocaleDateString("sl-SI")}`
                    : `Rok: ${new Date(invoice.dueDate).toLocaleDateString("sl-SI")}`}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-foreground">
                  {formatCurrency(invoice.amount)}
                </span>
                <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusIcon({ status }: { status: "paid" | "due" | "overdue" }) {
  if (status === "paid") {
    return (
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0e3438]">
        <Check className="h-4 w-4 text-[#faf9f7]" />
      </div>
    )
  }
  if (status === "due") {
    return (
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#dea068]">
        <Clock className="h-4 w-4 text-[#0e3438]" />
      </div>
    )
  }
  return (
    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10">
      <AlertCircle className="h-4 w-4 text-destructive" />
    </div>
  )
}
