<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kelas = Kelas::all();

        return Inertia::render("Siswa", [
            "kelas" => $kelas
        ]);
    }

    public function get()
    {
        try {
            $siswa = Siswa::all();

            return response()->json($siswa, 200);
        } catch (\Throwable $th) {
            return response()->json("Gagal memuat data", 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $validate = Validator::make([
        //     "foto_profil" => "nullable",
        //     "nama" => "required|string",
        //     "nis" => "required|string",
        //     "nisn" => "required|string",
        //     "id_kelas" => "required|string",
        //     "jenis_kelamin" => "required|string",
        //     "tempat_lahir" => "nullable",
        //     "tanggal_lahir" => "nullable|date",
        //     "email" => "nullable|email",
        //     "no_telp" => "nullable",
        //     "alamat" => "nullable",
        //     "agama" => "nullable",
        // ]);

        // if ($validate->fails()) {
        //     $response = [
        //         "status" => false,
        //         "message" => $validate->errors
        //     ];

        //     return response()->json($response, 500);
        // }

        $db = new Siswa();
        $db->foto_profil = $request->foto_profil;
        $db->nama = $request->nama;
        $db->nis = $request->nis;
        $db->nisn = $request->nisn;
        $db->id_kelas = $request->id_kelas;
        $db->jenis_kelamin = $request->jenis_kelamin;
        $db->tempat_lahir = $request->tempat_lahir;
        $db->tanggal_lahir = $request->tanggal_lahir;
        $db->email = $request->email;
        $db->no_tlp = $request->no_tlp;
        $db->alamat = $request->alamat;
        $db->agama = $request->agama;

        $db->save();

        $response = [
            "status" => true,
            "message" => "Data siswa berhasil ditambahkan."
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Siswa $siswa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Siswa $siswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Siswa $siswa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Siswa $siswa)
    {
        //
    }
}
