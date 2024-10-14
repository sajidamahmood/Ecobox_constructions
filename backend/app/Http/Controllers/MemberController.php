<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class MemberController extends Controller
{
    // GET all members
    public function index()
    {
        $members = Member::all();
        return response()->json($members, 200);
    }

    // GET a single member by ID
    public function show($id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        return response()->json($member, 200);
    }

    // POST - Create a new member
    public function store(Request $request)
    {
        // Log incoming request data
        Log::info('Incoming Request to Create Member:', $request->all());

        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048', // Validate image
            'description' => 'nullable|string',
        ]);

        // Handle image upload if present
        if ($request->hasFile('image')) {
            // Store the image in the 'public/team_images' directory
            $path = $request->file('image')->store('team_images', 'public');
            $validatedData['image'] = Storage::url($path); // Get the public URL
        }

        // Create a new member
        $member = Member::create($validatedData);

        // Log created member data
        Log::info('Created Member:', $member->toArray());

        return response()->json($member, 201); // Return 201 Created
    }

    // PUT/PATCH - Update a member by ID
    public function update(Request $request, $id)
    {
        // Find the member by ID
        $member = Member::find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        // Validate incoming data for update
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048', // Validate image
            'description' => 'nullable|string',
        ]);

        // Handle image upload if present
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($member->image) {
                $oldImagePath = str_replace('/storage/', '', $member->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            // Store the new image
            $path = $request->file('image')->store('team_images', 'public');
            $validatedData['image'] = Storage::url($path); // Get the public URL
        }

        // Update the member with the validated data
        $member->update($validatedData);

        return response()->json($member, 200); // Return 200 OK
    }

    // DELETE - Remove a member by ID
    public function destroy($id)
    {
        // Find the member by ID
        $member = Member::find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        // Delete the image if exists
        if ($member->image) {
            $imagePath = str_replace('/storage/', '', $member->image);
            Storage::disk('public')->delete($imagePath);
        }

        // Delete the member
        $member->delete();

        return response()->json(['message' => 'Member deleted successfully'], 200);
    }
}
