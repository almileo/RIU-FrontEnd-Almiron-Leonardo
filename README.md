# RIU Frontend Almiron Leonardo

Frontend desarrollado con Angular 20, usando arquitectura moderna con:

* Standalone components
* Signals (`@angular/core`)
* Reactive Forms
* Zoneless (opcional)
* Angular Material
* Interceptores HTTP
* Docker (desarrollo y producción)

---

## 🚀 Comenzar

```bash
npm install
ng serve
```

Accedé a: [http://localhost:4200](http://localhost:4200)

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── components/loading/         # LoadingComponent standalone
│   │   ├── interceptors/loading.ts     # HTTP interceptor para mostrar loading
│   │   └── services/loading.ts         # Servicio compartido de loading
│   ├── heroes/
│   │   ├── models/hero.model.ts        # Modelo de héroe
│   │   ├── pages/
│   │   │   ├── hero-form/              # Componente de alta/edición de héroes
│   │   │   └── hero-list/              # Componente de listado de héroes
│   │   └── services/hero.ts            # Servicio principal de héroes (con signals)
│   ├── shared/
│   │   └── directives/uppercase.ts     # Directiva standalone para forzar mayúsculas
│   ├── app.config.ts                   # Configuración de aplicación (zoneless opcional)
│   ├── app.routes.ts                   # Definición de rutas
│   └── app.ts / app.html / app.scss    # Root component
├── index.html
├── main.ts
├── styles.scss
└── test.ts                             # Configuración global de tests
```

---

## 🧩 Zoneless opcional

```ts
// app.config.ts
const ZONELESS_ENABLED = false;
...(ZONELESS_ENABLED ? [provideZonelessChangeDetection()] : [])
```

> Comentá esa línea si vas a usar Zone.js para tests o debugging tradicional.

---

## ✅ Test unitarios

```bash
ng test
```

Ejecutar solo un archivo de test:

```bash
ng test --include src/app/heroes/pages/hero-form/hero-form.spec.ts
```

---

## 🧪 HeroFormComponent

Formulario reactivo y standalone con:

* Validaciones reactivas (`FormBuilder`)
* Modo edición / creación (según ID en la ruta)
* Simulación de delay (`RxJS delay(1000)`)
* Testeado con `fakeAsync`, `tick()`, `jasmine.createSpyObj`

---

## 🐳 Docker (Dev y Producción)

Archivos disponibles:

* `Dockerfile`: imagen de producción (nginx)
* `Dockerfile.dev`: para entorno de desarrollo
* `docker-compose.yml`: despliegue principal
* `docker-compose.dev.yml`: entorno dev (con bind-mount)
* `nginx.conf`: configuración personalizada de nginx

### ▶️ Desarrollo

```bash
docker compose -f docker-compose.dev.yml up --build
```

### 🚀 Producción

```bash
docker compose up --build
```

Luego acceder a: [http://localhost](http://localhost)

---

## 🔨 Build

```bash
ng build
```

Genera el proyecto en `dist/` optimizado para producción.

---

## ✍️ Autor

**Leonardo G. Almirón**
Tucumán, Argentina
