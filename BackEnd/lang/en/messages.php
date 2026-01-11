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
                "users_empty" => 'The users table is empty'
            ],
            "product" => [
                "product_empty" => 'The products table is empty',
                'create_successfully_product' => 'The product created successFully!',
                'update_successfully_product' => 'The product updated successFully!',
                'destroy_successfully_product' => 'The product deleted successFully!'
            ],
            "slider" => [
                "slider_empty" => 'The slider table is empty',
                'create_successfully_slider' => 'The slider created successFully!',
                'update_successfully_slider' => 'The slider updated successFully!',
                'destroy_successfully_slider' => 'The slider deleted successFully!'
            ],
            'auth' => [
                'invalid_password' => 'The password is incorrect, please try again later'
            ]
        ]
    ]
];
