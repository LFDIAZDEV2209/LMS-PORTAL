class AdminHeader extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        this.setUpEventListeners();
    }

    setUpEventListeners(){

        // Buscador
        this.querySelector('input').addEventListener('input', (e) => {
            this.dispatchEvent(new CustomEvent('search', {
                detail: e.target.value,
                bubbles: true,
            }));
        });

        // Botones de categoría
        this.querySelectorAll('.btn-category').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('filter', {
                    detail: btn.dataset.category,
                    bubbles: true,
                }));
                this.querySelectorAll('.btn-category').forEach((b) => {
                    b.classList.remove('bg-blue-500', 'text-white');
                    b.classList.add('bg-gray-200', 'text-gray-800');
                });
                btn.classList.add('bg-blue-500', 'text-white');
                btn.classList.remove('bg-gray-200', 'text-gray-800');
            })
        })
    }

    render(){
        this.innerHTML = `
        <div class="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border-gray-100">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Administración de Cursos</h1>
        
        <div class="relative mb-6 flex items-center">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <i class="bi bi-search text-gray-500"></i>
          </div>
          <input
            type="text"
            placeholder="Buscar curso"
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
          />
          <button id="addCourseBtn" class="ml-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg">
                <i class="bi bi-plus text-xl"></i>
            </button>
        </div>

        <div class="mb-6 text-center">
            <span class="text-gray-700 mr-2">Filtrar por categoría:</span>
            <button class="btn-category bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200" data-category="all">Todos</button>
            <button class="btn-category bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200" data-category="Video Games">Videojuegos</button>
            <button class="btn-category bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200" data-category="Backend">Backend</button>
            <button class="btn-category bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200" data-category="Frontend">Frontend</button>
            <button class="btn-category bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200" data-category="Schools">Escuelas</button>
        </div>
      </div> 
        `
    }
}

customElements.define('admin-header', AdminHeader);