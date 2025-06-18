import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function Report({ contactos, filters }) {
    const { data, setData, get, reset } = useForm({
    nombre: filters.nombre || "",
    provincia: filters.provincia || "",
    ciudad: filters.ciudad || "",
    desde: filters.desde || "",
    hasta: filters.hasta || "",
    });


  const submit = (e) => {
    e.preventDefault();
    get("/reportes", {
      preserveState: true,
    });
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Reporte de Contactos</h1>

      <form onSubmit={submit} className="grid md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow mb-6">
        {[
          ["Nombre", "nombre"],
          ["Provincia", "provincia"],
          ["Ciudad", "ciudad"],
        ].map(([label, field]) => (
          <div key={field}>
            <Label htmlFor={field}>{label}</Label>
            <Input
              id={field}
              value={data[field]}
              onChange={(e) => setData(field, e.target.value)}
            />
          </div>
        ))}

        {[
          ["Desde", "desde"],
          ["Hasta", "hasta"],
        ].map(([label, field]) => (
          <div key={field}>
            <Label htmlFor={field} className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4" /> {label}
            </Label>
            <Input
              type="date"
              id={field}
              value={data[field]}
              onChange={(e) => setData(field, e.target.value)}
            />
          </div>
        ))}

        <div className="flex items-end gap-2">
          <Button type="submit">Aplicar Filtros</Button>
            <Button asChild variant="secondary">
            <a
                href={`/reportes/exportar-excel?${new URLSearchParams(data).toString()}`}
                download
            >
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                Exportar CSV
            </a>
            </Button>

        </div>
      </form>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Teléfono</th>
              <th className="px-6 py-4">Provincia</th>
              <th className="px-6 py-4">Ciudad</th>
              <th className="px-6 py-4">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {contactos.data.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{c.nombre}</td>
                <td className="px-6 py-3">{c.email}</td>
                <td className="px-6 py-3">{c.telefono}</td>
                <td className="px-6 py-3">{c.provincia}</td>
                <td className="px-6 py-3">{c.ciudad}</td>
                <td className="px-6 py-3">{new Date(c.created_at).toLocaleDateString()}</td>
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
