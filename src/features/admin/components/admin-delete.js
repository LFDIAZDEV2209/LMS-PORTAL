import { deleteCourse } from "../../../services/coursesService.js";

class AdminDelete extends HTMLElement {
    constructor() {
        super();
        this.course = null;
    }

    connectedCallback() {
        this.render();
        this.setUpEventListeners();
    }

    setUpEventListeners() {
        this.querySelectorAll('.close-modal').forEach(b => {
            b.addEventListener('click', () => {
                this.closeModal();
            })
        })

        this.querySelector('#confirmDelete').addEventListener('click', () => {
            this.deleteCourse();
        })
    }

    async openModal(courseId) {
        try {
            this.course = { id: courseId };
            const modalContainer = this.querySelector(".modal-backdrop");

            if (modalContainer) {
                modalContainer.classList.remove('hidden');
                setTimeout(() => {
                    modalContainer.classList.add('opacity-100');
                    this.querySelector('.modal-content').classList.add('translate-y-0', 'opacity-100');
                },10);
            }
        } catch (error) {
            console.error("Error in openModal:", error);
        }
    }

    closeModal() {
        const modalContainer = this.querySelector(".modal-backdrop");
        const modalContent = this.querySelector(".modal-content");

        if (modalContainer && modalContent) {
            modalContainer.classList.add('hidden');
            modalContainer.classList.remove('opacity-100');
            modalContent.classList.remove('translate-y-0', 'opacity-100');

            setTimeout(() => {
                modalContent.classList.remove('-translate-y-4', 'opacity-0');
            }, 300);
        }
    }

    async deleteCourse() {
        if (!this.course || !this.course.id) {
            console.error("No course ID provided");
            return;
        }

        try {
            const deletedId = await deleteCourse(this.course.id);
            console.log('Curso eliminado exitosamente:', deletedId);
            
            this.closeModal();
            // Recargar la página después de eliminar
            window.location.reload();
            
        } catch (error) {
            console.error("Error deleting course:", error);
            alert('No se pudo eliminar el curso. Por favor, intente nuevamente.');
        }
    }

    render() {
        this.innerHTML = `
            <div class="modal-backdrop fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 hidden opacity-0 transition-opacity duration-300">
                <div class="modal-content bg-white rounded-xl shadow-xl w-full max-w-md transform -translate-y-4 opacity-0 transition-all duration-300 ease-in-out">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-bold text-gray-800">Eliminar Curso</h2>
                            <button type="button" class="close-modal text-gray-400 hover:text-gray-600 focus:outline-none transition-colors">
                                <i class="bi bi-x text-xl"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="text-center">
                                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <i class="bi bi-exclamation-triangle-fill text-red-600 text-2xl"></i>
                                </div>
                                <h3 class="text-lg font-medium text-gray-900 mb-2">¿Estás seguro de eliminar este curso?</h3>
                                <p class="text-sm text-gray-500">Esta acción no se puede deshacer. Se eliminará permanentemente el curso y toda su información asociada.</p>
                            </div>
                            
                            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                <button type="button" class="close-modal px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200">
                                    Cancelar
                                </button>
                                <button type="button" id="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("admin-delete", AdminDelete);