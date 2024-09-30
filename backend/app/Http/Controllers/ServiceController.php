<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    // Retrieve all services
    public function index()
    {
        return Service::all();
    }

    // Retrieve a single service by ID
    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return $service;
    }

    // Store a new service
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image
        ]);

        // Handle the image upload if there is one
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('services', 'public'); // Save image in storage/app/public/services
            $request->merge(['image' => $imagePath]); // Add image path to request data
        }

        // Create and return the new service
        $service = Service::create($request->all());

        return response()->json($service, 201); // HTTP status 201 Created
    }

    // Update an existing service
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        // Validate the incoming request data
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image for update
        ]);

        // Handle the image upload if there is one
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }

            $imagePath = $request->file('image')->store('services', 'public'); // Save the new image
            $request->merge(['image' => $imagePath]); // Add new image path to request data
        }

        // Update and return the service
        $service->update($request->all());

        return $service;
    }

    // Delete a service
    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        // Delete the image from storage if it exists
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return response()->json(['message' => 'Service deleted successfully'], 204); // HTTP status 204 No Content
    }
}
