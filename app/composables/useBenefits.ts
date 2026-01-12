import type { Benefit } from '~/types/benefit'

export const useBenefits = () => {
    return useFetch<Benefit[]>('/api/benefits', {
        key: 'benefits',
    })
}
