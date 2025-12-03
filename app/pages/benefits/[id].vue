<script setup lang="ts">
import { useRoute } from 'vue-router'
import { SEGMENT_KEYS, type Benefit, type SegmentKey } from '@/types/benefitType'
import type { NuxtError } from '#app'

const toast = useToast()
const route = useRoute()
const { data: benefit, status, error } = useBenefit(route.params.id as string)

useHead(() => ({
    title: benefit.value?.title ?? 'Loading...',
}))

const benefitForm = ref<Benefit | null>(null)

watchEffect(() => {
    if (benefit.value) {
        benefitForm.value = structuredClone(benefit.value)
    }
})

const isSaving = ref(false)

const save = async () => {
    if (!benefitForm.value || !benefit.value) return

    isSaving.value = true

    try {
        const savedBenefit = await patchBenefit(Number(benefit.value.id), benefitForm.value)
        benefit.value = savedBenefit
        toast.add({
            title: 'Uložené',
            description: 'Benefit bol úspešne uložený',
        })
    } catch (e: unknown) {
        const err = e as NuxtError
        toast.add({
            title: 'Chyba',
            description: err.statusMessage || 'Unknown error',
        })
    } finally {
        isSaving.value = false
    }
}

const segmentItems = computed(() =>
    SEGMENT_KEYS.map((key) => ({
        label: key,
        value: key,
    })),
)

const segmentModel = computed<SegmentKey[]>({
    get() {
        if (!benefitForm.value) return []
        return SEGMENT_KEYS.filter((key) => benefitForm.value?.segments?.[key])
    },
    set(selected) {
        if (!benefitForm.value) return []

        const next: Record<SegmentKey, boolean> = {
            all: false,
            senior: false,
            baby: false,
            adult: false,
            dovera: false,
            family: false,
        }

        for (const key of SEGMENT_KEYS) {
            next[key] = selected.includes(key)
        }

        benefitForm.value.segments = next
    },
})
</script>
<template>
    <section>
        <template v-if="status === 'pending'"> Načítavam detail… </template>
        <template v-else-if="error"> Nepodarilo sa načítať benefit. {{ error?.message }} </template>
        <template v-else-if="benefitForm">
            <b>Original title:</b> {{ benefit?.title }}<br />
            <b>Edited title:</b> {{ benefitForm.title }}<br />
            <UFormField label="Title" class="mb-4">
                <UInput v-model="benefitForm.title" type="text" class="w-full" :disabled="isSaving" />
            </UFormField>
            <UFormField label="Segments" class="mb-4">
                <UCheckboxGroup
                    v-model="segmentModel"
                    :items="segmentItems"
                    variant="list"
                    orientation="horizontal"
                    :disabled="isSaving"
                />
            </UFormField>
            <UButton :disabled="isSaving" @click="save">Uložiť</UButton>
        </template>
    </section>
</template>
