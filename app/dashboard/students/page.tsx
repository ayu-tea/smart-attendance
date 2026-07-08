'use client'

import { Plus, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'

import { PageHeader } from '@/components/dashboard/page-header'
import { FaceStatusBadge } from '@/components/status-badge'
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
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { departments, students, years } from '@/lib/mock-data'

export default function StudentsPage() {
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('all')
  const [year, setYear] = useState('all')

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase().includes(query.toLowerCase())
      const matchesDept = dept === 'all' || s.department === dept
      const matchesYear = year === 'all' || s.year === year
      return matchesQuery && matchesDept && matchesYear
    })
  }, [query, dept, year])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Student Management"
        description="Search, filter, and manage all enrolled students."
        action={
          <Button size="lg" className="gap-2">
            <Plus className="size-4" />
            Add Student
          </Button>
        }
      />

      <Card>
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or student ID…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="hidden size-4 sm:block" />
              <Select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full min-w-40 sm:w-auto"
              >
                <option value="all">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full min-w-32 sm:w-auto"
              >
                <option value="all">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden sm:table-cell">Year</TableHead>
                  <TableHead>Face Status</TableHead>
                  <TableHead>Attendance %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((student) => (
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
                      <FaceStatusBadge status={student.faceStatus} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              student.attendance >= 85
                                ? 'bg-primary'
                                : student.attendance >= 70
                                  ? 'bg-warning'
                                  : 'bg-destructive',
                            )}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{student.attendance}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                      No students match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {students.length} students
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
