<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReminderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reminders = auth()
            ->user()
            ->reminders()
            ->orderBy('date')
            ->get();

        return Inertia::render('Reminders/Index', compact('reminders'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Reminders/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Reminder::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'date' =>  $request->date
        ]);

        return redirect('/');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reminder  $reminder
     * @return \Illuminate\Http\Response
     */
    public function edit(Reminder $reminder)
    {
        $this->authorize('update', $reminder);

        return Inertia::render('Reminders/Edit', compact('reminder'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reminder  $reminder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reminder $reminder)
    {
        $this->authorize('update', $reminder);

        $reminder->title = $request->title;
        $reminder->date = $request->date;

        $reminder->save();

        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reminder  $reminder
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reminder $reminder)
    {
        $this->authorize('delete', $reminder);

        $reminder->delete();

        return redirect('/');
    }
}
