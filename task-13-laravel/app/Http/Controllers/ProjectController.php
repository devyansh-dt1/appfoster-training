<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class ProjectController extends Controller
{

    // show projects

    public function listPro(User $user)
    {
        $projects = $user->projects;
        return view('projects.listPro', compact('projects', 'user'));
    }

    // add new projects

    public function createPro(User $user)
    {
        return view("projects.createpro", compact("user"));
    }

    // store into the database

    public function storePro(Request $request, User $user)
    {
        $request->validate([
            'title' => 'required'
        ]);

        $user->projects()->create($request->all());

        return redirect()->route('projects.list', $user->id)->with('success', 'Project added successfully.');
    }

    // edit project page

    public function editPro(User $user,$projectId)
    {
        $project = $user->projects()->findOrFail($projectId); 
        return view("projects.editPro", compact('user','project'));
    }

    //edit project

    public function updatePro(Request $request,User $user, $projectId) {
        $project = $user->projects()->findOrFail($projectId);
        $request->validate([
            "title"=> "required"
        ]);
        $project->update($request->all());
        return redirect()->route("projects.list", $user->id)->with('success','Project Details Updated');

    }

    //delete project

    public function deletePro(User $user, $projectId)
    {
        $project = $user->projects()->findOrFail($projectId); 
        $project->delete();
        return redirect()->route('projects.list', $user->id)->with('success', 'Project deleted successfully.');
    }
}




