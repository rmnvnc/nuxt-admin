import type { Benefit } from '~/types/benefit'

export const useBenefit = (id: string) => {
    return useFetch<Benefit>(() => `/api/benefits/${id}`, {
        key: 'benefit-' + String(unref(id)),
    })
}
