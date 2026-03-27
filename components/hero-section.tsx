'use client'

import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  return (
    <section className="border-b border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            ICML 2026
          </Badge>
          
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            VIOLIN Leaderboard
          </h1>
          
          <p className="max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground">
            The VIOLIN leaderboard displays evaluation results for image generation models 
            on <span className="font-semibold text-foreground">V</span>isual{' '}
            <span className="font-semibold text-foreground">I</span>nstruction{' '}
            <span className="font-semibold text-foreground">O</span>bedience{' '}
            <span className="font-semibold text-foreground">L</span>evel-4 Evaluat
            <span className="font-semibold text-foreground">I</span>o
            <span className="font-semibold text-foreground">N</span> benchmark. 
            We evaluate AI's ability to generate pure colors with pixel-perfect precision across six task variations.
          </p>
        </div>
      </div>
    </section>
  )
}