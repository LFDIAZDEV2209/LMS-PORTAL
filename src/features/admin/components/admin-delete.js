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
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="text-center">
                                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
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