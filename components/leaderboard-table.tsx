'use client'

import { useState, useMemo, Fragment } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { ChevronDown, ChevronUp, Trophy, Medal, Award } from 'lucide-react'
import {
  pureColorVar1Results, imageMaskResults, geometricShapeResults,
  mainTasks, pureColorScore, imageMaskScore, geometricScore,
  type PureColorResult, type ImageMaskResult, type GeometricShapeResult,
} from '@/lib/data'

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="h-4 w-4 text-yellow-500" />
  if (rank === 2) return <Medal  className="h-4 w-4 text-gray-400" />
  if (rank === 3) return <Award  className="h-4 w-4 text-amber-600" />
  return <span className="text-sm font-medium text-muted-foreground">{rank}</span>
}

function errorColor(v: number, low: number, mid: number): string {
  if (v < low) return 'text-emerald-400'
  if (v < mid) return 'text-green-400'
  if (v < mid * 1.5) return 'text-yellow-400'
  return 'text-orange-400'
}
function errorBarColor(v: number, low: number, mid: number): string {
  if (v < low) return 'bg-emerald-500'
  if (v < mid) return 'bg-green-500'
  if (v < mid * 1.5) return 'bg-yellow-500'
  return 'bg-orange-500'
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div className={`h-full rounded-full transition-all ${color}`}
           style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
    </div>
  )
}

function isPureColor(r: PureColorResult | ImageMaskResult | GeometricShapeResult): r is PureColorResult {
  return 'colorMean' in r
}
function isImageMask(r: PureColorResult | ImageMaskResult | GeometricShapeResult): r is ImageMaskResult {
  return 'shapeMean' in r
}
function isGeometricShape(r: PureColorResult | ImageMaskResult | GeometricShapeResult): r is GeometricShapeResult {
  return 'maskMean' in r
}

type AnyResult = PureColorResult | ImageMaskResult | GeometricShapeResult
function getScore(r: AnyResult): number {
  if (isPureColor(r))      return pureColorScore(r)
  if (isImageMask(r))      return imageMaskScore(r)
  if (isGeometricShape(r)) return geometricScore(r)
  return 0
}
function getMeanValue(r: AnyResult): number {
  if (isPureColor(r))      return r.colorMean
  if (isImageMask(r))      return r.shapeMean
  if (isGeometricShape(r)) return r.maskMean
  return 0
}

