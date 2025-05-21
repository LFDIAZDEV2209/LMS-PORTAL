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

      let html = '<div> <h1 class="pb-4 text-5xl w-full mb-8 ">Available Courses</h1><div>';

      if (category) {
        html += `
      
        <section class="mb-12">
          <h2 class="text-2xl mb-20 w-full">${cat}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            ${grouped[cat].map(course => this.renderCourseCard(course)).join('')}
          </div>
        </section>
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
            <section class="mb-12">
              <h2 class="text-2xl font-bold pm-4 mb-5">${cat}</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-center overflow-hidden">
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
    console.log('ID de la tarjeta:', course.id); 
    return `
      <div class="rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-[370px] mx-auto">
      <div class="hidden course-id">${course.id}</div>
      <div class="relative h- overflow-hidden">
        <img src="${course.imageUrl}" alt="${course.title}" class="w-full h-[200px] object-cover">
        <div class="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-base px-3 py-2 rounded-full">${course.level}</div>
        <div class="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-base px-3 py-2 rounded-full flex items-center">
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
        <div class="flex gap-3 justify-around">
          <a  href="/courses-details?id=${course.id}" data-link class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">Enroll Now</a>
          <button class="border border-blue-500 text-blue-500 hover:bg-gray-100 px-4 py-2 rounded text-sm font-medium">More Info</button>
        </div>
      </div>
    </div>
    `;
  }
  
}

customElements.define('courses-view', CoursesView);
