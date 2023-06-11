<template>
    <breeze-authenticated-layout>
        <template #header>
            <div class="flex justify-between w-full">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Reminders
                </h2>

                <Link :href="route('reminders.create')"> Add </Link>
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
                        <span class="capitalize block">
                            {{ formatDate(reminder.date) }}
                        </span>

                        <span>
                            {{ reminder.title }}
                        </span>
                    </div>
                </Link>

                <button
                    v-if="!isPushEnabled"
                    type="button"
                    class="font-semibold text-lg text-gray-800 text-center leading-tight py-2 px-3 bg-indigo-200 mt-6 block w-full"
                    @click="subscribe"
                >
                    Enable push notifications
                </button>
            </div>
        </div>
    </breeze-authenticated-layout>
</template>

<script setup>
import { Link } from "@inertiajs/inertia-vue3";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated";
import { isPushEnabled, subscribe } from "@/Utils/sw";

defineProps({
    reminders: {
        type: Array,
        default: null,
    },
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };

    return `${date.toLocaleDateString(
        [],
        dateOptions
    )} - ${date.toLocaleTimeString([], timeOptions)}`;
};
</script>
