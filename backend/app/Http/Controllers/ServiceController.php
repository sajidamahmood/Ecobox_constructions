<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{

    /**
 * @OA\Get(
 *     path="/api/services",
 *     tags={"Services"},
 *     summary="Get a list of services",
 *     description="Retrieve all services.",
 *     @OA\Response(
 *         response=200,
 *         description="List of services",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/Service")
 *         )
 *     )
 * )
 */
    public function index()
{
    $services = Service::all();
    
    \Log::info($services); 
    return response()->json($services);
}


/**
 * @OA\Get(
 *     path="/api/services/{id}",
 *     tags={"Services"},
 *     summary="Get a specific service",
 *     description="Retrieve a service by its ID.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="Service ID",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Service found",
 *         @OA\JsonContent(ref="#/components/schemas/Service")
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Service not found"
 *     )
 * )
 */


public function show($id)
{
    $service = Service::find($id);

    if (!$service) {
        return response()->json(['message' => 'Service not found'], 404);
    }

    // Correct the image URL
    if ($service->image) {
        $service->image = asset('storage/' . ltrim($service->image, '/storage'));
    }

    return response()->json($service);
}


/**
 * @OA\Post(
 *     path="/api/services",
 *     tags={"Services"},
 *     summary="Store a new service",
 *     description="Create a new service.",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"title"},
 *             @OA\Property(property="title", type="string", example="Web Development"),
 *             @OA\Property(property="image", type="string", format="uri", example="http://example.com/image.jpg"),
 *             @OA\Property(property="description", type="string", example="Service description here.")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Service created successfully",
 *         @OA\JsonContent(ref="#/components/schemas/Service")
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Validation error"
 *     )
 * )
 */

public function store(Request $request)
{
    Log::info('Incoming Request to Create service:', $request->all());

    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        'description' => 'nullable|string',
    ]);

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

    $service = Service::create($validatedData);

    Log::info('Created service:', $service->toArray());

    return response()->json($service, 201);
}



/**
 * @OA\Put(
 *     path="/api/services/{id}",
 *     tags={"Services"},
 *     summary="Update a service",
 *     description="Update the details of an existing service.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="Service ID",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="title", type="string", example="Updated Service Title"),
 *             @OA\Property(property="description", type="string", example="Updated Service Description"),
 *             @OA\Property(property="image", type="string", format="uri", example="http://example.com/updated-image.jpg")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Service updated successfully",
 *         @OA\JsonContent(ref="#/components/schemas/Service")
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Service not found"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 */
public function update(Request $request, $id)
{
    $service = Service::find($id);

    if (!$service) {
        return response()->json(['message' => 'Service not found'], 404);
    }

    $service->title = $request->input('title', $service->title);
    $service->description = $request->input('description', $service->description);

    // Check if a new image file is uploaded
    if ($request->hasFile('image')) {
        Log::info('Image file detected in request.');

        // Delete the old image if it exists
        if ($service->image) {
            $oldImagePath = str_replace('/storage/', '', $service->image);
            if (Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        // Store the new image
        $imagePath = $request->file('image')->store('images', 'public');
        $service->image = Storage::url($imagePath);

        Log::info('New image stored successfully at path: ' . $service->image);
    } else {
        Log::warning('No image file detected in request.');
    }

    try {
        $service->save();
    } catch (\Exception $e) {
        Log::error('Error updating service:', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Service update failed'], 500);
    }

    return response()->json([
        'message' => 'Service updated successfully',
        'service' => $service
    ]);
}


/**
 * @OA\Delete(
 *     path="/api/services/{id}",
 *     tags={"Services"},
 *     summary="Delete a service",
 *     description="Delete a service by ID.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="Service ID",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Service deleted successfully"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Service not found"
 *     )
 * )
 */


    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();
        return response()->json(['message' => 'Service deleted successfully'], 204);
    }
}
