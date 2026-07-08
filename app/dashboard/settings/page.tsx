'use client'

import { Bell, Building2, CheckCircle2, Clock, Save, ScanFace } from 'lucide-react'
import { useState } from 'react'

import { PageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { departments } from '@/lib/mock-data'

export default function SettingsPage() {
  const [sensitivity, setSensitivity] = useState(75)
  const [notify, setNotify] = useState(true)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  const sensitivityLabel = sensitivity >= 80 ? 'High' : sensitivity >= 55 ? 'Balanced' : 'Relaxed'

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Configure your institution profile and recognition preferences."
        action={
          <Button size="lg" className="gap-2" onClick={handleSave}>
            {saved ? <CheckCircle2 className="size-4" /> : <Save className="size-4" />}
            {saved ? 'Saved' : 'Save Settings'}
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Institution profile */}
        <Card>
          <CardHeader className="flex-row items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
              <Building2 className="size-5" />
            </span>
            <CardTitle>Institution Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="inst-name">Institution name</Label>
              <Input id="inst-name" defaultValue="Springfield University" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="inst-email">Contact email</Label>
              <Input id="inst-email" type="email" defaultValue="admin@springfield.edu" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="inst-dept">Primary department</Label>
              <Select id="inst-dept" defaultValue={departments[0]}>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="inst-address">Address</Label>
              <Textarea id="inst-address" defaultValue="742 Evergreen Terrace, Springfield" />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          {/* Attendance timing */}
          <Card>
            <CardHeader className="flex-row items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                <Clock className="size-5" />
              </span>
              <CardTitle>Attendance Timing</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="start">Session start</Label>
                  <Input id="start" type="time" defaultValue="09:00" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="end">Session end</Label>
                  <Input id="end" type="time" defaultValue="17:00" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="grace">Late grace period (minutes)</Label>
                <Input id="grace" type="number" defaultValue={10} min={0} />
              </div>
            </CardContent>
          </Card>

          {/* Recognition sensitivity */}
          <Card>
            <CardHeader className="flex-row items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                <ScanFace className="size-5" />
              </span>
              <CardTitle>Face Recognition</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sensitivity">Recognition sensitivity</Label>
                  <span className="rounded-full bg-primary/12 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {sensitivityLabel} · {sensitivity}%
                  </span>
                </div>
                <input
                  id="sensitivity"
                  type="range"
                  min={30}
                  max={100}
                  value={sensitivity}
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Higher sensitivity reduces false matches but may require clearer captures.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotify((v) => !v)}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3 text-left"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Bell className="size-4 text-muted-foreground" />
                  Notify on unrecognized faces
                </span>
                <span
                  className={cn(
                    'relative h-6 w-11 rounded-full transition-colors',
                    notify ? 'bg-primary' : 'bg-muted-foreground/40',
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 size-5 rounded-full bg-background transition-transform',
                      notify ? 'translate-x-5' : 'translate-x-0.5',
                    )}
                  />
                </span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
