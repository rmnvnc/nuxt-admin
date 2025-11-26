import benefits from '@@/data/benefits.json'

export default defineEventHandler(async () => {
    if (!benefits.length) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Benefits not found',
        })
    }
    return benefits
})
