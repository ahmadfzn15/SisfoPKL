<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\KelasController;

Route::controller(SiswaController::class)->group(function() {
    Route::get('/siswa', "get");
    Route::post('/siswa', "store");
});
