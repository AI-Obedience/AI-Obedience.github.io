// =====================================================
// MAIN BENCHMARK DATA — Violin Paper
// =====================================================

// ── Task 1: Pure Color Generation (Table 1) ──────────
export interface PureColorResult {
  model: string
  type: 'Open' | 'Closed'
  organization: string
  rgbEd: number
  labOO: number
  sd: number
  ced: number
  hf: number
  colorMean: number
  date: string
}

// ── Task 2: Image Mask (Table 2) ─────────────────────
export interface ImageMaskResult {
  model: string
  type: 'Open' | 'Closed'
  organization: string
  iou: number
  biou: number
  leak: number
  edge: number
  dist: number
  shapeMean: number
  date: string
}

// ── Task 3: Geometric Shape Generation (Table 3) ─────
export interface GeometricShapeResult {
  model: string
  type: 'Open' | 'Closed'
  organization: string
  iou: number
  size: number
  shape: number
  purity: number
  dist: number
  maskMean: number
  date: string
}

// ── Supplementary: Violin-Absolute-Color ──
export interface SupplementaryColorResult {
  model: string
  type: 'Open' | 'Closed'
  organization: string
  rgbEd: number
  labOO: number
  sd: number
  ced: number
  hf: number
  colorMean: number
  date: string
}

// ── Fine-tuning: Qwen-Image across Var 1–6 ──
export interface QwenFineTuningResult {
  variation: string
  before: number
  rgbEd: number
  labOO: number
  sd: number
  ced: number
  hf: number
  colorMean: number
  change: number
}

// ── Fine-tuning: cross-model on Var-1 ──────
export interface CrossModelFineTuningResult {
  model: string
  organization: string
  type: 'Open' | 'Closed'
  before: number
  rgbEd: number
  labOO: number
  sd: number
  ced: number
  hf: number
  colorMean: number
  change: number
}

// ── Generalization ─────────────────────────
export interface GeneralizationResult {
  split: 'Prompt-Split' | 'Hue-Split1' | 'Hue-Split2'
  strategy: string
  rgbEd: number
  labOO: number
  sd: number
  ced: number
  hf: number
  colorMean: number
}

// =====================================================
// MAIN TASK DATA
// =====================================================

export const pureColorVar1Results: PureColorResult[] = [
  { model: 'FLUX.1',        type: 'Open',   organization: 'Black Forest Labs', rgbEd: 0.206, labOO: 0.167, sd: 0.064, ced: 0.006, hf: 0.016, colorMean: 0.091, date: 'Aug 2024' },
  { model: 'FLUX.2',        type: 'Open',   organization: 'Black Forest Labs', rgbEd: 0.123, labOO: 0.091, sd: 0.044, ced: 0.007, hf: 0.021, colorMean: 0.057, date: 'Mar 2025' },
  { model: 'Z-Image',       type: 'Open',   organization: 'Huawei',            rgbEd: 0.135, labOO: 0.092, sd: 0.078, ced: 0.002, hf: 0.007, colorMean: 0.061, date: 'Nov 2024' },
  { model: 'Qwen-Image',    type: 'Open',   organization: 'Alibaba',           rgbEd: 0.122, labOO: 0.084, sd: 0.047, ced: 0.002, hf: 0.017, colorMean: 0.057, date: 'Aug 2025' },
  { model: 'Nano-Banana-2', type: 'Closed', organization: 'Google',            rgbEd: 0.126, labOO: 0.093, sd: 0.033, ced: 0.001, hf: 0.010, colorMean: 0.053, date: 'Feb 2025' },
  { model: 'Seedream-5',    type: 'Closed', organization: 'ByteDance',         rgbEd: 0.134, labOO: 0.093, sd: 0.015, ced: 0.001, hf: 0.001, colorMean: 0.049, date: 'Mar 2025' },
  { model: 'GPT-Image-2',   type: 'Closed', organization: 'OpenAI',            rgbEd: 0.137, labOO: 0.083, sd: 0.006, ced: 0.000, hf: 0.031, colorMean: 0.051, date: 'Apr 2025' },
]

