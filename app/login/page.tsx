"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1200)
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0e3438]">
      {/* Animated gradient orb */}
      <motion.div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#dea068]/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#dea068]/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative px-6 pt-8 sm:px-8 sm:pt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2.5">
          <motion.div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dea068]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-base font-semibold text-[#0e3438]">L</span>
          </motion.div>
          <span className="text-xl font-light tracking-wider text-[#faf9f7]">LuxOS</span>
        </div>
      </motion.div>

      {/* Login Form */}
      <div className="relative flex flex-1 flex-col justify-center px-6 pb-16 sm:px-8">
        <div className="mx-auto w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl font-light tracking-tight text-[#faf9f7] sm:text-5xl">
              Dobrodošli
            </h1>
            <p className="mt-3 text-[#a0b0b2]">
              Vpišite podatke za dostop do vašega portala
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-12 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <motion.label
                htmlFor="email"
                className="block text-sm text-[#a0b0b2]"
                animate={{
                  color: focusedInput === "email" ? "#dea068" : "#a0b0b2",
                }}
                transition={{ duration: 0.2 }}
              >
                E-pošta
              </motion.label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                placeholder="ime@email.com"
                className="mt-3 w-full border-b-2 border-[#1a4a4f] bg-transparent pb-3 text-lg text-[#faf9f7] placeholder-[#5a6b6d] outline-none transition-all focus:border-[#dea068]"
                required
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#dea068]"
                initial={{ width: "0%" }}
                animate={{ width: focusedInput === "email" ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <div className="relative">
              <motion.label
                htmlFor="code"
                className="block text-sm text-[#a0b0b2]"
                animate={{
                  color: focusedInput === "code" ? "#dea068" : "#a0b0b2",
                }}
                transition={{ duration: 0.2 }}
              >
                Aktivacijska koda
              </motion.label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onFocus={() => setFocusedInput("code")}
                onBlur={() => setFocusedInput(null)}
                placeholder="XXXX-XXXX"
                className="mt-3 w-full border-b-2 border-[#1a4a4f] bg-transparent pb-3 text-lg tracking-widest text-[#faf9f7] placeholder-[#5a6b6d] outline-none transition-all focus:border-[#dea068]"
                required
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#dea068]"
                initial={{ width: "0%" }}
                animate={{ width: focusedInput === "code" ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="relative mt-4 w-full overflow-hidden rounded-xl bg-[#dea068] py-4 text-base font-medium text-[#0e3438]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.div
                      className="h-1.5 w-1.5 rounded-full bg-[#0e3438]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="h-1.5 w-1.5 rounded-full bg-[#0e3438]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="h-1.5 w-1.5 rounded-full bg-[#0e3438]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Vstopi
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <motion.p
            className="mt-10 text-center text-sm text-[#5a6b6d]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Kodo ste prejeli ob podpisu pogodbe
          </motion.p>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="relative px-6 pb-8 text-center text-xs text-[#5a6b6d] sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        LuxOS v1.0
      </motion.div>

      {/* Full screen transition overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e3438]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dea068]">
                <span className="text-lg font-semibold text-[#0e3438]">L</span>
              </div>
              <span className="text-2xl font-light tracking-wider text-[#faf9f7]">LuxOS</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
