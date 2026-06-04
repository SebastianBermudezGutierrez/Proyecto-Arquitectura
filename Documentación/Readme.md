# 🦁 Lion Fit Pro
 
**Sistema de Entrenamiento Físico Personal**

## 1. Descripción del Proyecto
 
Lion Fit Pro es una aplicación móvil de entrenamiento físico personal que permite a los usuarios registrar rutinas de ejercicio, llevar un historial de entrenamientos y hacer seguimiento de su progreso por fecha. El sistema consta de:
 
- **Frontend móvil** construido con Vue 3 + Ionic/Capacitor (Android).
- **Backend REST API** desarrollado con NestJS sobre Node.js.
- **Base de datos** PostgreSQL gestionada con Prisma ORM.
### Objetivos principales
 
- Gestión de usuarios con autenticación JWT segura (bcrypt + Passport).
- Catálogo de ejercicios clasificados por grupo muscular.
- Creación y asignación de rutinas de entrenamiento personalizadas.
- Registro diario de sesiones (Workouts) con ejercicios, series y repeticiones.
- Historial semanal filtrable por rango de fechas.
---

## 2. Estructura del Repositorio
 
```
Proyecto-Arquitectura/
├── Proyecto-movil-Frontend/       # App Vue 3 + Ionic + Capacitor
│   ├── src/
│   │   ├── views/                 # LoginPage, RegisterPage, TrainingPage,
│   │   │                          # DailyLogPage, WeeklyHistoryPage, ExercisePage
│   │   ├── services/              # api.service.ts, workout.service.ts,
│   │   │                          # exercise.service.ts, user.service.ts
│   │   ├── components/            # AppHeader.vue, AppMenu.vue
│   │   └── router/                # Rutas SPA con authGuard JWT
│   ├── android/                   # Proyecto Android generado por Capacitor
│   └── package.json
│
└── ProyectoBackend/               # API REST NestJS
    ├── src/
    │   ├── auth/                  # AuthModule: JWT Strategy, Guard, Controller
    │   ├── user/                  # UserModule: CRUD de usuarios
    │   ├── exercise/              # ExerciseModule: catálogo de ejercicios
    │   ├── routine/               # RoutineModule: rutinas de usuario
    │   ├── routine-exercise/      # RoutineExerciseModule: ejercicios por rutina
    │   ├── workout/               # WorkoutModule: sesiones de entrenamiento
    │   ├── exercise-record/       # ExerciseRecordModule: registros por sesión
    │   └── app.module.ts
    ├── prisma/
    │   ├── schema.prisma          # Modelos de base de datos
    │   └── migrations/            # Historial de migraciones SQL
    └── docker-compose.yml         # PostgreSQL en Docker
```
 
---

## 3. Stack Tecnológico
 
### Frontend / Mobile
 
| Tecnología | Versión | Rol |
|---|---|---|
| Vue 3 | ^3.3 | Framework UI reactivo (Composition API) |
| Ionic 8 | ^8.0 | Componentes UI móvil nativos y gestos táctiles |
| Capacitor 7 | ^7.4 | Bridge nativo para generar APK Android |
| Vue Router 4 | ^4.2 | Enrutado SPA con authGuard basado en localStorage |
| Axios | ^1.13 | Cliente HTTP con interceptores JWT automáticos |
| TypeScript | ~5.6.2 | Tipado estático en todo el frontend |
| Vite 5 | ~5.2 | Build tool ultra-rápido para desarrollo y producción |
| Vitest | ^0.34 | Tests unitarios del frontend |
| Cypress 13 | ^13.5 | Tests E2E del frontend |
 
### Backend / API
 
| Tecnología | Versión | Rol |
|---|---|---|
| NestJS 11 | ^11.0 | Framework modular y escalable para Node.js |
| Prisma 6 | ^6.19 | ORM type-safe con migrations y Prisma Studio |
| @nestjs/jwt + Passport | ^11.0 | Autenticación stateless con Bearer Token JWT |
| bcrypt | ^6.0 | Hashing seguro de contraseñas (salt rounds: 10) |
| class-validator | ^0.14 | Validación declarativa de DTOs (whitelist) |
| @nestjs/swagger | ^11.2 | Documentación OpenAPI automática |
| TypeScript | ^5.7.3 | Tipado estático en todo el backend |
| Jest 29 | ^29.7 | Tests unitarios e integración |
 
### Datos e Infraestructura
 
| Tecnología | Versión | Rol |
|---|---|---|
| PostgreSQL | 12.16-alpine | Base de datos relacional principal |
| Docker Compose | — | Orquestación del contenedor de base de datos |
| AWS EC2 | — | Servidor de producción actual |
| Node.js | LTS | Runtime para NestJS en producción |
 
---
 
## 4. Requisitos Previos
 
- Node.js >= 18.x (LTS recomendado)
- npm >= 9.x
- Docker & Docker Compose (para levantar PostgreSQL local)
- Android Studio + SDK (solo si se desea generar APK)
- Git
---

## 5. Instalación y Ejecución
 
### 5.1 Backend — NestJS API
 
**1. Clonar el repositorio**
 
```bash
git clone https://github.com/<usuario>/Proyecto-Arquitectura.git
cd Proyecto-Arquitectura/ProyectoBackend
```
 
**2. Instalar dependencias**
 
```bash
npm install
```
 
**3. Variables de entorno**
 
Crear un archivo `.env` en la raíz de `ProyectoBackend/`:
 
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/lionfit"
JWT_SECRET="tu_secreto_jwt_super_seguro"
PORT=3000
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=lionfit
```
 
**4. Levantar la base de datos con Docker**
 
```bash
docker-compose up -d
 
