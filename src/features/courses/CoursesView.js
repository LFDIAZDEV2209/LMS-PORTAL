import { getCourses, getCourseByCategory } from "../../services/coursesService.js";

class CoursesView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render().then(() => {
      this.addFlipListeners();
    });
  }

  addFlipListeners() {
    this.querySelectorAll('.more-info-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const container = e.target.closest('.flip-container');
        container.classList.add('flipped');
      });
    });
    this.querySelectorAll('.close-info-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const container = e.target.closest('.flip-container');
        container.classList.remove('flipped');
      });
    });
  }

  async render() {
    const category = this.getAttribute('category');
    try {
      let courses;

      if (category) {
        courses = await getCourseByCategory(category);
      } else {
        courses = await getCourses();
      }

      if (!courses || courses.length === 0) {
        this.innerHTML = `<p class="text-gray-600">No courses found${category ? ` for category "${category}"` : ''}.</p>`;
        return;
      }

      let html = `
  <div class="md:px-20 md:pt-10 px-2 pt-4 w-full">
    <div>
      <h1 class="pb-4 w-full mb-8 font-medium md:pl-5">Available Courses</h1>
      <div></div>
    </div>
`;

      if (category) {
        html += `
    <section class="p-2 sm:p-6">
      <h2 class="text-2xl mb-2 w-full">${category}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
        ${courses.map(course => this.renderCourseCard(course)).join('')}
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
      <section class="mb-8 px-2 sm:px-6">
        <h2 class="font-light mb-2">${cat}</h2>
        <hr class="border-t-2 border-blue-400 w-full mb-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
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
  <div class="group w-full max-w-[380px] mx-auto min-h-[440px]">
    <div class="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-[.flipped]:rotate-y-180">
      <!-- Cara frontal -->
      <div class="absolute w-full min-h-[430px] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-lg transition-transform  z-20 [backface-visibility:hidden]">
        <div class="hidden course-id">${course.id}</div>
        <div class="relative overflow-hidden">
          <img src="${course.imageUrl}" alt="Course image for ${course.title}" class="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-110">
          <div class="absolute top-3 left-3 bg-black/60 text-white text-base px-3 py-2 rounded-full">
            <p>${course.level}</p>
          </div>
          <div class="absolute top-3 right-3 bg-black/60 text-white text-base px-3 py-2 rounded-full flex items-center">
            <i class="bi bi-clock-history w-2 h-2 mr-3 mb-4"></i>
            ${course.duration}
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-lg font-semibold text-gray-800 mb-5 ">${course.title}</h3>
          <p class="text-sm text-[#7a8582] mb-4 h-[5.5rem]">${course.overview}</p>
          <div class="flex gap-3 justify-around">
            <a href="/courses-details?id=${course.id}" data-link class="bg-blue-500 hover:bg-blue-600 transition-transform hover:-translate-y-0.5 text-white px-5 py-3 rounded-full text-sm font-medium">Enroll Now</a>
            <a class="border border-blue-500 text-blue-400 hover:bg-gray-100 px-5 py-3 transition-transform hover:-translate-y-0.5  rounded-full text-sm font-medium more-info-btn" href="javascript:void(0);">More Info</a>
          </div>
        </div>
      </div>
      <!-- Cara trasera -->
      <div class="absolute w-full min-h-[430px] rounded-lg overflow-hidden bg-white shadow p-4 z-10 [backface-visibility:hidden] rotate-y-180 flex flex-col justify-between">
        <div class= "overflow-scroll w-full h-[350px]">
          <h4 class="pb-2 font-medium">Prerequisites</h4>
          <p class="pb-2 text-[#7a8582]">${course.prerequisites}</p>
          <h4 class="pb-2 font-medium">What You'll Learn</h4>
          <p class="pb-2 text-[#7a8582]">${course.learningOutcomes}</p>
          <h4 class="pb-2 font-medium">Course Structure</h4>
          <p class="pb-2 text-[#7a8582]">${Array.isArray(course.structure) ? course.structure[0] : course.structure}</p>
        </div>
        <a class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-medium close-info-btn mt-4 text-center" href="javascript:void(0);">CLOSE</a>
      </div>
    </div>
  </div>
`;
  }
} // <-- Add this closing brace and semicolon to end the class definition

document.addEventListener('click', (e) => {
  if (e.target.closest('.more-info-btn')) {
    const card = e.target.closest('.group');
    card.classList.add('flipped');
  }
  if (e.target.closest('.close-info-btn')) {
    const card = e.target.closest('.group');
    card.classList.remove('flipped');
  }
});

customElements.define('courses-view', CoursesView);
