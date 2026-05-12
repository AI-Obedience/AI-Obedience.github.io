'use client'

import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  return (
    <section className="border-b border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/50 text-primary">Level-4 Obedience</Badge>
            <Badge variant="secondary">3 Deterministic Tasks</Badge>
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            VIOLIN Leaderboard
          </h1>

          <p className="max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground">
            The VIOLIN leaderboard evaluates image generation models on{' '}
            <span className="font-semibold text-foreground">V</span>isual{' '}
            <span className="font-semibold text-foreground">I</span>nstruction{' '}
            <span className="font-semibold text-foreground">O</span>bedience{' '}
            <span className="font-semibold text-foreground">L</span>evel-4 Evaluat
            <span className="font-semibold text-foreground">I</span>o
            <span className="font-semibold text-foreground">N</span> — the first systematic benchmark targeting
            {' '}<strong className="text-foreground">deterministic pixel-level control</strong>.
          </p>

          <p className="max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
            State-of-the-art generative models excel at complex scenes yet fail at trivially simple tasks —
            the <em>"Paradox of Simplicity"</em>. Violin exposes this failure through three zero- or low-entropy tasks:
            <strong className="text-foreground"> Pure Color Generation</strong>,
            <strong className="text-foreground"> Image Masking</strong>, and
            <strong className="text-foreground"> Geometric Shape Generation</strong>.
            The benchmark also includes Violin-Absolute-Color, a supplementary zero-entropy extension with
            six hex-code variations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { icon: '🎨', title: 'Pure Color', desc: 'Pixel-perfect uniform color blocks via ISCC-NBS color names' },
              { icon: '🖼️', title: 'Image Masking', desc: 'Binary mask application with strict spatial adherence' },
              { icon: '⭕', title: 'Geometric Shape', desc: 'Precise shape generation at defined spatial coordinates' },
            ].map(t => (
              <div key={t.title} className="rounded-lg border border-border bg-card/50 p-3">
                <div className="text-2xl mb-1">{t.icon}</div>
                <div className="text-sm font-semibold text-foreground">{t.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}