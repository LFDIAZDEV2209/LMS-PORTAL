class AssignmentSubmit extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setUpEventListeners();
    }

    setUpEventListeners() {
        this.querySelector('#submitAssignment').addEventListener('click', () => {
            this.submitAssignment();
        });

        document.addEventListener('click', (e) => {
            if (e.target.closest('.open-submit-modal')) {
                this.openModal();
            }
        });

        this.querySelector('.cancel-btn').addEventListener('click', () => {
            this.closeModal();
        });
    }

    openModal() {
        const modalContainer = this.querySelector(".modal-backdrop");
        if (modalContainer) {
            modalContainer.classList.remove("hidden");
        }
    }

    closeModal() {
        const modalContainer = this.querySelector(".modal-backdrop");
        if (modalContainer) {
            modalContainer.classList.add("hidden");
        }
    }

    submitAssignment() {
        console.log('submitAssignment');
    }

    render() {
        this.innerHTML = `
            <div class="modal-backdrop fixed inset-0 bg-slate-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 hidden">
                <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-2 my-8 overflow-y-auto max-h-[90vh]">
                    <div class="flex justify-between items-start p-6 border-b border-gray-200">
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold text-gray-900">Submit Assignment</h3>
                            <div class="flex items-center gap-4 mt-2">
                                <span class="text-sm font-medium text-blue-600 cursor-pointer hover:underline">Full Stack Development</span>
                                <span class="flex items-center text-sm font-medium text-red-500">
                                    <span class="mr-1">📅</span> Due: Mar 14, 2024
                                </span>
                            </div>
                        </div>
                        <button class="cancel-btn text-gray-400 hover:text-gray-700 text-2xl font-bold ml-4">&times;</button>
                    </div>
                    <!-- Modal Body -->
                    <div class="p-6">
                        <!-- Assignment Info -->
                        <div class="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 class="text-xl font-semibold text-gray-800 mb-2">Final Project: E-commerce Platform</h4>
                            <p class="text-gray-600 mb-4">
                                Build a complete e-commerce platform using React, Node.js, and MongoDB. Implement user authentication, product management, shopping cart, and payment processing.
                            </p>
                            <div class="flex gap-4 text-sm text-gray-500">
                                <span class="flex items-center">
                                    <span class="mr-1">🎯</span> Points: 100
                                </span>
                                <span class="flex items-center">
                                    <span class="mr-1">📝</span> Type: Project
                                </span>
                            </div>
                        </div>
                        <!-- Submission Section -->
                        <div class="space-y-6">
                            <!-- Submission Notes -->
                            <div class="space-y-2">
                                <label for="submission-text" class="block text-sm font-medium text-gray-700">
                                    Submission Notes <span class="text-red-500">*</span>
                                </label>
                                <textarea 
                                    id="submission-text" 
                                    rows="4" 
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#3b3b3b] text-gray-300" 
                                    placeholder="Describe your work and any important notes about your submission..."></textarea>
                            </div>
                            <!-- Attachments -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    Attachments <span class="text-gray-500">(optional)</span>
                                </label>
                                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white">
                                    <div class="text-3xl mb-2 text-gray-400">📎</div>
                                    <p class="text-gray-600 mb-3">Drag and drop files here or</p>
                                    <label class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition font-semibold">
                                        <input type="file" multiple class="file-input hidden" accept=".pdf,.doc,.docx,.txt,.zip,.rar,.7z,.jpg,.jpeg,.png">
                                        <span>Browse Files</span>
                                    </label>
                                    <p class="text-xs text-gray-500 mt-3">Supported files: PDF, DOC, DOCX, TXT, ZIP, RAR, 7Z, JPG, PNG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal Footer -->
                    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                        <div class="flex items-center text-sm text-yellow-700">
                            <span class="mr-2">⚠️</span>
                            <span>Please fill in all required fields before submitting</span>
                        </div>
                        <div class="flex gap-3 w-full sm:w-auto justify-end">
                            <button class="cancel-btn px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition font-medium">
                                Cancel
                            </button>
                            <button id="submitAssignment" class="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed font-medium" disabled>
                                Submit Assignment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('assignment-submit', AssignmentSubmit);