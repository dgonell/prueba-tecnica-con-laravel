// resources/js/Components/ConfirmDialog.jsx
import React from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";

export default function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg shadow-xl z-50 p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-bold mb-2">{title}</Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">{message}</Dialog.Description>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