function PureColorDetail({ r }: { r: PureColorResult }) {
  const rows = [
    { label: 'RGB Euclidean Distance (rgb-ed)', value: r.rgbEd },
    { label: 'CIEDE2000 (lab-00)',              value: r.labOO },
    { label: 'Standard Deviation (sd)',          value: r.sd },
    { label: 'Canny Edge Density (ced)',          value: r.ced },
    { label: 'High-Frequency Ratio (hf)',         value: r.hf },
  ]
  return (
    <div>
      <h4 className="mb-3 text-sm font-medium text-foreground">Pure Color Metrics Breakdown</h4>
      <div className="space-y-2">
        {rows.map(m => (
          <div key={m.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{m.label}</span>
            <span className={`font-mono ${errorColor(m.value, 0.1, 0.2)}`}>{m.value.toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageMaskDetail({ r }: { r: ImageMaskResult }) {
  const rows = [
    { label: 'Global IoU (iou)',          value: r.iou },
    { label: 'Boundary IoU (biou)',        value: r.biou },
    { label: 'Content Leakage (leak)',     value: r.leak },
    { label: 'Edge Sharpness (edge)',      value: r.edge },
    { label: 'Centroid Offset (dist)',     value: r.dist },
  ]
  return (
    <div>
      <h4 className="mb-3 text-sm font-medium text-foreground">Image Mask Metrics Breakdown</h4>
      <div className="space-y-2">
        {rows.map(m => (
          <div key={m.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{m.label}</span>
            <span className={`font-mono ${errorColor(m.value, 0.2, 0.4)}`}>{m.value.toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GeometricDetail({ r }: { r: GeometricShapeResult }) {
  const rows = [
    { label: 'Shape IoU (iou)',              value: r.iou },
    { label: 'Size Deviation (size)',         value: r.size },
    { label: 'Geometric Similarity (shape)',  value: r.shape },
    { label: 'Regional Purity (purity)',      value: r.purity },
    { label: 'Centroid Distance (dist)',      value: r.dist },
  ]
  return (
    <div>
      <h4 className="mb-3 text-sm font-medium text-foreground">Geometric Shape Metrics Breakdown</h4>
      <div className="space-y-2">
        {rows.map(m => (
          <div key={m.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{m.label}</span>
            <span className={`font-mono ${errorColor(m.value, 0.2, 0.4)}`}>{m.value.toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LeaderboardTable() {
  const [activeTask, setActiveTask] = useState('pure-color')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [sortKey, setSortKey] = useState<'score' | 'mean'>('score')

  const rawData: AnyResult[] = useMemo(() => {
    if (activeTask === 'pure-color')      return pureColorVar1Results
    if (activeTask === 'image-mask')      return imageMaskResults
    if (activeTask === 'geometric-shape') return geometricShapeResults
    return pureColorVar1Results
  }, [activeTask])

  const sortedData = useMemo(() => {
    return [...rawData].sort((a, b) => {
      const va = sortKey === 'score' ? getScore(a) : getMeanValue(a)
      const vb = sortKey === 'score' ? getScore(b) : getMeanValue(b)
      if (sortKey === 'score') return sortAsc ? vb - va : va - vb
      return sortAsc ? va - vb : vb - va
    })
  }, [rawData, sortKey, sortAsc])

  const handleSort = (key: 'score' | 'mean') => {
    if (sortKey === key) { setSortAsc(!sortAsc) }
    else { setSortKey(key); setSortAsc(key === 'score' ? false : true) }
  }

  const currentTask = mainTasks.find(t => t.id === activeTask)!
  const meanLabel  = activeTask === 'pure-color' ? 'color-mean' : activeTask === 'image-mask' ? 'shape-mean' : 'mask-mean'
  const meanMax    = activeTask === 'pure-color' ? 0.3 : 0.6
  const meanLow    = activeTask === 'pure-color' ? 0.1 : 0.2
  const meanMid    = activeTask === 'pure-color' ? 0.2 : 0.4

  return (
    <section id="leaderboard" className="bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">🏆 Main Benchmark Leaderboard</h2>
          <p className="text-sm text-muted-foreground">
            Three deterministic Level-4 Obedience tasks. Lower error scores indicate better obedience.
          </p>
        </div>

        {/* Task tabs */}
        <Tabs value={activeTask} onValueChange={(v) => { setActiveTask(v); setExpandedRow(null) }} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            {mainTasks.map(t => (
              <TabsTrigger key={t.id} value={t.id}
                className="flex flex-col items-center gap-1 py-3 text-xs data-[state=active]:bg-primary/10">
                <span className="text-lg">{t.icon}</span>
                <span className="hidden sm:inline font-medium">{t.shortName}</span>
                <span className="hidden md:inline text-[10px] text-muted-foreground">{t.source}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Task description card — no metrics badges */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-primary/50 text-primary">{currentTask.name}</Badge>
            <Badge variant="secondary" className="text-xs">{currentTask.source}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{currentTask.description}</p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="w-20 text-center">Type</TableHead>
                <TableHead className="w-44">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-medium hover:bg-transparent"
                    onClick={() => handleSort('score')}>
                    Overall Score
                    {sortKey === 'score' && (sortAsc ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />)}
                  </Button>
                  <span className="block text-xs font-normal text-muted-foreground">Higher is better</span>
                </TableHead>
                <TableHead className="w-64">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-medium hover:bg-transparent"
                    onClick={() => handleSort('mean')}>
                    {meanLabel}
                    {sortKey === 'mean' && (sortAsc ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />)}
                  </Button>
                  <span className="block text-xs font-normal text-muted-foreground">Lower is better</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((model, index) => {
                  const score    = getScore(model)
                  const meanVal  = getMeanValue(model)
                  const expanded = expandedRow === model.model
                  return (
                    <Fragment key={model.model}>
                      <TableRow
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setExpandedRow(expanded ? null : model.model)}
                      >
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">{getRankIcon(index + 1)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{model.model}</span>
                            <span className="text-xs text-muted-foreground">{model.organization}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={model.type === 'Open' ? 'outline' : 'secondary'}
                            className={model.type === 'Open'
                              ? 'border-blue-500/50 text-blue-400'
                              : 'border-purple-500/50 text-purple-400'}>
                            {model.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="w-12 text-left text-sm font-mono text-emerald-400">{score.toFixed(1)}</span>
                            <div className="flex-1">
                              <ProgressBar value={score} max={100} color="bg-gradient-to-r from-emerald-500 to-green-500" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className={`w-16 text-left text-sm font-mono ${errorColor(meanVal, meanLow, meanMid)}`}>
                              {meanVal.toFixed(3)}
                            </span>
                            <div className="flex-1">
                              <ProgressBar value={meanVal} max={meanMax} color={errorBarColor(meanVal, meanLow, meanMid)} />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expanded && (
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableCell colSpan={5} className="p-6">
                            {isPureColor(model)      && <PureColorDetail    r={model} />}
                            {isImageMask(model)      && <ImageMaskDetail    r={model} />}
                            {isGeometricShape(model) && <GeometricDetail    r={model} />}
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>💡 Click any row to view detailed metric breakdown. All metrics are error measures — lower is better.</p>
        </div>
      </div>
    </section>
  )
}