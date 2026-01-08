<?php

return [
    "api" => [
        "status_code" => [
            "200" => 'OK - Successful',
            "201" => 'Created - Resource created successfully',
            "202" => 'Accepted - Request accepted for processing',
            "204" => 'No Content - Request successful but no content returned',

            "400" => 'Bad Request - Invalid request syntax',
            "401" => 'Unauthorized - Authentication required',
            "403" => 'Forbidden - Access denied',
            "404" => 'Not Found - Resource not found',
            "405" => 'Method Not Allowed - Invalid HTTP method',
            "422" => 'Unprocessable Entity - Validation failed',

            "500" => 'Internal Server Error - Something went wrong',
            "501" => 'Not Implemented - Feature not supported',
            "502" => 'Bad Gateway - Invalid response from upstream server',
            "503" => 'Service Unavailable - Server temporarily overloaded',
            "504" => 'Gateway Timeout - Upstream server timed out',
        ],
        "response" => [
            "user" => [
                "users_empty" => 'the users table is empty.'
            ],
            "product" => [
                "product_empty" => 'the products table is empty.'
            ],
            'auth' => [
                'invalid_password' => 'the password is incorrect, please try again later'
            ]
        ]
    ]
];
