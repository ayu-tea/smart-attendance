'use client'

import {
  CalendarCheck,
  CalendarX,
  ChevronLeft,
  ChevronRight,
  Download,
  Percent,
  TrendingUp,
} from 'lucide-react'
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

const RECORDS_PER_PAGE = 10

export default function ReportsPage() {
  const [date, setDate] = useState('')
  const [dept, setDept] = useState('all')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return reportRecords.filter((r) => {
      const matchesDate = !date || r.date === date
      const matchesDept = dept === 'all' || r.department === dept
      const matchesStatus = status === 'all' || r.status === status
      return matchesDate && matchesDept && matchesStatus
    })
  }, [date, dept, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / RECORDS_PER_PAGE))

  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * RECORDS_PER_PAGE
    return filtered.slice(start, start + RECORDS_PER_PAGE)
  }, [filtered, page])

  function resetToFirstPage() {
    setPage(1)
  }

  function clearFilters() {
    setDate('')
    setDept('all')
    setStatus('all')
    setPage(1)
  }

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
        <StatCard
          label="Monthly Avg."
          value="88%"
          icon={Percent}
          trend="+3.2%"
          trendUp
          accent="primary"
        />
        <StatCard
          label="Full Attendance"
          value="46"
          icon={CalendarCheck}
          trend="+5"
          trendUp
          accent="primary"
        />
        <StatCard
          label="Low Attendance"
          value="12"
          icon={CalendarX}
          trend="-2"
          trendUp
          accent="destructive"
        />
        <StatCard
          label="Classes Held"
          value="124"
          icon={TrendingUp}
          trend="+8"
          trendUp
          accent="warning"
        />
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
                onChange={(e) => {
                  setDate(e.target.value)
                  resetToFirstPage()
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="f-dept">Department</Label>
              <Select
                id="f-dept"
                value={dept}
                onChange={(e) => {
                  setDept(e.target.value)
                  resetToFirstPage()
                }}
              >
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
              <Select
                id="f-status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  resetToFirstPage()
                }}
              >
                <option value="all">All Statuses</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" size="lg" className="w-full" onClick={clearFilters}>
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
                {paginatedRecords.map((r) => (
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

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {paginatedRecords.length} of {filtered.length} records
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>

              <span className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}