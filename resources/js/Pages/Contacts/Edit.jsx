import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Edit({ contacto }) {
  const { flash } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    nombre: contacto?.nombre || "",
    email: contacto?.email || "",
    telefono: contacto?.telefono || "",
    provincia: contacto?.provincia || "",
    ciudad: contacto?.ciudad || "",
    _method: "put",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("contactos.update", contacto.id), {
      preserveScroll: true,
      onSuccess: () => {
        window.location.href = route("contactos.index");
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editar Contacto</h1>
        <Link href={route("contactos.index")}>
          <Button variant="outline">← Volver</Button>
        </Link>
      </div>

      {flash?.success && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          {flash.success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5 max-w-xl"
      >
        {["nombre", "email", "telefono", "provincia", "ciudad"].map((field) => (
          <div key={field}>
            <Label htmlFor={field} className="capitalize">
              {field}
            </Label>
            <Input
              id={field}
              type="text"
              value={data[field]}
              onChange={(e) => setData(field, e.target.value)}
              className="mt-1"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

        <Button type="submit" disabled={processing}>
          Actualizar
        </Button>
      </form>
    </DashboardLayout>
  );
}
