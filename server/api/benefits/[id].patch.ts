import type { Benefit } from '@/types/benefitType'
import benefits from '@@/data/benefits.json'

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    if (!id && id !== 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing id',
        })
    }

    const body = await readBody<Benefit>(event)

    if (!body || body.id !== id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body',
        })
    }

    // REAL UPDATE
    // 🔁 tu spravíš reálny UPDATE v  DB
    // const updated = await $fetch<Benefit>('https://legacy-api/benefits/' + id, {
    //   method: 'PATCH',
    //   body,
    // })

    // FAKE LOCAL UPDATE
    const benefitsList = benefits as Benefit[]

    const updated: Benefit = {
        ...benefitsList[id],
        ...body,
    }

    benefitsList[id] = updated

    return updated
})
