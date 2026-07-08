'use client'

import { ChevronLeft, ChevronRight, Plus, Search, SlidersHorizontal, X } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { departments, students as initialStudents, years, type Student } from '@/lib/mock-data'

const STUDENTS_PER_PAGE = 5

export default function StudentsPage() {
  const [studentList, setStudentList] = useState<Student[]>(initialStudents)
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('all')
  const [year, setYear] = useState('all')
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  const [form, setForm] = useState({
    id: '',
    name: '',
    department: departments[0],
    year: years[0],
  })

  const filtered = useMemo(() => {
    return studentList.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase().includes(query.toLowerCase())
      const matchesDept = dept === 'all' || s.department === dept
      const matchesYear = year === 'all' || s.year === year
      return matchesQuery && matchesDept && matchesYear
    })
  }, [query, dept, year, studentList])

  const totalPages = Math.max(1, Math.ceil(filtered.length / STUDENTS_PER_PAGE))

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * STUDENTS_PER_PAGE
    return filtered.slice(start, start + STUDENTS_PER_PAGE)
  }, [filtered, page])

  function resetToFirstPage() {
    setPage(1)
  }

  function handleAddStudent(e: React.FormEvent) {
    e.preventDefault()

    const newStudent: Student = {
      id: form.id.trim(),
      name: form.name.trim(),
      department: form.department,
      year: form.year,
      faceStatus: 'not-registered',
      attendance: 0,
    }

    if (!newStudent.id || !newStudent.name) return

    setStudentList((prev) => [newStudent, ...prev])
    setForm({
      id: '',
      name: '',
      department: departments[0],
      year: years[0],
    })
    setPage(1)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Student Management"
        description="Recently added students appear first."
        action={
          <Button size="lg" className="gap-2" onClick={() => setOpen(true)}>
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
                onChange={(e) => {
                  setQuery(e.target.value)
                  resetToFirstPage()
                }}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="hidden size-4 sm:block" />
              <Select
                value={dept}
                onChange={(e) => {
                  setDept(e.target.value)
                  resetToFirstPage()
                }}
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
                onChange={(e) => {
                  setYear(e.target.value)
                  resetToFirstPage()
                }}
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
                {paginatedStudents.map((student) => (
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

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {paginatedStudents.length} of {filtered.length} students
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h3 className="font-semibold">Add Student</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Add basic student details. Face registration can be done later.
                </p>
              </div>

              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleAddStudent} className="flex flex-col gap-4 p-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="student-id">Student ID</Label>
                <Input
                  id="student-id"
                  placeholder="STU-1013"
                  value={form.id}
                  onChange={(e) => setForm((prev) => ({ ...prev, id: e.target.value }))}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="student-name">Full Name</Label>
                <Input
                  id="student-name"
                  placeholder="Student name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="student-dept">Department</Label>
                  <Select
                    id="student-dept"
                    value={form.department}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, department: e.target.value }))
                    }
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="student-year">Year</Label>
                  <Select
                    id="student-year"
                    value={form.year}
                    onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="mt-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Student</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}