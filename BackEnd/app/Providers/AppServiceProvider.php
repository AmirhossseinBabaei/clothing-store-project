<?php

namespace App\Providers;

use App\Services\Inquiry\Drivers\AuthInquiryDriver;
use App\Services\Inquiry\Drivers\CategoryInquiryDriver;
use App\Services\Inquiry\Drivers\ContactInquiryDriver;
use App\Services\Inquiry\Drivers\ProductInquiryDriver;
use App\Services\Inquiry\Drivers\UserInquiryDriver;
use App\Services\Inquiry\Interfaces\AuthInquiryInterface;
use App\Services\Inquiry\Interfaces\CategoryInquiryInterface;
use App\Services\Inquiry\Interfaces\ContactInquiryInterface;
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
        $this->app->bind(CategoryInquiryInterface::class, CategoryInquiryDriver::class);
        $this->app->bind(AuthInquiryInterface::class, AuthInquiryDriver::class);
        $this->app->bind(ContactInquiryInterface::class, ContactInquiryDriver::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
