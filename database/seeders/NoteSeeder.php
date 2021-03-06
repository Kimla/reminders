<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Note::factory(10)->create(['user_id' => 2]);

        \App\Models\Note::factory(10)->create();
    }
}
