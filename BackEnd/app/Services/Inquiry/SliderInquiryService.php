<?php

namespace App\Services\Inquiry;

use App\Models\Slider;
use App\Services\Inquiry\Interfaces\SliderInquiryInterface;

class SliderInquiryService
{
    private SliderInquiryInterface $driver;

    public function __construct(SliderInquiryInterface $driver)
    {
        $this->driver = $driver;
    }

    public function getAllSliders(): array
    {
        return $this->driver->getAllSliders();
    }

    public function createSlider(array $data): Slider
    {
        return $this->driver->createSlider($data);
    }

    public function updateSlider(int $id, array $data)
    {
        return $this->driver->updateSlider($id, $data);
    }

    public function destroySlider(int $id): bool
    {
        return $this->driver->destroySlider($id);
    }
}
