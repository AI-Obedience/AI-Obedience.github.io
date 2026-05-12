'use client'

import { useState } from 'react'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { qwenFineTuningByVar, crossModelFineTuning } from '@/lib/data'

function ChangeCell({ change }: { change: number }) {
  const abs = Math.abs(change)
  const improved = change < 0
  const color = improved
    ? abs > 0.1 ? 'text-emerald-400' : 'text-green-400'
    : change === 0 ? 'text-gray-400' : 'text-red-400'
  const Icon = improved ? TrendingDown : change === 0 ? Minus : TrendingUp
  return (
    <div className="flex items-center justify-center gap-1.5">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className={`text-sm font-mono font-medium ${color}`}>
        {change > 0 ? '+' : ''}{change.toFixed(3)}
      </span>
    </div>
  )
}

function MetricCell({ value }: { value: number }) {
  return <span className="font-mono text-sm text-foreground/80">{value.toFixed(3)}</span>
}

export function FineTuningSection() {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1')

  return (
    <section className="border-t border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">🔧 Fine-tuning Track</h2>
          <p className="text-sm text-muted-foreground">
            LoRA fine-tuning experiments on Violin-Absolute-Color. All models use rank=16, α=32, 3,000 steps.
            Fine-tuning improves task-specific performance but risks degrading general T2I capabilities (Figure 7).
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'tab1' | 'tab2')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1">
            <TabsTrigger value="tab1" className="py-2 text-xs">
              Qwen-Image across Var-1 to Var-6
            </TabsTrigger>
            <TabsTrigger value="tab2" className="py-2 text-xs">
              Cross-model comparison on Var-1
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === 'tab1' && (
          <>
            <div className="mb-3 text-sm text-muted-foreground">
              Qwen-Image fine-tuned individually on each variation. <strong className="text-foreground">Before</strong> = baseline colorMean.
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-24">Variation</TableHead>
                    <TableHead className="text-center text-xs w-20">Before</TableHead>
                    <TableHead className="text-center text-xs">rgb-ed</TableHead>
                    <TableHead className="text-center text-xs">lab-00</TableHead>
                    <TableHead className="text-center text-xs">sd</TableHead>
                    <TableHead className="text-center text-xs">ced</TableHead>
                    <TableHead className="text-center text-xs">hf</TableHead>
                    <TableHead className="text-center text-xs font-semibold">color-mean</TableHead>
                    <TableHead className="text-center text-xs w-28">Δ Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qwenFineTuningByVar.map(r => (
                    <TableRow key={r.variation}>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{r.variation}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono text-sm text-orange-400">{r.before.toFixed(3)}</span>
                      </TableCell>
                      <TableCell className="text-center"><MetricCell value={r.rgbEd} /></TableCell>
                      <TableCell className="text-center"><MetricCell value={r.labOO} /></TableCell>
                      <TableCell className="text-center"><MetricCell value={r.sd} /></TableCell>
                      <TableCell className="text-center"><MetricCell value={r.ced} /></TableCell>
                      <TableCell className="text-center"><MetricCell value={r.hf} /></TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono text-sm text-emerald-400 font-semibold">{r.colorMean.toFixed(3)}</span>
                      </TableCell>
                      <TableCell><ChangeCell change={r.change} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {activeTab === 'tab2' && (
          <>
            <div className="mb-3 text-sm text-muted-foreground">
              Five open-source models fine-tuned on Violin-Absolute-Color Var-1. <strong className="text-foreground">Before</strong> = Var-1 colorMean per model.
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Model</TableHead>
                    <TableHead className="text-center text-xs w-20">Before</TableHead>
                    <TableHead className="text-center text-xs">rgb-ed</TableHead>
                    <TableHead className="text-center text-xs">lab-00</TableHead>
                    <TableHead className="text-center text-xs">sd</TableHead>
                    <TableHead className="text-center text-xs">ced</TableHead>
                    <TableHead className="text-center text-xs">hf</TableHead>
                    <TableHead className="text-center text-xs font-semibold">color-mean</TableHead>
                    <TableHead className="text-center text-xs w-28">Δ Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {crossModelFineTuning.map(r => (
                    <TableRow key={r.model}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{r.model}</span>
                          <span className="text-xs text-muted-foreground">{r.organization}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono text-sm text-orange-400">{r.before.toFixed(3)}</span>
                      </TableCell>
                      <TableCell className="text-center"><MetricCell value={r.rgbEd} /></TableCell>
                      <TableCell className="text-center"><MetricCell value={r.labOO} /></TableCell>
                      <TableCell className="text-center"><MetricCell value={r.sd} /></TableCell>
                      <TableCell className="text-center"><MetricCell value={r.ced} /></TableCell>
                      <TableCell className="text-center"><MetricCell value={r.hf} /></TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono text-sm text-emerald-400 font-semibold">{r.colorMean.toFixed(3)}</span>
                      </TableCell>
                      <TableCell><ChangeCell change={r.change} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        <div className="mt-4 rounded-lg border border-amber-500/50 bg-amber-500/10 p-3">
          <p className="text-sm text-amber-400">
            <strong>Key Finding (Figure 7):</strong> LoRA fine-tuning improves obedience scores on the target task but causes
            significant performance degradation on general T2I benchmarks (GenEval), including counting, position,
            and color attribution tasks — confirming that fine-tuning alone is not a viable solution for L4 Obedience.
          </p>
        </div>
      </div>
    </section>
  )
}