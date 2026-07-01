# Gestion de Cursos e Inscripciones - Experiencia Integrada

Solucion academica para la PA4 de Programacion Web II. Integra un portal del estudiante en React con autenticacion JWT, una API REST compatible y un modulo publico en Next.js para visitantes.

## Integrantes

- Integrante 1: pendiente
- Integrante 2: pendiente

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
  <img width="1919" height="989" alt="image" src="https://github.com/user-attachments/assets/a2c23386-d1f2-44b9-a9bc-9be3894fb97c" />
- Listado de cursos.
  <img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/17ae96ce-4224-4e84-aa7f-49c30dff40ad" />
- Detalle de curso con boton "Inscribirme".
  <img width="1919" height="986" alt="image" src="https://github.com/user-attachments/assets/3077414c-3356-41a1-b6e4-4f873a408ca4" />
- Vista protegida "Mis cursos".
  <img width="1919" height="934" alt="image" src="https://github.com/user-attachments/assets/0b53c9de-83ca-45f1-a79a-36a14c57d82d" />
- Home o catalogo publico en Next.js.
  <img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/73548bb5-d961-4af6-81b2-8cb1d3814c38" />
- Terminal con `npm run build` exitoso.
  <img width="729" height="554" alt="image" src="https://github.com/user-attachments/assets/973beb39-47e2-4cca-a7aa-1fb94d5c36dd" />

## Distribucion de aportes

| Integrante | Aporte principal |
| --- | --- |
| Integrante 1 | Portal React, rutas protegidas y login | Modulo publico Next.js |
| Integrante 2 | API REST, JWT e inscripciones | README, evidencias, pruebas y sustentacion |

## Video de sustentacion

Enlace de YouTube: pendiente

El video debe mostrar a los integrantes con camaras prendidas, explicar el flujo, las decisiones tecnicas y evidenciar el build o ejecucion local.
