<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;


/**
 * @OA\Tag(
 *     name="Contact",
 *     description="Operations related to the contact form"
 * )
 */

class ContactController extends Controller
{

    /**
     * @OA\Post(
     *     path="/api/contact",
     *     summary="Send Contact Email",
     *     description="This endpoint is used to send contact form data via email.",
     *     operationId="sendContactMail",
     *     tags={"Contact"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "phone", "postalCode", "description"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="johndoe@example.com"),
     *             @OA\Property(property="phone", type="string", example="1234567890"),
     *             @OA\Property(property="postalCode", type="string", example="12345"),
     *             @OA\Property(property="description", type="string", example="I need assistance with the project."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully sent contact email.",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Thanks for contacting us.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation errors.",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Failed to send the message.",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Failed to send the message. Please try again later.")
     *         )
     *     )
     * )
     */


    public function sendContactMail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email',
            'phone' => 'required|digits:10',
            'postalCode' => 'required|digits:5',
            'description' => 'required|min:10',
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $formData = [
            'name' => $request->name, 
            'email' => $request->email, 
            'phone' => $request->phone,
            'postal_code' => $request->postal_code,
            'description' => $request->description,
        ];
        

    
        try {
            Mail::to('admin@example.com')->send(new ContactFormMail($formData));
            return response()->json([
                'status' => true,
                'message' => 'Thanks for contacting us.'
            ]);
        } catch (\Exception $e) {
            \Log::error('Mail sending failed: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Failed to send the message. Please try again later.'
            ]);
        }
        
        } 
        
    }

