# LMS-PORTAL

[![GitHub repo size](https://img.shields.io/github/repo-size/LFDIAZDEV2209/LMS-PORTAL?style=for-the-badge&color=blueviolet)](https://github.com/LFDIAZDEV2209/LMS-PORTAL)
[![GitHub issues](https://img.shields.io/github/issues/LFDIAZDEV2209/LMS-PORTAL?style=for-the-badge&color=informational)](https://github.com/LFDIAZDEV2209/LMS-PORTAL/issues)
[![GitHub stars](https://img.shields.io/github/stars/LFDIAZDEV2209/LMS-PORTAL?style=for-the-badge&color=yellow)](https://github.com/LFDIAZDEV2209/LMS-PORTAL/stargazers)
[![GitHub license](https://img.shields.io/github/license/LFDIAZDEV2209/LMS-PORTAL?style=for-the-badge&color=success)](https://github.com/LFDIAZDEV2209/LMS-PORTAL/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/LFDIAZDEV2209/LMS-PORTAL?style=for-the-badge&color=orange)](https://github.com/LFDIAZDEV2209/LMS-PORTAL/commits/main)

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

---

## 🌐 Demo Visual

Inspirado en: [Dashboard de referencia](https://astounding-clafoutis-196412.netlify.app)

---

## 📫 Contacto

¿Tienes dudas, sugerencias o quieres colaborar?  
Abre un issue o contacta a [LFDIAZDEV2209](https://github.com/LFDIAZDEV2209).

--- 