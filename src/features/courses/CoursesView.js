const API_URL = 'http://localhost:3000';



class CoursesView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const category = this.getAttribute('category');
    try {
      let courses;

      if (category) {
        courses = await getCourseByCategory(category);
      } else {
        const res = await fetch(`${API_URL}/cursos`);
        courses = await res.json();
      }

      if (!courses || courses.length === 0) {
        this.innerHTML = `<p class="text-gray-600">No courses found${category ? ` for category "${category}"` : ''}.</p>`;
        return;
      }

      let html = '';

      if (category) {
        // Renderizar solo una categoría
        html += `
        <div class="p-5 w-full h-15">
          
          <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4">${category}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pl-5 pr-5">
              ${courses.map(course => this.renderCourseCard(course)).join('')}
            </div>
          </section>
        </div>
        `;
      } else {
        // Agrupar por categoría
        const grouped = {};
        courses.forEach(course => {
          if (!grouped[course.category]) grouped[course.category] = [];
          grouped[course.category].push(course);
        });

        for (const cat in grouped) {
          html += `
          
            <section class="mb-8">
              <h2 class="text-2xl font-bold pl-15 pr-15 mb-4">${cat}</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                ${grouped[cat].map(course => this.renderCourseCard(course)).join('')}
              </div>
            </section>
          `;
        }
      }

      this.innerHTML = html;
    } catch (error) {
      this.innerHTML = `<p class="text-red-500">Error loading courses data no conectada: ${error.message}</p>`;
    }
  }

  renderCourseCard(course) {
    return `
      <div class="rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-transform hover:-translate-y-1 pl-10 pr-5">
        <div class="relative h-40 overflow-hidden">
          <img src="${course.imageUrl}" alt="${course.title}" class="w-full h-full object-cover">
          <div class="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">${course.level}</div>
          <div class="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            ${course.duration}
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">${course.title}</h3>
          <p class="text-sm text-gray-600 mb-4">${course.overview}</p>
          <div class="flex gap-3">
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">Enroll Now</button>
            <button class="border border-blue-500 text-blue-500 hover:bg-gray-100 px-4 py-2 rounded text-sm font-medium">More Info</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('courses-view', CoursesView);
