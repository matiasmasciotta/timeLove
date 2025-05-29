# 💕 TimeLove

Una aplicación web moderna para gestionar el tiempo compartido en relaciones poliamorosas, optimizada para dispositivos móviles.

## 🌟 Características

- **📱 Diseño Mobile-First**: Interfaz optimizada para smartphones con navegación intuitiva
- **📅 Múltiples Vistas**: Visualización por día, semana y mes
- **👥 Gestión de Parejas**: Registro de tiempo individual y compartido con Marisa y Sara
- **📊 Estadísticas Visuales**: Porcentajes y gráficos del tiempo dedicado a cada pareja
- **🎨 Diseño Romántico**: Colores rosa/rojo inspirados en apps como Flo
- **💾 Persistencia Local**: Almacenamiento automático en localStorage
- **✨ Animaciones Fluidas**: Transiciones suaves y efectos modernos

## 🛠️ Tecnologías

- **Vue 3** - Framework principal con Composition API
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS v4** - Estilos utilitarios modernos
- **Pinia** - Gestión de estado reactiva
- **Vue Router** - Navegación entre vistas
- **date-fns** - Manipulación de fechas
- **Lucide Vue** - Iconos SVG optimizados
- **Vite** - Build tool ultrarrápido

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- **Node.js 18+** ([Descargar aquí](https://nodejs.org/))
- **npm** (incluido con Node.js) o **yarn**
- **Git** ([Descargar aquí](https://git-scm.com/))

### 1. Clonar el repositorio

```bash
git clone https://github.com/matiasmasciotta/timeLove.git
cd timeLove
```

### 2. Instalar dependencias

```bash
# Con npm
npm install

# O con yarn
yarn install
```

### 3. Ejecutar en modo desarrollo

```bash
# Con npm
npm run dev

# O con yarn
yarn dev
```

### 4. Abrir en el navegador

La aplicación estará disponible en:
```
http://localhost:5173
```

## 📦 Scripts Disponibles

```bash
# Desarrollo - Inicia servidor de desarrollo con hot reload
npm run dev

# Build - Genera archivos optimizados para producción
npm run build

# Preview - Previsualiza el build de producción localmente
npm run preview

# Linting - Revisa y corrige errores de código
npm run lint

# Type checking - Verifica tipos TypeScript
npm run type-check
```

## 🌐 Deploy en Producción con Vercel

### Opción 1: Deploy Automático (Recomendado)

1. **Sube tu código a GitHub**
   ```bash
   git add .
   git commit -m "feat: initial commit"
   git push origin main
   ```

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio `timeLove`
   - Vercel detectará automáticamente la configuración de Vue

3. **Deploy automático**
   - Cada push a `main` desplegará automáticamente
   - Vercel generará una URL única para tu app

### Opción 2: Deploy Manual con Vercel CLI

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login en Vercel**
   ```bash
   vercel login
   ```

3. **Deploy a producción**
   ```bash
   # Primera vez (configuración inicial)
   vercel

   # Deploy a producción
   vercel --prod
   ```

### Configuración importante para Vercel

El proyecto incluye un archivo `vercel.json` que soluciona el problema de rutas SPA:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Esto asegura que todas las rutas (como `/week`, `/month`) funcionen correctamente al refrescar la página.

### Variables de entorno (si las necesitas)

Si tu app requiere variables de entorno:

1. **Crea archivo `.env.local`** (no incluir en git)
   ```bash
   VITE_API_URL=https://tu-api.com
   ```

2. **Configura en Vercel**
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → Environment Variables
   - Agrega las variables necesarias

## 📱 Uso de la Aplicación

### Navegación Principal

- **🗓️ Vista Día**: Timeline detallado de eventos diarios con estadísticas
- **📅 Vista Semana**: Resumen semanal con desglose por días
- **📊 Vista Mes**: Estadísticas mensuales y análisis de tendencias

### Registro de Eventos

1. Toca el botón flotante **+** (rosa)
2. Completa el formulario:
   - **Título**: Descripción del evento
   - **Fecha y Hora**: Inicio y fin del evento
   - **Categoría**: Dormir, Laboral, Gym, Tiempo Eficaz
   - **Tipo**: Individual o Compartido
   - **Pareja**: Marisa, Sara o Ambas
   - **Notas**: Detalles adicionales (opcional)

### Datos de Ejemplo

Usa el botón "Cargar Datos de Ejemplo" para poblar la app con eventos de prueba y explorar todas las funcionalidades.

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── EventModal.vue   # Modal para registrar eventos
│   └── SampleDataButton.vue # Botón de datos de ejemplo
├── stores/              # Gestión de estado con Pinia
│   └── events.ts        # Store principal de eventos
├── types/               # Definiciones TypeScript
│   └── index.ts         # Interfaces y enums
├── views/               # Vistas principales
│   ├── DayView.vue      # Vista diaria
│   ├── WeekView.vue     # Vista semanal
│   └── MonthView.vue    # Vista mensual
├── router/              # Configuración de rutas
│   └── index.ts
├── assets/              # Recursos estáticos
│   └── main.css         # Estilos globales
├── App.vue              # Componente raíz
└── main.ts              # Punto de entrada
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Rosa**: `#ec4899` (pink-500)
- **Rosa Oscuro**: `#db2777` (pink-600)
- **Rojo Rosa**: `#f43f5e` (rose-500)
- **Fondos**: Gradientes suaves rosa-rojo

### Animaciones
- **Transiciones de vista**: 150ms entrada, 100ms salida
- **Modal**: Escala, rotación y movimiento vertical
- **Botón flotante**: Animación bounce con rotación
- **Elementos interactivos**: Escalas sutiles y sombras

### Responsive Design
- **Mobile-first**: Optimizado para pantallas 375px+
- **Navegación inferior**: Fija y accesible con el pulgar
- **Botón flotante**: Posicionado para fácil acceso
- **Modal**: Altura máxima 90vh con scroll personalizado

## 📊 Funcionalidades de Datos

### Categorías de Eventos
- **Dormir**: Tiempo de descanso
- **Laboral**: Actividades de trabajo
- **Gym**: Ejercicio y fitness
- **Tiempo Eficaz**: Actividades productivas

### Tipos de Tiempo
- **Individual**: Tiempo a solas con una pareja
- **Compartido**: Tiempo con ambas parejas

### Cálculos Automáticos
- Porcentajes de tiempo por pareja
- Estadísticas diarias, semanales y mensuales
- Duración total de eventos
- Distribución por categorías

## 🔧 Solución de Problemas

### Error 404 al refrescar en producción
✅ **Solucionado** con el archivo `vercel.json` incluido

### Problemas de instalación
```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas de build
```bash
# Verificar tipos TypeScript
npm run type-check

# Verificar linting
npm run lint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Matías Masciotta**
- GitHub: [@matiasmasciotta](https://github.com/matiasmasciotta)

## 🙏 Agradecimientos

- Inspirado en el diseño de apps como Flo
- Iconos por [Lucide](https://lucide.dev/)
- Colores y diseño basados en Tailwind CSS

---

💕 **Hecho con amor para gestionar el amor** 💕
