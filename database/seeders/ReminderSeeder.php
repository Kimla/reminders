<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ReminderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Reminder::factory(10)->create(['user_id' => 2]);

        \App\Models\Reminder::factory(10)->create();
    }
}
