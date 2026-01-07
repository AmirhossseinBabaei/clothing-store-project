<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Psy\Util\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'الکترونیک', 'slug' => 'electronics'],
            ['name' => 'لوازم خانگی', 'slug' => 'home-appliances'],
            ['name' => 'پوشاک', 'slug' => 'clothing'],
            ['name' => 'کتاب و لوازم تحریر', 'slug' => 'books-stationery'],
            ['name' => 'آرایشی و بهداشتی', 'slug' => 'beauty-health'],
            ['name' => 'ورزش و سرگرمی', 'slug' => 'sports-entertainment'],
            ['name' => 'غذا و نوشیدنی', 'slug' => 'food-drinks'],
            ['name' => 'خودرو و موتورسیکلت', 'slug' => 'automotive'],
            ['name' => 'ابزار و صنعتی', 'slug' => 'tools-industrial'],
            ['name' => 'کودک و نوزاد', 'slug' => 'kids-babies'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // اضافه کردن زیردسته‌ها (اختیاری)
        $subcategories = [
            ['name' => 'موبایل و تبلت', 'parent_id' => 1],
            ['name' => 'لپ‌تاپ و کامپیوتر', 'parent_id' => 1],
            ['name' => 'تلویزیون و صوتی', 'parent_id' => 1],
            ['name' => 'یخچال و فریزر', 'parent_id' => 2],
            ['name' => 'ماشین لباسشویی', 'parent_id' => 2],
            ['name' => 'مردانه', 'parent_id' => 3],
            ['name' => 'زنانه', 'parent_id' => 3],
            ['name' => 'بچه‌گانه', 'parent_id' => 3],
        ];

        foreach ($subcategories as $subcategory) {
            DB::table('categories')->insert([
                'name' => $subcategory['name'],
                'parent_id' => $subcategory['parent_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('✅ 10 دسته‌بندی اصلی و 8 زیردسته ایجاد شدند.');

        $faker = \Faker\Factory::create('fa_IR'); // فیکر فارسی

        // لیست محصولات واقعی
        $productNames = [
            'گوشی موبایل شیائومی ردمی نوت 11',
            'لپ‌تاپ ایسوس ویوو بوک 15',
            'تلویزیون ال‌جی 55 اینچ ال‌ای‌دی',
            'یخچال فریزر دو قلو سامسونگ',
            'ماشین لباسشویی ال‌جی 8 کیلوگرم',
            'کت مردانه پشمی زمستانی',
            'مانتو زنانه مجلسی مدل 2024',
            'کتاب آموزش لاراول پیشرفته',
            'عطر مردانه آرمانی کد 2023',
            'توپ فوتبال آدیداس اورجینال',
            'قهوه ترک ارومیه 500 گرم',
            'لاستیک خودرو پرللی 215/65/R16',
            'دریل شارژی بوش مدل پرو',
            'اسباب‌بازی لگو شهر کوچک',
            'شیر خشک نان 2 مرحله 800 گرم',
            'هدفون بلوتوثی سونی WH-1000XM4',
            'ساعت هوشمند اپل واچ سری 8',
            'مایکروویو پاناسونیک 30 لیتری',
            'جاکفشی چوبی 4 طبقه',
            'میز ناهارخوری 6 نفره شیشه‌ای',
            'کوله پشتی مدرسه طرح اسپایدرمن',
            'لوازم آرایشی رژلب مایع مای',
            'کنسول بازی پلی‌استیشن 5',
            'دوچرخه کوهستان 21 دنده',
            'کباب پز برقی خانگی',
            'دستگاه آبمیوه‌گیری فیلیپس',
            'ماشین ظرفشویی بوش 12 نفره',
            'پتو کرک سه بعدی تخت دو نفره',
            'مبل استیل 3+2+1 چرم مصنوعی',
            'آینه بزرگ دیواری دکوراتیو',
            'سرویس قابلمه تفلون 7 پارچه',
            'جاروبرقی شارژی دایسون V11',
            'پنکه سقفی روشن طرح مدرن',
            'چرخ خیاطی برادر خانگی',
            'میز تحریر چوبی با کشو',
            'کتابخانه دیواری 5 طبقه',
            'گلدان سرامیکی بزرگ طرح هندسی',
            'ساعت دیواری مدرن عقربه‌ای',
            'فرش 700 شانه 4*3 متر',
            'پرده حریر طرح ساده کرم',
            'سینمای خانگی سامسونگ ساندبار',
            'دوربین مداربسته هوشمند شیائومی',
            'روتر وایرلس تی‌پی‌لینک Archer',
            'پاوربانک انکر 20000 میلی‌آمپر',
            'فلش مموری سامسونگ 128 گیگ',
            'کارت گرافیک انویدیا RTX 4060',
            'میز ایستاده گیمینگ RGB',
            'صندلی گیمینگ ارگونومیک',
            'ماوس گیمینگ ریزر وایپر',
            'کیبورد مکانیکی کورسیر K70'
        ];

        // تصاویر نمونه (لینک‌های واقعی)
        $sampleImages = [
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        ];

        $statuses = ['draft', 'published', 'rejected'];

        // گرفتن کاربران موجود
        $users = DB::table('users')->pluck('id')->toArray();
        if (empty($users)) {
            // اگر کاربری نیست، یک کاربر بساز
            $userId = DB::table('users')->insertGetId([
                'name' => 'فروشنده نمونه',
                'email' => 'seller@example.com',
                'password' => bcrypt('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $users = [$userId];
        }

        // گرفتن دسته‌بندی‌ها
        $categories = DB::table('categories')->pluck('id')->toArray();

        for ($i = 0; $i < 50; $i++) {
            $name = $productNames[$i % count($productNames)] . ' مدل ' . ($i + 1);
            $slug = \Illuminate\Support\Str::slug($name) . '-' . ($i + 1);

            DB::table('products')->insert([
                'user_id' => $faker->randomElement($users),
                'category_id' => $faker->randomElement($categories),
                'name' => $name,
                'image' => $sampleImages[$i % count($sampleImages)],
                'description' => $this->generateDescription($faker),
                'price' => $faker->numberBetween(100000, 10000000), // قیمت بین 100 هزار تا 10 میلیون
                'status' => $faker->randomElement($statuses),
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('✅ 50 محصول با تصاویر واقعی ایجاد شدند.');
    }

    private function generateDescription($faker): string
    {
        $descriptions = [
            'محصولی با کیفیت عالی و طراحی مدرن. مناسب برای استفاده روزمره.',
            'دارای گارانتی 18 ماهه و خدمات پس از فروش معتبر.',
            'ساخته شده از بهترین مواد اولیه با تکنولوژی روز دنیا.',
            'مناسب برای هدیه دادن به عزیزانتان در مناسبت‌های مختلف.',
            'قابلیت‌های پیشرفته و کاربری آسان برای همه سنین.',
            'با خرید این محصول از تخفیف ویژه بهره‌مند شوید.',
            'محصولی سبک و با دوام با طراحی ارگونومیک.',
            'مناسب برای استفاده در خانه، محل کار و سفر.',
            'دارای استانداردهای بین‌المللی کیفیت و ایمنی.',
            'با یکبار خرید، مشتری همیشگی ما خواهید بود.'
        ];

        return implode(' ', $faker->randomElements($descriptions, 3));
    }

}
