<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\v1\ContactResource;
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

    public function index(): JsonResponse
    {
        $contacts = $this->inquiryService->getContactsByPaginate(10);

        if (null == $contacts) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.contact.contact_empty')
                ]
                , StatusCode::OK->value);
        }

        return response()->json(
            [
                "data" => ContactResource::collection($contacts),
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }
}
