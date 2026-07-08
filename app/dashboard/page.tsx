import { Percent, UserCheck, Users, UserX } from 'lucide-react'

import { PageHeader } from '@/components/dashboard/page-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { WeeklyChart } from '@/components/dashboard/weekly-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { dashboardStats } from '@/lib/mock-data'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Overview"
        description="A simple summary of today's attendance."
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

      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance Overview</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Present students per day this week
          </p>
        </CardHeader>
        <CardContent>
          <WeeklyChart />
        </CardContent>
      </Card>
    </div>
  )
}