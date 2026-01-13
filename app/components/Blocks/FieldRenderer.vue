<script setup lang="ts">
import type { FieldDefinition } from '~/types/blocks'

const { field } = defineProps<{
    field: FieldDefinition
}>()

const modelValue = defineModel<string>()
</script>

<template>
    <div>
        <UFormField :label="field.label">
            <template v-if="field.type === 'text'">
                <UInput v-model="modelValue" size="lg" class="w-full" :placeholder="field.placeholder" />
            </template>
            <template v-else-if="field.type === 'textarea'">
                <UTextarea v-model="modelValue" size="lg" class="w-full" :placeholder="field.placeholder" />
            </template>
            <template v-else-if="field.type === 'select'">
                <USelect v-model="modelValue" size="lg" class="w-full" :items="field.options" />
            </template>
            <template v-else> Unsupported field tyle: {{ field.type }} </template>
        </UFormField>
    </div>
</template>
