<?php

namespace Database\Factories;

use App\Models\Reminder;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReminderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Reminder::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => 1,
            'title' => $this->faker->text(20),
            'date' => $this->faker->dateTimeBetween($startDate = 'now', $endDate = '+6 months', $timezone = null),
            'description' => $this->faker->text(2000),
        ];
    }
}
