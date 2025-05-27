<<<<<<< HEAD
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

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/matiasmasciotta/timeLove.git
   cd timeLove
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📱 Uso

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

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🌐 Deploy

### Build para Producción
```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

### Opciones de Deploy
- **Netlify**: Conecta el repo y deploy automático
- **Vercel**: Import desde GitHub
- **GitHub Pages**: Usando GitHub Actions
- **Servidor propio**: Subir contenido de `dist/`

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
=======
# timeLove
timeLove app
>>>>>>> d196cc5d8b62a6bc4a4096642ef35c5021f629a7
