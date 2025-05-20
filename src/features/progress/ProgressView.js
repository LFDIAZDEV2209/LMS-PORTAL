class ProgressView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/`
      <!---
      <div class="progress-view bg-[#F4F5F5]">
        <h1 class="text-5xl font-semibold text-left text-[#2c3e50]">Learning Progress</h1>
        <div class="container-progress-card-courses flex">
          <div class="progress-card-course bg-[#ffffff] mt-10 p-5 bg-white shadow-md rounded-lg p-4  sm:w-60 md:w-75 lg:w-75 2xl:w-100 content-start justify-start">
            <h2 class="progress-title-card-course text-4xl font-semibold text-[#2A322D] mb-3">Web Development</h2>
            <div class="progress-bar-card-course bg-[#EEEEEE] h-2 w-[80%] rounded-4xl mt-3 mb-3 p-0 overflow-hidden">
              <div class="progress-bar-inside-card-course h-2 w-[80%] bg-[#3498DB] m-0"></div>
            </div>
            <p class="text-[#818B88] mt-3 mb-3 text-lg">80% Complete</p>
            <a class="text-[#3498DB]">Click to view topics →</a>
          </div>
        </div>
      </div>
      --->

      <!---Modal--->
      <div class="modal-progress-container z-10 bg-black w-85 max-h-130 md:max-h-200 md:w-160 justify-items-center content-center rounded-2xl sm:w-100 box-border overflow-x-hidden p-0">
        <div class="bg-red-100 w-full h-40 p-5 flex flex-col justify-end"> <!---bg-url[./]--->
          <div class="">
            <div>
              <h2 class="progress-title-card-course text-xl md:text-3xl font-semibold text-[#2A322D] mb-1">Web Development</h2>
            </div>
            <div class="flex items-center-safe gap-2">    
              <div class="progress-bar-card-course bg-[#EEEEEE] h-2 w-[65%] sm:w-[75%] md:w-[110%] rounded-4xl m-0 p-0 overflow-hidden justify-start">
                <div class="progress-bar-inside-card-course h-2 w-[80%] bg-[#2ECC71] m-0"></div>
              </div>
              <div class="w-[25%]">
                <p class="texto text-[#FFFFFF] text-sm  md:text-base p-0 m-0 whitespace-nowrap">80% Complete</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-card-progress bg-white w-full h-80 md:max-h-160 p-5 pt-2 flex flex-col">  
          <div class="progress-card-course bg-[#ffffff] mt-0 p-0 pt-0 pb-3 bg-white w-[100%] content-start justify-start flex flex-col border-b-2 border-[#efefef]">
            <div class="pt-1">
              <h2 class="progress-title-card-course text-xl md:text-2xl font-semibold text-[#2A322D] mt-3 mb-0">HTML Fundamentals</h2>
              <p class="text-[#818B88] mt-1 mb-1 text-sm  md:text-base">Basic structure, elements and semantic markup</p>
            </div>
            <div class="flex items-center-safe gap-2">
              <div class="progress-bar-card-course bg-[#EEEEEE] h-2 w-[60%] sm:w-[70%] md:w-[80%] rounded-4xl mt-3 mb-3 p-0 overflow-hidden justify-start">
                <div class="progress-bar-inside-card-course h-2 w-[100%] bg-[#3498DB] m-0"></div>
              </div>
              <div> 
                <p class="text-[#818B88] text-sm  md:text-base text-end whitesapce-nonwrap">100% Complete</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

<!---
FALTA
1. Contenedor con fondo oscuro transparente: [100, 100, 100, 0.7] Y centrarlo (configs de main no dejan)
2. x Para salir del modal
3. Conectarlo todo
--->


    `;
  }
}

customElements.define('progress-view', ProgressView);


