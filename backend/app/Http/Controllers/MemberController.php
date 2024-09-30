<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    // 1. GET all members
    public function index()
    {
        $members = Member::all();
        return response()->json($members, 200);
    }

    // 2. GET a single member by ID
    public function show($id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        return response()->json($member, 200);
    }

    // 3. POST - Create a new member
    public function store(Request $request)
    {
        // Log incoming request data
        Log::info('Incoming Request to Create Member:', $request->all());

        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image_url' => 'nullable|url',
            'description' => 'nullable|string',
        ]);

        // Create a new member
        $member = Member::create($validatedData);

        // Log created member data
        Log::info('Created Member:', $member->toArray());

        return response()->json($member, 201);  // Return 201 Created
    }

    // 4. PUT/PATCH - Update a member by ID
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
            'image_url' => 'nullable|url',
            'description' => 'nullable|string',
        ]);

        // Update the member with the validated data
        $member->update($validatedData);

        return response()->json($member, 200);  // Return 200 OK
    }

    // 5. DELETE - Remove a member by ID
    public function destroy($id)
    {
        // Find the member by ID
        $member = Member::find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        // Delete the member
        $member->delete();

        return response()->json(['message' => 'Member deleted successfully'], 200);
    }
}
