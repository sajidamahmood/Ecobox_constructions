<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    // Retrieve all testimonials
    public function index()
    {
        return Testimonial::all();
    }

    // Retrieve a single testimonial by ID
    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimonial not found'], 404);
        }

        return $testimonial;
    }

    // Store a new testimonial
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string',
            'image_url' => 'nullable|url', // Validate image URL
        ]);

        // Create and return the new testimonial
        $testimonial = Testimonial::create($request->all());

        return response()->json($testimonial, 201); // HTTP status 201 Created
    }

    // Update an existing testimonial
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimonial not found'], 404);
        }

        // Validate the incoming request data
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'message' => 'sometimes|required|string',
            'image_url' => 'nullable|url', // Validate image URL for update
        ]);

        // Update and return the testimonial
        $testimonial->update($request->all());

        return response()->json($testimonial, 200); // HTTP status 200 OK
    }

    // Delete a testimonial
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimonial not found'], 404);
        }

        $testimonial->delete();

        return response()->json(['message' => 'Testimonial deleted successfully'], 204); // HTTP status 204 No Content
    }
}
