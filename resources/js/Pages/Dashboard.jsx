import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido, Admin!</h1>
        <p className="text-gray-600">Selecciona una opción en el menú para comenzar.</p>
      </div>
    </DashboardLayout>
  );
}
