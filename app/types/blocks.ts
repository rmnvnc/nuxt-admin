export type BlockType = 'card' | 'notification' | 'twoColumn'

export type BlockInstance = {
    id: string
    type: BlockType
    data: Record<string, unknown>
}

export type FieldOption = { label: string; value: string }

export type FieldDefinition =
    | { type: 'text'; name: string; label: string; required?: boolean; placeholder?: string }
    | { type: 'textarea'; name: string; label: string; required?: boolean; placeholder?: string }
    | { type: 'select'; name: string; label: string; required?: boolean; options: FieldOption[] }
    | { type: 'blocks'; name: string; label: string; allowedBlocks: BlockType[] }

export type BlockDefinition = {
    type: BlockType
    label: string
    description: string
    fields: FieldDefinition[]
}
