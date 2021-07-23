<template>
    <breeze-authenticated-layout>
        <template #header>
            <div class="flex justify-between w-full">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Reminders
                </h2>

                <Link :href="route('reminders.create')">
                    Add
                </Link>
            </div>
        </template>

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    v-for="reminder in reminders"
                    :key="reminder.id"
                    :href="route('reminders.edit', reminder.id)"
                    class="bg-white overflow-hidden shadow-sm mb-3 block hover:bg-indigo-100 transition duration-200 ease-in-out"
                >
                    <div class="py-2 px-3 text-sm border-l-4 border-indigo-400">
                        {{ formatDate(reminder.date) }}
                        <br>
                        {{ reminder.title }}
                    </div>
                </Link>
            </div>
        </div>
    </breeze-authenticated-layout>
</template>

<script setup>
import { Link } from '@inertiajs/inertia-vue3'
import BreezeAuthenticatedLayout from '@/Layouts/Authenticated'

defineProps({
    reminders: {
        type: Array,
        default: null
    }
});

const formatDate = (dateString) => {
    const date = new Date(dateString);

    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
</script>
