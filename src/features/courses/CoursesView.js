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

      let html = '<div> <h1 class="pb-4 text-5xl w-full mb-8 md:pl-10 ">Available Courses</h1><div>';

      if (category) {

        html += `
        <section class="mb-12">
          <h2 class="text-2xl mb-8 w-full">${category}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
            <section class="mb-8">
              <h2 class="text-2xl font-bold pm-4 mb-5 md:pl-10">${cat}</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-between overflow-hidden">
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
    <div class="group w-full sm:w-[370px] mx-auto h-[430px] [perspective:10200px]">
      <div class="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-[.flipped]:rotate-y-180">
        <!-- Cara frontal -->
        <div class="absolute w-full h-[430px] rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-transform hover:-translate-y-1 z-20 [backface-visibility:hidden]">
          <div class="hidden course-id">${course.id}</div>
          <div class="relative overflow-hidden">
            <img src="${course.imageUrl}" alt="Course image for ${course.title}" class="w-full h-[200px] object-cover">
            <div class="absolute top-3 left-3 bg-black/60 text-white text-base px-3 py-2 rounded-full">
            <p>${course.level}</p>
            </div>
            <div class="absolute top-3 right-3 bg-black/60 text-white text-base px-3 py-2 rounded-full flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              ${course.duration}
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-800 mb-5 ">${course.title}</h3>
            <p class="text-sm text-[#7a8582] mb-4 h-[5.5rem]">${course.overview}</p>
            <div class="flex gap-3 justify-around">
              <a href="/courses-details?id=${course.id}" data-link class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Enroll Now</a>
              <a class="border border-blue-500 text-blue-500 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium more-info-btn" href="javascript:void(0);">More Info</a>
            </div>
          </div>
        </div>
        <!-- Cara trasera -->
        <div class="absolute w-full h-[430px] rounded-lg overflow-hidden bg-white shadow p-6 z-10 [backface-visibility:hidden] rotate-y-180 flex flex-col justify-between">
          <div class= "overflow-scroll w-full h-[350px]">
            <h2 class="pb-2 font-bold">Prerequisites</h2>
            <p class="pb-2 text-[#7a8582]">${course.prerequisites}</p>
            <h2 class="pb-2 font-bold">What You'll Learn</h2>
            <p class="pb-2 text-[#7a8582]">${course.learningOutcomes}</p>
            <h2 class="pb-2 font-bold">Course Structure</h2>
            <p class="pb-2 text-[#7a8582]">${course.structure}</p>
          </div>
          <a class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium close-info-btn mt-4 text-center" href="javascript:void(0);">CLOSE</a>
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
