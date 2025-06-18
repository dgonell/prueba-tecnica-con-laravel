import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm } from "@inertiajs/react";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function Index({ contactos }) {
  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
      destroy(route("contactos.destroy", id));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contactos</h1>
        <Link href="/contactos/create">
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Nuevo
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Teléfono</th>
              <th className="px-6 py-4">Provincia</th>
              <th className="px-6 py-4">Ciudad</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactos.data.map((contacto) => (
              <tr key={contacto.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{contacto.nombre}</td>
                <td className="px-6 py-3">{contacto.email}</td>
                <td className="px-6 py-3">{contacto.telefono}</td>
                <td className="px-6 py-3">{contacto.provincia}</td>
                <td className="px-6 py-3">{contacto.ciudad}</td>
                <td className="px-6 py-3 flex gap-2">
                  <Link href={`/contactos/${contacto.id}/edit`}>
                    <Button variant="outline" size="icon">
                      <PencilSquareIcon className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(contacto.id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        {contactos.links.map((link, index) => (
          <Link
            key={index}
            href={link.url || "#"}
            className={`px-3 py-1 mx-1 rounded ${
              link.active
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } ${!link.url && "pointer-events-none opacity-50"}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
