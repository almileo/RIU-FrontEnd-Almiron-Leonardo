# RIU Frontend Almiron Leonardo

Frontend desarrollado con Angular 20, usando arquitectura moderna con:

* Standalone components
* Signals (`@angular/core`)
* Reactive Forms
* Zoneless (opcional)
* Angular Material
* Interceptores HTTP
* Docker (desarrollo y producción)
* Deploy automático con Netlify

---

## 🚀 Comenzar

```bash
npm install
ng serve
```

Accedé a: [http://localhost:4200](http://localhost:4200)

Versión en producción: [https://riufrontendalmironleonardo.netlify.app/heroes](https://riufrontendalmironleonardo.netlify.app/heroes)

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

## 📊 Cobertura de tests

Para ver la cobertura del proyecto:

```bash
ng test --code-coverage
```

El resultado se genera en `coverage/index.html`. Abrilo en el navegador para inspeccionar qué archivos y líneas están cubiertos o no.

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

## 🌐 Deploy en Netlify

1. Crear cuenta en [Netlify](https://netlify.com) si no tenés una.
2. Hacer `ng build` para generar la carpeta `dist/`
3. Subir el contenido de `dist/RIUFrontendAlmironLeonardo/` al panel de Netlify (drag & drop)
4. O conectar directamente el repositorio desde GitHub y configurar:

   * **Build command:** `npm run build`
   * **Publish directory:** `dist/RIU-Frontend-Almiron-Leonardo/browser`
5. Agregar archivo `_redirects` en la carpeta `src/` con el siguiente contenido:

```
/*    /index.html   200
```

Esto permite que la app Angular funcione como SPA (Single Page App) en producción.

---

## ✍️ Autor

**Leonardo G. Almirón**
Tucumán, Argentina
