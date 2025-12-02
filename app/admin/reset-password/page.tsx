"use client"

import React, { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export default function AdminResetPasswordPage() {
  const [token, setToken] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get("access_token") || params.get("token") || null
    const t = params.get("type") || null
    setToken(accessToken)
    setType(t)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!token) {
      setError("Tidak ada token pemulihan. Pastikan Anda mengklik tautan dari email reset.")
      return
    }
    if (password.length < 8) {
      setError("Password harus minimal 8 karakter")
      return
    }
    if (password !== confirm) {
      setError("Password dan konfirmasi tidak cocok")
      return
    }

    setLoading(true)
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

      // Set session from access token so updateUser can run
      // Note: recovery links typically include access_token and type=recovery
      await supabase.auth.setSession({ access_token: token, refresh_token: null } as any)

      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) {
        setError(updateError.message)
      } else {
        setMessage("Password berhasil diubah. Silakan masuk menggunakan password baru.")
        // Optionally redirect to login after a short delay
        setTimeout(() => (window.location.href = "/admin/login"), 2500)
      }
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
          {type !== "recovery" && (
            <p className="text-sm text-muted-foreground mb-4">Halaman ini digunakan untuk mengatur ulang password (recovery).</p>
          )}

          {message && <div className="p-3 mb-3 bg-success/10 rounded">{message}</div>}
          {error && <div className="p-3 mb-3 bg-destructive/10 rounded">{error}</div>}

          {!message && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm">Password baru</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <label className="text-sm">Konfirmasi password</label>
                <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Menyimpan..." : "Set password baru"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
