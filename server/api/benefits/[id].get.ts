import benefits from '@@/data/benefits.json'
import type { Benefit } from '@/types/benefitType'
import { slugify } from '@/utils/slug'

export default defineEventHandler<Benefit>((event) => {
    const idParam = getRouterParam(event, 'id')
    const id = idParam

    const allBenefits = benefits as Benefit[]
    const benefit = allBenefits.find((b) => slugify(b.title) === id)

    if (!benefit) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Benefit not found',
        })
    }

    return benefit
})
