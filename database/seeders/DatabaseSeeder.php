<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'name' => 'Kim',
            'email' => 'kim@humbleguys.se',
            'password' => bcrypt('humbleguys'),
        ]);

        $this->call([
            ReminderSeeder::class,
            NoteSeeder::class,
        ]);
    }
}
