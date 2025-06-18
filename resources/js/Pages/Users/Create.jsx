import React from "react";
import { useForm, Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    role: "usuario",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("usuarios.store"));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Agregar Usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl"
      >
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <Label htmlFor="role">Rol</Label>
          <select
            id="role"
            className="w-full border px-3 py-2 rounded"
            value={data.role}
            onChange={(e) => setData("role", e.target.value)}
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <Button type="submit" disabled={processing}>
          Guardar
        </Button>
      </form>
    </DashboardLayout>
  );
}