export const imageMaskResults: ImageMaskResult[] = [
  { model: 'FLUX.2',        type: 'Open',   organization: 'Black Forest Labs', iou: 0.848, biou: 0.948, leak: 0.438, edge: 0.131, dist: 0.197, shapeMean: 0.512, date: 'Mar 2025' },
  { model: 'Nano-Banana-2', type: 'Closed', organization: 'Google',            iou: 0.474, biou: 0.772, leak: 0.286, edge: 0.172, dist: 0.127, shapeMean: 0.366, date: 'Feb 2025' },
  { model: 'Seedream-5',    type: 'Closed', organization: 'ByteDance',         iou: 0.331, biou: 0.725, leak: 0.177, edge: 0.073, dist: 0.093, shapeMean: 0.280, date: 'Mar 2025' },
  { model: 'GPT-Image-2',   type: 'Closed', organization: 'OpenAI',            iou: 0.096, biou: 0.398, leak: 0.087, edge: 0.186, dist: 0.023, shapeMean: 0.158, date: 'Apr 2025' },
]

export const geometricShapeResults: GeometricShapeResult[] = [
  { model: 'FLUX.1',        type: 'Open',   organization: 'Black Forest Labs', iou: 0.725, size: 0.703, shape: 0.167, purity: 0.172, dist: 0.267, maskMean: 0.407, date: 'Aug 2024' },
  { model: 'FLUX.2',        type: 'Open',   organization: 'Black Forest Labs', iou: 0.607, size: 0.659, shape: 0.004, purity: 0.127, dist: 0.122, maskMean: 0.304, date: 'Mar 2025' },
  { model: 'Z-Image',       type: 'Open',   organization: 'Huawei',            iou: 0.648, size: 0.686, shape: 0.002, purity: 0.133, dist: 0.409, maskMean: 0.376, date: 'Nov 2024' },
  { model: 'Qwen-Image',    type: 'Open',   organization: 'Alibaba',           iou: 0.645, size: 0.630, shape: 0.001, purity: 0.283, dist: 0.128, maskMean: 0.337, date: 'Aug 2025' },
  { model: 'Nano-Banana-2', type: 'Closed', organization: 'Google',            iou: 0.566, size: 0.597, shape: 0.046, purity: 0.105, dist: 0.097, maskMean: 0.282, date: 'Feb 2025' },
  { model: 'Seedream-5',    type: 'Closed', organization: 'ByteDance',         iou: 0.551, size: 0.376, shape: 0.006, purity: 0.035, dist: 0.070, maskMean: 0.207, date: 'Mar 2025' },
  { model: 'GPT-Image-2',   type: 'Closed', organization: 'OpenAI',            iou: 0.317, size: 0.278, shape: 0.003, purity: 0.038, dist: 0.033, maskMean: 0.134, date: 'Apr 2025' },
]

// =====================================================
// SUPPLEMENTARY: Violin-Absolute-Color
// =====================================================

export const suppVar1Results: SupplementaryColorResult[] = [
  { model: 'SANA',          type: 'Open', organization: 'NVIDIA',           rgbEd: 0.288, labOO: 0.331, sd: 0.232, ced: 0.028, hf: 0.030, colorMean: 0.182, date: 'Nov 2024' },
  { model: 'Janus-Pro-1.5', type: 'Open', organization: 'DeepSeek',         rgbEd: 0.344, labOO: 0.410, sd: 0.193, ced: 0.006, hf: 0.004, colorMean: 0.191, date: 'Jan 2025' },
  { model: 'FLUX.1',        type: 'Open', organization: 'Black Forest Labs', rgbEd: 0.364, labOO: 0.387, sd: 0.044, ced: 0.001, hf: 0.001, colorMean: 0.159, date: 'Aug 2024' },
  { model: 'Qwen-Image',    type: 'Open', organization: 'Alibaba',           rgbEd: 0.156, labOO: 0.180, sd: 0.058, ced: 0.002, hf: 0.021, colorMean: 0.083, date: 'Aug 2025' },
  { model: 'OmniGen2',      type: 'Open', organization: 'PKU/VectorSpace',   rgbEd: 0.397, labOO: 0.402, sd: 0.202, ced: 0.070, hf: 0.016, colorMean: 0.217, date: 'Jun 2025' },
]

