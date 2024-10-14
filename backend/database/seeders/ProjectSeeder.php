<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    
    public function run(): void
    {
            Projet::create([
                'name' => 'Complexe commercial',
                'description' => 'Un projet de bâtiment habitable',
                'start_date' => '2024-10-01',
                'end_date' => '2025-06-30',
                'image' => 'commercial_complex.jpg', ]) ;
        
            Projet::create([
                'name' => 'Villas résidentielles',
                'description' => 'Projet de villas résidentielles ',
                'start_date' => '2024-07-01',
                'end_date' => '2025-05-30',
                'image' => 'villas_projet.jpg', ]);
        }
        
    }

