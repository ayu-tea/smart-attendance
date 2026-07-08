'use client'

import { CalendarCheck, CalendarX, Download, Percent, TrendingUp } from 'lucide-react'
import { useMemo, useState } from 'react'

import { PageHeader } from '@/components/dashboard/page-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { AttendanceStatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { departments, reportRecords } from '@/lib/mock-data'

export default function ReportsPage() {
  const [date, setDate] = useState('')
  const [dept, setDept] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    return reportRecords.filter((r) => {
      const matchesDate = !date || r.date === date
      const matchesDept = dept === 'all' || r.department === dept
      const matchesStatus = status === 'all' || r.status === status
      return matchesDate && matchesDept && matchesStatus
    })
  }, [date, dept, status])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Attendance Reports"
        description="Review and export detailed attendance records."
        action={
          <Button size="lg" className="gap-2">
            <Download className="size-4" />
            Export Report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Monthly Avg." value="88%" icon={Percent} trend="+3.2%" trendUp accent="primary" />
        <StatCard label="Full Attendance" value="46" icon={CalendarCheck} trend="+5" trendUp accent="primary" />
        <StatCard label="Low Attendance" value="12" icon={CalendarX} trend="-2" trendUp accent="destructive" />
        <StatCard label="Classes Held" value="124" icon={TrendingUp} trend="+8" trendUp accent="warning" />
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="f-date">Date</Label>
              <Input
                id="f-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="f-dept">Department</Label>
              <Select id="f-dept" value={dept} onChange={(e) => setDept(e.target.value)}>
                <option value="all">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="f-status">Status</Label>
              <Select id="f-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                  setDate('')
                  setDept('all')
                  setStatus('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-muted-foreground">{r.date}</TableCell>
                    <TableCell className="font-medium">{r.studentName}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {r.department}
                    </TableCell>
                    <TableCell>
                      <AttendanceStatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.time}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                      No records match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {reportRecords.length} records
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