export const suppVar2Results: SupplementaryColorResult[] = [
  { model: 'SANA',          type: 'Open', organization: 'NVIDIA',           rgbEd: 0.315, labOO: 0.352, sd: 0.312, ced: 0.019, hf: 0.021, colorMean: 0.204, date: 'Nov 2024' },
  { model: 'Janus-Pro-1.5', type: 'Open', organization: 'DeepSeek',         rgbEd: 0.335, labOO: 0.359, sd: 0.216, ced: 0.009, hf: 0.012, colorMean: 0.186, date: 'Jan 2025' },
  { model: 'FLUX.1',        type: 'Open', organization: 'Black Forest Labs', rgbEd: 0.357, labOO: 0.384, sd: 0.117, ced: 0.005, hf: 0.005, colorMean: 0.174, date: 'Aug 2024' },
  { model: 'Qwen-Image',    type: 'Open', organization: 'Alibaba',           rgbEd: 0.128, labOO: 0.143, sd: 0.111, ced: 0.007, hf: 0.028, colorMean: 0.083, date: 'Aug 2025' },
  { model: 'OmniGen2',      type: 'Open', organization: 'PKU/VectorSpace',   rgbEd: 0.388, labOO: 0.396, sd: 0.236, ced: 0.036, hf: 0.026, colorMean: 0.216, date: 'Jun 2025' },
]

export const suppVar3Results: SupplementaryColorResult[] = [
  { model: 'SANA',          type: 'Open', organization: 'NVIDIA',           rgbEd: 0.369, labOO: 0.401, sd: 0.433, ced: 0.030, hf: 0.035, colorMean: 0.254, date: 'Nov 2024' },
  { model: 'Janus-Pro-1.5', type: 'Open', organization: 'DeepSeek',         rgbEd: 0.338, labOO: 0.383, sd: 0.220, ced: 0.022, hf: 0.024, colorMean: 0.197, date: 'Jan 2025' },
  { model: 'FLUX.1',        type: 'Open', organization: 'Black Forest Labs', rgbEd: 0.386, labOO: 0.416, sd: 0.142, ced: 0.008, hf: 0.008, colorMean: 0.192, date: 'Aug 2024' },
  { model: 'Qwen-Image',    type: 'Open', organization: 'Alibaba',           rgbEd: 0.229, labOO: 0.264, sd: 0.174, ced: 0.015, hf: 0.029, colorMean: 0.142, date: 'Aug 2025' },
  { model: 'OmniGen2',      type: 'Open', organization: 'PKU/VectorSpace',   rgbEd: 0.410, labOO: 0.433, sd: 0.242, ced: 0.024, hf: 0.025, colorMean: 0.227, date: 'Jun 2025' },
]

export const suppVar4Results: SupplementaryColorResult[] = [
  { model: 'SANA',          type: 'Open', organization: 'NVIDIA',           rgbEd: 0.321, labOO: 0.367, sd: 0.202, ced: 0.048, hf: 0.017, colorMean: 0.191, date: 'Nov 2024' },
  { model: 'Janus-Pro-1.5', type: 'Open', organization: 'DeepSeek',         rgbEd: 0.281, labOO: 0.380, sd: 0.086, ced: 0.005, hf: 0.004, colorMean: 0.151, date: 'Jan 2025' },
  { model: 'FLUX.1',        type: 'Open', organization: 'Black Forest Labs', rgbEd: 0.336, labOO: 0.382, sd: 0.062, ced: 0.001, hf: 0.001, colorMean: 0.156, date: 'Aug 2024' },
  { model: 'Qwen-Image',    type: 'Open', organization: 'Alibaba',           rgbEd: 0.280, labOO: 0.303, sd: 0.123, ced: 0.004, hf: 0.018, colorMean: 0.146, date: 'Aug 2025' },
  { model: 'OmniGen2',      type: 'Open', organization: 'PKU/VectorSpace',   rgbEd: 0.384, labOO: 0.400, sd: 0.132, ced: 0.042, hf: 0.017, colorMean: 0.195, date: 'Jun 2025' },
]

