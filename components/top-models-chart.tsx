'use client'

import { Bar, BarChart, XAxis, YAxis, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  pureColorVar1Results, imageMaskResults, geometricShapeResults,
  pureColorScore, imageMaskScore, geometricScore,
} from '@/lib/data'

const chartConfig = {
  score: { label: 'Score', color: 'var(--chart-1)' },
}

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

const trim = (s: string) => s.length > 14 ? s.slice(0, 12) + '..' : s

const colorPrecisionData = [...pureColorVar1Results]
  .sort((a, b) => a.colorMean - b.colorMean)
  .slice(0, 5)
  .map(m => ({ name: trim(m.model), score: pureColorScore(m) }))

const maskData = [...imageMaskResults]
  .sort((a, b) => a.shapeMean - b.shapeMean)
  .slice(0, 5)
  .map(m => ({ name: trim(m.model), score: imageMaskScore(m) }))

const geoData = [...geometricShapeResults]
  .sort((a, b) => a.maskMean - b.maskMean)
  .slice(0, 5)
  .map(m => ({ name: trim(m.model), score: geometricScore(m) }))

const openSourceColorData = pureColorVar1Results
  .filter(m => m.type === 'Open')
  .sort((a, b) => a.colorMean - b.colorMean)
  .slice(0, 5)
  .map(m => ({ name: trim(m.model), score: pureColorScore(m) }))

const closedSourceColorData = pureColorVar1Results
  .filter(m => m.type === 'Closed')
  .sort((a, b) => a.colorMean - b.colorMean)
  .slice(0, 5)
  .map(m => ({ name: trim(m.model), score: pureColorScore(m) }))

const closedSourceGeoData = geometricShapeResults
  .filter(m => m.type === 'Closed')
  .sort((a, b) => a.maskMean - b.maskMean)
  .slice(0, 5)
  .map(m => ({ name: trim(m.model), score: geometricScore(m) }))

const chartItems = [
  { title: 'Best Pure Color Precision',           data: colorPrecisionData },
  { title: 'Best Image Mask Obedience',            data: maskData },
  { title: 'Best Geometric Shape Obedience',       data: geoData },
  { title: 'Best Open-Source (Pure Color)',        data: openSourceColorData },
  { title: 'Best Closed-Source (Pure Color)',      data: closedSourceColorData },
  { title: 'Best Closed-Source (Geometric Shape)', data: closedSourceGeoData },
]

export function TopModelsChart() {
  return (
    <section className="border-b border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-semibold text-foreground">Top Models per Task</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chartItems.map(item => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">{item.title}</h3>
              <ChartContainer config={chartConfig} className="h-40 w-full">
                <BarChart data={item.data} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" width={90}
                    tick={{ fill: 'var(--foreground)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={v => `${Number(v).toFixed(1)}`} />}
                    cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
                    {item.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}