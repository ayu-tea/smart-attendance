import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  LayoutDashboard,
  ScanFace,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { LandingHeader } from '@/components/landing/landing-header'
import { Logo } from '@/components/logo'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

const features = [
  {
    icon: ScanFace,
    title: 'Face Registration',
    description:
      'Enroll students with a quick webcam capture. Each face is encoded once and reused for every future session.',
  },
  {
    icon: ClipboardCheck,
    title: 'Automatic Attendance Marking',
    description:
      'Recognize faces in real time and log attendance instantly — no roll calls, no manual entry, no proxies.',
  },
  {
    icon: Users,
    title: 'Student Management',
    description:
      'Maintain a searchable directory with departments, year, face status, and per-student attendance rates.',
  },
  {
    icon: BarChart3,
    title: 'Attendance Reports',
    description:
      'Filter by date, department, and status, then export detailed reports for audits and reviews.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Admin Dashboard',
    description:
      'Role-based access for admins and faculty keeps sensitive attendance data protected end to end.',
  },
  {
    icon: LayoutDashboard,
    title: 'Live Overview',
    description:
      'Track present, absent, and attendance percentages at a glance with a clean real-time dashboard.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Register faces',
    description:
      'Capture each student’s face once through the enrollment camera to build the recognition database.',
  },
  {
    step: '02',
    title: 'Scan to mark',
    description:
      'Point the camera at the class — recognized students are matched and marked present automatically.',
  },
  {
    step: '03',
    title: 'Analyze & report',
    description:
      'Review live dashboards, monitor trends, and export attendance reports whenever you need them.',
  },
]

const highlights = [
  'No manual roll calls',
  'Real-time recognition',
  'Exportable reports',
  'Secure by design',
]

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_80%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_18%,transparent),transparent)]" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                Facial recognition attendance, reimagined
              </span>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Smart Attendance powered by{' '}
                <span className="text-primary">facial recognition</span>
              </h1>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                FaceMark lets institutions mark attendance in seconds. Students walk in, the camera
                recognizes them, and their presence is logged automatically — accurate, contactless,
                and effortless.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className={buttonVariants({ size: 'lg', className: 'h-11 px-6 text-sm' })}
                >
                  Get Started
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                    className: 'h-11 px-6 text-sm',
                  })}
                >
                  View Dashboard
                </Link>
              </div>
              <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
              <Image
                src="/hero-facescan.png"
                alt="Facial recognition attendance interface scanning a student's face"
                width={720}
                height={720}
                priority
                className="w-full rounded-2xl border border-border shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to run attendance
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A complete toolkit for enrolling students, capturing attendance, and understanding the
              numbers behind it.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-y border-border/60 bg-card/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                From enrollment to insights in three simple steps.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.step} className="relative rounded-xl border border-border bg-card p-6">
                  <span className="text-3xl font-semibold text-primary/50">{step.step}</span>
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/10 px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_100%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_22%,transparent),transparent)]" />
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to modernize your attendance?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Set up your institution profile, enroll students, and start marking attendance with
              facial recognition today.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className={buttonVariants({ size: 'lg', className: 'h-11 px-6 text-sm' })}
              >
                Get Started
              </Link>
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className: 'h-11 px-6 text-sm',
                })}
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FaceMark. Built as a prototype.
          </p>
        </div>
      </footer>
    </div>
  )
}
