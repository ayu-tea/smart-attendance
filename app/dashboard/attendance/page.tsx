'use client'

import { CheckCircle2, Clock, Loader2, Play, ScanFace, Square } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { PageHeader } from '@/components/dashboard/page-header'
import { AttendanceStatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { recognizableStudents } from '@/lib/mock-data'

interface Recognized {
  id: string
  name: string
  department: string
  year: string
  time: string
}

export default function MarkAttendancePage() {
  const [running, setRunning] = useState(false)
  const [current, setCurrent] = useState<Recognized | null>(null)
  const [marked, setMarked] = useState<Recognized[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  function recognizeNext() {
    const student = recognizableStudents[indexRef.current % recognizableStudents.length]
    indexRef.current += 1
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const record: Recognized = { ...student, time }
    setCurrent(record)
    setMarked((prev) => {
      if (prev.some((r) => r.id === record.id)) return prev
      return [record, ...prev]
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 1800)
  }

  function handleStart() {
    setRunning(true)
    recognizeNext()
    timerRef.current = setInterval(recognizeNext, 2600)
  }

  function handleStop() {
    setRunning(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mark Attendance"
        description="Run facial recognition to mark students present automatically."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Camera */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recognition Camera</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-secondary/40">
              <div className="absolute inset-0 flex items-center justify-center">
                {running ? (
                  <Loader2 className="size-16 animate-spin text-primary/70" />
                ) : (
                  <ScanFace className="size-20 text-muted-foreground/40" />
                )}
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                  className={cn(
                    'size-48 rounded-2xl border-2 transition-colors sm:size-56',
                    running ? 'border-primary' : 'border-muted-foreground/30',
                  )}
                />
              </div>

              {running && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-primary backdrop-blur">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Scanning…
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {!running ? (
                <Button size="lg" className="flex-1 gap-2" onClick={handleStart}>
                  <Play className="size-4" />
                  Start Recognition
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleStop}
                >
                  <Square className="size-4" />
                  Stop Recognition
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recognized student */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recognized Student</CardTitle>
            </CardHeader>
            <CardContent>
              {current ? (
                <div className="flex flex-col gap-4">
                  {showSuccess && (
                    <div className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                      <CheckCircle2 className="size-4" />
                      Attendance marked successfully
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 items-center justify-center rounded-full bg-primary/12 text-lg font-semibold text-primary">
                      {current.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                    <div>
                      <p className="text-lg font-semibold">{current.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{current.id}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Detail label="Department" value={current.department} />
                    <Detail label="Year" value={current.year} />
                    <Detail
                      label="Time"
                      value={
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {current.time}
                        </span>
                      }
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <AttendanceStatusBadge status="present" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-8 text-center text-muted-foreground">
                  <ScanFace className="size-10 opacity-40" />
                  <p className="text-sm">Start recognition to detect students.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Marked This Session</CardTitle>
              <span className="rounded-full bg-primary/12 px-2.5 py-0.5 text-xs font-medium text-primary">
                {marked.length}
              </span>
            </CardHeader>
            <CardContent>
              {marked.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No students marked yet.
                </p>
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {marked.map((r) => (
                    <li key={r.id} className="flex items-center justify-between py-2.5 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-primary" />
                        <span className="font-medium">{r.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{r.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
