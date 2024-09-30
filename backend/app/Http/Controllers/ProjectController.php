<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    // Retrieve all projects
    public function index()
    {
        return Project::all();
    }

    // Retrieve a single project by ID
    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return $project;
    }

    // Store a new project
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image
        ]);

        // Handle the image upload if there is one
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('projects', 'public'); // Save image in storage/app/public/projects
            $request->merge(['image' => $imagePath]); // Add image path to request data
        }

        // Create and return the new project
        $project = Project::create($request->all());

        return response()->json($project, 201); // HTTP status 201 Created
    }

    // Update an existing project
    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // Validate the incoming request data
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image for update
        ]);

        // Handle the image upload if there is one
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }

            $imagePath = $request->file('image')->store('projects', 'public'); // Save the new image
            $request->merge(['image' => $imagePath]); // Add new image path to request data
        }

        // Update and return the project
        $project->update($request->all());

        return $project;
    }
// Continue the destroy function to delete the project
public function destroy($id)
{
    $project = Project::find($id);

    if (!$project) {
        return response()->json(['message' => 'Project not found'], 404);
    }

    // Delete the image from storage if it exists
    if ($project->image) {
        Storage::disk('public')->delete($project->image);
    }

    $project->delete();

    return response()->json(['message' => 'Project deleted successfully']);
}