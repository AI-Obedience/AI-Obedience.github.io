'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { generalizationResults, type GeneralizationResult } from '@/lib/data'

export function GeneralizationSection() {
  const [activeSplit, setActiveSplit] = useState<GeneralizationResult['split']>('Prompt-Split')
  
  const currentData = generalizationResults.find(r => r.split === activeSplit)

  return (
    <section className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            🧪 Generalization Track
          </h2>
          <p className="text-sm text-muted-foreground">
            Evaluating Janus-Pro model's zero-shot generalization on unseen data splits.
          </p>
        </div>

        <Tabs value={activeSplit} onValueChange={(v) => setActiveSplit(v as GeneralizationResult['split'])} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            {generalizationResults.map((r) => (
              <TabsTrigger 
                key={r.split} 
                value={r.split} 
                className="flex flex-col items-start gap-1 py-3 px-4 text-left data-[state=active]:bg-primary/10"
              >
                <span className="text-xs font-semibold">{r.split}</span>
                <span className="text-[10px] text-muted-foreground line-clamp-1">{r.strategy.slice(0, 30)}...</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {currentData && (
          <>
            <div className="mb-4 rounded-lg border border-border bg-card/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-primary/50 text-primary">
                  {currentData.split}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Strategy:</strong> {currentData.strategy}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-center">Training Set</TableHead>
                    <TableHead className="text-center">Test Set</TableHead>
                    <TableHead className="text-center">Full Set</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { key: 'Pre-max', train: currentData.metrics.trainingSet.preMax, test: currentData.metrics.testSet.preMax, full: currentData.metrics.fullSet.preMax },
                    { key: 'Pre-mean', train: currentData.metrics.trainingSet.preMean, test: currentData.metrics.testSet.preMean, full: currentData.metrics.fullSet.preMean },
                    { key: 'Pre-std', train: currentData.metrics.trainingSet.preStd, test: currentData.metrics.testSet.preStd, full: currentData.metrics.fullSet.preStd },
                    { key: 'Pur-max', train: currentData.metrics.trainingSet.purMax, test: currentData.metrics.testSet.purMax, full: currentData.metrics.fullSet.purMax },
                    { key: 'Pur-mean', train: currentData.metrics.trainingSet.purMean, test: currentData.metrics.testSet.purMean, full: currentData.metrics.fullSet.purMean },
                    { key: 'Pur-std', train: currentData.metrics.trainingSet.purStd, test: currentData.metrics.testSet.purStd, full: currentData.metrics.fullSet.purStd },
                    { key: 'Avg-max', train: currentData.metrics.trainingSet.avgMax, test: currentData.metrics.testSet.avgMax, full: currentData.metrics.fullSet.avgMax },
                    { key: 'Avg-mean', train: currentData.metrics.trainingSet.avgMean, test: currentData.metrics.testSet.avgMean, full: currentData.metrics.fullSet.avgMean },
                    { key: 'Avg-std', train: currentData.metrics.trainingSet.avgStd, test: currentData.metrics.testSet.avgStd, full: currentData.metrics.fullSet.avgStd },
                  ].map((metric) => (
                    <TableRow key={metric.key}>
                      <TableCell className="font-medium">{metric.key}</TableCell>
                      <TableCell className="text-center font-mono text-sm text-green-400">{metric.train.toFixed(3)}</TableCell>
                      <TableCell className="text-center font-mono text-sm text-orange-400">{metric.test.toFixed(3)}</TableCell>
                      <TableCell className="text-center font-mono text-sm text-blue-400">{metric.full.toFixed(3)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 rounded-lg border border-amber-500/50 bg-amber-500/10 p-3">
              <p className="text-sm text-amber-400">
                <strong>Observation:</strong> Test set error is {((currentData.metrics.testSet.preMean / currentData.metrics.trainingSet.preMean - 1) * 100).toFixed(0)}% higher than training set, 
                indicating generalization challenges on unseen {activeSplit === 'Prompt-Split' ? 'prompts' : 'hue ranges'}.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}