import benefits from '@@/data/benefits.json'
import type { Benefit } from '@/types/benefitType'

export default defineEventHandler((event) => {
    const benefitId = Number(getRouterParam(event, 'id'))

    if (!benefitId && benefitId !== 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing benefit identifier',
        })
    }

    const list = benefits as Benefit[]
    const benefit = list[benefitId]

    if (!benefit) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Benefit not found',
        })
    }

    const result: Benefit = {
        ...benefit,
        id: Number(benefitId),
    }

    return result
})
