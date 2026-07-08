'use client'

import {
  CalendarX,
  ChevronLeft,
  ChevronRight,
  Download,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { PageHeader } from '@/components/dashboard/page-header'
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
import { cn } from '@/lib/utils'
import { departments, reportRecords, students } from '@/lib/mock-data'

const RECORDS_PER_PAGE = 10
const LOW_ATTENDANCE_LIMIT = 75

type ReportView = 'classes' | 'low-attendance'

interface ClassSummary {
  id: string
  date: string
  department: string
  present: number
  absent: number
  total: number
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  active,
  accent,
  onClick,
}: {
  label: string
  value: string | number
  icon: LucideIcon
  active: boolean
  accent: 'primary' | 'destructive'
  onClick: () => void
}) {
  const accentClass =
    accent === 'primary'
      ? 'bg-primary/12 text-primary'
      : 'bg-destructive/12 text-destructive'

  return (
    <button type="button" onClick={onClick} className="text-left">
      <Card
        className={cn(
          'transition-colors hover:border-primary/40',
          active && 'border-primary/60 bg-primary/5',
        )}
      >
        <CardContent className="flex items-start justify-between gap-4 p-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          <span className={cn('flex size-11 items-center justify-center rounded-lg', accentClass)}>
            <Icon className="size-5" />
          </span>
        </CardContent>
      </Card>
    </button>
  )
}

export default function ReportsPage() {
  const [date, setDate] = useState('')
  const [dept, setDept] = useState('all')
  const [page, setPage] = useState(1)
  const [view, setView] = useState<ReportView>('classes')

  const classSummaries = useMemo<ClassSummary[]>(() => {
    const grouped = new Map<string, ClassSummary>()

    reportRecords.forEach((record) => {
      const key = `${record.date}-${record.department}`

      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          date: record.date,
          department: record.department,
          present: 0,
          absent: 0,
          total: 0,
        })
      }

      const summary = grouped.get(key)
      if (!summary) return

      summary.total += 1

      if (record.status === 'present') {
        summary.present += 1
      } else {
        summary.absent += 1
      }
    })

    return Array.from(grouped.values()).sort((a, b) => b.date.localeCompare(a.date))
  }, [])

  const lowAttendanceStudents = useMemo(() => {
    return students
      .filter((student) => student.attendance < LOW_ATTENDANCE_LIMIT)
      .sort((a, b) => a.attendance - b.attendance)
  }, [])

  const filteredClasses = useMemo(() => {
    return classSummaries.filter((record) => {
      const matchesDate = !date || record.date === date
      const matchesDept = dept === 'all' || record.department === dept
      return matchesDate && matchesDept
    })
  }, [classSummaries, date, dept])

  const filteredLowAttendance = useMemo(() => {
    return lowAttendanceStudents.filter((student) => {
      const matchesDept = dept === 'all' || student.department === dept
      return matchesDept
    })
  }, [lowAttendanceStudents, dept])

  const activeRecords = view === 'classes' ? filteredClasses : filteredLowAttendance
  const totalPages = Math.max(1, Math.ceil(activeRecords.length / RECORDS_PER_PAGE))

  const paginatedClasses = useMemo(() => {
    const start = (page - 1) * RECORDS_PER_PAGE
    return filteredClasses.slice(start, start + RECORDS_PER_PAGE)
  }, [filteredClasses, page])

  const paginatedLowAttendance = useMemo(() => {
    const start = (page - 1) * RECORDS_PER_PAGE
    return filteredLowAttendance.slice(start, start + RECORDS_PER_PAGE)
  }, [filteredLowAttendance, page])

  function resetToFirstPage() {
    setPage(1)
  }

  function clearFilters() {
    setDate('')
    setDept('all')
    setPage(1)
  }

  function changeView(nextView: ReportView) {
    setView(nextView)
    setPage(1)
  }

  function exportReport() {
    const headers =
      view === 'classes'
        ? ['Date', 'Department', 'Students Present', 'Students Absent', 'Total Students']
        : ['Student ID', 'Student Name', 'Department', 'Year', 'Attendance %', 'Face Status']

    const rows =
      view === 'classes'
        ? filteredClasses.map((record) => [
            record.date,
            record.department,
            record.present,
            record.absent,
            record.total,
          ])
        : filteredLowAttendance.map((student) => [
            student.id,
            student.name,
            student.department,
            student.year,
            student.attendance,
            student.faceStatus,
          ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((value) => {
            const safeValue = String(value).replace(/"/g, '""')
            return `"${safeValue}"`
          })
          .join(','),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${view}-report-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Attendance Reports"
        description="View class summaries and low-attendance student details."
        action={
          <Button size="lg" className="gap-2" onClick={exportReport}>
            <Download className="size-4" />
            Export Report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SummaryCard
          label="Classes Held"
          value={classSummaries.length}
          icon={TrendingUp}
          active={view === 'classes'}
          accent="primary"
          onClick={() => changeView('classes')}
        />

        <SummaryCard
          label="Low Attendance"
          value={lowAttendanceStudents.length}
          icon={CalendarX}
          active={view === 'low-attendance'}
          accent="destructive"
          onClick={() => changeView('low-attendance')}
        />
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {view === 'classes' && (
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
            )}

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

            <div className="flex items-end">
              <Button variant="outline" size="lg" className="w-full" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          {view === 'classes' ? (
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Students Present</TableHead>
                    <TableHead>Students Absent</TableHead>
                    <TableHead className="hidden sm:table-cell">Total Students</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedClasses.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="text-muted-foreground">{record.date}</TableCell>
                      <TableCell className="font-medium">{record.department}</TableCell>
                      <TableCell>{record.present}</TableCell>
                      <TableCell>{record.absent}</TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {record.total}
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredClasses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                        No class records match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead className="hidden sm:table-cell">Year</TableHead>
                    <TableHead>Attendance %</TableHead>
                    <TableHead>Face Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedLowAttendance.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {student.id}
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="hidden text-muted-foreground md:table-cell">
                        {student.department}
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {student.year}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-destructive">
                          {student.attendance}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {student.faceStatus === 'registered' ? (
                          <span className="text-sm text-primary">Registered</span>
                        ) : student.faceStatus === 'pending' ? (
                          <span className="text-sm text-warning">Pending</span>
                        ) : (
                          <span className="text-sm text-destructive">Not Registered</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredLowAttendance.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                        No low-attendance students match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Showing{' '}
              {view === 'classes' ? paginatedClasses.length : paginatedLowAttendance.length} of{' '}
              {activeRecords.length} records
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