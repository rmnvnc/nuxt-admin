<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: benefit, status } = await useBenefit(route.params.id as string)

console.log(route.params)
</script>
<template>
    {{ benefit?.illustration }}
</template>
