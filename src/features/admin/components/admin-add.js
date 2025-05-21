import { postCourse } from "../../../services/coursesService.js";

class AdminAdd extends HTMLElement {
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

        this.querySelector('#saveCourse').addEventListener('click', () => {
            this.saveCourse();
        });

        // Escuchar el clic en el botón de agregar curso
        document.querySelector('#addCourseBtn')?.addEventListener('click', () => {
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

    async saveCourse() {
        const imageUrl = this.querySelector("#imageUrl").value || "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg";
        const imageFile = this.querySelector("#imageFile").files[0];
        
        let finalImageUrl = imageUrl;
        
        if (imageFile) {
            console.log("Imagen seleccionada:", imageFile.name);
        }

        const courseData = {
            category: this.querySelector("#category").value,
            title: this.querySelector("#title").value,
            level: this.querySelector("#level").value,
            duration: this.querySelector("#duration").value,
            overview: this.querySelector("#overview").value,
            instructor: this.querySelector("#instructor").value,
            prerequisites: this.querySelector("#prerequisites").value.split(',').map(item => item.trim()),
            learningOutcomes: this.querySelector("#learningOutcomes").value.split(',').map(item => item.trim()),
            structure: {
                lessons: parseInt(this.querySelector("#lessons").value),
                projects: parseInt(this.querySelector("#projects").value),
                assignments: parseInt(this.querySelector("#assignments").value),
                capstoneProject: parseInt(this.querySelector("#capstoneProject").value)
            },
            imageUrl: finalImageUrl
        };

        try {
            await postCourse(courseData);
            this.closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Error saving course:", error);
            alert('Error al crear el curso. Por favor, intente nuevamente.');
        }
    }

    render() {
        this.innerHTML = `
            <div class="modal-backdrop fixed inset-0 bg-slate-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 hidden opacity-0 transition-opacity duration-300 overflow-y-auto">
                <div class="modal-content bg-white rounded-xl shadow-xl w-full max-w-4xl my-8 transform -translate-y-4 opacity-0 transition-all duration-300 ease-in-out">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-xl font-bold text-gray-800">Crear Nuevo Curso</h2>
                            <button type="button" class="close-modal text-gray-400 hover:text-gray-600 focus:outline-none transition-colors">
                                <i class="bi bi-x text-xl"></i>
                            </button>
                        </div>
                        
                        <form class="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <select id="category" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none">
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Schools">Schools</option>
                                        <option value="Video Games">Video Games</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input type="text" id="title" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
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
                                    <input type="text" id="duration" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" placeholder="ej: 16 weeks" />
                                </div>

                                <div class="col-span-2">
                                    <label for="overview" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea id="overview" rows="2" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"></textarea>
                                </div>

                                <div class="col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Imagen del Curso</label>
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1">
                                            <input type="text" id="imageUrl" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" placeholder="URL de la imagen" />
                                        </div>
                                        <div class="relative">
                                            <input type="file" id="imageFile" accept="image/*" class="hidden" />
                                            <label for="imageFile" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200">
                                                <i class="bi bi-upload mr-2"></i>Subir imagen
                                            </label>
                                        </div>
                                    </div>
                                    <p class="mt-1 text-xs text-gray-500">Ingresa una URL o sube una imagen desde tu PC</p>
                                </div>

                                <div>
                                    <label for="instructor" class="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                                    <input type="text" id="instructor" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                                </div>

                                <div>
                                    <label for="prerequisites" class="block text-sm font-medium text-gray-700 mb-1">Prerrequisitos</label>
                                    <input type="text" id="prerequisites" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" placeholder="Separados por comas" />
                                </div>

                                <div class="col-span-2">
                                    <label for="learningOutcomes" class="block text-sm font-medium text-gray-700 mb-1">Resultados de Aprendizaje</label>
                                    <input type="text" id="learningOutcomes" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" placeholder="Separados por comas" />
                                </div>

                                <div class="col-span-2">
                                    <h3 class="text-lg font-medium text-gray-900 mb-2">Estructura del Curso</h3>
                                    <div class="grid grid-cols-4 gap-4">
                                        <div>
                                            <label for="lessons" class="block text-sm font-medium text-gray-700 mb-1">Lecciones</label>
                                            <input type="number" id="lessons" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                                        </div>
                                        <div>
                                            <label for="projects" class="block text-sm font-medium text-gray-700 mb-1">Proyectos</label>
                                            <input type="number" id="projects" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                                        </div>
                                        <div>
                                            <label for="assignments" class="block text-sm font-medium text-gray-700 mb-1">Tareas</label>
                                            <input type="number" id="assignments" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                                        </div>
                                        <div>
                                            <label for="capstoneProject" class="block text-sm font-medium text-gray-700 mb-1">Proyecto Final</label>
                                            <input type="number" id="capstoneProject" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                <button type="button" class="close-modal px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200">
                                    Cancelar
                                </button>
                                <button type="button" id="saveCourse" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                                    Crear Curso
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("admin-add", AdminAdd);