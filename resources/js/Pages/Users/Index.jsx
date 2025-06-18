import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Index({ users }) {
  const { auth } = usePage().props;
  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      destroy(route("usuarios.destroy", id));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Link href={route("usuarios.create")}> 
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Nuevo Usuario
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Rol</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3 flex gap-2">
                  <Link href={route("usuarios.edit", user.id)}>
                    <Button variant="outline" size="icon">
                      <PencilSquareIcon className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}