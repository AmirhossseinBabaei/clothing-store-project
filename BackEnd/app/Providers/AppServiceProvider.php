<?php

namespace App\Providers;

use App\Services\Inquiry\Drivers\ProductInquiryDriver;
use App\Services\Inquiry\Interfaces\ProductInquiryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductInquiryInterface::class, ProductInquiryDriver::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
