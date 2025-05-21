import { getTeacherWithCourses } from "../../../services/teacherService.js";

class AdminTeacherDashboard extends HTMLElement {
    constructor() {
        super();
    }

    // Define qué atributos observar para cambios
    static get observedAttributes() {
        return ['teacher-id'];
    }

    connectedCallback() {
        this.render();
        // No cargar datos aquí, se cargarán cuando el atributo teacher-id cambie
    }

    // Se llama cuando uno de los atributos observados cambia
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'teacher-id' && oldValue !== newValue) {
            console.log(`Attribute 'teacher-id' changed from ${oldValue} to ${newValue}`);
            if (newValue) {
                this.loadTeacherData(newValue);
            } else {
                // Si el teacher-id se remueve o se pone vacío, podrías querer limpiar el dashboard
                this.showError("Seleccione un profesor para ver el panel.");
            }
        }
    }

    async loadTeacherData(teacherId) {
        console.log("Attempting to load teacher data for ID:", teacherId);
        try {
            // Eliminar el atributo check ya que la función se llama con el ID
            // const teacherId = this.getAttribute('teacher-id');
            // console.log("Teacher ID attribute:", teacherId);
            // if (!teacherId) {
            //   console.warn("Teacher ID attribute is not set.");
            //   return;
            // }

            console.log(`Fetching data for teacher ID: ${teacherId}`);
            const teacherData = await getTeacherWithCourses(teacherId);
            console.log("Teacher data fetched successfully:", teacherData);

            if (teacherData && teacherData.course) {
                console.log("Rendering teacher data...");
                this.renderTeacherData(teacherData);
            } else {
                console.warn("Teacher data or associated course not found.", teacherData);
                this.showError("No se encontraron datos para este profesor o su curso.");
            }
        } catch (error) {
            console.error("Error loading teacher data:", error);
            this.showError("Error al cargar los datos del profesor. Verifique la consola para más detalles.");
        }
    }

    showError(message) {
        console.error("Displaying error message:", message);
        const dashboardContent = this.querySelector('.dashboard-content');
        if (dashboardContent) {
            dashboardContent.innerHTML = `
                <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <i class="bi bi-exclamation-circle-fill text-2xl text-red-500 mb-2"></i>
                    <p class="text-red-600">${message}</p>
                </div>
            `;
        }
    }

    renderTeacherData(teacherData) {
        console.log("Inside renderTeacherData", teacherData);
        const dashboardContent = this.querySelector('.dashboard-content');
        if (!dashboardContent) {
            console.error("Dashboard content element not found.");
            return;
        }

        const { course } = teacherData;
        const metrics = course.metrics;

        dashboardContent.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-4">
                        <button id="backToListBtn" class="mr-4 text-blue-600 hover:text-blue-800 focus:outline-none transition-colors" title="Regresar a la lista">
                            <i class="bi bi-arrow-left-circle text-2xl"></i>
                        </button>
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="bi bi-person-fill text-2xl text-blue-600"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-gray-800">${teacherData.name}</h2>
                            <p class="text-gray-600">Profesor</p>
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <div class="text-center px-4 py-2 bg-blue-50 rounded-lg">
                            <p class="text-sm text-gray-600">Curso</p>
                            <p class="text-xl font-bold text-blue-600">${course.title}</p>
                        </div>
                        <div class="text-center px-4 py-2 bg-green-50 rounded-lg">
                            <p class="text-sm text-gray-600">Estudiantes</p>
                            <p class="text-xl font-bold text-green-600">${metrics.totalStudents}</p>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="bi bi-book-fill mr-2"></i>Detalles del Curso
                        </h3>
                        <div class="space-y-3">
                            <div class="bg-white rounded-lg p-3 shadow-sm">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h4 class="font-medium text-gray-800">${course.title}</h4>
                                        <p class="text-sm text-gray-600">${course.category} - ${course.level}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm text-gray-600">Duración</p>
                                        <p class="font-medium text-blue-600">${course.duration}</p>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <p class="text-sm text-gray-600">Módulos: ${course.modules.length}</p>
                                    <p class="text-sm text-gray-600">Tareas: ${course.tasks.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="bi bi-graph-up-fill mr-2"></i>Desempeño
                        </h3>
                        <div class="space-y-4">
                            <div class="bg-white rounded-lg p-4">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm text-gray-600">Satisfacción Estudiantil</span>
                                    <span class="text-sm font-medium text-green-600">${metrics.satisfactionRate}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: ${metrics.satisfactionRate}%"></div>
                                </div>
                            </div>
                            <div class="bg-white rounded-lg p-4">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm text-gray-600">Completitud de Cursos</span>
                                    <span class="text-sm font-medium text-blue-600">${metrics.completionRate.toFixed(1)}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${metrics.completionRate}%"></div>
                                </div>
                            </div>
                            <div class="bg-white rounded-lg p-4">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm text-gray-600">Tasa de Aprobación</span>
                                    <span class="text-sm font-medium text-purple-600">${metrics.approvalRate}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${metrics.approvalRate}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Aquí sí existe el botón en el DOM:
        const backBtn = this.querySelector('#backToListBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.reload();
            });
        }
    }

    render() {
        this.innerHTML = `
            <div class="dashboard-content">
                <div class="animate-pulse">
                    <div class="h-32 bg-gray-200 rounded-xl mb-4"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="h-64 bg-gray-200 rounded-lg"></div>
                        <div class="h-64 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("admin-teacher-dashboard", AdminTeacherDashboard); 