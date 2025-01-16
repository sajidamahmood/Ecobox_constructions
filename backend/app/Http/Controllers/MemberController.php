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
        Log::info('Incoming Request to Create Member:', $request->all());

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image_url' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('image_url')) {
            Log::info('Image upload initiated.');

            $path = $request->file('image_url')->store('images', 'public');
            $imageUrl = Storage::url($path);
            $validatedData['image_url'] = $imageUrl;

            Log::info('Uploaded Image Details:', [
                'filename' => $request->file('image_url')->getClientOriginalName(),
                'path' => $path,
                'url' => $imageUrl
            ]);
        } else {
            Log::info('No image was uploaded.');
        }

        $member = Member::create($validatedData);

        Log::info('Created Member:', $member->toArray());

        return response()->json($member, 201);
    }

    // PUT/PATCH - Update a member by ID
    public function update(Request $request, $id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        $member->name = $request->input('name', $member->name);
        $member->description = $request->input('description', $member->description);

        // Check if a new image file is uploaded
        if ($request->hasFile('image_url')) {
            Log::info('Image file detected in request.');

            // Delete the old image if it exists
            if ($member->image_url) {
                $oldImagePath = str_replace('/storage/', '', $member->image_url);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Store the new image
            $imagePath = $request->file('image_url')->store('images', 'public');
            $member->image_url = Storage::url($imagePath);

            Log::info('New image stored successfully at path: ' . $member->image_url);
        } else {
            Log::warning('No image file detected in request.');
        }

        $member->save();

        return response()->json([
            'message' => 'Member updated successfully',
            'member' => $member
        ]);
    }

    // DELETE - Remove a member by ID
    public function destroy($id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        if ($member->image_url) {
            $imagePath = str_replace('/storage/', '', $member->image_url);
            Storage::disk('public')->delete($imagePath);
        }

        $member->delete();

        return response()->json(['message' => 'Member deleted successfully'], 200);
    }
}
