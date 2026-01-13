<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    protected $table = "contacts";

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'description'
    ];
}
