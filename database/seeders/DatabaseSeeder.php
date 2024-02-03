<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Kelas;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        $kelas = ["X", "XI", "XII"];
        foreach ($kelas as $value) {
            Kelas::create([
                "kelas" => $value
            ]);
        }
    }
}
