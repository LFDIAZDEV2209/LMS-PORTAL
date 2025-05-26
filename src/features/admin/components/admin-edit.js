import { putCourse } from "../../../services/coursesService.js";
import { getCourseById } from "../../../services/coursesService.js";
import { getTeachers, assignTeacherToCourse, unassignTeacherFromCourse } from "../../../services/teacherService.js";
import Swal from 'sweetalert2';

class AdminEdit extends HTMLElement {
  constructor() {
    super();
    this.course = null;
    this.teachers = [];
  }

  connectedCallback() {
    this.render();
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    this.querySelectorAll('.close-modal').forEach(button => {
      button.addEventListener('click', () => {
        this.closeModal();
      });
    });

    this.querySelector('#saveChanges').addEventListener('click', () => {
      this.saveChanges();
    });

    // Agregar listener para el cambio de instructor
    this.querySelector('#instructor')?.addEventListener('change', (e) => {
      this.handleInstructorChange(e.target.value);
    });
  }

  async handleInstructorChange(newTeacherId) {
    if (!this.course || !this.course.id) return;

    try {
      const currentTeacherId = this.course.instructorId;
      let replaced = false;
      
      // Si hay un profesor actual asignado y se selecciona uno diferente, primero lo desasignamos
      if (currentTeacherId && currentTeacherId !== newTeacherId) {
        await unassignTeacherFromCourse(currentTeacherId, this.course.id);
        replaced = true;
      }

      // Si se seleccionó un nuevo profesor, lo asignamos
      if (newTeacherId) {
        await assignTeacherToCourse(newTeacherId, this.course.id);
      }

      // Actualizar el curso localmente
      this.course.instructorId = newTeacherId;

      if (replaced) {
        await Swal.fire({
          icon: 'warning',
          title: 'Profesor reemplazado',
          text: 'Has reemplazado al profesor anterior por uno nuevo en este curso.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3B82F6'
        });
      } else {
        await Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El instructor ha sido actualizado correctamente',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3B82F6'
        });
      }
    } catch (error) {
      console.error("Error updating instructor:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al actualizar el instructor. Por favor, intente nuevamente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3B82F6'
      });
    }
  }

  async openModal(courseId) {
    try {
      this.course = await getCourseById(courseId);

      if (!this.course) {
        console.error("No se pudo cargar el curso");
        return;
      }

      await this.loadTeachers();
      this.populateFields();

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
      } else {
        console.error("No se encontró el contenedor del modal");
      }
    } catch (error) {
      console.error("Error in openModal:", error);
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

  async loadTeachers() {
    try {
      this.teachers = await getTeachers();
      this.populateTeacherSelect();
    } catch (error) {
      console.error("Error loading teachers:", error);
    }
  }

  populateTeacherSelect() {
    const select = this.querySelector("#instructor");
    if (select) {
      // Limpiar opciones existentes
      select.innerHTML = '<option value="">Seleccione un instructor...</option>';
      
      // Filtrar profesores disponibles (sin curso asignado o el curso actual)
      let availableTeachers = this.teachers.filter(teacher => 
        !teacher.cursoId || teacher.cursoId === this.course?.id
      );

      // Si el curso tiene instructor asignado y no está en la lista, agregarlo
      if (this.course?.instructorId) {
        const alreadyInList = availableTeachers.some(t => t.id === this.course.instructorId);
        if (!alreadyInList) {
          const assignedTeacher = this.teachers.find(t => t.id === this.course.instructorId);
          if (assignedTeacher) {
            availableTeachers = [assignedTeacher, ...availableTeachers];
          }
        }
      }

      availableTeachers.forEach(teacher => {
        const option = document.createElement("option");
        option.value = teacher.id;
        option.textContent = teacher.name;
        if (teacher.id === this.course?.instructorId) {
          option.selected = true;
        }
        select.appendChild(option);
      });
    }
  }

  populateFields() {
    if (!this.course) {
      console.error("No hay curso para poblar los campos");
      return;
    }

    this.querySelector("#title").value = this.course.title || "";
    this.querySelector("#category").value = this.course.category || "";
    this.querySelector("#level").value = this.course.level || "";
    this.querySelector("#duration").value = this.course.duration || "";
    this.querySelector("#overview").value = this.course.overview || "";
    this.querySelector("#imageUrl").value = this.course.imageUrl || "";
    this.querySelector("#instructor").value = this.course.instructorId || "";
    this.querySelector("#prerequisites").value = Array.isArray(this.course.prerequisites) 
      ? this.course.prerequisites.join("\n") 
      : "";
    this.querySelector("#learningOutcomes").value = Array.isArray(this.course.learningOutcomes)
      ? this.course.learningOutcomes.join("\n")
      : "";
    this.querySelector("#structure").value = Array.isArray(this.course.structure) 
      ? this.course.structure[0] 
      : (typeof this.course.structure === 'object' 
          ? `${this.course.structure.lessons} lecciones, ${this.course.structure.projects} proyectos, ${this.course.structure.assignments} tareas y ${this.course.structure.capstoneProject} proyecto final`
          : this.course.structure || "");
  }

  async saveChanges() {
    if (!this.course || !this.course.id) {
      console.error("No hay curso para guardar");
      return;
    }

    const updatedCourse = {
      ...this.course,
      title: this.querySelector("#title").value,
      category: this.querySelector("#category").value,
      level: this.querySelector("#level").value,
      duration: this.querySelector("#duration").value,
      overview: this.querySelector("#overview").value,
      imageUrl: this.querySelector("#imageUrl").value,
      instructorId: this.querySelector("#instructor").value,
      prerequisites: this.querySelector("#prerequisites")
        .value.split("\n")
        .map(item => item.trim())
        .filter(item => item),
      learningOutcomes: this.querySelector("#learningOutcomes")
        .value.split("\n")
        .map(item => item.trim())
        .filter(item => item),
      structure: this.querySelector("#structure").value.trim()
    };

    try {
      await putCourse(updatedCourse, this.course.id);
      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Los cambios se han guardado correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3B82F6'
      });

      this.dispatchEvent(
        new CustomEvent("course-updated", {
          detail: updatedCourse,
        })
      );

      this.closeModal();
    } catch (error) {
      console.error("Error saving changes:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al guardar los cambios. Por favor, intente nuevamente.',
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
              <h2 class="text-xl font-bold text-gray-800">Editar Curso</h2>
              <button type="button" class="close-modal cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none transition-colors">
                <i class="bi bi-x text-xl"></i>
              </button>
            </div>
          </div>
          
          <div class="flex-1 overflow-y-auto px-6">
            <form id="editForm" class="space-y-4 pb-4">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input type="text" id="title" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
              </div>

              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <input type="text" id="category" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
              </div>

              <div>
                <label for="level" class="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
                <select id="level" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none">
                  <option value="Beginner">Principiante</option>
                  <option value="Intermediate">Intermedio</option>
                  <option value="Advanced">Avanzado</option>
                  <option value="All Levels">Todos los niveles</option>
                </select>
              </div>

              <div>
                <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                <input type="text" id="duration" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
              </div>

              <div>
                <label for="overview" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea id="overview" rows="3" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"></textarea>
              </div>

              <div>
                <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-1">URL de la imagen</label>
                <input type="text" id="imageUrl" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
              </div>

              <div>
                <label for="instructor" class="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                <select id="instructor" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none">
                  <option value="">Seleccione un instructor...</option>
                </select>
              </div>

              <div>
                <label for="prerequisites" class="block text-sm font-medium text-gray-700 mb-1">Prerrequisitos</label>
                <textarea id="prerequisites" rows="3" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none" placeholder="Un prerrequisito por línea"></textarea>
              </div>

              <div>
                <label for="learningOutcomes" class="block text-sm font-medium text-gray-700 mb-1">Resultados de aprendizaje</label>
                <textarea id="learningOutcomes" rows="3" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none" placeholder="Un resultado por línea"></textarea>
              </div>

              <div>
                <label for="structure" class="block text-sm font-medium text-gray-700 mb-1">Estructura del Curso</label>
                <textarea id="structure" rows="4" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none" placeholder="Describe la estructura del curso (ej: 24 lecciones interactivas, 12 proyectos prácticos, 4 tareas principales y un proyecto final)"></textarea>
              </div>
            </form>
          </div>
          
          <div class="flex-shrink-0 p-6 border-t border-gray-100">
            <div class="flex justify-end space-x-3">
              <button type="button" class="close-modal cursor-pointer px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200">
                Cancelar
              </button>
              <button type="button" id="saveChanges" class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("admin-edit", AdminEdit);
