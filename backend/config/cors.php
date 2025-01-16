<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'send-contact-mail'],    
    'allowed_methods' => ['*'],  // Allowed methods (GET, POST, etc.)
'allowed_origins' => ['http://localhost:5173', 'https://extraordinary-chaja-f43579.netlify.app','https://ecobox-constructions.onrender.com'],
    'allowed_headers' => ['*'],  // Allowed headers
    'exposed_headers' => [],     // Exposed headers
    'max_age' => 0,              // Max age for preflight request
    'supports_credentials' => true, // Does not support credentials
];
