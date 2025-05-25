import { createTeacher } from "../../../services/teacherService.js";
import { getCourses } from "../../../services/coursesService.js";
import { getTeachers } from "../../../services/teacherService.js";
import Swal from 'sweetalert2';

class AdminAddTeacher extends HTMLElement {
    constructor() {
        super();
        this.courses = [];
        this.teachers = [];
    }

    connectedCallback() {
        this.render();
        this.setUpEventListeners();
        this.loadData();
    }

    setUpEventListeners() {
        this.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });

        this.querySelector('#saveTeacher').addEventListener('click', () => {
            this.saveTeacher();
        });

        document.querySelector('#addTeacherBtn')?.addEventListener('click', () => {
            this.openModal();
        });
    }

    async loadData() {
        try {
            // Cargar cursos y profesores en paralelo
            const [allCourses, allTeachers] = await Promise.all([
                getCourses(),
                getTeachers()
            ]);

            this.teachers = allTeachers;
            
            // Filtrar cursos que no tienen profesor asignado
            this.courses = allCourses.filter(course => !course.instructorId);
            
            this.populateCourseSelect();
        } catch (error) {
            console.error("Error loading data:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar los datos. Por favor, intente nuevamente.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3B82F6'
            });
        }
    }

    populateCourseSelect() {
        const select = this.querySelector("#course");
        if (select) {
            select.innerHTML = '<option value="">Seleccione un curso...</option>';
            
            // Agregar cursos disponibles
            this.courses.forEach(course => {
                const option = document.createElement("option");
                option.value = course.id;
                option.textContent = course.title;
                select.appendChild(option);
            });

            // Agregar sección de cursos con profesor asignado
            if (this.courses.length > 0) {
                const optgroup = document.createElement("optgroup");
                optgroup.label = "Cursos Disponibles";
                select.appendChild(optgroup);
            }
        }
    }

    openModal() {
        const modalContainer = this.querySelector(".modal-backdrop");
        if (modalContainer) {
            modalContainer.classList.remove("hidden");
            setTimeout(() => {
                modalContainer.classList.add("opacity-100");
                this.querySelector(".modal-content").classList.add(
                    "translate-y-0",
                    "opacity-100"
                );
            }, 10);
        }
    }

    closeModal() {
        const modalContainer = this.querySelector(".modal-backdrop");
        const modalContent = this.querySelector(".modal-content");

        if (modalContainer && modalContent) {
            modalContainer.classList.remove("opacity-100");
            modalContent.classList.remove("translate-y-0", "opacity-100");

            setTimeout(() => {
                modalContainer.classList.add("hidden");
            }, 300);
        }
    }

    validateTeacherData(teacherData) {
        if (!teacherData.name || teacherData.name.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre del profesor es requerido',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3B82F6'
            });
            return false;
        }
        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(teacherData.name)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre solo debe contener letras y espacios',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3B82F6'
            });
            return false;
        }
        return true;
    }

    async saveTeacher() {
        const teacherData = {
            name: this.querySelector("#name").value,
            cursoId: this.querySelector("#course").value || null
        };

        if (!this.validateTeacherData(teacherData)) {
            return;
        }

        try {
            await createTeacher(teacherData);
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El profesor ha sido creado correctamente',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3B82F6'
            });

            this.dispatchEvent(
                new CustomEvent("teacher-created", {
                    detail: teacherData,
                })
            );

            this.closeModal();
        } catch (error) {
            console.error("Error saving teacher:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al crear el profesor. Por favor, intente nuevamente.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3B82F6'
            });
        }
    }

    render() {
        this.innerHTML = `
            <div class="modal-backdrop fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 hidden opacity-0 transition-opacity duration-300 p-4">
                <div class="modal-content bg-white rounded-xl shadow-xl w-full max-w-2xl transform -translate-y-4 opacity-0 transition-all duration-300 ease-in-out max-h-[90vh] flex flex-col">
                    <div class="p-6 flex-shrink-0">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-bold text-gray-800">Agregar Profesor</h2>
                            <button type="button" class="close-modal cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none transition-colors">
                                <i class="bi bi-x text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto px-6">
                        <form id="addTeacherForm" class="space-y-4 pb-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre del Profesor</label>
                                <input type="text" id="name" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+" title="Solo se permiten letras y espacios" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                            </div>

                            <div>
                                <label for="course" class="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                                <select id="course" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none">
                                    <option value="">Seleccione un curso...</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    
                    <div class="p-6 border-t border-gray-100">
                        <div class="flex justify-end space-x-3">
                            <button type="button" class="close-modal cursor-pointer px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200">
                                Cancelar
                            </button>
                            <button type="button" id="saveTeacher" class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("admin-add-teacher", AdminAddTeacher); 