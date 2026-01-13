<script setup lang="ts">
import { BLOCK_DEFINITIONS } from '~/blocks/definitions'
import type { BlockInstance } from '~/types/blocks'
import BlockEditor from '~/components/Blocks/BlockEditor.vue'
import FieldRenderer from '~/components/Blocks/FieldRenderer.vue'

defineProps<{ index: number }>()

const block = defineModel<BlockInstance>({ required: true })

const emit = defineEmits<{
    (e: 'remove'): void
}>()

function removeBlock() {
    emit('remove')
}

const def = computed(() => BLOCK_DEFINITIONS[block.value.type])
</script>

<template>
    <UCard class="mb-4">
        <template #header>
            <div class="flex items-start justify-between gap-3">
                <strong>{{ def?.label }}</strong>
                {{ def?.description }}
            </div>
            <div class="flex items-center gap-1">
                <UButton icon="i-heroicons-trash" size="xs" color="error" @click="removeBlock()" />
            </div>
        </template>
        <template v-if="block.type === 'twoColumn'">
            <div class="flex gap-4">
                <div class="flex-1">
                    <BlockEditor
                        v-model="block.data.leftColumn as BlockInstance[]"
                        :allowed-blocks="['card', 'notification']"
                    />
                </div>

                <div class="flex-1">
                    <BlockEditor
                        v-model="block.data.rightColumn as BlockInstance[]"
                        :allowed-blocks="['card', 'notification']"
                    />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="grid gap-4">
                <template v-for="field in def?.fields" :key="field.name">
                    <template v-if="field.type === 'blocks'">
                        <BlockEditor
                            v-model="block.data[field.name] as BlockInstance[]"
                            :allowed-blocks="field.allowedBlocks"
                        />
                    </template>

                    <template v-else>
                        <FieldRenderer v-model="block.data[field.name] as string | undefined" :field="field" />
                    </template>
                </template>
            </div>
        </template>
    </UCard>
</template>
