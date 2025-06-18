<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminDarielSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Dariel',
            'email' => 'dariel@admin.com',
            'password' => Hash::make('admin'), // Cámbialo si quieres
            'role' => 'admin',
        ]);
    }
}
