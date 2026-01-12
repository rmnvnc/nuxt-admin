import benefits from '@@/data/benefits.json'
import type { Benefit } from '~/types/benefit'

export default defineEventHandler(() => {
    const list = benefits as Benefit[]

    if (!list.length) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Benefits not found',
        })
    }

    // pridávam id =´index
    const withIds: Benefit[] = list.map((item, index) => ({
        ...item,
        id: Number(index),
    }))

    return withIds
})
