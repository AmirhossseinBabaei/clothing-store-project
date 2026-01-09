<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Services\Inquiry\ContactInquiryService;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public ContactInquiryService $inquiryService;

    public function __construct(
        ContactInquiryService $inquiryService
    )
    {
        $this->inquiryService = $inquiryService;
    }

    public function getContactCount(): JsonResponse
    {
        $count = $this->inquiryService->getContactsCount();

        return response()->json(
            [
                "data" => ['count' => $count],
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }
}
