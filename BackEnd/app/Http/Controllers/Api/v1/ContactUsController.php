<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContactUsRequest;
use App\Http\Resources\Api\v1\ContactUsResource;
use App\Services\Inquiry\ContactUsInquiryService;
use Illuminate\Http\JsonResponse;

class ContactUsController extends Controller
{
    public ContactUsInquiryService $inquiryService;

    public function __construct(
        ContactUsInquiryService $inquiryService
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
                "data" => ContactUsResource::collection($contacts),
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }


    public function createContactUs(ContactUsRequest $request): JsonResponse
    {
        $contactUs = $this->inquiryService->createContactUs($request->validated());

        if (null == $contactUs) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new ContactUsResource($contactUs),
                "message" => __('messages.api.response.contact_us.create_successfully_contact_us')
            ]
            , StatusCode::OK->value);
    }

    public function updateContactUs(int $id, ContactUsRequest $request): JsonResponse
    {
        $contactUs = $this->inquiryService->updateContactUs($id, $request->validated());

        if (null == $contactUs) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new ContactUsResource($contactUs),
                "message" => __('messages.api.response.contact_us.update_successfully_contact_us')
            ]
            , StatusCode::OK->value);
    }

    public function destroyContactUs(int $id): JsonResponse
    {
        $contactUsStatus = $this->inquiryService->destroyContactUs($id);

        if (false === $contactUsStatus) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => [],
                "message" => __('messages.api.response.contact_us.destroy_successfully_contact_us')
            ]
            , StatusCode::OK->value);
    }
}
