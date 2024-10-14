<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemberSeeder extends Seeder
{
    public function run()
    {
        DB::table('members')->insert([
            [
                'name' => 'Sara',
                'image_url' => 'storage/images/team1.jpg', 
                'description' => 'A brief description about Sara.',
            ],
            [
                'name' => 'Jane Smith',
                'image_url' => 'storage/images/team2.jpg', 
                'description' => 'A brief description about Jane.',
            ],
        ]);
    }
}
