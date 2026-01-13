<script setup lang="ts">
import { BLOCK_DEFINITIONS } from '~/blocks/definitions'
import { createBlock } from '~/blocks/utils'
import type { BlockInstance, BlockType } from '~/types/blocks'
import BlockItem from '~/components/Blocks/BlockItem.vue'

const { label = undefined, allowedBlocks = undefined } = defineProps<{
    label?: string
    allowedBlocks?: BlockType[]
}>()

const blocks = defineModel<BlockInstance[]>({ default: () => [] })

const isAddOpen = ref(false)

const allowed = computed(() => allowedBlocks ?? (Object.keys(BLOCK_DEFINITIONS) as BlockType[]))

const addOptions = computed(() =>
    allowed.value.flatMap((type) => {
        const def = BLOCK_DEFINITIONS[type]
        return def ? [{ type, label: def.label, description: def.description }] : []
    }),
)

function addBlock(type: BlockType) {
    blocks.value?.push(createBlock(type))
    isAddOpen.value = false
}
</script>

<template>
    <div v-if="label">
        {{ label }}
    </div>

    <UModal v-model:open="isAddOpen" title="Add block">
        <template #body>
            <div class="grid grid-cols-3 gap-2">
                <UButton
                    v-for="opt in addOptions"
                    :key="opt.type"
                    class="justify-center flex-col"
                    variant="outline"
                    @click="addBlock(opt.type)"
                >
                    <span class="font-bold">{{ opt.label }}</span>
                    <span>{{ opt.description }}</span>
                </UButton>
            </div>
        </template>
    </UModal>

    <!-- Blocks list -->
    <template v-if="blocks.length">
        <BlockItem
            v-for="(block, index) in blocks"
            :key="block.id"
            v-model="blocks[index]!"
            :index="index"
            @remove="blocks.splice(index, 1)"
        />
    </template>
    <template v-else> <div>No blocks defined.</div> </template>

    <UButton label="Add block" size="xl" @click="isAddOpen = true" />
</template>
