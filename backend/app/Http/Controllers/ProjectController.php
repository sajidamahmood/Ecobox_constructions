<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::all();
    }

    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // Ensure the image URL is correct
        if ($project->image) {
            $project->image = asset('storage/projects_images/' . $project->image);
        }

        return response()->json($project, 200);
    }

    public function store(Request $request)
    {
        Log::info('Store Project Request:', $request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('projects_images', 'public');
            $request->merge(['image' => $imagePath]);
        }

        $project = Project::create($request->all());

        // Ensure the image URL is correct for the response
        if ($project->image) {
            $project->image = asset('storage/projects_images/' . $project->image);
        }

        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }

            $imagePath = $request->file('image')->store('projects_images', 'public');
            $request->merge(['image' => $imagePath]);
        }

        // Update the project with the new data
        $project->update($request->all());

        // Ensure the image URL is correct for the response
        if ($project->image) {
            $project->image = asset('storage/projects_images/' . $project->image);
        }

        return response()->json($project, 200);
    }

    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
