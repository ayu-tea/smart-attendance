'use client'

import { CheckCircle2, Mail, Power, Save, UserRound } from 'lucide-react'
import { useState } from 'react'

import { PageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { departments } from '@/lib/mock-data'

export default function SettingsPage() {
  const [attendanceOpen, setAttendanceOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage faculty profile and attendance acceptance status."
        action={
          <Button size="lg" className="gap-2" onClick={handleSave}>
            {saved ? <CheckCircle2 className="size-4" /> : <Save className="size-4" />}
            {saved ? 'Saved' : 'Save Settings'}
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
              <UserRound className="size-5" />
            </span>
            <CardTitle>Faculty Profile</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="faculty-name">Faculty name</Label>
              <Input id="faculty-name" defaultValue="Dr. Neha Kulkarni" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="faculty-id">Faculty ID</Label>
              <Input id="faculty-id" defaultValue="FAC-001" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="faculty-email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="faculty-email"
                  type="email"
                  defaultValue="faculty@institution.edu"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="faculty-role">Role</Label>
              <Select id="faculty-role" defaultValue="faculty">
                <option value="faculty">Faculty</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Administrator</option>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="faculty-dept">Department</Label>
              <Select id="faculty-dept" defaultValue={departments[0]}>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-3">
            <span
              className={cn(
                'flex size-9 items-center justify-center rounded-lg',
                attendanceOpen
                  ? 'bg-primary/12 text-primary'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              <Power className="size-5" />
            </span>
            <CardTitle>Attendance Acceptance</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <div className="rounded-xl border border-border bg-muted/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">Accept attendance manually</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Turn this on when students are allowed to mark attendance for the current
                    session.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAttendanceOpen((value) => !value)}
                  className={cn(
                    'relative h-8 w-14 shrink-0 rounded-full transition-colors',
                    attendanceOpen ? 'bg-primary' : 'bg-muted-foreground/35',
                  )}
                  aria-label="Toggle attendance acceptance"
                >
                  <span
                    className={cn(
                      'absolute left-1 top-1 size-6 rounded-full bg-white shadow-sm transition-transform',
                      attendanceOpen ? 'translate-x-6' : 'translate-x-0',
                    )}
                  />
                </button>
              </div>

              <div
                className={cn(
                  'mt-5 rounded-lg border px-4 py-3 text-sm font-medium',
                  attendanceOpen
                    ? 'border-primary/25 bg-primary/10 text-primary'
                    : 'border-border bg-background/40 text-muted-foreground',
                )}
              >
                {attendanceOpen
                  ? 'Attendance acceptance is ON. Students can be marked present.'
                  : 'Attendance acceptance is OFF. Attendance marking is currently closed.'}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              This setting is manual for now. Later, the backend can store this status per faculty,
              subject, class, or session.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}