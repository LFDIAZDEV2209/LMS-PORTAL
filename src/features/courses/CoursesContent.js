class CoursesContent extends HTMLElement{
    constructor(){
        super();
        this.selectedTopic = 0; // índice del tema seleccionado
        this.topics = [
            { title: "Introduction to the Course", duration: "10 min" },
            { title: "Getting Started with Tools", duration: "20 min" },
            { title: "Core Concepts", duration: "30 min" },
            { title: "Advanced Techniques", duration: "45 min" }
        ];
    }

    connectedCallback() {
        this.render();
        this.setUpListeners();
    }

    setUpListeners() {
        this.querySelectorAll('.topic-btn').forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                this.selectedTopic = idx;
                this.render();
                this.setUpListeners();
            });
        });
    }

    render() {
        const topicList = this.topics.map((topic, idx) => `
            <div class="flex items-center p-2 rounded cursor-pointer topic-btn transition-colors
                ${this.selectedTopic === idx ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-800'}">
                <div class="mr-3 ${this.selectedTopic === idx ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                </div>
                <div>
                    <div class="font-medium">${topic.title}</div>
                    <div class="text-xs">${topic.duration}</div>
                </div>
            </div>
        `).join('');

        this.innerHTML = `
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
                            ${this.selectedTopic + 1}/${this.topics.length} completed
                        </div>
                    </div>
                    <div class="space-y-2 p-4">
                        ${topicList}
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
                                ${this.topics[this.selectedTopic].title}
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
        </div>
        `;
    }
}

customElements.define('courses-content', CoursesContent);
