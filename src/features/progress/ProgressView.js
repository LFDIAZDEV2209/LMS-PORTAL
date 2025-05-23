import { getCourseByCategory } from "../../services/coursesService";

export class ProgressView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const selectedCategories = ["Video Games", "Backend", "Frontend", "Schools"];

    const categoryPromises = selectedCategories.map(category =>
      getCourseByCategory(category)
    );
    const coursesByCategory = await Promise.all(categoryPromises);

    const categoryData = selectedCategories.map((category, index) => {
      const courses = coursesByCategory[index];
      const totalCourses = courses.length;
      const averageProgress =
        courses.reduce((sum, course) => sum + (course.progress || 0), 0) /
        (totalCourses || 1);

      return {
        category,
        totalCourses,
        progress: Math.round(averageProgress)
      };
    });

    this.innerHTML = `
      <div class="block progress-view bg-[#f4f5f5]">
        <h1 class="text-5xl font-semibold text-left text-[#2c3e50]">Learning Progress</h1>
        <div class="container-progress-card-course grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          ${categoryData
            .map(
              c => `
            <div class="progress-card-course mt-10 p-5 bg-white shadow-md rounded-lg">
              <h2 class="progress-title-card-course text-4xl font-semibold text-[#2A322D] mb-3">${c.category}</h2>
              <p class="text-[#2A322D] text-sm mb-2">Total courses: <strong>${c.totalCourses}</strong></p>
              <div class="progress-bar-card-course bg-[#EEEEEE] h-2 w-full rounded-4xl mt-3 mb-3 overflow-hidden">
                <div class="progress-bar-inside-card-course h-2 w-[${c.progress}%] bg-[#3498DB]"></div>
              </div>
              <p class="text-[#818B88] mt-3 mb-3 text-lg">${c.progress}% Complete</p>
              <a class="text-[#3498DB] cursor-pointer open-modal-btn" data-category="${c.category}">
                Click to view topics →
              </a>
            </div>

            <!-- MODAL -->
            <div class="modal-progress hidden fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(100,100,100,0.7)] z-50" data-category="${c.category}">
  <div class="modal-progress-container z-10 w-85 max-h-130 md:max-h-200 md:w-160 justify-items-center content-center rounded-2xl sm:w-100 box-border overflow-x-hidden p-0">
    <div class="bg-red-100 w-full h-40 p-5 flex flex-col justify-end">
      <div>
        <div class="pl-20">
          <button class="close-modal-btn absolute top-18 right-3/11 text-white text-2xl font-bold z-20 h-10 w-10 rounded-full bg-[#2A322D]"><p class=" justify-items-center content-center ">X</p></button>
        </div>
        <div>
          <h2 class="progress-title-card-course text-xl md:text-3xl font-semibold text-[#2A322D] mb-1">${c.category}</h2>
        </div>
        <div class="flex items-center-safe gap-2">    
          <div class="progress-bar-card-course bg-[#EEEEEE] h-2 w-[65%] sm:w-[75%] md:w-[110%] rounded-4xl m-0 p-0 overflow-hidden justify-start">
            <div class="progress-bar-inside-card-course h-2 bg-[#2ECC71] m-0" style="width: ${c.progress}%"></div>
          </div>
          <div class="w-[25%]">
            <p class="texto text-[#FFFFFF] text-sm md:text-base p-0 m-0 whitespace-nowrap">${c.progress}% Complete</p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-card-progress bg-white w-full h-80 md:max-h-160 p-5 pt-2 flex flex-col gap-4 overflow-y-auto">
      ${coursesByCategory[selectedCategories.indexOf(c.category)]
        .map(course => `
          <div class="progress-card-course p-4 bg-[#f9f9f9] border rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold text-[#2A322D]">${course.title}</h3>
            ${course.learningOutcomes ? `<p class="text-sm text-[#818B88] mt-1 mb-2">${course.learningOutcomes}</p>` : ""}
            <div class="flex items-center gap-2">
              <div class="progress-bar-card-course bg-[#EEEEEE] h-2 w-full rounded-4xl overflow-hidden">
                <div class="progress-bar-inside-card-course h-2 bg-[#3498DB]" style="width: ${course.progress || 0}%"></div>
              </div>
              <span class="text-sm text-[#2A322D] whitespace-nowrap">${course.progress || 0}%</span>
            </div>
          </div>
        `)
        .join("")}
    </div>
  </div>
</div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    this.setUpEventListener();
  }

  setUpEventListener() {
    this.querySelectorAll(".open-modal-btn").forEach(button => {
      button.addEventListener("click", e => {
        const category = e.target.getAttribute("data-category");
        const modal = this.querySelector(`.modal-progress[data-category="${category}"]`);
        if (modal) modal.classList.remove("hidden");
      });
    });

    this.querySelectorAll(".close-modal-btn").forEach(button => {
      button.addEventListener("click", () => {
        button.closest(".modal-progress").classList.add("hidden");
      });
    });
  }
}

customElements.define("progress-view", ProgressView);
