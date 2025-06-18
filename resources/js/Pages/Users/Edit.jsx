import React from "react";
import { useForm, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Edit({ usuario }) {
  const { data, setData, put, processing, errors } = useForm({
    name: usuario.name || "",
    email: usuario.email || "",
    role: usuario.role || "usuario",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("usuarios.update", usuario.id));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
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
          Actualizar
        </Button>
      </form>
    </DashboardLayout>
  );
}