<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'send-contact-mail'],    
    'allowed_methods' => ['*'], 
    'allowed_origins' => ['http://localhost:5173','https://amazing-liger-11e233.netlify.app'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  
    'exposed_headers' => [],  
        'max_age' => 0,             
    'supports_credentials' => true, 
];
