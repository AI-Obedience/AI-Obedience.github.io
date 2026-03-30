'use client'

import { TrendingDown, TrendingUp, Minus, Zap } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { fineTuningResults } from '@/lib/data'

function getImprovementIcon(improvement: number) {
  if (improvement < -50) return <Zap className="h-4 w-4 text-emerald-500" />
  if (improvement < 0) return <TrendingDown className="h-4 w-4 text-green-500" />
  if (improvement === 0) return <Minus className="h-4 w-4 text-gray-500" />
  return <TrendingUp className="h-4 w-4 text-red-500" />
}

function getImprovementText(improvement: number) {
  if (improvement < -50) return '🎉 Major'
  if (improvement < 0) return '✓ Improved'
  if (improvement === 0) return '— No change'
  return '⚠ Degraded'
}

export function FineTuningSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            🔧 Fine-tuning Track
          </h2>
          <p className="text-sm text-muted-foreground">
            Models trained on 90% of Variation-1 subset. Evaluating improvement after fine-tuning.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead rowSpan={2} className="w-48">Model</TableHead>
                <TableHead colSpan={2} className="text-center border-b">Before Fine-tuning</TableHead>
                <TableHead colSpan={2} className="text-center border-b">After Fine-tuning</TableHead>
                <TableHead colSpan={2} className="text-center border-b">Δ Change</TableHead>
              </TableRow>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-center text-xs">Pre-mean</TableHead>
                <TableHead className="text-center text-xs">Pur-mean</TableHead>
                <TableHead className="text-center text-xs">Pre-mean</TableHead>
                <TableHead className="text-center text-xs">Pur-mean</TableHead>
                <TableHead className="text-center text-xs">Precision</TableHead>
                <TableHead className="text-center text-xs">Purity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fineTuningResults
                .sort((a, b) => a.improvement.precision - b.improvement.precision)
                .map((result, index) => (
                  <TableRow key={result.model}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{index + 1}</span>
                        <div>
                          <div className="font-medium text-foreground">{result.model}</div>
                          <div className="text-xs text-muted-foreground">{result.organization}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-mono text-sm text-orange-400">{result.before.preMean.toFixed(3)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-mono text-sm text-yellow-400">{result.before.purMean.toFixed(3)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-mono text-sm text-green-400">{result.after.preMean.toFixed(3)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-mono text-sm text-emerald-400">{result.after.purMean.toFixed(3)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        {getImprovementIcon(result.improvement.precision)}
                        <span className={`text-sm font-medium ${result.improvement.precision < 0 ? 'text-green-400' : result.improvement.precision === 0 ? 'text-gray-400' : 'text-red-400'}`}>
                          {result.improvement.precision > 0 ? '+' : ''}{result.improvement.precision.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        {getImprovementIcon(result.improvement.purity)}
                        <span className={`text-sm font-medium ${result.improvement.purity < 0 ? 'text-green-400' : result.improvement.purity === 0 ? 'text-gray-400' : 'text-red-400'}`}>
                          {result.improvement.purity > 0 ? '+' : ''}{result.improvement.purity.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 rounded-lg border border-amber-500/50 bg-amber-500/10 p-3">
          <p className="text-sm text-amber-400">
            <strong>Key Finding:</strong> Fine-tuning dramatically reduces purity errors while maintaining competitive precision across all models.
          </p>
        </div>
      </div>
    </section>
  )
}