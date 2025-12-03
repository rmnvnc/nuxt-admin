import type { Benefit } from '@/types/benefitType'

export const patchBenefit = (id: number, formBody: Benefit) => {
    return $fetch<Benefit>(`/api/benefits/${id}`, {
        method: 'PATCH',
        body: formBody,
    })
}