export const suppVar5ChineseResults: SupplementaryColorResult[] = [
  { model: 'SANA',          type: 'Open', organization: 'NVIDIA',           rgbEd: 0.304, labOO: 0.344, sd: 0.178, ced: 0.041, hf: 0.011, colorMean: 0.176, date: 'Nov 2024' },
  { model: 'Janus-Pro-1.5', type: 'Open', organization: 'DeepSeek',         rgbEd: 0.340, labOO: 0.373, sd: 0.468, ced: 0.025, hf: 0.013, colorMean: 0.244, date: 'Jan 2025' },
  { model: 'FLUX.1',        type: 'Open', organization: 'Black Forest Labs', rgbEd: 0.415, labOO: 0.397, sd: 0.529, ced: 0.105, hf: 0.051, colorMean: 0.300, date: 'Aug 2024' },
  { model: 'Qwen-Image',    type: 'Open', organization: 'Alibaba',           rgbEd: 0.145, labOO: 0.178, sd: 0.081, ced: 0.005, hf: 0.013, colorMean: 0.084, date: 'Aug 2025' },
  { model: 'OmniGen2',      type: 'Open', organization: 'PKU/VectorSpace',   rgbEd: 0.397, labOO: 0.414, sd: 0.173, ced: 0.051, hf: 0.015, colorMean: 0.210, date: 'Jun 2025' },
]

export const suppVar5FrenchResults: SupplementaryColorResult[] = [
  { model: 'SANA',          type: 'Open', organization: 'NVIDIA',           rgbEd: 0.306, labOO: 0.342, sd: 0.257, ced: 0.031, hf: 0.041, colorMean: 0.195, date: 'Nov 2024' },
  { model: 'Janus-Pro-1.5', type: 'Open', organization: 'DeepSeek',         rgbEd: 0.343, labOO: 0.382, sd: 0.389, ced: 0.014, hf: 0.015, colorMean: 0.229, date: 'Jan 2025' },
  { model: 'FLUX.1',        type: 'Open', organization: 'Black Forest Labs', rgbEd: 0.372, labOO: 0.390, sd: 0.267, ced: 0.020, hf: 0.016, colorMean: 0.213, date: 'Aug 2024' },
  { model: 'Qwen-Image',    type: 'Open', organization: 'Alibaba',           rgbEd: 0.161, labOO: 0.201, sd: 0.051, ced: 0.002, hf: 0.007, colorMean: 0.084, date: 'Aug 2025' },
  { model: 'OmniGen2',      type: 'Open', organization: 'PKU/VectorSpace',   rgbEd: 0.428, labOO: 0.431, sd: 0.379, ced: 0.116, hf: 0.024, colorMean: 0.276, date: 'Jun 2025' },
]

export const suppVar6RGBResults: SupplementaryColorResult[] = [
  { model: 'SANA',          type: 'Open', organization: 'NVIDIA',           rgbEd: 0.331, labOO: 0.383, sd: 0.381, ced: 0.061, hf: 0.034, colorMean: 0.238, date: 'Nov 2024' },
  { model: 'Janus-Pro-1.5', type: 'Open', organization: 'DeepSeek',         rgbEd: 0.343, labOO: 0.406, sd: 0.250, ced: 0.003, hf: 0.005, colorMean: 0.201, date: 'Jan 2025' },
  { model: 'FLUX.1',        type: 'Open', organization: 'Black Forest Labs', rgbEd: 0.359, labOO: 0.394, sd: 0.153, ced: 0.001, hf: 0.002, colorMean: 0.182, date: 'Aug 2024' },
  { model: 'Qwen-Image',    type: 'Open', organization: 'Alibaba',           rgbEd: 0.212, labOO: 0.221, sd: 0.063, ced: 0.001, hf: 0.009, colorMean: 0.101, date: 'Aug 2025' },
  { model: 'OmniGen2',      type: 'Open', organization: 'PKU/VectorSpace',   rgbEd: 0.427, labOO: 0.447, sd: 0.056, ced: 0.012, hf: 0.001, colorMean: 0.189, date: 'Jun 2025' },
]

export const suppVar6HSLResults: SupplementaryColorResult[] = [
  { model: 'SANA',          type: 'Open', organization: 'NVIDIA',           rgbEd: 0.339, labOO: 0.387, sd: 0.335, ced: 0.052, hf: 0.027, colorMean: 0.228, date: 'Nov 2024' },
  { model: 'Janus-Pro-1.5', type: 'Open', organization: 'DeepSeek',         rgbEd: 0.355, labOO: 0.396, sd: 0.264, ced: 0.007, hf: 0.006, colorMean: 0.206, date: 'Jan 2025' },
  { model: 'FLUX.1',        type: 'Open', organization: 'Black Forest Labs', rgbEd: 0.366, labOO: 0.388, sd: 0.139, ced: 0.003, hf: 0.002, colorMean: 0.180, date: 'Aug 2024' },
  { model: 'Qwen-Image',    type: 'Open', organization: 'Alibaba',           rgbEd: 0.314, labOO: 0.346, sd: 0.102, ced: 0.004, hf: 0.007, colorMean: 0.155, date: 'Aug 2025' },
  { model: 'OmniGen2',      type: 'Open', organization: 'PKU/VectorSpace',   rgbEd: 0.374, labOO: 0.394, sd: 0.103, ced: 0.034, hf: 0.003, colorMean: 0.182, date: 'Jun 2025' },
]

