<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Contact Email</title>
</head>
<body>
    <h1>You have received an enquiry</h1>
    <p><strong>Name:</strong> {{ $formData['name'] }}</p>
    <p><strong>Email:</strong> {{ $formData['email'] }}</p>
    <p><strong>Phone:</strong> {{ $formData['phone'] }}</p>
    <p><strong>Postal Code:</strong> {{ $formData['postal_code'] }}</p>
    <p><strong>Description:</strong> {{ $formData['description'] ?? 'No message provided' }}</p>
</body>
</html>
