<script setup lang="ts">
import { ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const open = ref(false)

const links = [
    [
        {
            label: 'Home',
            icon: 'i-lucide-house',
            to: '/',
            onSelect: () => {
                open.value = false
            },
        },
        {
            label: 'Benefits',
            icon: 'material-symbols:article-outline',
            to: '/benefits',
            onSelect: () => {
                open.value = false
            },
        },
        {
            label: 'Settings',
            to: '/settings',
            icon: 'i-lucide-settings',
            defaultOpen: true,
            type: 'trigger',
            children: [
                {
                    label: 'General',
                    to: '/settings',
                    exact: true,
                    onSelect: () => {
                        open.value = false
                    },
                },
            ],
        },
    ],
] satisfies NavigationMenuItem[][]
</script>

<template>
    <UApp>
        <UDashboardGroup unit="rem" storage="local">
            <UDashboardSidebar
                v-model:open="open"
                collapsible
                resizable
                class="bg-elevated/25"
                :ui="{ footer: 'lg:border-t lg:border-default' }"
            >
                <template #header="{ collapsed }"><h1 v-if="!collapsed">Admin</h1></template>

                <template #default="{ collapsed }">
                    <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" tooltip popover />
                </template>

                <template #footer="{ collapsed }">
                    <UserMenu :collapsed="collapsed" />
                </template>
            </UDashboardSidebar>

            <UDashboardPanel>
                <template #header>
                    <UDashboardNavbar :ui="{ right: 'gap-3' }">
                        <template #leading>
                            <UDashboardSidebarCollapse />
                        </template>
                    </UDashboardNavbar>
                </template>
                <template #body>
                    <NuxtPage />
                </template>
            </UDashboardPanel>
        </UDashboardGroup>
    </UApp>
</template>
