# 📘 Sistema de Gestión de Contactos

Sistema desarrollado con **Laravel 12**, **Inertia.js + React** y **Tailwind CSS**. Permite registrar, editar, eliminar y filtrar contactos, además de gestionar usuarios con control de acceso por roles (`admin` / `usuario`).

---

## ✅ Requisitos

- PHP >= 8.2  
- Composer  
- Node.js >= 18  
- NPM  
- MySQL o MariaDB  
- Git  

---

## ⚙️ Instalación Local

1. **Clonar el repositorio**

```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO
```

2. **Instalar dependencias**

```bash
composer install
npm install
```

3. **Configurar el entorno**

```bash
cp .env.example .env
php artisan key:generate
```

Edita el archivo `.env` con tus datos de base de datos:

```
DB_DATABASE=nombre
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

4. **Migrar y poblar la base de datos**

```bash
php artisan migrate --seed
```

5. **Compilar assets y levantar el servidor**

```bash
npm run build
php artisan serve
```

Accede a `http://127.0.0.1:8000`


## 🧪 Acceso de prueba

- **Email:** `admin@example.com`  
- **Contraseña:** `password`  

---




## 📄 Comandos útiles

```bash
php artisan migrate:fresh --seed     # Reinicia la base de datos
php artisan optimize:clear           # Limpia cachés
npm run dev                          # Compila en modo desarrollo
```

---

¡Listo! Ya puedes gestionar contactos y usuarios fácilmente 🎯
