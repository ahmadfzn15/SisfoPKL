<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::controller(AuthController::class)->group(function() {
    Route::get('/signin', "index")->name('signin');
});
