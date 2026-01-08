<script setup lang="ts">
const props = defineProps<{
    modelValue?: string | null
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string | null]
}>()

const { illustrations } = useBenefitIllustrations()

const items = computed(() =>
    illustrations.map((item: BenefitIllustration) => ({
        label: item.label,
        value: item.key,
    })),
)

const selected = computed({
    get: () => props.modelValue ?? undefined,
    set: (value: string | null) => emit('update:modelValue', value),
})

const selectedSrc = computed(() => {
    const found = illustrations.find((i) => i.key === selected.value)
    return found?.src ?? null
})
</script>

<template>
    <div :class="$attrs.class">
        <USelect v-model="selected" :items="items" class="mb-2" />
        <img v-if="selectedSrc" :src="selectedSrc" class="bg-white" />
    </div>
</template>
