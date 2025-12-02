import benefits from '@@/data/benefits.json'
import type { Benefit } from '@/types/benefitType'

export default defineEventHandler(async () => {
    if (!benefits.length) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Benefits not found',
        })
    }
    return benefits as Benefit[]
})
