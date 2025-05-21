class CoursesContent extends HTMLElement{
    constructor(){
        super();

    }
    connectedCallback() {
        this.render();
      }

    async render() {
       this.innerHTML =`
       <div class="max-w-6xl mx-auto border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <!-- Header con botón de regreso -->
        <div class="p-4 border-b border-gray-300">
            <button
                class="px-3 py-1 text-sm border border-amber-500 text-amber-600 rounded hover:bg-amber-50 transition-colors">
                Back to Course
            </button>
            <div class="mt-2 border-t border-gray-300"></div>
        </div>

        <!-- Contenido principal -->
        <div class="flex flex-col md:flex-row">
            <!-- Sidebar de temas -->
            <div class="w-full md:w-1/3 border-r border-gray-300">
                <div class="border border-gray-300 m-4 rounded">
                    <div class="p-2 font-bold text-lg border-b border-gray-300">
                        Course Topics
                    </div>
                    <div class="p-2 text-xs text-gray-500">
                        1/4 completed
                    </div>
                </div>

                <!-- Lista de temas -->
                <div class="space-y-2 p-4">
                    <!-- Tema 1 -->
                    <div class="flex items-center p-2 bg-blue-500 text-white rounded">
                        <div class="mr-3 bg-blue-600 rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                        </div>
                        <div>
                            <div class="font-medium">Introduction to the Course</div>
                            <div class="text-xs">10 min</div>
                        </div>
                    </div>

                    <!-- Tema 2 -->
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                        <div class="mr-3 bg-gray-200 rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <div class="font-medium">Getting Started with Tools</div>
                            <div class="text-xs">20 min</div>
                        </div>
                    </div>

                    <!-- Tema 3 -->
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                        <div class="mr-3 bg-gray-200 rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <div class="font-medium">Core Concepts</div>
                            <div class="text-xs">30 min</div>
                        </div>
                    </div>

                    <!-- Tema 4 -->
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                        <div class="mr-3 bg-gray-200 rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <div class="font-medium">Advanced Techniques</div>
                            <div class="text-xs">45 min</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contenido principal -->
            <div class="w-full md:w-2/3">
                <!-- Video del curso -->
                <div class="p-4">
                    <div class="relative pb-[56.25%] h-0 overflow-hidden rounded-md bg-black">
                        <iframe class="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video del curso" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>

                <!-- Información del curso -->
                <div class="p-4">
                    <div class="border border-gray-300 rounded">
                        <div class="p-2 font-bold text-lg border-b border-gray-300">
                            Introduction to the Course
                        </div>
                        <div class="p-2 text-sm border-b border-gray-300 text-gray-700">
                            Overview of what you will learn in this course and how to get the most out of it.
                        </div>

                        <!-- Recursos adicionales -->
                        <div class="p-2">
                            <div class="font-medium p-2 border border-gray-300 bg-gray-50">
                                Additional Resources
                            </div>

                            <!-- Checkbox 1 -->
                            <div class="p-2 border border-gray-300 border-t-0 hover:bg-gray-50">
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-500">
                                    <span class="text-sm">Course Syllabus</span>
                                </label>
                            </div>

                            <!-- Checkbox 2 -->
                            <div class="p-2 border border-gray-300 border-t-0 hover:bg-gray-50">
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-500">
                                    <span class="text-sm">Setup Instructions</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Navegación de temas -->
                    <div class="flex justify-between mt-4">
                        <button
                            class="px-4 py-2 border border-amber-500 text-amber-600 rounded hover:bg-amber-50 transition-colors flex items-center">
                            <span class="mr-1">←</span> Previous Topic
                        </button>

                        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                            Mark as Complete
                        </button>

                        <button
                            class="px-4 py-2 border border-amber-500 text-amber-600 rounded hover:bg-amber-50 transition-colors flex items-center">
                            Next Topic <span class="ml-1">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define('courses-content', CoursesContent);
