import type { BlockDefinition } from '~/types/blocks'

export const BLOCK_DEFINITIONS: Record<string, BlockDefinition> = {
    card: {
        type: 'card',
        label: 'Card',
        description: 'A simple card block with title and description.',
        fields: [
            { type: 'text', name: 'title', label: 'Title', required: true, placeholder: 'Enter title' },
            { type: 'textarea', name: 'desc', label: 'Description', required: true, placeholder: 'Enter description' },
        ],
    },
    notification: {
        type: 'notification',
        label: 'Notification',
        description: 'A notification block to display important messages.',
        fields: [
            {
                type: 'select',
                name: 'variant',
                label: 'Variant',
                required: true,
                options: [
                    { label: 'Info', value: 'info' },
                    { label: 'Warning', value: 'warning' },
                ],
            },
            { type: 'text', name: 'title', label: 'Title', required: true, placeholder: 'Enter title' },
            { type: 'textarea', name: 'desc', label: 'Description', required: true, placeholder: 'Enter description' },
        ],
    },
    twoColumn: {
        type: 'twoColumn',
        label: 'Two Column Layout',
        description: 'A block with two columns to arrange content side by side.',
        fields: [
            {
                type: 'blocks',
                name: 'leftColumn',
                label: 'Left Column Blocks',
                allowedBlocks: ['card', 'notification'],
            },
            {
                type: 'blocks',
                name: 'rightColumn',
                label: 'Right Column Blocks',
                allowedBlocks: ['card', 'notification'],
            },
        ],
    },
}
