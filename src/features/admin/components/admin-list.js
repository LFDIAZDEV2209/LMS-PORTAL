import { getCourses } from "../../../services/coursesService.js";
import { getCourseByCategory } from "../../../services/coursesService.js";

class AdminList extends HTMLElement {
  constructor() {
    super();
    this.courses = [];
  }

  async connectedCallback() {
    await this.loadCourses();
    this.render();
  }

  static get observedAttributes() {
    return ["search", "filter"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
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
            <div class="text-center py-8 text-red-500">
            <p>Error al cargar los cursos</p>
            </div>
    `;
  }

  async applyFilters() {
    const searchTerm = this.getAttribute("search")?.toLowerCase();
    const filterCategory = this.getAttribute("filter");

    console.log("Filter Category:", filterCategory);
    console.log("Courses Before Filtering:", this.courses);

    try {
        // Filtro por categoria
        if (filterCategory && filterCategory !== "all") {
            this.courses = await getCourseByCategory(filterCategory);
        } else {
            this.courses = await getCourses();
        }

        // Filtro por busqueda
        if (searchTerm) {
            this.courses = this.courses.filter((course) =>
                course.title.toLowerCase().includes(searchTerm)
            );
        }

        // Renderizar la lista filtrada
        this.render();
    } catch (error) {
        console.error("Error applying filters:", error);
        this.renderError();
    }
}

  async loadCourses() {
    try {
      this.courses = await getCourses();
      this.render();
    } catch (error) {
      console.error("Error loading courses:", error);
      this.renderError();
    }
  }

  render() {
    this.innerHTML = `
        <div class="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mt-6">
        ${
          this.courses.length === 0
            ? this.renderEmptyState()
            : this.renderCoursesList()
        }
      </div>
    `;
  }

  renderCoursesList() {
    return `
        <ul class="divide-y divide-gray-100">
            ${this.courses
                .map(
                (course) => `
                <li class="p-4 hover:bg-gray-50 transition-colors duration-150 rounded-full">
                <div class="flex items-center justify-between">
                    <div>
                    <h3 class="font-medium text-gray-800">${course.title}</h3>
                    </div>
                    <div class="flex items-center space-x-3">
                    <i class="bi bi-pencil-square text-gray-500 cursor-pointer hover:text-blue-500 transition duration-200" style="font-size: 1.25rem;"></i>
                    <i class="bi bi-trash text-red-500 cursor-pointer hover:text-red-600 transition duration-200" style="font-size: 1.25rem;"></i>
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
}

customElements.define("admin-list", AdminList);
