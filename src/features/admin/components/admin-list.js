import { getCourses } from "../../../services/coursesService.js";
import { getCourseByCategory } from "../../../services/coursesService.js";

class AdminList extends HTMLElement {
  constructor() {
    super();
    this.courses = [];
    this.currentPage = 1;
    this.coursesPerPage = 3;
  }

  async connectedCallback() {
    await this.loadCourses();
    this.render();
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    this.addEventListener('course-updated', (e) => {
      this.updatedCourse(e.detail);
    });

    this.addEventListener('click', (e) => {
      if (e.target.classList.contains('btnEdit')) {
        const courseId = e.target.getAttribute('data-id');
        const adminEdit = document.querySelector('admin-edit');
        if (adminEdit) {
          adminEdit.openModal(courseId);
        } else {
          console.error('No se encontró el componente admin-edit');
        }
      }
      if (e.target.classList.contains('btnDelete')) {
        const courseId = e.target.getAttribute('data-id');
        const adminDelete = document.querySelector('admin-delete');
        if (adminDelete) {
          adminDelete.openModal(courseId);
        } else {
          console.error('No se encontró el componente admin-delete');
        }
      }
      if (e.target.classList.contains('pagination-btn')) {
        const page = parseInt(e.target.getAttribute('data-page'));
        if (!isNaN(page)) {
          this.currentPage = page;
          this.render();
        }
      }
    });
  }

  updatedCourse(updatedCourse) {
    const index = this.courses.findIndex(course => course.id === updatedCourse.id);
    if (index !== -1) {
      this.courses[index] = updatedCourse;
      this.render();
    }
  }

  static get observedAttributes() {
    return ["search", "filter"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.currentPage = 1; // Reiniciar página al filtrar
      this.applyFilters();
    }
  }

  renderEmptyState() {
    return `
      <div class="text-center py-8 text-gray-500">
        <p>No hay cursos disponibles</p>
      </div>
    `;
  }

  renderError() {
    this.innerHTML = `
      <div class="text-center py-8">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg mx-auto">
          <div class="text-red-500 mb-4">
            <i class="bi bi-exclamation-triangle-fill text-3xl"></i>
          </div>
          <h3 class="text-lg font-medium text-red-800 mb-2">Error al cargar los cursos</h3>
          <p class="text-red-600 mb-4">No se pudo conectar con el servidor. Por favor, verifica que:</p>
          <ul class="text-left text-red-600 list-disc list-inside space-y-1 mb-4">
            <li>El servidor de la API esté corriendo</li>
            <li>No haya problemas de conexión</li>
            <li>La URL de la API sea correcta</li>
          </ul>
          <button onclick="window.location.reload()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200">
            Intentar de nuevo
          </button>
        </div>
      </div>
    `;
  }

  async applyFilters() {
    const searchTerm = this.getAttribute("search")?.toLowerCase();
    const filterCategory = this.getAttribute("filter");

    try {
      if (filterCategory && filterCategory !== "all") {
        this.courses = await getCourseByCategory(filterCategory);
      } else {
        this.courses = await getCourses();
      }

      if (searchTerm) {
        this.courses = this.courses.filter((course) =>
          course.title.toLowerCase().includes(searchTerm)
        );
      }

      this.currentPage = 1; // Reiniciar página al filtrar
      this.render();
    } catch (error) {
      console.error("Error applying filters:", error);
      this.renderError();
    }
  }

  async loadCourses() {
    try {
      this.courses = await getCourses();
      this.currentPage = 1; // Reiniciar página al cargar
      this.render();
    } catch (error) {
      console.error("Error loading courses:", error);
      this.renderError();
    }
  }

  async reloadCourses() {
    try {
      this.courses = await getCourses();
      this.currentPage = 1; // Reiniciar página al recargar
      this.render();
    } catch (error) {
      console.error("Error reloading courses:", error);
      this.renderError();
    }
  }

  render() {
    if (this.courses.length === 0) {
      this.innerHTML = this.renderEmptyState();
      return;
    }

    // Animación: fade out antes de renderizar
    const listContainer = this.querySelector('.admin-list-anim');
    if (listContainer) {
      listContainer.classList.remove('opacity-100');
      listContainer.classList.add('opacity-0');
    }

    setTimeout(() => {
      this.innerHTML = `
        <div class="admin-list-anim bg-white rounded-lg border border-gray-100 shadow-sm p-6 mt-6 opacity-0 transition-opacity duration-300 ease-in-out">
          ${this.renderCoursesList()}
          ${this.renderPagination()}
        </div>
      `;
      // Animación: fade in después de renderizar
      setTimeout(() => {
        const newListContainer = this.querySelector('.admin-list-anim');
        if (newListContainer) {
          newListContainer.classList.remove('opacity-0');
          newListContainer.classList.add('opacity-100');
        }
      }, 10);
    }, 200);
  }

  renderCoursesList() {
    // Paginación
    const startIdx = (this.currentPage - 1) * this.coursesPerPage;
    const endIdx = startIdx + this.coursesPerPage;
    const paginatedCourses = this.courses.slice(startIdx, endIdx);

    return `
      <ul class="divide-y divide-gray-100">
        ${paginatedCourses
          .map(
            (course) => `
            <li class="p-4 hover:bg-gray-50 transition-colors duration-150">
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div class="flex-1">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                    <img src="${course.imageUrl}" alt="${course.title}" class="w-16 h-16 sm:w-12 sm:h-12 rounded-lg object-cover">
                    <div>
                      <h3 class="font-medium text-gray-800 text-lg sm:text-base">${course.title}</h3>
                      <p class="text-sm text-gray-500">${course.level} • ${course.duration}</p>
                    </div>
                  </div>
                  <p class="mt-2 text-sm text-gray-600 line-clamp-2">${course.overview}</p>
                  <div class="mt-2 flex flex-wrap gap-2">
                    ${course.prerequisites.map(prereq => 
                      `<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">${prereq}</span>`
                    ).join('')}
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
                  <div class="flex items-center gap-2">
                    <i class="bi bi-pencil-square btnEdit text-gray-500 cursor-pointer hover:text-blue-500 transition duration-200" style="font-size: 1.25rem;" data-id="${course.id}"></i>
                    <i class="bi bi-trash btnDelete text-red-500 cursor-pointer hover:text-red-600 transition duration-200" style="font-size: 1.25rem;" data-id="${course.id}"></i>
                  </div>
                  <span class="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">${course.category}</span>
                </div>
              </div>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  }

  renderPagination() {
    const totalPages = Math.ceil(this.courses.length / this.coursesPerPage);
    if (totalPages <= 1) return '';
    let buttons = '';
    for (let i = 1; i <= totalPages; i++) {
      buttons += `<button class="pagination-btn cursor-pointer px-3 py-1 mx-1 rounded-lg border ${i === this.currentPage ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}" data-page="${i}">${i}</button>`;
    }
    return `
      <div class="flex justify-center mt-6">
        ${buttons}
      </div>
    `;
  }
}

customElements.define("admin-list", AdminList);
