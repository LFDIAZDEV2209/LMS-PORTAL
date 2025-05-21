import { createTeacher } from "../../../services/teacherService.js";

class AdminAddTeacher extends HTMLElement {
    constructor() {
        super();
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

        this.querySelector('#saveTeacher').addEventListener('click', () => {
            this.saveTeacher();
        });

        // Escuchar el clic en el botón de agregar profesor
        document.querySelector('#addTeacherBtn')?.addEventListener('click', () => {
            this.openModal();
        });
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

    async saveTeacher() {
        const teacherData = {
            name: this.querySelector("#name").value,
            cursoId: parseInt(this.querySelector("#cursoId").value)
        };

        try {
            await createTeacher(teacherData);
            this.closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Error saving teacher:", error);
            alert('Error al crear el profesor. Por favor, intente nuevamente.');
        }
    }

    render() {
        this.innerHTML = `
            <div class="modal-backdrop fixed inset-0 bg-slate-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 hidden opacity-0 transition-opacity duration-300 overflow-y-auto">
                <div class="modal-content bg-white rounded-xl shadow-xl w-full max-w-2xl my-8 transform -translate-y-4 opacity-0 transition-all duration-300 ease-in-out">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-xl font-bold text-gray-800">Agregar Nuevo Profesor</h2>
                            <button type="button" class="close-modal text-gray-400 hover:text-gray-600 focus:outline-none transition-colors">
                                <i class="bi bi-x text-xl"></i>
                            </button>
                        </div>
                        
                        <form class="space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                                        <i class="bi bi-person-fill mr-2"></i>Nombre Completo
                                    </label>
                                    <input type="text" id="name" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" required />
                                </div>
                                
                                <div>
                                    <label for="cursoId" class="block text-sm font-medium text-gray-700 mb-1">
                                        <i class="bi bi-book-fill mr-2"></i>ID del Curso
                                    </label>
                                    <input type="number" id="cursoId" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" required />
                                </div>
                            </div>

                            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                <button type="button" class="close-modal px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200">
                                    <i class="bi bi-x-lg mr-2"></i>Cancelar
                                </button>
                                <button type="button" id="saveTeacher" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                                    <i class="bi bi-check-lg mr-2"></i>Guardar Profesor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("admin-add-teacher", AdminAddTeacher); 