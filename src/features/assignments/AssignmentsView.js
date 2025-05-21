import { getCourses, getCourseTasks } from '../../services/coursesService.js';

class AssignmentsView extends HTMLElement {
  constructor() {
    super();
    this.state = {
      courses: [],
      tasksByCourse: {},
      loading: true,
    };
  }

  async connectedCallback() {
    // 1. Obtener cursos
    let courses = [];
    try {
      courses = await getCourses();
    } catch (e) {
      courses = [];
    }

    // 2. Obtener tareas para cada curso
    const tasksByCourse = {};
    for (const course of courses) {
      try {
        tasksByCourse[course.id] = await getCourseTasks(course.id);
      } catch (e) {
        tasksByCourse[course.id] = [];
      }
    }

    this.state.courses = courses;
    this.state.tasksByCourse = tasksByCourse;
    this.state.loading = false;
    this.render();
  }

  render() {
    if (this.state.loading) {
      this.innerHTML = `<div class="text-center py-10">Loading...</div>`;
      return;
    }

    // Agrupa cursos por categoría
    const categories = {};
    this.state.courses.forEach(course => {
      if (!categories[course.category]) categories[course.category] = [];
      categories[course.category].push(course);
    });

    // Renderiza cada categoría y sus cursos/tareas
    this.innerHTML = `
      <div class="assignments-view max-w-4xl mx-auto py-8">
        <h2 class=" absolute text-4xl font-bold text-gray-900 top-30">Your Assignments</h2>
        <div class="flex items-start mt-6 mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <i class="bi bi-exclamation-triangle-fill text-yellow-500 mr-2"></i>
          <p class="text-sm text-yellow-800">Some assignments require course completion before submission.</p>
        </div>
        <div class="flex flex-wrap gap-2 mb-8">
          <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            <i class="bi bi-list-task mr-2 text-white"></i> All
          </button>
          <button class="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <i class="bi bi-hourglass-split mr-2 text-yellow-500"></i> Pending
          </button>
          <button class="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <i class="bi bi-check-circle-fill mr-2 text-green-600"></i> Completed
          </button>
          <button class="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <i class="bi bi-exclamation-triangle-fill text-yellow-500 mr-2"></i> Overdue
          </button>
          <button class="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <i class="bi bi-lock-fill mr-2 text-orange-500"></i> Locked
          </button>
        </div>
        ${Object.entries(categories).map(([category, courses]) => `
          <div class="mb-8">
            <div class="flex items-center mb-3">
              ${this.getCategoryIcon(category)}
              <div class="flex flex-col">
                <h3 class="text-xl font-semibold">${category}</h3>
                <hr class="w-full border-t-2 border-blue-600 my-1">
              </div>
            </div>
            ${courses.map(course => this.renderCourseTasks(course, this.state.tasksByCourse[course.id] || [])).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Renderiza las tareas de un curso
  renderCourseTasks(course, tasks) {
    return tasks.map(task => `
      <div class="bg-white border-l-4 ${this.getTaskBorderColor(task.status)} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition mb-4">
        <div class="flex items-center px-4 py-2">
          ${this.getTaskStatusIcon(task.status)}
          <span class="text-sm font-medium text-gray-800">${task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
        </div>
        <div class="p-4">
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl font-bold text-gray-900">${task.title}</h3>
            <span class="text-base text-blue-600 font-medium">${course.title}</span>
            <span class="flex items-center text-sm text-red-500 font-medium mt-1 mb-2">
              <i class="bi bi-calendar-event mr-1 text-red-500"></i> Due: ${task.dueDate}
            </span>
          </div>
          <p class="mt-2 text-gray-600">${task.description}</p>
          <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
            <span class="flex items-center">
              <i class="bi bi-bullseye mr-1 text-pink-500"></i> Points: ${task.points}
            </span>
            <span class="flex items-center">
              <i class="bi bi-journal-text mr-1 text-blue-500"></i> Type: ${task.type}
            </span>
          </div>
        </div>
        ${this.renderTaskActionButton(task.status)}
      </div>
    `).join('');
  }

  // Devuelve el ícono de la categoría
  getCategoryIcon(category) {
    switch (category) {
      case 'Web Development':
        return `<i class="bi bi-laptop text-2xl mr-2 text-blue-500"></i>`;
      case 'Data Science':
        return `<i class="bi bi-bar-chart-line text-2xl mr-2 text-blue-500"></i>`;
      case 'Design':
        return `<i class="bi bi-palette-fill text-2xl mr-2 text-pink-500"></i>`;
      case 'Computer Science':
        return `<i class="bi bi-lightning-charge-fill text-2xl mr-2 text-yellow-500"></i>`;
      default:
        return `<i class="bi bi-book text-2xl mr-2 text-gray-500"></i>`;
    }
  }

  // Devuelve el color del borde según el estado de la tarea
  getTaskBorderColor(status) {
    switch (status) {
      case 'pending':
        return 'border-red-600';
      case 'locked':
        return 'border-red-500 opacity-75';
      case 'completed':
        return 'border-green-500';
      default:
        return 'border-gray-200';
    }
  }

  // Devuelve el ícono del estado de la tarea
  getTaskStatusIcon(status) {
    switch (status) {
      case 'pending':
        return `<i class="bi bi-hourglass-split mr-2 text-yellow-500"></i>`;
      case 'locked':
        return `<i class="bi bi-lock-fill mr-2 text-orange-500"></i>`;
      case 'completed':
        return `<i class="bi bi-check-circle-fill mr-2 text-green-600"></i>`;
      default:
        return `<i class="bi bi-question-circle mr-2 text-gray-400"></i>`;
    }
  }

  renderTaskActionButton(status) {
    switch (status) {
      case 'pending':
        return `
          <div class="flex justify-end px-4 py-3 bg-gray-50 border-t border-gray-100">
            <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              <i class="bi bi-upload mr-2 text-white"></i> Submit Assignment
            </button>
          </div>
        `;
      case 'locked':
        return `
          <div class="flex justify-end px-4 py-3 bg-gray-50 border-t border-gray-100">
            <button class="flex items-center px-4 py-2 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed" disabled>
              <i class="bi bi-lock-fill mr-2 text-orange-500"></i> Complete Course to Submit
            </button>
          </div>
        `;
      case 'completed':
        return `
          <div class="flex justify-start px-4 py-3 bg-gray-50 border-t border-gray-100">
            <button class="flex items-center px-6 py-2 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed" disabled>
              <i class="bi bi-check-circle-fill mr-2 text-green-600"></i> Submitted
            </button>
          </div>
        `;
      default:
        return '';
    }
  }
}

customElements.define('assignments-view', AssignmentsView); 