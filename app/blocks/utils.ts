import type { BlockInstance, BlockType } from '~/types/blocks'

export function uid(prefix = 'b') {
    return `${prefix}_${crypto.randomUUID()}`
}

export function createBlock(type: BlockType): BlockInstance {
    return {
        id: uid(),
        type,
        data: {},
    }
}
