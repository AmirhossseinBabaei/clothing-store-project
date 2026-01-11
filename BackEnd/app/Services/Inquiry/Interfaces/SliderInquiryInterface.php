<?php

namespace App\Services\Inquiry\Interfaces;

use App\Models\Slider;

interface SliderInquiryInterface
{
    public function getAllSliders(): array;

    public function getAllSlidersByPaginate(int $perPaginate): array;

    public function createSlider(array $data): Slider;

    public function updateSlider(int $id, array $data);

    public function destroySlider(int $id): bool;
}
