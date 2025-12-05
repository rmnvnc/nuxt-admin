<script setup lang="ts">
const props = defineProps<{
    rows: number
    label: string
    modelValue: string[]
    disabled?: boolean
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string[]]
}>()

const text = computed<string>({
    get() {
        return (props.modelValue ?? []).join('\n')
    },
    set(value) {
        const lines = value
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)

        emit('update:modelValue', lines)
    },
})
</script>

<template>
    <UFormField
        :label="label"
        class="mb-8"
        :ui="{
            labelWrapper: 'mb-4',
        }"
    >
        <UTextarea v-model="text" :disabled="disabled" :autoresize="true" :rows="rows" class="w-full" />
    </UFormField>
</template>