# Verificar que el contenedor esté corriendo:
docker ps
```
 
**5. Ejecutar migraciones Prisma**
 
```bash
npx prisma migrate deploy
 
# O en desarrollo para aplicar y generar cliente:
npx prisma migrate dev --name init
```
 
**6. Iniciar el servidor de desarrollo**
 
```bash
npm run start:dev
# El API estará disponible en: http://localhost:3000/api/v1
```
 
---
 
### 5.2 Frontend — Vue 3 + Ionic
 
**1. Instalar dependencias**
 
```bash
cd Proyecto-Arquitectura/Proyecto-movil-Frontend
npm install
```
 
**2. Configurar URL del API**
 
Editar `src/services/api.service.ts`:
 
```typescript
// Cambiar la URL base según el entorno:
const API_BASE_URL = 'http://localhost:3000/api/v1';
 
// En producción, usar variable de entorno:
// const API_BASE_URL = import.meta.env.VITE_API_URL;
```
 
**3. Ejecutar en modo desarrollo**
 
```bash
npm run dev
```

## 6. Endpoints de la API
 
URL base en producción: `http://18.217.60.222:3000/api/v1`
 
> Todos los endpoints (excepto `POST /auth/login` y `POST /user`) requieren el header `Authorization: Bearer <token>`.
 
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/login` | Iniciar sesión — devuelve JWT | No |
| POST | `/user` | Registrar nuevo usuario | No |
| GET | `/user` | Listar todos los usuarios | Sí |
| PATCH | `/user/:id` | Actualizar usuario | Sí |
| DELETE | `/user/:id` | Eliminar usuario | Sí |
| GET | `/exercise` | Listar ejercicios del catálogo | Sí |
| POST | `/exercise` | Crear ejercicio | Sí |
| PATCH | `/exercise/:id` | Actualizar ejercicio | Sí |
| DELETE | `/exercise/:id` | Eliminar ejercicio | Sí |
| GET | `/routine` | Listar rutinas | Sí |
| POST | `/routine` | Crear rutina | Sí |
| POST | `/routine-exercise` | Asignar ejercicio a rutina | Sí |
| GET | `/workout` | Listar sesiones de entrenamiento | Sí |
| POST | `/workout` | Crear sesión de entrenamiento | Sí |
| GET | `/workout/by-date-range` | Filtrar workouts por rango de fecha | Sí |
| DELETE | `/workout/:id` | Eliminar workout | Sí |
| POST | `/exercise-record` | Registrar ejercicio en un workout | Sí |
| PATCH | `/exercise-record/:id` | Actualizar registro de ejercicio | Sí |
| DELETE | `/exercise-record/:id` | Eliminar registro de ejercicio | Sí |
 
---

## 7. Patrones de Diseño Aplicados
 
| Patrón | Dónde se aplica | Descripción |
|---|---|---|
| **Module Pattern** (NestJS) | Todos los módulos | Cada dominio es un módulo independiente con sus propios providers y controllers |
| **Repository Pattern** (vía Prisma) | Todos los Services | Los Services extienden `PrismaClient` y encapsulan el acceso a BD de su entidad |
| **Guard Pattern** | `JwtAuthGuard`, `AuthModule` | Protección de rutas mediante `CanActivate` con Passport JWT |
| **Strategy Pattern** | `JwtStrategy` (Passport) | Define cómo se extrae y valida el token Bearer del header `Authorization` |
| **DTO + Validation** | Todos los DTOs | `class-validator` con `ValidationPipe` global, whitelist y forbidNonWhitelisted |
| **Interceptor Pattern** (Axios) | `api.service.ts` | Request interceptor inyecta JWT; response interceptor redirige en 401 |
 
---

## 8. Infraestructura de Producción
 
El despliegue actual usa **AWS EC2** como servidor principal. La API NestJS corre directamente en Node.js en el puerto 3000 y también sirve los archivos estáticos del frontend desde `dist/`.
 
| Componente | Tecnología | Configuración actual |
|---|---|---|
| Servidor | AWS EC2 | IP: `18.217.60.222` — Puerto: `3000` |
| API Runtime | Node.js | `node dist/main` — sin process manager |
| Base de datos | PostgreSQL 12 (Docker) | Puerto `5432` — volumen local `./data` |
| Frontend | Archivos estáticos | Servidos por NestJS (`useStaticAssets`) |
| HTTPS | No configurado | Se recomienda Nginx + Let's Encrypt |

### Recomendaciones para producción
 
- Configurar HTTPS con Nginx como reverse proxy y certificado Let's Encrypt.
- Usar PM2 como process manager para el proceso Node.js (auto-restart, logs, cluster mode).
- Dockerizar también el backend NestJS para consistencia entre entornos.
- Mover la base de datos a Amazon RDS (PostgreSQL managed) para mayor disponibilidad.
- Configurar CI/CD con GitHub Actions: build → test → deploy automático al EC2.
- Usar AWS Secrets Manager o variables de entorno del SO en lugar de `.env` en disco.
- Restringir `CORS origin: '*'` a los dominios permitidos en producción.
---

## 9. Estrategia de Testing
 
| Nivel | Herramienta | Estado actual | Cobertura objetivo |
|---|---|---|---|
| Unitario Backend | Jest 29 + ts-jest | Configurado, sin casos implementados | Services, Guards, Strategies |
| E2E Backend | Jest + Supertest | `app.e2e-spec.ts` vacío | Flujos de autenticación y CRUD |
| Unitario Frontend | Vitest 0.34 | Configurado | Services y composables Vue |
| E2E Frontend | Cypress 13 | Configurado | Login, Workout, Historial semanal |
 
> Se recomienda comenzar con tests unitarios para `AuthService` y `UserService`, mockeando `PrismaClient` con Jest.
 
---
