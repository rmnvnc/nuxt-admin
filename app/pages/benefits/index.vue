<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { UBadge } from '#components'
import type { ContextMenuItem, TableRow } from '@nuxt/ui'

const { data: benefits, status, refresh, error } = useBenefits()

const tableData = computed(() => {
    return (benefits.value ?? []).map((item) => ({
        title: item.title,
        segments: item.segments,
    }))
})

const table = useTemplateRef('benefitTable')

const tableFilter = ref('')

watch(tableFilter, () => {
    pagination.value.pageIndex = 0
})

type TableBenefit = {
    title: string
    segments: Record<string, boolean>
}

const columns = [
    {
        accessorKey: 'title',
        header: 'Názov',
    },
    {
        accessorKey: 'segments',
        header: 'Segmenty',
        cell: ({ row }: { row: { original: TableBenefit } }) => {
            const segments = row.original.segments
            const active = Object.keys(segments).filter((key) => segments[key] && key !== 'all')

            return h(
                'div',
                { class: 'flex gap-2 flex-wrap' },
                active.map((seg) =>
                    h(
                        UBadge,
                        {
                            color: 'primary',
                            variant: 'soft',
                        },
                        () => seg,
                    ),
                ),
            )
        },
    },
]

const pagination = ref({
    pageIndex: 0,
    pageSize: 10,
})

const contextMenuItems = ref<ContextMenuItem[]>([])

function contextMenuOptions(row: TableRow<TableBenefit>) {
    return [
        {
            label: 'Open',
            onSelect() {
                navigateTo({
                    name: 'benefits-id',
                    params: { id: slugify(row.original.title) },
                })
            },
        },
    ]
}

function onContextmenu(_e: Event, row: TableRow<TableBenefit>) {
    contextMenuItems.value = contextMenuOptions(row)
}
</script>

<template>
    <div v-if="status === 'pending'">Načítavam…</div>

    <div v-else-if="error">
        {{ error?.message }}
        <UButton size="xs" @click="refresh()">Skúsiť znova</UButton>
    </div>

    <div v-else>
        <UInput v-model="tableFilter" class="max-w-sm mb-8 w-full md:w-auto" placeholder="Search" size="xl" />
        <UContextMenu :items="contextMenuItems">
            <UTable
                ref="benefitTable"
                v-model:pagination="pagination"
                v-model:global-filter="tableFilter"
                class="mb-8"
                :data="tableData"
                :columns="columns"
                :pagination-options="{
                    getPaginationRowModel: getPaginationRowModel(),
                }"
                @contextmenu="onContextmenu"
            />
        </UContextMenu>
        <UPagination
            :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
    </div>
</template>
