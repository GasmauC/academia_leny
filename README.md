# Academia Leny - Plataforma de Estudio Cartomántico

Academia Leny es un aplicativo web moderno de tipo SPA (Single Page Application) diseñado como un entorno inmersivo y académico para el estudio y práctica del oráculo Petit Lenormand, fundamentado en la metodología Lopes Mazza. Desarrollado con **React**, **Vite** y **Tailwind CSS**.

---

## 🚀 Características Principales

*   **Lector Canónico (Modo Libro):** Interfaz inmersiva de lectura que respeta la jerarquía editorial del material teórico.
*   **Laboratorio Operativo (Modo Estudio):**
    *   Atlas de las 36 cartas.
    *   Gimnasio de interpretaciones (evaluación con GenAI).
    *   Módulos interactivos (Tríadas, Quintetos, Retrato 3x3, Grand Tableau).
    *   Motor visualizador del "Mapa Relacional".
*   **Orquestador GenAI:** Evaluador didáctico que utiliza la API de Google Gemini ("Tutor Leny") inyectado de forma segura en local, para revisar prácticas y combinar significados.

---

## 🛠️ Tecnologías Utilizadas

*   **Core:** React 18 / Vite
*   **Estilos:** Tailwind CSS / Lucide React / Framer Motion
*   **Visualización de Datos:** React Force Graph 2D / D3 Force
*   **Markdown:** React Markdown / Remark GFM
*   **Inteligencia Artificial:** SDK oficial de Google Generative AI

---

## 💻 Instalación Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/GasmauC/academia_leny.git
    cd academia_leny
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar entorno de desarrollo:**
    ```bash
    npm run dev
    ```
    El aplicativo estará disponible (usualmente) en `http://localhost:5173`.

### Configuración del Tutor AI (Gemini)
El proyecto **no requiere de variables de entorno (archivos `.env`)** forzosas para funcionar en producción de manera nativa, lo cual previene comprometer secretos. El módulo de Tutor (Gimnasio) requerirá la introducción de una `API KEY` de Gemini proporcionada por el usuario o administrador dentro de la misma interfaz. Dicha llave quedará guardada de manera segura en el `localStorage` del navegador.

---

## 🌐 Instrucciones de Despliegue en Cloudflare Pages

El repositorio está 100% acondicionado para ser auto-desplegado (CI/CD) gratuitamente usando Cloudflare Pages, con las reglas de fallback configuradas en `public/_redirects`.

### Pasos:

1. Ingresa a tu panel de **Cloudflare > Workers & Pages > Create application > Pages > Connect to Git**.
2. Conecta tu cuenta y selecciona el repositorio `academia_leny`.
3. Selecciona la configuración de compilación de **Vite** (o configúralo manualmente):
   *   **Framework preset:** Vite / Ninguno
   *   **Build command:** `npm run build`
   *   **Build output directory:** `dist`
4. Guarda y despliega. Cloudflare se encargará del resto de instalar dependencias, compilar el SSR/SPA, y hospedar los estáticos con el redireccionamiento para manejo de estados (Zero `404 Not Found`).

---

## 📝 Historial y Archivos de Base de Datos
Todos los extractores de validación (Python, Scripts Node y parseadores en PDF/Word) con los que se armaron las bases de datos de `src/data/db/` se han migrado a `_data_extraction_archive/` (archivo muerto en local omitido en git) para conservar limpieza y optimizar el peso global de este repositorio en GitHub. No borres dicha carpeta de tu ordenador local si deseas seguir depurando el motor de lectura.
