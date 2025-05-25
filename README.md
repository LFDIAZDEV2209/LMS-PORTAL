# LMS-PORTAL

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Git Flow](https://img.shields.io/badge/Git_Flow-F05032?style=for-the-badge&logo=git&logoColor=white)](https://github.com/nvie/gitflow)
[![Netlify](https://img.shields.io/badge/Netlify-deployed-status?style=for-the-badge&logo=netlify&logoColor=white)](https://lms-portal-web.netlify.app)

---

## 📚 Descripción del Proyecto

**LMS-PORTAL** es una plataforma de gestión del aprendizaje (LMS) moderna, funcional y adaptable, diseñada para instituciones educativas, docentes y estudiantes. Permite estructurar contenidos, facilitar la interacción pedagógica y monitorear el progreso académico de forma centralizada y eficiente.

Inspirado en la interfaz de [este dashboard de referencia](https://astounding-clafoutis-196412.netlify.app), el sistema busca brindar una experiencia intuitiva, responsiva y escalable, integrando herramientas de gestión educativa con las mejores prácticas de desarrollo web.

---

## 🚀 Características Principales

- **Dashboard Principal:** Estadísticas, accesos rápidos, gráficos y tarjetas informativas.
- **Gestión de Cursos:** Creación, edición, asignación de docentes, filtros y categorías.
- **Gestión de Docentes:** Registro, edición, panel individual y asignación de cursos.
- **Gestión de Estudiantes:** Inscripción, administración y seguimiento individual.
- **Lecciones y Contenidos:** Módulos de aprendizaje, subida de contenidos y visibilidad.
- **Tareas y Evaluaciones:** Creación de tareas, evaluaciones, rúbricas y retroalimentación.
- **Configuración del Sistema:** Personalización, parámetros, notificaciones y seguridad.
- **Módulo Administrador:** Gestión integral de cursos, estudiantes y contenidos.

---

## 🛠️ Tecnologías Utilizadas

- **HTML, CSS, JavaScript**
- **Tailwind CSS** (para estilos utilitarios)
- **Bootstrap Icons** (solo para iconos)
- **JSON-Server** (persistencia de datos)
- **Git Flow** (gestión de versiones)

---

## 📦 Estructura de Datos

- **Cursos:** Código, nivel, duración, título, categoría, descripción, prerequisitos, resultados, estructura, experto, precio, garantía.
- **Expertos:** ID, nombre completo, email, nacionalidad, biografía.
- **Contenido:** Nombre de módulo, temas, recursos.
- **Estudiantes:** ID, nombre completo, email, nacionalidad.
- **Matrículas:** ID estudiante, código curso, fecha de registro.

---

## 🎯 Alcance del Proyecto

**Incluye:**
- Interfaz moderna basada en el dashboard de referencia.
- Gestión de cursos, docentes, módulos, lecciones y estudiantes.
- Carga de contenidos multimedia.
- Actividades evaluativas, retroalimentación y calificación.
- Persistencia de datos con JSON-Server.

**No incluye (fase inicial):**
- Integración con sistemas externos (CRMs, videollamadas).
- Aplicaciones móviles nativas.
- Soporte multilingüe.

---

## 💡 Justificación

El auge de la educación en línea exige plataformas robustas, flexibles y personalizables. LMS-PORTAL responde a esta necesidad, permitiendo a las instituciones educativas centralizar y optimizar sus procesos académicos, con una interfaz amigable y adaptable a cualquier modelo pedagógico.

---

## 👨‍💻 Equipo de Desarrollo

- **Luis Felipe Diaz Correa** ([LFDIAZDEV2209](https://github.com/LFDIAZDEV2209))  
- [**Jorge Cristancho Olarte**](https://github.com/jcristancho2)
- **Sheyla Esther Samur**
- **Leidy Johanna Villegas**

---

## 🤝 Colaboradores

¡Gracias a todos los que contribuyen y apoyan este proyecto!

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 📥 Instalación y Uso 

### 🏠 Localmente
1. Clona el repositorio:
   ```bash
   git clone https://github.com/LFDIAZDEV2209/LMS-PORTAL.git
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Inicia JSON-Server para la persistencia de datos:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### 🔗 Online

 Abre [LMS-PORTAL-WEB](https://lms-portal-web.netlify.app) en tu navegador.

---

## 🌐 Demo Visual

Inspirado en: [Dashboard de referencia](https://astounding-clafoutis-196412.netlify.app)

---

## 📫 Contacto

¿Tienes dudas, sugerencias o quieres colaborar?  
Abre un issue o contacta a [LFDIAZDEV2209](https://github.com/LFDIAZDEV2209).

--- 