// =====================================================
// FINE-TUNING DATA
// =====================================================

export const qwenFineTuningByVar: QwenFineTuningResult[] = [
  { variation: 'Var-1', before: 0.083, rgbEd: 0.093, labOO: 0.124, sd: 0.023, ced: 0.001, hf: 0.001, colorMean: 0.048, change: -0.035 },
  { variation: 'Var-2', before: 0.083, rgbEd: 0.088, labOO: 0.110, sd: 0.027, ced: 0.003, hf: 0.005, colorMean: 0.046, change: -0.037 },
  { variation: 'Var-3', before: 0.142, rgbEd: 0.163, labOO: 0.186, sd: 0.042, ced: 0.006, hf: 0.005, colorMean: 0.080, change: -0.062 },
  { variation: 'Var-4', before: 0.146, rgbEd: 0.237, labOO: 0.266, sd: 0.052, ced: 0.001, hf: 0.003, colorMean: 0.111, change: -0.035 },
  { variation: 'Var-5', before: 0.084, rgbEd: 0.103, labOO: 0.140, sd: 0.023, ced: 0.001, hf: 0.004, colorMean: 0.054, change: -0.030 },
  { variation: 'Var-6', before: 0.128, rgbEd: 0.190, labOO: 0.227, sd: 0.011, ced: 0.001, hf: 0.001, colorMean: 0.086, change: -0.042 },
]

export const crossModelFineTuning: CrossModelFineTuningResult[] = [
  { model: 'SANA',          organization: 'NVIDIA',           type: 'Open', before: 0.182, rgbEd: 0.292, labOO: 0.330, sd: 0.211, ced: 0.001, hf: 0.027, colorMean: 0.172, change: -0.010 },
  { model: 'Janus-Pro-1.5', organization: 'DeepSeek',         type: 'Open', before: 0.191, rgbEd: 0.090, labOO: 0.121, sd: 0.010, ced: 0.001, hf: 0.001, colorMean: 0.045, change: -0.146 },
  { model: 'FLUX.1',        organization: 'Black Forest Labs', type: 'Open', before: 0.159, rgbEd: 0.227, labOO: 0.283, sd: 0.004, ced: 0.000, hf: 0.001, colorMean: 0.103, change: -0.056 },
  { model: 'Qwen-Image',    organization: 'Alibaba',           type: 'Open', before: 0.083, rgbEd: 0.167, labOO: 0.208, sd: 0.018, ced: 0.001, hf: 0.001, colorMean: 0.079, change: -0.004 },
  { model: 'OmniGen2',      organization: 'PKU/VectorSpace',   type: 'Open', before: 0.217, rgbEd: 0.413, labOO: 0.412, sd: 0.159, ced: 0.060, hf: 0.014, colorMean: 0.212, change: -0.005 },
]

// =====================================================
// GENERALIZATION DATA
// =====================================================

export const generalizationResults: GeneralizationResult[] = [
  {
    split: 'Prompt-Split',
    strategy: 'Split data by prompt template; train on 80%, test on held-out templates',
    rgbEd: 0.095, labOO: 0.113, sd: 0.048, ced: 0.004, hf: 0.010, colorMean: 0.054,
  },
  {
    split: 'Hue-Split1',
    strategy: 'Train on hues outside 280°–320°; test on purple range (280°–320°)',
    rgbEd: 0.127, labOO: 0.156, sd: 0.023, ced: 0.003, hf: 0.002, colorMean: 0.062,
  },
  {
    split: 'Hue-Split2',
    strategy: 'Train on 0°–60°, 120°–180°, 240°–300°; test on remaining hue ranges',
    rgbEd: 0.128, labOO: 0.158, sd: 0.034, ced: 0.003, hf: 0.004, colorMean: 0.065,
  },
]

