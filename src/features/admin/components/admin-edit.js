import { putCourse } from "../../../services/coursesService.js";
import { getCourseById } from "../../../services/coursesService.js";

class AdminEdit extends HTMLElement {
  constructor() {
    super();
    this.course = null;
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
  }

  async openModal(courseId) {
    try {
      console.log("Opening modal for course:", courseId);
      this.course = await getCourseById(courseId);

      if (!this.course) {
        console.error("No se pudo cargar el curso");
        return;
      }

      console.log("Course data:", this.course);
      this.populateFields();

      const modalContainer = this.querySelector(".modal-backdrop");
      if (modalContainer) {
        modalContainer.classList.remove("hidden");
        // Add animation classes
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
      // Add closing animations
      modalContainer.classList.remove("opacity-100");
      modalContent.classList.remove("translate-y-0", "opacity-100");

      // Wait for animation to complete before hiding
      setTimeout(() => {
        modalContainer.classList.add("hidden");
      }, 300);
    }
  }

  populateFields() {
    if (!this.course) {
      console.error("No hay curso para poblar los campos");
      return;
    }

    // Asegurarse de que cada campo exista antes de intentar acceder a él
    this.querySelector("#category").value = this.course.category || "";
    this.querySelector("#overview").value = this.course.overview || "";
    this.querySelector("#duration").value = this.course.duration || "";
    this.querySelector("#tags").value = Array.isArray(this.course.tags)
      ? this.course.tags.join(", ")
      : "";
    this.querySelector("#visibility").value =
      this.course.visibility || "public";
    this.querySelector("#instructor").value = this.course.instructor || "";
  }

  async saveChanges() {
    if (!this.course || !this.course.id) {
      console.error("No hay curso para guardar");
      return;
    }

    const updatedCourse = {
      ...this.course, // Mantener los datos existentes
      category: this.querySelector("#category").value,
      overview: this.querySelector("#overview").value,
      duration: this.querySelector("#duration").value,
      tags: this.querySelector("#tags")
        .value.split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      visibility: this.querySelector("#visibility").value,
      instructor: this.querySelector("#instructor").value,
    };

    try {
      await putCourse(updatedCourse, this.course.id);

      this.dispatchEvent(
        new CustomEvent("course-updated", {
          detail: updatedCourse,
        })
      );

      this.closeModal();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  }

  render() {
    this.innerHTML = `
        <div class="modal-backdrop fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 hidden opacity-0 transition-opacity duration-300">
            <div class="modal-content bg-white rounded-xl shadow-xl w-full max-w-md transform -translate-y-4 opacity-0 transition-all duration-300 ease-in-out">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-bold text-gray-800">Editar Curso</h2>
                        <button type="button" class="close-modal text-gray-400 hover:text-gray-600 focus:outline-none transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    <form id="editForm" class="space-y-5">
                        <div>
                            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                            <input type="text" id="category" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                        </div>
                        
                        <div>
                            <label for="overview" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="overview" rows="3" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"></textarea>
                        </div>
                        
                        <div>
                            <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                            <input type="text" id="duration" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                        </div>
                        
                        <div>
                            <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">Etiquetas</label>
                            <div class="relative">
                                <input type="text" id="tags" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                                <div class="absolute right-2 top-2 text-xs text-gray-400">Separadas por comas</div>
                            </div>
                        </div>
                        
                        <div>
                            <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Visibilidad</label>
                            <select id="visibility" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none appearance-none">
                                <option value="public">Público</option>
                                <option value="private">Privado</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                        
                        <div>
                            <label for="instructor" class="block text-sm font-medium text-gray-700 mb-1">Asignar Docente</label>
                            <input type="text" id="instructor" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                        </div>
                        
                        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                            <button type="button" class="close-modal px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200">
                                Cancelar
                            </button>
                            <button type="button" id="saveChanges" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define("admin-edit", AdminEdit);
