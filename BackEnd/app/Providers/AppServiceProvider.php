<?php

namespace App\Providers;

use App\Services\Inquiry\Drivers\ProductInquiryDriver;
use App\Services\Inquiry\Drivers\UserInquiryDriver;
use App\Services\Inquiry\Interfaces\ProductInquiryInterface;
use App\Services\Inquiry\Interfaces\UserInquiryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductInquiryInterface::class, ProductInquiryDriver::class);
        $this->app->bind(UserInquiryInterface::class, UserInquiryDriver::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