// =====================================================
// METADATA
// =====================================================

export const mainTasks = [
  {
    id: 'pure-color',
    name: 'Pure Color Generation',
    shortName: 'Pure Color',
    icon: '🎨',
    description: 'Generate uniform color blocks using ISCC-NBS Level-2 natural language color names. Measures pixel-level color accuracy and image purity.',
    source: 'Single Block',
    metrics: ['rgb-ed', 'lab-00', 'sd', 'ced', 'hf', 'color-mean'],
    meanKey: 'colorMean' as const,
  },
  {
    id: 'image-mask',
    name: 'Image Masking',
    shortName: 'Image Mask',
    icon: '🖼️',
    description: 'Apply binary masks (Inpainting / Outpainting / Random) to images with strict pixel-level adherence. Evaluates spatial coverage and boundary precision.',
    source: 'Inpainting · Outpainting · Random',
    metrics: ['iou', 'biou', 'leak', 'edge', 'dist', 'shape-mean'],
    meanKey: 'shapeMean' as const,
  },
  {
    id: 'geometric-shape',
    name: 'Geometric Shape Generation',
    shortName: 'Geom. Shape',
    icon: '⭕',
    description: 'Generate circles, squares, and triangles at precisely specified spatial positions. Measures shape fidelity, localization accuracy, and fill purity.',
    source: 'Circle · Square · Triangle',
    metrics: ['iou', 'size', 'shape', 'purity', 'dist', 'mask-mean'],
    meanKey: 'maskMean' as const,
  },
]

export const supplementaryVariations = [
  { id: 'var1',         name: 'Var-1: Single Color (Hex)',   shortName: 'Var-1',       icon: '🟥',   description: 'Single uniform color block, specified with hexadecimal code.' },
  { id: 'var2',         name: 'Var-2: Dual Block (Hex)',     shortName: 'Var-2',       icon: '🟥🟦', description: 'Two-color horizontal/vertical split, 50/50, hex-specified.' },
  { id: 'var3',         name: 'Var-3: Quad Block (Hex)',     shortName: 'Var-3',       icon: '🟩🟨', description: 'Four-color 2×2 grid layout, hex-specified.' },
  { id: 'var4',         name: 'Var-4: Fuzzy Color',          shortName: 'Var-4',       icon: '🎨',   description: 'Color within a specified hex range rather than exact value.' },
  { id: 'var5-chinese', name: 'Var-5: Chinese Prompts',      shortName: 'Var-5 (CN)', icon: '🇨🇳',  description: 'Single color block, prompted in Chinese (Mandarin).' },
  { id: 'var5-french',  name: 'Var-5: French Prompts',       shortName: 'Var-5 (FR)', icon: '🇫🇷',  description: 'Single color block, prompted in French.' },
  { id: 'var6-rgb',     name: 'Var-6: RGB Format',           shortName: 'Var-6 (RGB)', icon: '#️⃣',  description: 'Single color specified with rgb(r, g, b) notation.' },
  { id: 'var6-hsl',     name: 'Var-6: HSL Format',           shortName: 'Var-6 (HSL)', icon: '#️⃣',  description: 'Single color specified with hsl(h, s%, l%) notation.' },
]

export function getSuppVariationData(varId: string): SupplementaryColorResult[] {
  const map: Record<string, SupplementaryColorResult[]> = {
    'var1':         suppVar1Results,
    'var2':         suppVar2Results,
    'var3':         suppVar3Results,
    'var4':         suppVar4Results,
    'var5-chinese': suppVar5ChineseResults,
    'var5-french':  suppVar5FrenchResults,
    'var6-rgb':     suppVar6RGBResults,
    'var6-hsl':     suppVar6HSLResults,
  }
  return map[varId] ?? suppVar1Results
}

export function pureColorScore(r: PureColorResult)          { return Math.max(0, (1 - r.colorMean) * 100) }
export function imageMaskScore(r: ImageMaskResult)          { return Math.max(0, (1 - r.shapeMean) * 100) }
export function geometricScore(r: GeometricShapeResult)     { return Math.max(0, (1 - r.maskMean) * 100) }
export function suppColorScore(r: SupplementaryColorResult) { return Math.max(0, (1 - r.colorMean) * 100) }