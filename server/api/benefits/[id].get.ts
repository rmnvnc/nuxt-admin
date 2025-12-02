import benefits from '@@/data/benefits.json'
import type { Benefit } from '@/types/benefitType'
import { slugify } from '@/utils/slug'

export default defineEventHandler(async (event) => {
    const benefitId = getRouterParam(event, 'id')

    if (!benefitId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing benefit identifier',
        })
    }

    const benefit = (benefits as Benefit[]).find((item) => slugify(item.title) === benefitId)

    if (!benefit) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Benefit not found',
        })
    }

    return benefit
})
