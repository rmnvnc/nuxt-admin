import type { Benefit } from '@/types/benefitType'

export const useBenefit = (id: MaybeRef<string>) => {
    return useFetch<Benefit>(() => `/api/benefits/${unref(id)}`, {
        key: 'benefit-' + String(unref(id)),
    })
}
