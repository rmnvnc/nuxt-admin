<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: benefit, status, error } = useBenefit(route.params.id as string)

useHead(() => ({
    title: benefit.value?.title ?? 'Loading...',
}))
</script>
<template>
    <section>
        <template v-if="status === 'pending'"> Načítavam detail… </template>
        <template v-else-if="error"> Nepodarilo sa načítať benefit. {{ error?.message }} </template>
        <template v-else-if="benefit">
            {{ benefit.title }}
        </template>
    </section>
</template>
