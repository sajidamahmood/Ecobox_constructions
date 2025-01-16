<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


/**
 * @OA\Tag(
 *     name="Projects",
 *     description="Operations related to project management"
 * )
 */


class ProjectController extends Controller
{

/**
 * @OA\Get(
 *     path="/projects",
 *     summary="Get list of projects",
 *     @OA\Response(
 *         response=200,
 *         description="List of projects",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/Project")
 *         )
 *     )
 * )
 */

    public function index()
    {
        return Project::all();
    }


     /**
     * @OA\Get(
     *     path="/api/projects/{id}",
     *     summary="Get a specific project by ID",
     *     description="Fetches a project by its ID.",
     *     operationId="getProjectById",
     *     tags={"Projects"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="The ID of the project",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project found",
     *         @OA\JsonContent(ref="#/components/schemas/Project")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found"
     *     )
     * )
     */

    public function show($id)
{
    $project = Project::find($id);

    if (!$project) {
        return response()->json(['message' => 'Project not found'], 404);
    }

    // Correct the image URL
    if ($project->image) {
        $project->image = asset('storage/' . ltrim($project->image, '/storage'));

    }

    return response()->json($project);
}


 /**
     * @OA\Post(
     *     path="/api/projects",
     *     summary="Create a new project",
     *     description="Creates a new project with the provided data.",
     *     operationId="createProject",
     *     tags={"Projects"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "start_date", "end_date"},
     *             @OA\Property(property="name", type="string", example="New Project"),
     *             @OA\Property(property="image", type="string", format="uri", example="https://example.com/project-image.jpg"),
     *             @OA\Property(property="description", type="string", example="Description of the project."),
     *             @OA\Property(property="start_date", type="string", format="date", example="2025-01-01"),
     *             @OA\Property(property="end_date", type="string", format="date", example="2025-12-31")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Project created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Project")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Validation failed")
     *         )
     *     )
     * )
     */

public function store(Request $request)
{
    Log::info('Incoming Request to Create project:', $request->all());

    try {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date'
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        Log::error('Validation Error:', $e->errors());
        return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
    }

    Log::info('Validated Data:', $validatedData);

    if ($request->hasFile('image')) {
        Log::info('Image upload initiated.');

        $path = $request->file('image')->store('images', 'public');
        $imageUrl = Storage::url($path);
        $validatedData['image'] = $imageUrl;

        Log::info('Uploaded Image Details:', [
            'filename' => $request->file('image')->getClientOriginalName(),
            'path' => $path,
            'url' => $imageUrl
        ]);
    } else {
        Log::info('No image was uploaded.');
    }

    Log::info('Data before creating project:', $validatedData);
    
    try {
        $project = Project::create($validatedData);
        Log::info('Created project:', $project->toArray());
    } catch (\Exception $e) {
        Log::error('Error creating project:', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Project creation failed'], 500);
    }

    return response()->json($project, 201);
}


 /**
     * @OA\Put(
     *     path="/api/projects/{id}",
     *     summary="Update an existing project",
     *     description="Updates an existing project by its ID.",
     *     operationId="updateProject",
     *     tags={"Projects"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="The ID of the project",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Updated Project Name"),
     *             @OA\Property(property="description", type="string", example="Updated project description"),
     *             @OA\Property(property="image", type="string", format="uri", example="https://example.com/updated-image.jpg"),
     *             @OA\Property(property="start_date", type="string", format="date", example="2025-01-01"),
     *             @OA\Property(property="end_date", type="string", format="date", example="2025-12-31")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Project")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Failed to update project"
     *     )
     * )
     */

public function update(Request $request, $id)
{
    $project = Project::find($id);

    if (!$project) {
        return response()->json(['message' => 'Project not found'], 404);
    }

    $project->name = $request->input('name', $project->name);
    $project->description = $request->input('description', $project->description);

    if ($request->hasFile('image')) {
        Log::info('Image file detected in request.');

        // Delete the old image if it exists
        if ($project->image) {
            $oldImagePath = str_replace('/storage/', '', $project->image);
            if (Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        // Store the new image
        $imagePath = $request->file('image')->store('images', 'public');
        $project->image = Storage::url($imagePath);

        Log::info('New image stored successfully at path: ' . $project->image);
    } else {
        Log::warning('No image file detected in request.');
    }

    try {
        $project->save();
    } catch (\Exception $e) {
        Log::error('Error updating project:', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Project update failed'], 500);
    }

    return response()->json([
        'message' => 'Project updated successfully',
        'project' => $project
    ]);
}
    

 
    /**
     * @OA\Delete(
     *     path="/api/projects/{id}",
     *     summary="Delete a project by ID",
     *     description="Deletes a project by its ID.",
     *     operationId="deleteProject",
     *     tags={"Projects"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="The ID of the project",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Project deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found"
     *     )
     * )
     */

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
