import React, { useRef, useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePage, useForm, Link } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    nombre: "",
    email: "",
    telefono: "",
    provincia: "",
    ciudad: "",
  });

  const { flash } = usePage().props;
  const [mensajeExito, setMensajeExito] = useState(null);
  const [erroresCsv, setErroresCsv] = useState([]);
  const fileInputRef = useRef();

  const submit = (e) => {
    e.preventDefault();
    post("/contactos");
  };

  const handleImportarExcel = async (e) => {
    e.preventDefault();

    const archivo = fileInputRef.current.files[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append("archivo", archivo);

    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    if (token) formData.append("_token", token);

    try {
      const res = await fetch("/contactos/importar", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setMensajeExito(result.mensaje || "📥 Contactos importados correctamente.");
        setErroresCsv(result.errores_csv || []);
        fileInputRef.current.value = "";
      } else {
        setMensajeExito("⚠️ Hubo un problema al importar los contactos.");
        setErroresCsv(result.errores_csv || []);
      }
    } catch (err) {
      setMensajeExito("Error al subir el archivo.");
      setErroresCsv([]);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Nuevo Contacto</h1>

        <Link href="/contactos">
          <Button variant="outline">← Volver</Button>
        </Link>
      </div>

      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-5 max-w-xl mb-10">
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
          Guardar
        </Button>
      </form>

      <form
        className="mb-6 bg-white p-6 rounded-xl shadow max-w-xl"
        onSubmit={handleImportarExcel}
        encType="multipart/form-data"
      >
        <Label htmlFor="archivo">Importar contactos desde Excel</Label>
        <Input type="file" name="archivo" ref={fileInputRef} accept=".xlsx,.xls,.csv" className="my-2" />
        <Button type="submit" variant="secondary">Subir Archivo</Button>
      </form>


      {mensajeExito && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          {mensajeExito}
        </div>
      )}

      {erroresCsv.length > 0 && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          <p className="font-bold">Errores en la importación:</p>
          <ul className="list-disc pl-6">
            {erroresCsv.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

  
      {flash?.error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{flash.error}</p>
        </div>
      )}
    </DashboardLayout>
  );
}
