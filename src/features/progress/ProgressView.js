import { getProgress } from "/src/services/progressService"

export class ProgressView extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  async render() {
    // Obtener los datos reales de progreso
    const progressData = await getProgress()

    this.innerHTML = `
      <div class="block progress-view bg-white pt-10 min-h-screen">
        <h1 class="text-4xl sm:text-5xl md:pl-10 w-[90%] font-semibold text-[#2c3e50] mb-8">Learning Progress</h1>
        <div class="container-progress-card-course grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 px-2 sm:px-6 md:px-10 w-full items-stretch justify-center">
          ${progressData
            .map(
              (c) => `
            <div class="progress-card-course flex flex-col flex-1 justify-between items-start bg-white mt-0 p-4 sm:p-6 md:p-8 w-full h-auto min-h-[230px] border border-zinc-200 shadow-md rounded-xl overflow-hidden">
              <h2 class="progress-title-card-course text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2A322D] mb-4 h-[70px] flex items-center justify-center text-start">${c.title}</h2>
              <div class="progress-bar-card-course bg-[#EEEEEE] h-2 w-full rounded-4xl mt-2 mb-4 overflow-hidden">
                <div class="progress-bar-inside-card-course h-2" style="width: ${Number.parseInt(c.progress)}%; background-color: #3498DB;"></div>
              </div>
              <p class="text-[#818B88] mt-2 mb-2 text-base sm:text-lg">${c.progress} Complete</p>
              <a class="text-[#3498DB] cursor-pointer open-modal-btn mb-2 sm:mb-4" data-category="${c.title}">
                Click to view topics →
              </a>
            </div>

            <div class="modal-progress hidden fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 bg-opacity-30 z-50" data-category="${c.title}">
              <div class="modal-progress-container relative z-10 w-[90vw] h-[90vh] max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white overflow-hidden">
                
              <button class="close-modal-btn absolute top-4 right-4 text-white text-lg font-bold z-20 h-8 w-8 rounded-full bg-[#2A322D] flex items-center justify-center hover:rotate-90 transition-transform duration-300">
                  ×
              </button>


                <div class="relative h-48 w-full overflow-hidden">
                  <img src="${c.imageUrl}" class="w-full h-full object-cover" alt="${c.title}">

                  <div class="absolute bottom-0 left-0 right-0 p-6">
                    <div class="flex flex-col items-start">
                      <h2 class="text-3xl font-bold text-white text-shadow-xl sm:justify-between ">${c.title}</h2>
                      <div class="flex flex-row items-center justify-between w-full">
                        <div class="bg-white bg-opacity-30 h-2 w-4/5 rounded-full overflow-hidden">
                          <div class="h-2 md:w-full w-4/5 bg-[#2ECC71] rounded-full transition-all duration-300" style="width: ${Number.parseInt(c.progress)}%;"></div>
                        </div>
                        <span class="text-white text-sm font-medium whitespace-nowrap min-w-[80px]">${c.progress} Complete</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="flex-1 p-6 overflow-y-auto bg-white">
                  <div class="space-y-6">
                    ${c.subtopics
                      .map(
                        (sub) => `
                      <div class="space-y-3 border-b-1 border-b-gray-300 pb-5">
                        <h3 class="text-xl font-semibold text-[#2A322D]">${sub.title}</h3>
                        <p class="text-sm text-[#64748B] leading-relaxed">${sub.overview}</p>
                        <div class="flex items-center gap-4">
                          <div class="flex-1 bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                            <div class="h-2 bg-[#3B82F6] rounded-full transition-all duration-300" style="width: ${Number.parseInt(sub.progress)}%;"></div>
                          </div>
                          <span class="text-sm text-[#64748B] font-medium whitespace-nowrap min-w-[80px]">${sub.progress} Complete</span>
                        </div>
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `

    this.setUpEventListener()
  }

  setUpEventListener() {
    this.querySelectorAll(".open-modal-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const category = e.target.getAttribute("data-category")
        const modal = this.querySelector(`.modal-progress[data-category="${category}"]`)
        if (modal) modal.classList.remove("hidden")
      })
    })

    this.querySelectorAll(".close-modal-btn").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".modal-progress").classList.add("hidden")
      })
    })

    this.querySelectorAll(".modal-progress").forEach((modal) => {
      modal.addEventListener("mousedown", (e) => {
        if (e.target === modal) {
          modal.classList.add("hidden")
        }
      })
    })
  }
}

customElements.define("progress-view", ProgressView)
