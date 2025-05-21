class AssignmentsView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="assignments-view max-w-4xl mx-auto py-8">
        <h2 class=" absolute text-4xl font-bold text-gray-900 top-30">Your Assignments</h2>
        <div class="flex items-start mt-6 mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <span class="text-yellow-500 mr-2">⚠️</span>
          <p class="text-sm text-yellow-800">Some assignments require course completion before submission.</p>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-2 mb-8">
          <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            <span class="mr-2">📋</span> All
          </button>
          <button class="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <span class="mr-2">⏳</span> Pending
          </button>
          <button class="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <span class="mr-2">✅</span> Completed
          </button>
          <button class="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <span class="mr-2">⚠️</span> Overdue
          </button>
          <button class="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <span class="mr-2">🔒</span> Locked
          </button>
        </div>

        <!-- Web Development Category -->
        <div class="mb-8">
          <div class="flex items-center mb-3">
            <span class="text-2xl mr-2">💻</span>
            <div class="flex flex-col">
              <h3 class="text-xl font-semibold">Web Development</h3>
              <hr class="w-full border-t-2 border-blue-600 my-1">
            </div>   
          </div>
          <div class="bg-white border-l-4 border-red-600 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <div class="flex items-center px-4 py-2">
              <span class="mr-2">⏳</span>
              <span class="text-sm font-medium text-gray-800">Pending</span>
            </div>
            <div class="p-4">
              <div class="flex flex-col gap-1">
                <h3 class="text-2xl font-bold text-gray-900">Final Project: E-commerce Platform</h3>
                <span class="text-base text-blue-600 font-medium">Full Stack Development</span>
                <span class="flex items-center text-sm text-red-500 font-medium mt-1 mb-2">
                  <span class="mr-1">📅</span> Due: Mar 14, 2024
                </span>
              </div>
              <p class="mt-2 text-gray-600">
                Build a complete e-commerce platform using React, Node.js, and MongoDB. Implement user authentication, product management, shopping cart, and payment processing.
              </p>
              <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <span class="mr-1">🎯</span> Points: 100
                </span>
                <span class="flex items-center">
                  <span class="mr-1">📝</span> Type: Project
                </span>
                <span class="flex items-center">
                  <span class="mr-1">📚</span> Required Modules: Frontend Development, Backend Integration, Database Design
                </span>
              </div>
            </div>
            <div class="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div class="flex items-center text-sm text-gray-500">
                <span class="mr-1">📎</span>
                <span>2 attachment(s)</span>
              </div>
              <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                <span class="mr-2">📤</span> Submit Assignment
              </button>
            </div>
          </div>
        </div>

        <!-- Data Science Category -->
        <div class="mb-8">
          <div class="flex items-center mb-3">
            <span class="text-2xl mr-2">📊</span>
            <div class="flex flex-col">
              <h3 class="text-xl font-semibold">Data Science</h3>
              <hr class="w-full border-t-2 border-blue-600 my-1">
            </div>
          </div>
          <div class="bg-white border-l-4 border-red-500 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition opacity-75">
            <div class="flex items-center px-4 py-2">
              <span class="mr-2">🔒</span>
              <span class="text-sm font-medium text-gray-800">Locked</span>
            </div>
            <div class="p-4">
              <div class="flex flex-col gap-1">
                <h3 class="text-2xl font-bold text-gray-900">Data Analysis Report</h3>
                <span class="text-base text-blue-600 font-medium">Data Science Fundamentals</span>
                <span class="flex items-center text-sm text-orange-500 font-medium mt-1">
                  <span class="mr-1">🔒</span> Complete the course to unlock (60% completed)
                </span>
                <span class="flex items-center text-sm text-red-500 font-medium mt-1 mb-2">
                  <span class="mr-1">📅</span> Due: Mar 19, 2024
                </span>
              </div>
              <p class="mt-2 text-gray-600">
                Analyze the provided dataset using Python and Pandas. Create visualizations and write a comprehensive report on your findings.
              </p>
              <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <span class="mr-1">🎯</span> Points: 50
                </span>
                <span class="flex items-center">
                  <span class="mr-1">📝</span> Type: Report
                </span>
                <span class="flex items-center">
                  <span class="mr-1">📚</span> Required Modules: Data Analysis, Statistical Methods
                </span>
              </div>
            </div>
            <div class="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div class="flex items-center text-sm text-gray-500">
                <span class="mr-1">📎</span>
                <span>1 attachment(s)</span>
              </div>
              <button class="flex items-center px-4 py-2 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed" disabled>
                <span class="mr-2">🔒</span> Complete Course to Submit
              </button>
            </div>
          </div>
        </div>

        <!-- Design Category -->
        <div class="mb-8">
          <div class="flex items-center mb-3">
            <span class="text-2xl mr-2">🎨</span>
            <div class="flex flex-col">
              <h3 class="text-xl font-semibold">Design</h3>
              <hr class="w-full border-t-2 border-blue-600 my-1">
            </div>
          </div>
          <div class="bg-white border-l-4 border-green-500 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <div class="flex items-center px-4 py-2">
              <span class="mr-2">✅</span>
              <span class="text-sm font-medium text-green-700">Completed</span>
            </div>
            <div class="p-4">
              <div class="flex flex-col gap-1">
                <h3 class="text-2xl font-bold text-gray-900">UI/UX Case Study</h3>
                <span class="text-base text-blue-600 font-medium">User Interface Design</span>
                <span class="flex items-center text-sm text-red-500 font-medium mt-1 mb-2">
                  <span class="mr-1">📅</span> Due: Feb 27, 2024
                </span>
              </div>
              <p class="mt-2 text-gray-600">
                Complete a case study on the redesign of a popular mobile application. Include user research, wireframes, and final design mockups.
              </p>
              <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <span class="mr-1">🎯</span> Points: 75
                </span>
                <span class="flex items-center">
                  <span class="mr-1">📝</span> Type: Case Study
                </span>
                <span class="flex items-center">
                  <span class="mr-1">📚</span> Required Modules: User Research, Interface Design
                </span>
              </div>
            </div>
            <div class="flex justify-start px-4 py-3 bg-gray-50 border-t border-gray-100">
              <button class="flex items-center px-6 py-2 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed" disabled>
                <span class="mr-2">✅</span> Submitted
              </button>
            </div>
          </div>
        </div>

        <!-- Computer Science Category -->
        <div class="mb-8">
          <div class="flex items-center mb-3">
            <span class="text-2xl mr-2">⚡</span>
            <div class="flex flex-col">
              <h3 class="text-xl font-semibold">Computer Science</h3>
              <hr class="w-full border-t-2 border-blue-600 my-1">
            </div>
          </div>
          <div class="bg-white border-l-4 border-red-600 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition opacity-75">
            <div class="flex items-center px-4 py-2">
              <span class="mr-2">🔒</span>
              <span class="text-sm font-medium text-gray-800">Locked</span>
            </div>
            <div class="p-4">
              <div class="flex flex-col gap-1">
                <h3 class="text-2xl font-bold text-gray-900">Algorithm Implementation</h3>
                <span class="text-base text-blue-600 font-medium">Advanced Algorithms</span>
                <span class="flex items-center text-sm text-orange-500 font-medium mt-1">
                  <span class="mr-1">🔒</span> Complete the course to unlock (40% completed)
                </span>
                <span class="flex items-center text-sm text-red-500 font-medium mt-1 mb-2">
                  <span class="mr-1">��</span> Due: Feb 24, 2024
                </span>
              </div>
              <p class="mt-2 text-gray-600">
                Implement and optimize three different sorting algorithms. Compare their performance and write a detailed analysis.
              </p>
              <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <span class="mr-1">🎯</span> Points: 60
                </span>
                <span class="flex items-center">
                  <span class="mr-1">📝</span> Type: Implementation
                </span>
                <span class="flex items-center">
                  <span class="mr-1">📚</span> Required Modules: Algorithm Analysis, Data Structures
                </span>
              </div>
            </div>
            <div class="flex justify-end px-4 py-3 bg-gray-50 border-t border-gray-100">
              <button class="flex items-center px-4 py-2 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed" disabled>
                <span class="mr-2">🔒</span> Complete Course to Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('assignments-view', AssignmentsView); 