import { getCourseById } from "../../services/coursesService.js";

class CoursesDetails extends HTMLElement {
    constructor() {
        super();
        this.course = null;
        console.log('CoursesDetails constructor');
    }

    static get observedAttributes() {
        return ['id'];
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'id' && oldValue !== newValue) {
            await this.loadCourse();
            this.render();
        }
    }

    async connectedCallback() {
        console.log('CoursesDetails connectedCallback');
        await this.loadCourse();
        this.render();
        this.setUpEventListeners();
    }

    async loadCourse() {
        try {
            console.log('Current URL:', window.location.href);
            const urlParams = new URLSearchParams(window.location.search);
            const courseId = urlParams.get('id');
            
            if (courseId) {
                console.log('Intentando cargar curso con ID:', courseId);
                this.course = await getCourseById(courseId);
                console.log('Curso cargado exitosamente:', this.course);
            } else {
                console.error('No se encontró ID en la URL');
            }
        } catch (error) {
            console.error('Error loading course:', error);
        }
    }

    setUpEventListeners() {
        this.querySelectorAll('.module-header').forEach(header => {
            header.addEventListener('click', () => {
                const moduleContent = header.nextElementSibling;
                const toggleIcon = header.querySelector('.module-toggle i');

                if (moduleContent.classList.contains('hidden')) {
                    moduleContent.classList.remove('hidden');
                    toggleIcon.classList.remove('bi-plus-circle');
                    toggleIcon.classList.add('bi-dash-circle');
                } else {
                    moduleContent.classList.add('hidden');
                    toggleIcon.classList.remove('bi-dash-circle');
                    toggleIcon.classList.add('bi-plus-circle');
                }
            });
        });
    }

    render() {
        if (!this.course) {
            this.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-500">Cargando curso...</p>
                </div>
            `;
            return;
        }

        this.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <a href="/courses" data-link class="back-btn flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
                    <i class="bi bi-arrow-left mr-2"></i>
                    Volver a Cursos
                </a>

                <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                    <div class="relative h-64 md:h-80">
                        <img class="w-full h-full object-cover" src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg" alt="${this.course.title}">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div class="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                            <h1 class="text-3xl md:text-4xl font-bold mb-2">${this.course.title}</h1>
                             <div class="flex flex-wrap gap-2 mb-4">
                                <span class="flex items-center px-3 py-1 rounded-full bg-gray-900 bg-opacity-50 text-white text-sm">
                                    <i class="bi bi-clock mr-1"></i>
                                    ${this.course.duration}
                                </span>
                                <span class="px-3 py-1 rounded-full bg-gray-900 bg-opacity-50 text-white text-sm">${this.course.level}</span>
                                <span class="px-3 py-1 rounded-full bg-gray-900 bg-opacity-50 text-white text-sm">${this.course.enrolled}+ enrolled</span>
                             </div>
                            <p class="text-gray-200">${this.course.overview}</p>
                         </div>
                    </div>

                    <div class="p-6 md:p-8">
                        <div class="flex items-center">
                            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl mr-4">
                                <i class="bi bi-person-circle"></i>
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-gray-500">Instructor del Curso</h4>
                                <p class="text-gray-900 font-medium">${this.course.instructor}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row gap-8">
                    <div class="flex-1 space-y-6">
                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">Descripción</h3>
                            <p class="text-gray-600">${this.course.overview}</p>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">Prerrequisitos</h3>
                            <ul class="list-disc list-inside space-y-2 text-gray-600">
                                ${this.course.prerequisites.map(prereq => `<li>${prereq}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">Resultados de Aprendizaje</h3>
                            <ul class="list-disc list-inside space-y-2 text-gray-600">
                                ${this.course.learningOutcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">Estructura del Curso</h3>
                            <div class="space-y-4">
                                ${this.course.modules.map((module, index) => `
                                    <div class="border border-gray-200 rounded-lg overflow-hidden">
                                        <div class="module-header flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                                            <div>
                                                <span class="text-sm font-medium text-gray-500">Módulo ${index + 1}</span>
                                                <span class="block font-medium text-gray-900">${module.title}</span>
                                            </div>
                                            <span class="module-toggle text-gray-400">
                                                <i class="bi bi-plus-circle"></i>
                                            </span>
                                        </div>
                                        <div class="module-content hidden p-4">
                                            <ul class="list-disc list-inside space-y-2 text-gray-600">
                                                ${module.topics.map(topic => `<li>${topic}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="lg:w-80">
                        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-25">
                            <div class="mb-4">
                                <span class="block text-3xl font-bold text-gray-900">$99.99</span>
                                <span class="text-gray-500">Pago único</span>
                            </div>

                            <ul class="space-y-3 mb-6">
                                <li class="flex items-center text-gray-700">
                                    <i class="bi bi-check-circle-fill text-green-500 mr-2"></i>
                                    Acceso de por vida
                                </li>
                                <li class="flex items-center text-gray-700">
                                    <i class="bi bi-check-circle-fill text-green-500 mr-2"></i>
                                    Certificado de finalización
                                </li>
                                <li class="flex items-center text-gray-700">
                                    <i class="bi bi-check-circle-fill text-green-500 mr-2"></i>
                                    Garantía de devolución de 30 días
                                </li>
                                <li class="flex items-center text-gray-700">
                                    <i class="bi bi-check-circle-fill text-green-500 mr-2"></i>
                                    Soporte directo del instructor
                                </li>
                            </ul>

                            <button class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                Comenzar a Aprender
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Asegurarnos de que el nombre del componente coincida exactamente con el de la ruta
customElements.define('courses-details', CoursesDetails);