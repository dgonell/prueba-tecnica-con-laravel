import React from "react";
import { router, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Disclosure, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserGroupIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

function handleLogout() {
  router.post(route('logout'));
}

export default function DashboardLayout({ children }) {
  const auth = usePage().props.auth || { user: null };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <aside className="hidden lg:flex w-64 bg-white border-r shadow-md flex-col">
        <Link
          href="/dashboard"
          className="p-6 font-bold text-xl border-b flex items-center gap-2 text-blue-700 hover:bg-gray-100 transition"
        >
          <UserGroupIcon className="w-6 h-6" />
          <span>Mi App</span>
        </Link>
        <nav className="p-4 space-y-4 text-sm">
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex items-center justify-between font-semibold hover:text-blue-600">
                  <span className="flex items-center gap-2">
                    <UserGroupIcon className="w-5 h-5" />
                    Contactos
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 transform transition ${open ? "rotate-180" : ""}`} />
                </Disclosure.Button>
                <Disclosure.Panel className="ml-6 mt-2 space-y-2">
                  <Link href="/contactos" className="flex items-center gap-2 hover:text-blue-500">
                    <UserGroupIcon className="w-4 h-4" />
                    Ver Contactos
                  </Link>
                  <Link href="/contactos/create" className="flex items-center gap-2 hover:text-blue-500">
                    <PlusCircleIcon className="w-4 h-4" />
                    Crear Contacto
                  </Link>
                  <Link href="/reportes" className="flex items-center gap-2 hover:text-blue-500">
                    <DocumentTextIcon className="w-4 h-4" />
                    Reportes
                  </Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {auth?.user?.role === "admin" && (
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full flex items-center justify-between font-semibold hover:text-blue-600">
                    <span className="flex items-center gap-2">
                      <UsersIcon className="w-5 h-5" />
                      Usuarios
                    </span>
                    <ChevronDownIcon className={`w-4 h-4 transform transition ${open ? "rotate-180" : ""}`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="ml-6 mt-2 space-y-2">
                    <Link href="/usuarios" className="flex items-center gap-2 hover:text-blue-500">
                      <UsersIcon className="w-4 h-4" />
                      Ver Usuarios
                    </Link>
                    <Link href="/usuarios/create" className="flex items-center gap-2 hover:text-blue-500">
                      <PlusCircleIcon className="w-4 h-4" />
                      Crear Usuario
                    </Link>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:underline mt-4"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Cerrar sesión
          </button>
        </nav>
      </aside>

      <Disclosure as="header" className="lg:hidden bg-white border-b shadow-sm">
        {({ open }) => (
          <>
            <div className="p-4 flex items-center justify-between">
              <div className="font-bold text-lg">📘 Mi App</div>
              <Disclosure.Button className="text-gray-600 hover:text-black">
                {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </Disclosure.Button>
            </div>
            <Transition
              show={open}
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-150 ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-4"
            >
              <Disclosure.Panel>
                <nav className="p-4 space-y-4 text-sm">
                  <Link href="/contactos" className="flex items-center gap-2 hover:text-blue-500">
                    <UserGroupIcon className="w-4 h-4" />
                    Ver Contactos
                  </Link>
                  <Link href="/contactos/create" className="flex items-center gap-2 hover:text-blue-500">
                    <PlusCircleIcon className="w-4 h-4" />
                    Crear Contacto
                  </Link>
                  <Link href="/reportes" className="flex items-center gap-2 hover:text-blue-500">
                    <DocumentTextIcon className="w-4 h-4" />
                    Reportes
                  </Link>

                  {auth?.user?.role === 'admin' && (
                    <>
                      <Link href="/usuarios" className="flex items-center gap-2 hover:text-blue-500">
                        <UsersIcon className="w-4 h-4" />
                        Ver Usuarios
                      </Link>
                      <Link href="/usuarios/create" className="flex items-center gap-2 hover:text-blue-500">
                        <PlusCircleIcon className="w-4 h-4" />
                        Crear Usuario
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:underline mt-4"
                  >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                    Cerrar sesión
                  </button>
                </nav>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>

      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
    </div>
  );
}
