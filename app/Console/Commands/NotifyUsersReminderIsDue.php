<?php

namespace App\Console\Commands;

use App\Models\Reminder;
use App\Notifications\ReminderIsDue;
use Carbon\Carbon;
use Illuminate\Console\Command;

class NotifyUsersReminderIsDue extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:usersRemindersIsDue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Reminder::query()
            ->where('date', '>=', date('Y-m-d H:i'))
            ->where('date', '<=', date("Y-m-d H:i", strtotime(date("Y-m-d H:i")." +30 minutes")))
            ->whereNull('notified')
            ->with('user')
            ->get()
            ->each(function ($reminder) {
                $reminder->user->notify(new ReminderIsDue($reminder));
                $reminder->notified = now();
                $reminder->save();
            });

        return 0;
    }
}
