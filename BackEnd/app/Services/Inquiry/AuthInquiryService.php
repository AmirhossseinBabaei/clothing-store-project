<?php

namespace App\Services\Inquiry;

use App\Services\Inquiry\Drivers\AuthInquiryDriver;

class AuthInquiryService
{
    public AuthInquiryDriver $inquiryDriver;

    public function __construct(
        AuthInquiryDriver $inquiryDriver
    )
    {
        $this->inquiryDriver = $inquiryDriver;
    }

    public function login($request)
    {
        return $this->inquiryDriver->login($request);
    }

    public function register($request)
    {
        return $this->inquiryDriver->register($request);
    }
}
