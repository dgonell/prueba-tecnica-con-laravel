<?php

namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
    return Inertia::render('Usuarios/Index', [
        'usuarios' => User::paginate(10),
    ]);
}

public function create() {
    return Inertia::render('Usuarios/Create');
}

public function store(Request $request) {
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required|confirmed|min:6',
        'rol' => 'required|in:admin,usuario',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'rol' => $request->rol,
    ]);

    return redirect()->route('usuarios.index')->with('success', 'Usuario creado.');
}

public function edit(User $usuario) {
    return Inertia::render('Usuarios/Edit', ['usuario' => $usuario]);
}

public function update(Request $request, User $usuario) {
    $usuario->update($request->only(['name', 'email', 'rol']));
    return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado.');
}

public function destroy(User $usuario) {
    $usuario->delete();
    return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado.');
}

}
