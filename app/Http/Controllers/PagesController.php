<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function index() {
        return Inertia::render("Dashboard");
    }

    public function setting() {
        return Inertia::render("Setting");
    }

    public function notification() {
        return Inertia::render("Notification");
    }

    public function profile() {
        return Inertia::render("Profile");
    }
}
