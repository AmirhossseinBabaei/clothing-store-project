<?php

namespace App\Services\Inquiry\Drivers;

use App\Models\Slider;
use App\Services\Inquiry\Interfaces\SliderInquiryInterface;

class SliderInquiryDriver implements SliderInquiryInterface
{
    public function getAllSliders(): array
    {
        return Slider::get()->all();
    }

    public function getAllSlidersByPaginate(int $perPaginate): array
    {
        return Slider::orderBy('id', 'desc')->paginate(10);
    }

    public function createSlider(array $data): Slider
    {
        return Slider::create($data);
    }

    public function destroySlider(int $id): bool
    {
        $slider = Slider::where('id', $id)->first();

        return $slider ? $slider->delete() : false;
    }

    public function updateSlider(int $id, array $data)
    {
        $slider = Slider::where('id', $id)->first();

        $sliderStatus = $slider ? $slider->update($data) : null;

        return $sliderStatus ? $slider : null;
    }
}
