# Gestion de Cursos e Inscripciones - Experiencia Integrada

Solucion academica para la PA4 de Programacion Web II. Integra un portal del estudiante en React con autenticacion JWT, una API REST compatible y un modulo publico en Next.js para visitantes.

## Integrantes

- Integrante 1: pendiente
- Integrante 2: pendiente
- Integrante 3: pendiente
- Integrante 4: pendiente

## Stack

- API REST: Node.js, Express, JWT, CORS
- Portal estudiante: Vite, React, React Router, Axios
- Modulo publico: Next.js App Router
- Preparacion: variables de entorno, builds de produccion y estructura por carpetas

## Estructura

```text
api/            API REST con login, cursos e inscripciones protegidas
portal-react/   Portal privado del estudiante en React
public-next/    Modulo publico en Next.js con rutas dinamicas
screenshots/    Carpeta sugerida para evidencias del funcionamiento
```

## Instalacion

```bash
npm install
cp api/.env.example api/.env
cp portal-react/.env.example portal-react/.env
cp public-next/.env.example public-next/.env
```

## Ejecucion local

En una sola terminal:

```bash
npm run dev
```

O por separado:

```bash
npm run dev:api
npm run dev:portal
npm run dev:public
```

URLs por defecto:

- API: `http://localhost:4000`
- Portal React: `http://localhost:5173`
- Modulo publico Next.js: `http://localhost:3000`

Usuario demo:

- Correo: `estudiante@isil.pe`
- Password: `123456`

## Variables de entorno

`api/.env`

```env
PORT=4000
JWT_SECRET=dev_secret_change_me
CLIENT_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:3000,http://localhost:3002
```

`portal-react/.env`

```env
VITE_API_URL=http://localhost:4000/api
```

`public-next/.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Para simplicidad academica el portal guarda el JWT en `localStorage`. En una aplicacion productiva se recomienda emitir el token en una cookie `httpOnly`, `secure` y `sameSite`, reduciendo exposicion ante XSS.

## Flujo implementado

- Login contra `POST /api/auth/login`.
- `AuthContext` con `user`, `token`, `login()` y `logout()`.
- Interceptor Axios que inyecta `Authorization: Bearer <token>`.
- Manejo de `401`: limpia sesion y redirige al login.
- `PrivateRoute` para proteger las vistas del estudiante.
- Listado y detalle de cursos desde API.
- Inscripcion protegida con `POST /api/enrollments`.
- Vista "Mis cursos" con inscripciones del estudiante.
- Next.js con inicio, catalogo publico y detalle dinamico de curso.

## Build de produccion

```bash
npm run build
```

El script construye el portal React y el modulo publico Next.js. La API no requiere build porque usa Node.js directamente.

## Evidencias

Agregar capturas en `screenshots/` antes de la entrega:

- Login del portal.
- Listado de cursos.
- Detalle de curso con boton "Inscribirme".
- Vista protegida "Mis cursos".
- Home o catalogo publico en Next.js.
- Terminal con `npm run build` exitoso.

## Distribucion de aportes

| Integrante | Aporte principal |
| --- | --- |
| Integrante 1 | Portal React, rutas protegidas y login |
| Integrante 2 | API REST, JWT e inscripciones |
| Integrante 3 | Modulo publico Next.js |
| Integrante 4 | README, evidencias, pruebas y sustentacion |

## Video de sustentacion

Enlace de YouTube: pendiente

El video debe mostrar a los integrantes con camaras prendidas, explicar el flujo, las decisiones tecnicas y evidenciar el build o ejecucion local.
