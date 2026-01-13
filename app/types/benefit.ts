import type { BlockInstance } from './blocks'

export const SEGMENT_KEYS = ['all', 'senior', 'baby', 'adult', 'dovera', 'family'] as const
export type SegmentKey = (typeof SEGMENT_KEYS)[number]

export interface DetailSections {
    advantages: string[]
    attentions: string[]
    more: {
        stepper?: {
            steps?: string[]
            stepsWithInfoBox?: {
                content: string
                info?: string
            }[]
        }
    }
}

export type EditableSections = keyof Pick<DetailSections, 'advantages' | 'attentions'>

export const CATEGORY_KEYS = [
    'healthy_lifestyle',
    'doctor_online',
    'living_diagnosis',
    'travel_relax',
    'visit_doctor',
    'mental_health',
    'medical_devices',
]
export type CategoryKey = (typeof CATEGORY_KEYS)[number]

export interface Benefit {
    id?: number
    title: string
    illustration: string
    segments: Record<SegmentKey, boolean>
    categories: Record<CategoryKey, boolean>
    orders: Partial<Record<SegmentKey, number>> & { all?: number }
    list: string[]
    detail: Partial<DetailSections>
    contentBlocks?: BlockInstance[]
}
