'use client'

import { useState, useMemo, Fragment } from 'react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  getSuppVariationData, supplementaryVariations, suppColorScore,
  type SupplementaryColorResult,
} from '@/lib/data'

function scoreColor(v: number): string {
  if (v < 0.1) return 'text-emerald-400'
  if (v < 0.2) return 'text-green-400'
  if (v < 0.3) return 'text-yellow-400'
  return 'text-orange-400'
}

export function SupplementarySection() {
  const [activeVar, setActiveVar] = useState('var1')
  const [expanded, setExpanded]   = useState<string | null>(null)

  const data = useMemo(
    () => [...getSuppVariationData(activeVar)].sort((a, b) => a.colorMean - b.colorMean),
    [activeVar],
  )

  const currentVar = supplementaryVariations.find(v => v.id === activeVar)!

  return (
    <section className="border-t border-border bg-muted/20 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            📦 Supplementary: Violin-Absolute-Color
          </h2>
          <p className="text-sm text-muted-foreground">
            Zero-entropy color task — hex code prompts across 6 variations, 5 open-source models.
          </p>
        </div>

        {/* Variation sub-tabs */}
        <Tabs value={activeVar} onValueChange={v => { setActiveVar(v); setExpanded(null) }} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 gap-1 h-auto p-1">
            {supplementaryVariations.map(v => (
              <TabsTrigger key={v.id} value={v.id}
                className="flex flex-col items-center gap-1 py-2 text-xs data-[state=active]:bg-primary/10">
                <span className="text-base">{v.icon}</span>
                <span className="hidden sm:inline text-[10px]">{v.shortName}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Variation description */}
        <div className="mb-4 rounded-lg border border-border bg-card/50 p-3">
          <Badge variant="outline" className="border-muted-foreground/50 text-muted-foreground text-xs mb-1">
            {currentVar.name}
          </Badge>
          <p className="text-xs text-muted-foreground">{currentVar.description}</p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-8 text-center">Rank</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="text-center text-xs">rgb-ed</TableHead>
                <TableHead className="text-center text-xs">lab-00</TableHead>
                <TableHead className="text-center text-xs">sd</TableHead>
                <TableHead className="text-center text-xs">ced</TableHead>
                <TableHead className="text-center text-xs">hf</TableHead>
                <TableHead className="text-center text-xs font-semibold">color-mean</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((model, idx) => (
                <Fragment key={model.model}>
                  <TableRow
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setExpanded(expanded === model.model ? null : model.model)}
                  >
                    <TableCell className="text-center text-sm font-medium text-muted-foreground">
                      {idx + 1}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">{model.model}</div>
                      <div className="text-xs text-muted-foreground">{model.organization}</div>
                    </TableCell>
                    {[model.rgbEd, model.labOO, model.sd, model.ced, model.hf].map((v, i) => (
                      <TableCell key={i} className="text-center">
                        <span className={`font-mono text-sm ${scoreColor(v)}`}>{v.toFixed(3)}</span>
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <span className={`font-mono text-sm font-semibold ${scoreColor(model.colorMean)}`}>
                        {model.colorMean.toFixed(3)}
                      </span>
                    </TableCell>
                  </TableRow>
                  {expanded === model.model && (
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableCell colSpan={8} className="p-4">
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p><strong className="text-foreground">Overall Score:</strong> {suppColorScore(model).toFixed(1)} / 100 (higher is better)</p>
                          <p><strong className="text-foreground">color-mean</strong> = mean of normalized(rgb-ed, lab-00, sd, ced, hf)</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}