<?php

namespace App\Services\Inquiry\Interfaces;

interface AuthInquiryInterface
{
    public function login($request);

    public function register($request);
}
