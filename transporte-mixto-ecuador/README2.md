## 🗂️ Estructura del proyecto

A continuación se detalla la estructura principal del proyecto, el cual está construido utilizando Next.js (App Router):

```text
transporte-mixto-ecuador/
│
├── app/                        // 🧩 App principal (Next.js App Router) y Rutas
│   ├── auth/                   // 🔐 Rutas de autenticación
│   │   ├── login/              // - Inicio de sesión
│   │   └── register/           // - Registro de usuarios
│   ├── dashboard/              // 📊 Paneles de control (Dashboards)
│   │   ├── driver/             // - Panel específico para conductores
│   │   └── user/               // - Panel específico para usuarios
│   ├── globals.css             // 🎨 Estilos CSS globales (Tailwind CSS)
│   ├── layout.tsx              // 🏗️ Layout raíz de la aplicación
│   └── page.tsx                // 🚀 Página principal de inicio (Landing page)
│
├── components/                 // 🧱 Componentes reutilizables de React
│   ├── ui/                     // 💅 Componentes base de UI (ej. botones, inputs - shadcn/ui)
│   ├── interactive-map.tsx     // 🗺️ Componente de mapa interactivo
│   ├── stops-list.tsx          // 🚏 Componente de lista de paradas
│   ├── theme-provider.tsx      // 🌗 Proveedor de tema (modo oscuro/claro)
│   └── theme-switcher.tsx      // 🔘 Botón para cambiar el tema
│
├── constants/                  // 📌 Constantes globales
│   ├── index.ts                // - Exportación centralizada de constantes
│   └── themes.ts               // - Configuración de constantes de temas
│
├── data/                       // 📂 Datos estáticos o Mock data (simulación)
│   ├── azuay-stops.ts          // - Datos de paradas en Azuay
│   └── stops.ts                // - Datos generales de paradas
│
├── hooks/                      // 🪝 Custom Hooks de React (Lógica reutilizable)
│   ├── use-mobile.tsx          // - Detección de dispositivos móviles
│   ├── use-toast.ts            // - Hook para lanzar notificaciones (toasts)
│   ├── useAuth.ts              // - Gestión de estado de autenticación
│   ├── useDriverStats.ts       // - Obtención de estadísticas del conductor
│   ├── useStops.ts             // - Gestión de estado para las paradas
│   ├── useTrips.ts             // - Gestión de estado para los viajes
│   └── useVehicles.ts          // - Gestión de estado para los vehículos
│
├── lib/                        // 🛠️ Inicialización de librerías de terceros y utilidades core
│   ├── supabaseClient.ts       // - Configuración del cliente de Supabase (Base de datos/Auth)
│   └── utils.ts                // - Funciones utilitarias clave (ej. unión de clases en Tailwind)
│
├── public/                     // 🖼️ Recursos estáticos públicos accesibles desde el navegador
│   ├── placeholder-logo.*      // - Imágenes de logo por defecto
│   └── placeholder-user.jpg    // - Imágenes de usuario por defecto
│
├── services/                   // 📡 Servicios para conectar con APIs externas
│   └── mapService.ts           // - Lógica de interacción con servicios de mapas
│
├── styles/                     // 🖌️ Estilos adicionales y configuraciones
│   └── globals.css             // - Configuraciones extra de CSS
│
├── types/                      // 🏷️ Definiciones estáticas de TypeScript
│   └── index.ts                // - Interfaces y tipos globales usados en el proyecto
│
├── utils/                      // ⚙️ Funciones de utilidad variadas
│   ├── formatters.ts           // - Formateo de fechas, números o monedas
│   └── validators.ts           // - Lógica para validación de formularios y datos
│
├── .env.example                // 🔑 Plantilla de variables de entorno requeridas
├── .env.local                  // 🔑 Variables de entorno locales reales (ignoradas en git)
├── next.config.mjs             // ⚙️ Configuración principal del compilador de Next.js
├── package.json                // 📦 Dependencias (librerías instaladas) y scripts del proyecto
├── tailwind.config.ts          // 🎨 Configuración de diseño y colores de Tailwind CSS
└── tsconfig.json               // 📘 Configuración del compilador de TypeScript
```
