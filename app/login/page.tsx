'use client'

import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { AuthShell } from '@/components/auth/auth-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => router.push('/dashboard'), 700)
  }

  return (
    <AuthShell title="Sign in" subtitle="Access your faculty attendance dashboard.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              required
              placeholder="faculty@institution.edu"
              className="pl-9"
              defaultValue="admin@institution.edu"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              required
              placeholder="Enter password"
              className="pl-9"
              defaultValue="password"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="size-4 rounded border-border bg-input/40 accent-primary"
            defaultChecked
          />
          Keep me signed in
        </label>

        <Button type="submit" size="lg" className="h-11 w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthShell>
  )
}