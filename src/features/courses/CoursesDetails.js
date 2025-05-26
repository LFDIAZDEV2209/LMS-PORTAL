import { getCourseWithModules } from "../../services/coursesService.js";

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
                this.course = await getCourseWithModules(courseId);
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
                <div class="text-center py-8 shadow-lg ">
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

                <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div class="relative h-64 md:h-80 flex items-end">
                        <img class="w-full h-full object-cover absolute inset-0" src="${this.course.imageUrl}" alt="${this.course.title}">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div class="relative z-10 p-4 md:p-6 text-white w-full flex flex-col justify-end">
                            <h1 class="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">${this.course.title}</h1>
                             <div class="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                                <span class="flex items-center px-2 py-1 rounded-full bg-gray-900 bg-opacity-50 text-white text-xs md:text-sm">
                                    <i class="bi bi-clock mr-1"></i>
                                    ${this.course.duration}
                                </span>
                                <span class="px-2 py-1 rounded-full bg-gray-900 bg-opacity-50 text-white text-xs md:text-sm">${this.course.level}</span>
                                <span class="px-2 py-1 rounded-full bg-gray-900 bg-opacity-50 text-white text-xs md:text-sm">${this.course.enrolled}+ enrolled</span>
                             </div>
                            <p class="text-sm md:text-base text-gray-200 mb-4 md:mb-6">${this.course.overview}</p>
                             <div class="flex items-center">
                                 <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center text-lg md:text-xl mr-2 md:mr-4">
                                     <i class="bi bi-person-circle text-amber-300"></i>
                                 </div>
                                 <div>
                                     <h4 class="text-xs md:text-sm font-medium text-gray-200">Course Instructor</h4>
                                     <p class="text-sm md:text-base text-gray-500 font-medium">${this.course.instructor}</p>
                                 </div>
                             </div>
                         </div>
                    </div>

                    <div class="p-6 md:p-8 hidden">
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row gap-8">
                    <div class="flex-1 space-y-6">
                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">Course Overview</h3>
                            <p class="text-gray-600">${this.course.overview}</p>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">Prerequisites</h3>
                            <ul class="list-none list-inside space-y-2 text-gray-600">
                                ${this.course.prerequisites.map(prereq => `<li>${prereq}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                            <ul class="list-none list-inside space-y-2 text-gray-600 ">
                                ${this.course.learningOutcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">Course Structure</h3>
                            <p class="text-gray-600 mb-4">${Array.isArray(this.course.structure) ? this.course.structure[0] : this.course.structure}</p>
                            <div class="space-y-4">
                                ${this.course.modules.map((module, index) => `
                                    <div class="border border-gray-200 rounded-lg overflow-hidden">
                                        <div class="module-header flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                                            <div>
                                                <span class="text-sm font-medium text-blue-600">Módule ${index + 1}</span>
                                                <span class="block font-medium text-gray-900">${module.title}</span>
                                            </div>
                                            <span class="module-toggle text-gray-400">
                                                <i class="bi bi-plus-circle"></i>
                                            </span>
                                        </div>
                                        <div class="module-content hidden p-4">
                                            <ul class="list-none list-inside space-y-2 text-gray-600">
                                                ${module.topics.map(topic => `<li>${topic}</li> <hr class="border-t-1 border-gray-300 w-full">`).join('')}
                                                
                                            </ul>
                                            
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="lg:w-80">
                        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-25 flex flex-col justify-center">
                            <div class="mb-4 flex flex-col items-center">
                                <span class="block text-3xl font-bold text-gray-900">$99.99</span>
                                <span class="text-gray-500">One-time payment</span>
                            </div>

                            <ul class="space-y-3 mb-6">
                                <li class="flex items-center text-gray-700">
                                    <i class="bi bi-check text-2xl mr-2"></i>
                                    Lifetime access
                                </li>
                                <li class="flex items-center text-gray-700">
                                    <i class="bi bi-check text-2xl mr-2"></i>
                                    Certificate of completion
                                </li>
                                <li class="flex items-center text-gray-700">
                                    <i class="bi bi-check text-2xl mr-2"></i>
                                    30-day money-back guarantee
                                </li>
                                <li class="flex items-center text-gray-700">
                                    <i class="bi bi-check text-2xl mr-2"></i>
                                    Direct instructor support
                                </li>
                            </ul>

                            <a href="/courses-content" class="w-full py-3 px-4  bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition text-center hover:-translate-y-0.5  ">
                                Start Learning
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('courses-details', CoursesDetails);