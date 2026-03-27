'use client'

import { Bar, BarChart, XAxis, YAxis, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { var1Results, var2Results, var3Results } from '@/lib/data'

const chartConfig = {
  score: { label: 'Score', color: 'var(--chart-1)' },
}

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

// Prepare chart data for different tasks
const colorPrecisionData = var1Results.slice(0, 5).map((m) => ({
  name: m.model.length > 14 ? m.model.slice(0, 12) + '..' : m.model,
  score: (1 - m.colorPrecision.mean) * 100,
}))

const colorPurityData = [...var1Results]
  .sort((a, b) => a.colorPurity.mean - b.colorPurity.mean)
  .slice(0, 5)
  .map((m) => ({
    name: m.model.length > 14 ? m.model.slice(0, 12) + '..' : m.model,
    score: (1 - m.colorPurity.mean) * 100,
  }))

const var2Data = var2Results.slice(0, 5).map((m) => ({
  name: m.model.length > 14 ? m.model.slice(0, 12) + '..' : m.model,
  score: (1 - m.colorPrecision.mean) * 100,
}))

const var3Data = var3Results.slice(0, 5).map((m) => ({
  name: m.model.length > 14 ? m.model.slice(0, 12) + '..' : m.model,
  score: (1 - m.colorPrecision.mean) * 100,
}))

const openSourceData = var1Results
  .filter((m) => m.type === 'Open')
  .slice(0, 5)
  .map((m) => ({
    name: m.model.length > 14 ? m.model.slice(0, 12) + '..' : m.model,
    score: (1 - m.colorPrecision.mean) * 100,
  }))

const closedSourceData = var1Results
  .filter((m) => m.type === 'Closed')
  .slice(0, 5)
  .map((m) => ({
    name: m.model.length > 14 ? m.model.slice(0, 12) + '..' : m.model,
    score: (1 - m.colorPrecision.mean) * 100,
  }))

const chartItems = [
  { title: 'Best in Color Precision (Var-1)', data: colorPrecisionData },
  { title: 'Best in Color Purity (Var-1)', data: colorPurityData },
  { title: 'Best in Dual Block (Var-2)', data: var2Data },
  { title: 'Best in Quad Block (Var-3)', data: var3Data },
  { title: 'Best Open Source Models', data: openSourceData },
  { title: 'Best Closed Source Models', data: closedSourceData },
]

export function TopModelsChart() {
  return (
    <section className="border-b border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-semibold text-foreground">Top Models per Task</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chartItems.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">{item.title}</h3>
              <ChartContainer config={chartConfig} className="h-[160px] w-full">
                <BarChart
                  data={item.data}
                  layout="vertical"
                  margin={{ top: 0, right: 10, bottom: 0, left: 0 }}
                >
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={90}
                    tick={{ fill: 'var(--foreground)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(v) => `${Number(v).toFixed(1)}%`} />}
                    cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
                    {item.data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Higher is better</span>
                <div className="flex items-center gap-2">
                  {item.data.slice(0, 3).map((_, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: COLORS[i] }}
                      />
                      {i + 1}
                      {i === 0 ? 'st' : i === 1 ? 'nd' : 'rd'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
