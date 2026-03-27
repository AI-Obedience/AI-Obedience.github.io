'use client'

import { useState, useMemo, Fragment } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronDown, ChevronUp, Trophy, Medal, Award } from 'lucide-react'
import { 
  getVariationData, 
  variations, 
  calculateOverallScore,
  type ModelResult 
} from '@/lib/data'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="h-4 w-4 text-yellow-500" />
  if (rank === 2) return <Medal className="h-4 w-4 text-gray-400" />
  if (rank === 3) return <Award className="h-4 w-4 text-amber-600" />
  return <span className="text-sm font-medium text-muted-foreground">{rank}</span>
}

function getScoreColor(score: number, metric: 'precision' | 'purity'): string {
  if (metric === 'precision') {
    if (score < 0.1) return 'text-emerald-400'
    if (score < 0.2) return 'text-green-400'
    if (score < 0.3) return 'text-yellow-400'
    return 'text-orange-400'
  } else {
    if (score < 0.05) return 'text-emerald-400'
    if (score < 0.1) return 'text-green-400'
    if (score < 0.15) return 'text-yellow-400'
    return 'text-orange-400'
  }
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percentage = Math.min((value / max) * 100, 100)
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={`h-full rounded-full transition-all ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

function getBarColor(score: number, metric: 'precision' | 'purity'): string {
  if (metric === 'precision') {
    if (score < 0.1) return 'bg-emerald-500'
    if (score < 0.2) return 'bg-green-500'
    if (score < 0.3) return 'bg-yellow-500'
    return 'bg-orange-500'
  } else {
    if (score < 0.05) return 'bg-emerald-500'
    if (score < 0.1) return 'bg-green-500'
    if (score < 0.15) return 'bg-yellow-500'
    return 'bg-orange-500'
  }
}

// Variation 示例数据接口
interface VariationExample {
  prompt: string
  imagePath: string
}

// 每个 variation 的示例数据
const variationExamples: Record<string, VariationExample> = {
  var1: {
    prompt: 'Generate an image with pure color #D7472A (Hex code).',
    imagePath: '/examples/var1-example.png'
  },
  var2: {
    prompt: 'Specified in Hex code, create an image divided vertically into two even halves: left color #BA2B77, right color #E3A045.',
    imagePath: '/examples/var2-example.png'
  },
  var3: {
    prompt: 'Specified in Hex code, generate an image divided into four quadrants: bottom-left color #4FBF9A, bottom-right color #E7E1E9, top-left color #E68697, top-right color #AC4AC3. Ensure clean division.',
    imagePath: '/examples/var3-example.png'
  },
  var4: {
    prompt: 'Represented in Hex code, produce a consistent backdrop entirely in one solid color between #91215C and #D44491.',
    imagePath: '/examples/var4-example.png'
  },
  'var5-chinese': {
    prompt: '使用颜色 #F0A121（十六进制代码）创建一个纯色背景。',
    imagePath: '/examples/var5-chinese-example.png'
  },
  'var5-french': {
    prompt: 'Créez un fond uni avec la couleur #39964A (code hexadécimal).',
    imagePath: '/examples/var5-french-example.png'
  },
  'var6-rgb': {
    prompt: 'Produce a flat backdrop entirely in color rgb(114, 103, 44).',
    imagePath: '/examples/var6-rgb-example.png'
  },
  'var6-hsl': {
    prompt: 'Create a flat surface in color hsl(4, 53%, 31%). Ensure the color is exact, without any variation.',
    imagePath: '/examples/var6-hsl-example.png'
  }
}

export function LeaderboardTable() {
  const [activeVariation, setActiveVariation] = useState('var1')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<'precision' | 'purity' | 'overall'>('overall')
  const [sortAsc, setSortAsc] = useState(true)

  const currentData = useMemo(() => getVariationData(activeVariation), [activeVariation])
  
  const sortedData = useMemo(() => {
    return [...currentData]
      .filter(m => m.colorPrecision.mean > 0)
      .sort((a, b) => {
        let valueA, valueB
        if (sortKey === 'overall') {
          valueA = calculateOverallScore(a)
          valueB = calculateOverallScore(b)
          return sortAsc ? valueB - valueA : valueA - valueB
        } else if (sortKey === 'precision') {
          valueA = a.colorPrecision.mean
          valueB = b.colorPrecision.mean
        } else {
          valueA = a.colorPurity.mean
          valueB = b.colorPurity.mean
        }
        return sortAsc ? valueA - valueB : valueB - valueA
      })
  }, [currentData, sortKey, sortAsc])

  const handleSort = (key: 'precision' | 'purity' | 'overall') => {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(key === 'overall' ? false : true)
    }
  }

  const currentVariation = variations.find(v => v.id === activeVariation)
  const currentExample = variationExamples[activeVariation]

  return (
    <section id="leaderboard" className="bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            🏆 Main Benchmark Leaderboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Compare model performance across different task variations. Lower scores indicate better performance.
          </p>
        </div>

        {/* Variation Tabs */}
        <Tabs value={activeVariation} onValueChange={setActiveVariation} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 gap-1 h-auto p-1">
            {variations.map((v) => (
              <TabsTrigger 
                key={v.id} 
                value={v.id} 
                className="flex flex-col items-center gap-1 py-2 text-xs data-[state=active]:bg-primary/10"
              >
                <span className="text-lg">{v.icon}</span>
                <span className="hidden sm:inline">{v.shortName}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Compact Task Description Card with Inline Example */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="flex items-start gap-4">
            {/* Left: Badge + Description + Example */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-primary/50 text-primary">
                  {currentVariation?.name}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {currentVariation?.description}
              </p>
              
              {/* Inline Example Prompt */}
              <div className="flex items-start gap-2 text-xs">
                <span className="font-medium text-muted-foreground shrink-0">Example:</span>
                <code className="text-foreground/80 break-words">
                  {currentExample?.prompt || 'Example prompt will be added...'}
                </code>
              </div>
            </div>

            {/* Right: Square Example Image */}
            <div className="shrink-0">
              <div className="relative w-24 h-24 rounded-lg border-2 border-border bg-muted/30 overflow-hidden">
                {currentExample?.imagePath ? (
                  <Image
                    src={currentExample.imagePath}
                    alt={`${currentVariation?.name} example`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[10px] text-center p-1">
                    Image
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="w-20 text-center">Type</TableHead>
                <TableHead className="w-40">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs font-medium hover:bg-transparent"
                    onClick={() => handleSort('overall')}
                  >
                    Overall Score
                    {sortKey === 'overall' && (sortAsc ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />)}
                  </Button>
                  <span className="block text-xs font-normal text-muted-foreground">Higher is better</span>
                </TableHead>
                <TableHead className="w-64">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs font-medium hover:bg-transparent"
                    onClick={() => handleSort('precision')}
                  >
                    Color Precision
                    {sortKey === 'precision' && (sortAsc ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />)}
                  </Button>
                  <span className="block text-xs font-normal text-muted-foreground">Lower is better</span>
                </TableHead>
                <TableHead className="w-64">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs font-medium hover:bg-transparent"
                    onClick={() => handleSort('purity')}
                  >
                    Color Purity
                    {sortKey === 'purity' && (sortAsc ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />)}
                  </Button>
                  <span className="block text-xs font-normal text-muted-foreground">Lower is better</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No data available for this variation
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((model, index) => (
                  <Fragment key={model.model}>
                    <TableRow
                      className="cursor-pointer transition-colors hover:bg-muted/50"
                      onClick={() => setExpandedRow(expandedRow === model.model ? null : model.model)}
                    >
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          {getRankIcon(index + 1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{model.model}</span>
                          <span className="text-xs text-muted-foreground">{model.organization}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={model.type === 'Open' ? 'outline' : 'secondary'}
                          className={model.type === 'Open' ? 'border-blue-500/50 text-blue-400' : 'border-purple-500/50 text-purple-400'}
                        >
                          {model.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="w-12 text-left text-sm font-mono text-emerald-400">
                            {calculateOverallScore(model).toFixed(1)}
                          </span>
                          <div className="flex-1">
                            <ProgressBar 
                              value={calculateOverallScore(model)} 
                              max={100} 
                              color="bg-gradient-to-r from-emerald-500 to-green-500" 
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className={`w-16 text-left text-sm font-mono ${getScoreColor(model.colorPrecision.mean, 'precision')}`}>
                            {model.colorPrecision.mean.toFixed(3)}
                          </span>
                          <div className="flex-1">
                            <ProgressBar 
                              value={model.colorPrecision.mean} 
                              max={0.5} 
                              color={getBarColor(model.colorPrecision.mean, 'precision')} 
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className={`w-16 text-left text-sm font-mono ${getScoreColor(model.colorPurity.mean, 'purity')}`}>
                            {model.colorPurity.mean.toFixed(3)}
                          </span>
                          <div className="flex-1">
                            <ProgressBar 
                              value={model.colorPurity.mean} 
                              max={0.3} 
                              color={getBarColor(model.colorPurity.mean, 'purity')} 
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRow === model.model && (
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableCell colSpan={6} className="p-6">
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="mb-3 text-sm font-medium text-foreground">Color Precision Breakdown</h4>
                              <div className="space-y-2">
                                {[
                                  { key: 'RGB Euclidean', value: model.colorPrecision.rgbEd },
                                  { key: 'RGB RedMean', value: model.colorPrecision.rgbRm },
                                  { key: 'CIELAB CIEDE2000', value: model.colorPrecision.lab00 },
                                  { key: 'MAE Hue', value: model.colorPrecision.labHue },
                                  { key: 'Delta Chroma', value: model.colorPrecision.labCh },
                                  { key: 'Delta HyAB', value: model.colorPrecision.labHyab },
                                ].map((metric) => (
                                  <div key={metric.key} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{metric.key}</span>
                                    <span className={`font-mono ${getScoreColor(metric.value, 'precision')}`}>
                                      {metric.value.toFixed(3)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-3 text-sm font-medium text-foreground">Color Purity Breakdown</h4>
                              <div className="space-y-2">
                                {[
                                  { key: 'Standard Dev', value: model.colorPurity.sd },
                                  { key: 'Canny Edge Density', value: model.colorPurity.ced },
                                  { key: 'High Frequency', value: model.colorPurity.hf },
                                ].map((metric) => (
                                  <div key={metric.key} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{metric.key}</span>
                                    <span className={`font-mono ${getScoreColor(metric.value, 'purity')}`}>
                                      {metric.value.toFixed(3)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>💡 Click on any row to view detailed metrics. Data source: VIOLIN Benchmark (ICML 2026)</p>
        </div>
      </div>
    </section>
  )
}