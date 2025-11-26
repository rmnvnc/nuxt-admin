export type SegmentKey = 'all' | 'senior' | 'baby' | 'adult' | 'dovera' | 'family'

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

type CategoryKey =
    | 'healthy_lifestyle'
    | 'doctor_online'
    | 'living_diagnosis'
    | 'travel_relax'
    | 'visit_doctor'
    | 'mental_health'
    | 'medical_devices'

export interface Benefit {
    title: string
    illustration: string
    segments: Record<SegmentKey, boolean>
    categories: Record<CategoryKey, boolean>
    orders: Partial<Record<SegmentKey, number>> & { all?: number }
    list: string[]
    detail: Partial<DetailSections>
}
