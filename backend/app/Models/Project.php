<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // Define fillable properties
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'image', 
       ];
}
