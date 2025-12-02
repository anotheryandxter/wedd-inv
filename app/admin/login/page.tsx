"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import { loginAdmin } from "@/lib/actions"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isResetOpen, setIsResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMessage, setResetMessage] = useState<string | null>(null)
  const [resetError, setResetError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const result = await loginAdmin(email, password)
      if (result.success) {
        router.push("/admin")
        router.refresh()
      } else {
        setError(result.error || "Terjadi kesalahan")
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass rounded-3xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-serif text-2xl text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-2">Masuk untuk mengelola undangan pernikahan</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/50 border-border focus:border-gold"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/50 border-border focus:border-gold"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full bg-gold hover:bg-gold/90 text-white">
              {isPending ? "Masuk..." : "Masuk"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">Hubungi administrator jika Anda membutuhkan akses</p>

            <div className="mt-3">
              {!isResetOpen ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsResetOpen(true)
                    setResetMessage(null)
                    setResetError(null)
                    setResetEmail("")
                  }}
                  className="text-sm text-gold underline"
                >
                  Lupa password?
                </button>
              ) : (
                <div className="mt-4">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setResetMessage(null)
                      setResetError(null)
                      try {
                        const res = await fetch("/api/admin/reset-password", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email: resetEmail || email }),
                        })
                        const data = await res.json()
                        if (data.success) {
                          setResetMessage("Tautan reset password telah dikirim ke email Anda.")
                        } else {
                          setResetError(data.error || "Gagal mengirim email reset")
                        }
                      } catch (err: any) {
                        setResetError(err?.message || "Terjadi kesalahan")
                      }
                    }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Input
                      type="email"
                      placeholder="Masukkan email untuk reset"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="bg-white/50 border-border"
                      required
                    />
                    <Button type="submit" className="bg-gold text-white">
                      Kirim
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsResetOpen(false)}
                      className="text-muted-foreground"
                    >
                      Batal
                    </Button>
                  </form>

                  {resetMessage && <p className="text-sm text-success mt-2">{resetMessage}</p>}
                  {resetError && <p className="text-sm text-destructive mt-2">{resetError}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
