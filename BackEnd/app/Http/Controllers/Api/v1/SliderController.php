<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\SliderRequest;
use App\Http\Resources\Api\v1\SliderResource;
use App\Services\Inquiry\SliderInquiryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public SliderInquiryService $inquiryService;

    public function __construct(SliderInquiryService $inquiryService)
    {
        $this->inquiryService = $inquiryService;
    }

    public function index(): JsonResponse
    {
        $sliders = $this->inquiryService->getAllSliders();

        if (null == $sliders) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.slider.slider_empty')
                ]
                , StatusCode::OK->value);
        }

        return response()->json(
            [
                "data" => SliderResource::collection($sliders),
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }

    public function createSlider(SliderRequest $request): JsonResponse
    {
        $slider = $this->inquiryService->createSlider($request->validated());

        if (null == $slider) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new SliderResource($slider),
                "message" => __('messages.api.response.slider.create_successfully_slider')
            ]
            , StatusCode::OK->value);
    }

    public function updateSlider(int $id, SliderRequest $request): JsonResponse
    {
        $slider = $this->inquiryService->updateSlider($id, $request->validated());

        if (null == $slider) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new SliderResource($slider),
                "message" => __('messages.api.response.slider.update_successfully_slider')
            ]
            , StatusCode::OK->value);
    }

    public function destroySlider(int $id): JsonResponse
    {
        $sliderStatus = $this->inquiryService->destroySlider($id);

        if (false === $sliderStatus) {
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
                "message" => __('messages.api.response.slider.destroy_successfully_slider')
            ]
            , StatusCode::OK->value);
    }
}
