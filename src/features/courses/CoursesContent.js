class CourseContent extends HTMLElement {
  constructor() {
    super();
    this.selectedTopicId = 0;
    this.topics = [
      {
        id: 1,
        title: "Introduction to the Course",
        duration: "10 min",
        description: "Overview of what you will learn in this course and how to get the most out of it.",
        completed: false,
        resources: [
          { title: "Course Syllabus", icon: "syllabus" },
          { title: "Setup Instructions", icon: "setup" },
        ],
      },
      {
        id: 2,
        title: "Getting Started with Tools",
        duration: "15 min",
        description: "Learn about the essential tools and software you'll need for this course.",
        completed: false,
        resources: [
          { title: "Tools Checklist", icon: "checklist" },
          { title: "Installation Guide", icon: "guide" },
        ],
      },
      {
        id: 3,
        title: "Core Concepts",
        duration: "20 min",
        description: "Understand the fundamental concepts that form the foundation of this subject.",
        completed: false,
        resources: [
          { title: "Concept Map", icon: "syllabus" },
          { title: "Practice Exercises", icon: "guide" },
        ],
      },
      {
        id: 4,
        title: "Advanced Techniques",
        duration: "25 min",
        description: "Explore advanced methods and techniques to take your skills to the next level.",
        completed: false,
        resources: [
          { title: "Advanced Examples", icon: "syllabus" },
          { title: "Reference Guide", icon: "guide" },
        ],
      },
    ];
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  setupListeners() {

    this.querySelectorAll('.topic-item').forEach(item => {
      item.addEventListener('click', () => {
        this.selectedTopicId = parseInt(item.dataset.id);
        this.render();
        this.setupListeners();
      });
    });

    const completeButton = this.querySelector('.complete-button');
    if (completeButton) {
      completeButton.addEventListener('click', () => {
        const topic = this.topics.find(t => t.id === this.selectedTopicId);
        if (topic) {
          topic.completed = !topic.completed; 
          this.render();
          this.setupListeners();
        }
      });
    }

    const prevButton = this.querySelector('.prev-button');
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (this.selectedTopicId > 1) {
          this.selectedTopicId--;
          this.render();
          this.setupListeners();
        }
      });
    }

    const nextButton = this.querySelector('.next-button');
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (this.selectedTopicId < this.topics.length) {
          this.selectedTopicId++;
          this.render();
          this.setupListeners();
        }
      });
    }

    this.querySelectorAll('.resource-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        console.log(`Resource ${checkbox.dataset.resource} ${e.target.checked ? 'checked' : 'unchecked'}`);
      });
    });


    const backButton = this.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        window.history.back();
      });
    }
  }

  getResourceIcon(icon) {
    switch (icon) {
      case 'syllabus':
        return `<i class="bi bi-journal-text text-blue-500"></i>`;
      case 'setup':
      case 'guide':
        return `<i class="bi bi-tools text-orange-500"></i>`;
      case 'checklist':
        return `<i class="bi bi-check2-circle text-green-500"></i>`;
      default:
        return `<i class="bi bi-journal"></i>`;
    }
  }

  render() {
    const selectedTopic = this.topics.find(topic => topic.id === this.selectedTopicId) || this.topics[0];
    const completedCount = this.topics.filter(topic => topic.completed).length;


    const topicListHTML = this.topics.map((topic, idx) => `
      <div 
        class="flex items-center p-2 rounded cursor-pointer topic-item transition-colors ${
          this.selectedTopicId === topic.id ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-gray-800'
        }"
        data-id="${topic.id}"
      >
        <div class="${
          topic.completed
            ? 'text-green-500 border border-green-500 bg-white'
            : 'text-black border border-gray-300 bg-gray-300'
        } mr-3 rounded-full p-1 h-7 w-7 flex items-center justify-center font-light">
          ${
            topic.completed
              ? `<i class='bi bi-check-circle-fill'></i>`
              : idx + 1
          }
        </div>
        <div>
          <div class="font-medium">${topic.title}</div>
          <div class="text-xs">${topic.duration}</div>
        </div>
      </div>
    `).join('');
    


    let resourcesHTML = '';
    if (selectedTopic) {
      resourcesHTML = selectedTopic.resources.map(resource => `
        <a 
          href="#" 
          class="flex items-center p-2 border border-gray-200 border-t-0 hover:bg-gray-50 transition-colors"
          data-resource="${resource.title}"
        >
          ${this.getResourceIcon(resource.icon)}
          <span class="text-sm ml-2 text-blue-600 underline ">${resource.title}</span>
        </a>
      `).join('');
    }


    let mainContentHTML = '';
    if (this.selectedTopicId === 0) {
      mainContentHTML = `
        <div class="flex flex-col items-center justify-center h-full p-8">
          <div class="text-6xl mb-4">📺</div>
          <h2 class="text-2xl font-bold mb-2">Select a Topic to Start Learning</h2>
          <p class="text-gray-600 text-center">
            Choose a topic from the sidebar to begin watching the course content.
          </p>
        </div>
      `;
    } else {
      mainContentHTML = `
        <!-- Video section -->
        <div class="p-4">
          <div class="relative pb-[56.25%] h-0 overflow-hidden rounded-md bg-black">
            <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Course video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Topic information -->
        <div class="p-4">
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="p-3 font-bold text-lg border-b border-gray-200">
              ${selectedTopic.title}
            </div>
            <div class="p-3 text-sm text-gray-700 border-b border-gray-200">
              ${selectedTopic.description}
            </div>

            <!-- Additional resources -->
            <div class="p-3">
              <div class="font-medium p-2 border border-gray-200 bg-gray-50 rounded-sm">
                Additional Resources
              </div>
              ${resourcesHTML}
            </div>
          </div>

          <!-- Navigation buttons -->
          <div class="flex justify-between mt-4">
            <button
              class="md:px-4 md:py-2 m-2 border border-amber-500 text-amber-600 rounded hover:bg-amber-50 transition-colors flex items-center prev-button ${this.selectedTopicId === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
              ${this.selectedTopicId === 1 ? 'disabled' : ''}
            >
              <i class="bi bi-arrow-left"></i>
              <span class="ml-1">Previous Topic</span>
            </button>

            ${selectedTopic.completed 
              ? `<button class=" md:w-50 md:h-15 w-25 h-15 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors complete-button">
                    <i class="bi bi-check-circle-fill mr-2"></i>Completed
                 </button>` 
              : `<button class="md:w-50 md:h-15 w-25 h-15 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors complete-button">
                    <i class="bi bi-check2-circle mr-2"></i>Mark as Complete
                 </button>`
            }

            <button
              class="md:px-4 md:py-2 m-2 border border-amber-500 text-amber-600 rounded hover:bg-amber-50 transition-colors flex items-center next-button ${this.selectedTopicId === this.topics.length ? 'opacity-50 cursor-not-allowed' : ''}"
              ${this.selectedTopicId === this.topics.length ? 'disabled' : ''}
            >
              <span class="mr-1">Next Topic</span>
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    }

    this.innerHTML = `
      <div class="max-w-6xl mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <!-- Header with back button -->
        <div class=" p-4 border-b border-gray-200">
          <a  a href="/courses" data-link class="px-3 py-1 md:m-2 text-sm text-blue-500  hover:bg-amber-50 transition-colors back-button">
            <i class="bi bi-arrow-left"></i> Back to Courses
          </a>
        </div>

        <!-- Main content -->
        <div class="flex flex-col md:flex-row">
          <!-- Topics sidebar -->
          <div class="w-full md:w-1/3 border-r border-gray-200">
            <div class="border border-gray-200 m-4 rounded">
              <div class="p-2 font-bold text-lg border-b border-gray-200">
                Course Topics
              </div>
              <div class="p-2 text-xs text-gray-500">
                ${completedCount}/${this.topics.length} completed
              </div>
            </div>

            <div class="space-y-2 p-4">
              ${topicListHTML}
            </div>
          </div>

          <!-- Main content area -->
          <div class="w-full md:w-2/3">
            ${mainContentHTML}
          </div>
        </div>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('courses-content', CourseContent);