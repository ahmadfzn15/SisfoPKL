<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\KelasController;

Route::controller(PagesController::class)->group(function() {
    Route::get('/', "index")->name('dashboard');
    Route::get('/setting', "setting")->name('setting');
    Route::get('/notification', "notification")->name('notification');
    Route::get('/profile', "profile")->name('profile');
});

Route::resource('/siswa', SiswaController::class);
Route::resource('/kelas', KelasController::class);

require __DIR__ . '/auth.php';
