class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        this.innerHTML = `
            <nav class="bg-[#344350] text-white py-6 px-9">
                <div class="max-w-7xl mx-auto flex justify-between items-center">
                    <div class="flex flex-col font-bold text-2xl leading-5 mr-6 select-none">
                        <span>LMS</span>
                        <span>Portal</span>
                    </div>
                    <ul class="flex list-none gap-4 mx-4 items-center">
                        <li><a href="/" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Dashboard</a></li>
                        <li><a href="/courses" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Courses</a></li>
                        <li><a href="/assignments" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Assignments</a></li>
                        <li><a href="/progress" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Progress</a></li>
                        <li><a href="/profile" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Profile</a></li>
                        <li><a href="/admin" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Admin</a></li>
                    </ul>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center">
                            <button class="bg-transparent border-0 text-white text-xl cursor-pointer p-2 rounded-full transition hover:bg-[#3e5263]">
                                <i class="bi bi-moon-fill text-yellow-400"></i>
                            </button>
                        </div>
                        <div>
                            <select class="bg-transparent border border-white/30 text-white px-4 py-2 rounded-md text-sm focus:outline-none">
                                <option value="en" class="text-black">English</option>
                                <option value="es" class="text-black">Español</option>
                                <option value="fr" class="text-black">Français</option>
                                <option value="de" class="text-black">Deutsch</option>
                            </select>
                        </div>
                        <!-- User dropdown -->
                        <div class="relative">
                            <button id="user-menu-btn" class="flex items-center gap-2 px-4 py-3 rounded-md transition bg-transparent hover:bg-[#3e5263] focus:outline-none w-full">
                                <img src="/src/assets/user.jpg" alt="User" class="w-8 h-8 rounded-full object-cover border-2 border-white">
                                <div class="flex flex-col leading-4 text-sm font-medium ml-1 text-left">
                                    <span>John</span>
                                    <span>Doe</span>
                                </div>
                                <i id="user-menu-arrow" class="bi bi-chevron-down ml-1 transition-transform"></i>
                            </button>
                            <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                <a href="/profile" class="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                                    <i class="bi bi-person-fill text-purple-700 mr-2"></i> My Profile
                                </a>
                                <a href="/settings" class="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                                    <i class="bi bi-gear-fill text-gray-400 mr-2"></i> Settings
                                </a>
                                <hr class="my-1">
                                <button class="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition">
                                    <i class="bi bi-box-arrow-right text-orange-400 mr-2"></i> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        // Botones de navegación (activo)
        const navBtns = this.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                navBtns.forEach(b => b.classList.remove('bg-[#3e5263]', 'text-[#5fa8e6]'));
                this.classList.add('bg-[#3e5263]', 'text-[#5fa8e6]');
            });
        });

        // Dropdown de usuario
        const userMenuBtn = this.querySelector('#user-menu-btn');
        const userDropdown = this.querySelector('#user-dropdown');
        const userArrow = this.querySelector('#user-menu-arrow');

        if (userMenuBtn && userDropdown && userArrow) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = userDropdown.classList.toggle('hidden') === false;
                userMenuBtn.classList.toggle('bg-[#3e5263]', isOpen);
                userArrow.classList.toggle('bi-chevron-down', !isOpen);
                userArrow.classList.toggle('bi-chevron-up', isOpen);
            });

            // Cierra el menú si se hace click fuera
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target)) {
                    userDropdown.classList.add('hidden');
                    userMenuBtn.classList.remove('bg-[#3e5263]');
                    userArrow.classList.add('bi-chevron-down');
                    userArrow.classList.remove('bi-chevron-up');
                }
            });
        }
    }
}

customElements.define('nav-bar', NavBar);