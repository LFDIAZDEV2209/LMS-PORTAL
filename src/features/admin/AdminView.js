import { getTeachers } from "../../services/teacherService.js";
import Swal from "sweetalert2";

class AdminView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setUpEventListeners();
    // Deshabilitar el botón del panel hasta que los profesores estén cargados
    this.querySelector('#viewTeacherDashboard').disabled = true;
  }

  setUpEventListeners() {
    const adminHeader = this.querySelector("admin-header");
    const adminList = this.querySelector("admin-list");
    const viewTeacherDashboardButton = this.querySelector('#viewTeacherDashboard');
    const addTeacherButton = this.querySelector('#addTeacherBtn');

    adminHeader.addEventListener("search", (e) => {
      adminList.setAttribute("search", e.detail);
    });

    adminHeader.addEventListener("filter", (e) => {
      adminList.setAttribute("filter", e.detail);
    });

    // Escuchar el clic en el botón de ver panel del profesor
    viewTeacherDashboardButton?.addEventListener('click', () => {
      this.showTeacherDashboard();
    });

    // Escuchar el clic en el botón de agregar profesor
    addTeacherButton?.addEventListener('click', () => {
      const modal = this.querySelector('admin-add-teacher');
      if (modal) {
        modal.openModal();
      }
    });

    // Agregar evento para mostrar la lista de cursos al ocultar el dashboard
    const teacherDashboard = this.querySelector('admin-teacher-dashboard');
    if (teacherDashboard) {
        teacherDashboard.addEventListener('dashboard-hidden', () => {
            const courseList = this.querySelector('admin-list');
            if (courseList) {
              courseList.classList.remove('hidden');
            }
        });
    }
  }

  showTeacherDashboard() {
    const teacherIdSelect = this.querySelector('#teacherId');
    const teacherId = teacherIdSelect.value;

    if (!teacherId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, seleccione un profesor',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3B82F6'
      });
      return;
    }

    const dashboard = this.querySelector('admin-teacher-dashboard');
    if (dashboard) {
      dashboard.setAttribute('teacher-id', teacherId);
      dashboard.classList.remove('hidden');
      
      // Ocultar la lista de cursos cuando se muestra el dashboard
      const courseList = this.querySelector('admin-list');
      if (courseList) {
        courseList.classList.add('hidden');
      }
    }
  }

  render() {
    this.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <admin-header></admin-header>
        
        <div class="flex justify-between items-center mt-6 mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Cursos</h2>
          <div class="flex gap-2">
            <button id="addTeacherBtn" class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200">
              <i class="bi bi-person-plus mr-2"></i>Agregar Profesor
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            <i class="bi bi-person-lines-fill mr-2"></i>Panel de Profesores
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="teacherId" class="block text-sm font-medium text-gray-700 mb-2">Seleccionar Profesor</label>
              <select id="teacherId" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none">
                <option value="">Seleccione un profesor...</option>
                <!-- Se llenará dinámicamente -->
              </select>
            </div>
            <div class="flex items-end">
              <button id="viewTeacherDashboard" class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                <i class="bi bi-speedometer2 mr-2"></i>Ver Panel
              </button>
            </div>
          </div>
        </div>
        
        <admin-list></admin-list>
        <admin-add></admin-add>
        <admin-edit></admin-edit>
        <admin-delete></admin-delete>
        <admin-add-teacher></admin-add-teacher>
        <admin-teacher-dashboard class="hidden"></admin-teacher-dashboard>
      </div>
    `;

    // Cargar la lista de profesores
    this.loadTeachers();
  }

  async loadTeachers() {
    try {
      const teachers = await getTeachers();
      
      const select = this.querySelector('#teacherId');
      if (select) {
        teachers.forEach(teacher => {
          const option = document.createElement('option');
          option.value = teacher.id;
          option.textContent = teacher.name;
          select.appendChild(option);
        });
        // Habilitar el botón del panel una vez que los profesores estén cargados
        this.querySelector('#viewTeacherDashboard').disabled = false;
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
      // Opcional: Mostrar un mensaje de error al usuario si falla la carga de profesores
      // this.querySelector('#teacherId').innerHTML = '<option value="">Error al cargar profesores</option>';
    }
  }
}

customElements.define("admin-view", AdminView);
