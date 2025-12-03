import type { Benefit } from '@/types/benefitType'

export const useBenefit = (id: string) => {
    return useFetch<Benefit>(() => `/api/benefits/${id}`, {
        key: 'benefit-' + String(unref(id)),
    })
}
