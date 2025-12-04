import type { Benefit } from '@/types/benefitType'

export const useBenefits = () => {
    return useFetch<Benefit[]>('/api/benefits', {
        key: 'benefits',
    })
}
