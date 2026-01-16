# 🚗 Transporte Mixto Ecuador

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)]() [![Vercel](https://img.shields.io/badge/deploy-vercel-black.svg)]() [![License](https://img.shields.io/badge/license-MIT-green.svg)]()

## 📋 Descripción
**Transporte Mixto** es una aplicación web desarrollada con **Next.js 15** y **TypeScript** para gestionar y visualizar servicios de transporte mixto (1 y 2 cabinas) en Ecuador. La app permite monitorear vehículos en un mapa interactivo, administrar paradas, ver el estado y la disponibilidad de las unidades, y cambiar entre temas claro/oscuro.

---

## 📚 Tabla de contenidos
1. [Demo](#demo)
2. [Características](#caracter%C3%ADsticas)
3. [Tecnologías](#tecnolog%C3%ADas)
4. [Instalación](#instalaci%C3%B3n)
5. [Variables de entorno](#variables-de-entorno)
6. [Comandos útiles](#comandos-%C3%BAtiles)
7. [Estructura del proyecto](#estructura-del-proyecto)
8. [Contribuir](#contribuir)
9. [Despliegue](#despliegue)
10. [Licencia](#licencia)

---

## 🎬 Demo
_Agrega aquí capturas o un GIF del funcionamiento (recomendado: `public/demo.gif`)._

> Tip: Puedes usar `screenshots/` dentro de `public/` y referenciarlas en este README.

---

## ✨ Características
- 🗺️ **Mapa interactivo** con marcadores para vehículos y paradas
- 🚘 **Gestión de vehículos**: ver modelo, capacidad, conductor y estado
- 🧭 **Filtros** por estado y tipo de cabina (simple/doble)
- 📋 **Lista de paradas** con búsqueda y filtros
- 🎨 **Sistema de temas** (Claro / Oscuro) con selector persistente
- 🔒 **Autenticación básica** (hooks y protección de rutas)
- 🔁 **Integración con Supabase** para persistencia y real-time updates
- 📊 **Panel de estadísticas** (en desarrollo)
- 📱 **Mobile-ready**: responsive y pensado para dispositivos móviles

---

## 🛠️ Tecnologías
- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Supabase (Postgres)
- Leaflet / React-Leaflet
- shadcn/ui & Radix UI
- Zod + react-hook-form

---

## ✅ Instalación
Requisitos: Node.js 18+ y pnpm (recomendado)

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/transporte-mixto-ecuador.git
cd transporte-mixto-ecuador

# Instala dependencias
pnpm install
```

---

## 🔑 Variables de entorno
Copia `.env.example` o crea `.env.local` en la raíz y añade las variables necesarias:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
# Opcionales
NEXT_PUBLIC_MAP_PROVIDER_KEY=tu_api_key_de_mapas
```

> Nota: El archivo `lib/supabaseClient.ts` valida que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` estén definidas.

---

## ▶️ Comandos útiles
Los scripts definidos en `package.json`:

```bash
pnpm dev      # Inicia servidor de desarrollo
pnpm build    # Genera build para producción
pnpm start    # Inicia servidor en modo producción
pnpm lint     # Ejecuta linter
```

---

## 📁 Estructura del proyecto
```
transporte-mixto-ecuador/
├── app/                 # Rutas y layouts (Next.js App Router)
├── components/          # Componentes UI reutilizables
├── hooks/               # Custom hooks (useAuth, useVehicles...)
├── lib/                 # Clientes y utilidades (supabaseClient)
├── services/            # Lógica de servicios (mapService)
├── styles/              # CSS global y temas
├── public/              # Assets públicos (images, demo.gif)
└── utils/               # Helpers y formateadores
```

---

## 📈 Despliegue
Se recomienda desplegar en Vercel (configura las variables de entorno en el dashboard). Alternativamente puedes usar Netlify o cualquier proveedor que soporte Node/Next.js.

---

## 🤝 Contribuir
1. Fork y crea una rama feature: `git checkout -b feat/mi-cambio`
2. Haz commits claros y pequeños
3. Abre PR con descripción y screenshots

Revisa issues abiertos y crea pull requests para mejoras o correcciones.

---

## 📝 Licencia
Este repositorio usa **MIT License**. Añade `LICENSE` si quieres que se publique oficialmente.

---

## 📬 Contacto
Para dudas o mejoras abre un issue o contacta a `tu-email@ejemplo.com`.

---

Gracias por interesarte en el proyecto — ¡tu colaboración es bienvenida! 🚀
