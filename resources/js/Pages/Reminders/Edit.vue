<template>
    <breeze-authenticated-layout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Edit reminder
            </h2>
        </template>

        <div class="py-6">
            <div class="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm mb-3">
                    <div class="py-6 px-4 bg-white border-gray-200 text-sm">
                        <form @submit.prevent="submit">
                            <div>
                                <breeze-label for="title" value="Title" />
                                <breeze-input id="title" type="text" class="mt-1 block w-full" v-model="form.title" required autofocus />
                            </div>

                            <div class="mt-4">
                                <breeze-label for="date" value="Date" />
                                <breeze-input id="date" type="datetime-local" class="mt-1 block w-full" v-model="form.date" required />
                            </div>

                            <div class="mt-6 flex items-center justify-between">
                                <Link 
                                    :href="route('reminders.destroy', reminder.id)"
                                    method="delete"
                                    class="text-red-600 font-semibold"
                                    as="button"
                                >
                                    Remove
                                </Link>

                                <breeze-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                    Update
                                </breeze-button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    </breeze-authenticated-layout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/Layouts/Authenticated'
import BreezeButton from '@/Components/Button'
import BreezeInput from '@/Components/Input'
import BreezeLabel from '@/Components/Label'
import { Link } from '@inertiajs/inertia-vue3'

export default {
    components: {
        BreezeAuthenticatedLayout,
        BreezeButton,
        BreezeInput,
        BreezeLabel,
        Link
    },

    props: {
        reminder: {
            type: Object,
            default: null
        }
    },

    data() {
        return {
            form: this.$inertia.form({
                title: this.reminder.title,
                date: this.reminder.date
            })
        }
    },

    methods: {
        submit() {
            this.form.put(this.route('reminders.update', this.reminder.id));
        }
    }
}
</script>
