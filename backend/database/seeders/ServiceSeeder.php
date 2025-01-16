<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create([
            'title' => 'Plumbing Services',
            'description' => 'We offer high-quality plumbing services, including pipe installation, leak repairs, and bathroom remodeling.',
            'image' => 'plumbing-service.jpg',
        ]);

        Service::create([
            'title' => 'Electrical Services',
            'description' => 'Our experienced electricians provide services such as wiring, circuit installations, and electrical repairs.',
            'image' => 'electrical-service.jpg',
        ]);

    }
}
