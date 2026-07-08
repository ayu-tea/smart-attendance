import { CalendarDays, Percent, UserCheck, Users, UserX } from 'lucide-react'

import { PageHeader } from '@/components/dashboard/page-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { WeeklyChart } from '@/components/dashboard/weekly-chart'
import { AttendanceStatusBadge } from '@/components/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/data-table'
import { dashboardStats, recentActivity } from '@/lib/mock-data'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Overview"
        description="A snapshot of today's attendance across your institution."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Students"
          value={dashboardStats.totalStudents}
          icon={Users}
          trend="+12 this month"
          trendUp
          accent="primary"
        />
        <StatCard
          label="Present Today"
          value={dashboardStats.presentToday}
          icon={UserCheck}
          trend="+4.1% vs yesterday"
          trendUp
          accent="primary"
        />
        <StatCard
          label="Absent Today"
          value={dashboardStats.absentToday}
          icon={UserX}
          trend="-3 vs yesterday"
          trendUp
          accent="destructive"
        />
        <StatCard
          label="Attendance %"
          value={`${dashboardStats.attendancePercentage}%`}
          icon={Percent}
          trend="+3.2% this week"
          trendUp
          accent="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Weekly Attendance Overview</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Present students per day this week</p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground sm:inline-flex">
              <CalendarDays className="size-3.5" />
              This week
            </span>
          </CardHeader>
          <CardContent>
            <WeeklyChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today at a glance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <GlanceRow label="Sessions held" value="8" />
            <GlanceRow label="Faces recognized" value="219" />
            <GlanceRow label="Manual overrides" value="3" />
            <GlanceRow label="Avg. check-in time" value="09:08 AM" />
            <div className="rounded-lg border border-primary/25 bg-primary/10 p-4">
              <p className="text-sm font-medium text-primary">Recognition accuracy</p>
              <p className="mt-1 text-2xl font-semibold">99.2%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on today&apos;s matched captures
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Recent Attendance Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="hidden sm:table-cell">Department</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.studentName}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {record.studentId}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {record.department}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{record.time}</TableCell>
                    <TableCell>
                      <AttendanceStatusBadge status={record.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function GlanceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
