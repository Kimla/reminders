<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notes = auth()
            ->user()
            ->notes()
            ->get();

        return Inertia::render('Notes/Index', compact('notes'));
    }

    public function create()
    {
        return Inertia::render('Notes/Create');
    }

    public function store()
    {
        auth()->user()->notes()->create($this->validateRequest());

        return redirect('/notes');
    }

    public function edit(Note $note)
    {
        $this->authorize('update', $note);

        return Inertia::render('Notes/Edit', compact('note'));
    }

    public function update(Note $note)
    {
        $this->authorize('update', $note);

        $note->update($this->validateRequest());

        return redirect('/notes');
    }

    public function destroy(Note $note)
    {
        $this->authorize('delete', $note);

        $note->delete();

        return redirect('/notes');
    }

    public function validateRequest() {
        return request()->validate([
            'title' => ['required', 'max:255'],
            'description' => ['sometimes']
        ]);
    }
}
