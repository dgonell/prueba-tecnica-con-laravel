<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\IsAdmin;


use Inertia\Inertia;

Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
Route::middleware(['auth', 'is_admin'])->group(function () {
    Route::resource('usuarios', UserController::class);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware(['auth'])->group(function () {
     Route::get('/', fn () => redirect('/dashboard'));
    Route::resource('contactos', ContactController::class);
    Route::post('/contactos/importar', [ContactController::class, 'importar']);
    Route::get('/reportes', [ContactController::class, 'report'])->name('contactos.report');
    Route::get('/reportes/exportar-excel', [ContactController::class, 'exportExcel'])->name('contactos.exportarExcel');
});

require __DIR__.'/auth.php';
