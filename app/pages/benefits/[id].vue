<script setup lang="ts">
import { useRoute } from 'vue-router'
import { CATEGORY_KEYS, SEGMENT_KEYS, type Benefit, type CategoryKey, type SegmentKey } from '@/types/benefitType'
import type { NuxtError } from '#app'
import StringListField from '@/components/BenefitEditor/StringListField.vue'

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
            color: 'success',
        })
    } catch (e: unknown) {
        const err = e as NuxtError
        toast.add({
            title: 'Chyba',
            description: err.statusMessage || 'Unknown error',
            color: 'error',
        })
    } finally {
        isSaving.value = false
    }
}

const createBooleanRecordModel = <K extends string>(keys: readonly K[], field: 'segments' | 'categories') =>
    computed<K[]>({
        get() {
            if (!benefitForm.value) return []

            const record = benefitForm.value[field] as Record<K, boolean> | undefined
            if (!record) return []

            return keys.filter((key) => record[key])
        },
        set(selected) {
            if (!benefitForm.value) return

            const next = {} as Record<K, boolean>

            for (const key of keys) {
                next[key] = selected.includes(key)
            }

            ;(benefitForm.value as any)[field] = next
        },
    })

const segmentItems = computed(() =>
    SEGMENT_KEYS.map((key) => ({
        label: key, // prípadne tu urobíš pekné preklady/labely
        value: key,
    })),
)

const categoryItems = computed(() =>
    CATEGORY_KEYS.map((key) => ({
        label: key,
        value: key,
    })),
)

const segmentModel = createBooleanRecordModel<SegmentKey>(SEGMENT_KEYS, 'segments')
const categoryModel = createBooleanRecordModel<CategoryKey>(CATEGORY_KEYS, 'categories')
</script>
<template>
    <section>
        <template v-if="status === 'pending'"> Načítavam detail… </template>
        <template v-else-if="error"> Nepodarilo sa načítať benefit. {{ error?.message }} </template>
        <template v-else-if="benefitForm">
            <div class="flex flex-col lg:flex-row gap-8">
                <div class="order-2 lg:order-none w-full lg:max-w-[700px]">
                    <b>Original title:</b> {{ benefit?.title }}<br />
                    <b>Edited title:</b> {{ benefitForm.title }}<br />
                    <UFormField
                        label="Title"
                        class="mb-8"
                        :ui="{
                            labelWrapper: 'mb-4',
                        }"
                    >
                        <UInput v-model="benefitForm.title" type="text" class="w-full" :disabled="isSaving" />
                    </UFormField>
                    <UFormField
                        label="Segments"
                        class="mb-8"
                        :ui="{
                            labelWrapper: 'mb-4',
                        }"
                    >
                        <UCheckboxGroup
                            v-model="segmentModel"
                            :items="segmentItems"
                            variant="list"
                            orientation="horizontal"
                            :disabled="isSaving"
                            :ui="{
                                fieldset: 'flex flex-wrap gap-4',
                            }"
                        />
                    </UFormField>
                    <UFormField
                        label="Categories"
                        class="mb-8"
                        :ui="{
                            labelWrapper: 'mb-4',
                        }"
                    >
                        <UCheckboxGroup
                            v-model="categoryModel"
                            :items="categoryItems"
                            variant="list"
                            orientation="horizontal"
                            :disabled="isSaving"
                            :ui="{
                                fieldset: 'flex flex-wrap gap-4',
                            }"
                        />
                    </UFormField>
                    <StringListField
                        v-model="benefitForm.list"
                        :rows="benefitForm.list.length"
                        :disabled="isSaving"
                        label="Zoznam bodov"
                    />
                    <StringListField
                        v-if="benefitForm.detail.advantages"
                        v-model="benefitForm.detail.advantages"
                        label="Výhody (advantages)"
                        :rows="benefitForm.detail.advantages.length"
                        :disabled="isSaving"
                    />

                    <StringListField
                        v-if="benefitForm.detail.attentions"
                        v-model="benefitForm.detail.attentions"
                        label="Upozornenia (attentions)"
                        :rows="benefitForm.detail.attentions.length"
                        :disabled="isSaving"
                    />

                    <StringListField
                        v-if="benefitForm.detail.more?.stepper?.steps"
                        v-model="benefitForm.detail.more.stepper.steps"
                        label="Stepper (more.stepper.steps)"
                        :rows="benefitForm.detail.more.stepper.steps.length"
                        :disabled="isSaving"
                    />
                </div>
                <div class="order-1 lg:order-none flex-1">
                    <UButton :disabled="isSaving" @click="save">Uložiť</UButton>
                </div>
            </div>
        </template>
    </section>
</template>
