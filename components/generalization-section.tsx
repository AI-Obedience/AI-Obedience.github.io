'use client'

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { generalizationResults } from '@/lib/data'

export function GeneralizationSection() {
  return (
    <section className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">🧪 Generalization Track</h2>
          <p className="text-sm text-muted-foreground">
            Zero-shot generalization of Qwen-Image (fine-tuned) evaluated across three color partition strategies.
            Color purity generalizes across splits; color precision degrades on unseen hue ranges, suggesting
            models rely on memorization rather than a principled understanding of color space.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-40">Split Strategy</TableHead>
                <TableHead className="text-xs">Description</TableHead>
                <TableHead className="text-center text-xs w-20">rgb-ed</TableHead>
                <TableHead className="text-center text-xs w-20">lab-00</TableHead>
                <TableHead className="text-center text-xs w-16">sd</TableHead>
                <TableHead className="text-center text-xs w-16">ced</TableHead>
                <TableHead className="text-center text-xs w-16">hf</TableHead>
                <TableHead className="text-center text-xs font-semibold w-24">color-mean</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generalizationResults.map(r => (
                <TableRow key={r.split}>
                  <TableCell>
                    <Badge variant="outline" className="border-primary/50 text-primary text-xs whitespace-nowrap">
                      {r.split}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-xs">
                    {r.strategy}
                  </TableCell>
                  <TableCell className="text-center font-mono text-sm text-foreground/80">{r.rgbEd.toFixed(3)}</TableCell>
                  <TableCell className="text-center font-mono text-sm text-foreground/80">{r.labOO.toFixed(3)}</TableCell>
                  <TableCell className="text-center font-mono text-sm text-foreground/80">{r.sd.toFixed(3)}</TableCell>
                  <TableCell className="text-center font-mono text-sm text-foreground/80">{r.ced.toFixed(3)}</TableCell>
                  <TableCell className="text-center font-mono text-sm text-foreground/80">{r.hf.toFixed(3)}</TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono text-sm font-semibold text-emerald-400">{r.colorMean.toFixed(3)}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 rounded-lg border border-blue-500/50 bg-blue-500/10 p-3">
          <p className="text-sm text-blue-400">
            <strong>Observation:</strong> color-mean increases from Prompt-Split (0.054) to hue-based splits (0.062–0.065),
            indicating that models can generalize across prompt phrasings better than across unseen color regions.
          </p>
        </div>
      </div>
    </section>
  )
}