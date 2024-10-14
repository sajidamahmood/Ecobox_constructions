<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
{
    $services = Service::all();
    \Log::info($services); // Log the retrieved services to the log file
    return response()->json($services);
}


    // Retrieve a single service by ID
    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        // Add full URL for the service's image
        $service->image = $service->image ? asset('storage/services_images/' . $service->image) : null;

        return response()->json($service);
    }

    // Store a new service
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('services_images', 'public');
            $validated['image'] = $imagePath;
        }

        $service = Service::create($validated);
        $service->image = $service->image ? asset('storage/services_images/' . $service->image) : null;

        return response()->json($service, 201);
    }

    // Update an existing service
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }

            $imagePath = $request->file('image')->store('services_images', 'public');
            $validated['image'] = $imagePath;
        }

        $service->update($validated);
        $service->image = isset($validated['image']) ? asset('storage/services_images/' . $validated['image']) : $service->image;

        return response()->json($service);
    }

    // Delete a service
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
