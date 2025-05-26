import { getUser } from "../services/userServices";

class NavBar extends HTMLElement {
    constructor() {
        super();
        this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
    }

    connectedCallback() {
        this.render();
        this.setUserName();
        window.addEventListener("userNameChanged", this.handleUserNameChanged);
    }

    disconnectedCallback() {
        window.removeEventListener("userNameChanged", this.handleUserNameChanged);
    }

    async setUserName() {
        try {
            const user = await getUser("1");
            const nameSpan = this.querySelector("span.text-sm");
            if (nameSpan) nameSpan.textContent = user.name || "John Doe";
        } catch {
            // Si falla, deja el nombre por defecto
        }
    }

    handleUserNameChanged(e) {
        const nameSpan = this.querySelector("span.text-sm");
        if (nameSpan) nameSpan.textContent = e.detail.name;
    }

    render() {
        this.innerHTML = `
            <nav id="navbar" class="bg-[#344350] text-white py-6 px-9 transition-colors duration-500 w-full">
                <div class="mx-auto flex justify-between items-center relative">
                    <div class="flex flex-col font-bold text-2xl leading-5 mr-6 select-none">
                        <span>LMS</span>
                        <span>Portal</span>
                    </div>
                    <button id="hamburger-btn" class="md:hidden p-2 rounded focus:outline-none">
                        <i class="bi bi-list text-2xl"></i>
                    </button>
                    <ul id="nav-links"
                        class="hidden flex-col space-y-2 absolute top-full left-2 w-[200px] bg-[#344350] rounded-lg shadow-lg py-4 px-6 z-50
                               md:flex md:static md:flex-row md:space-y-0 md:space-x-4 md:bg-transparent md:shadow-none md:rounded-none md:p-0 md:w-auto
                               transition-all duration-300 opacity-0 scale-95 md:opacity-100 md:scale-100">
                        <li><a href="/" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Dashboard</a></li>
                        <li><a href="/courses" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Courses</a></li>
                        <li><a href="/assignments" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Assignments</a></li>
                        <li><a href="/progress" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Progress</a></li>
                        <li><a href="/profile" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Profile</a></li>
                        <li><a href="/admin" data-link class="nav-btn font-medium rounded-md px-5 py-2 transition hover:bg-[#3e5263] hover:text-[#5fa8e6]">Admin</a></li>
                    </ul>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center">
                            <button id="dark-toggle" class="bg-transparent border-0 text-white text-xl cursor-pointer p-2 rounded-full transition hover:bg-[#3e5263]">
                                <i class="bi bi-moon-fill text-yellow-400" id="icon-moon"></i>
                                <i class="bi bi-sun-fill text-yellow-300 hidden" id="icon-sun"></i>
                            </button>
                        </div>
                        <div>
                            <select class="bg-[#3e5263] text-white border border-white/20 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300">
                                <option value="en" class="text-white">English</option>
                                <option value="es" class="text-white">Español</option>
                                <option value="fr" class="text-white">Français</option>
                                <option value="de" class="text-white">Deutsch</option>
                            </select>
                        </div>
                        <!-- User dropdown -->
                        <div class="relative">
                            <button id="user-menu-btn" class="flex items-center gap-2 px-4 py-3 rounded-md transition bg-transparent hover:bg-[#3e5263] focus:outline-none w-full">
                                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                                    <i class="bi bi-person-fill text-gray-400 text-lg"></i>
                                </div>
                                <div class="flex flex-col leading-4 text-sm font-medium ml-3 text-center">
                                    <span>John</span>
                                    <span>Doe</span>
                                </div>
                                <i id="user-menu-arrow" class="bi bi-chevron-down ml-1 transition-transform"></i>
                            </button>
                            <div id="user-dropdown" class="opacity-0 scale-95 pointer-events-none absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 transition-all duration-300">
                                <a href="/profile" class="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                                    <i class="bi bi-person-fill text-purple-700 mr-2"></i> My Profile
                                </a>
                                <a href="/settings" class="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                                    <i class="bi bi-gear-fill text-gray-400 mr-2"></i> Settings
                                </a>
                                <hr class="my-1 border-gray-200">
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
                const isOpen = userDropdown.classList.contains('opacity-100');
                if (isOpen) {
                    userDropdown.classList.remove('opacity-100', 'scale-100');
                    userDropdown.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                    userArrow.classList.add('bi-chevron-down');
                    userArrow.classList.remove('bi-chevron-up');
                } else {
                    userDropdown.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
                    userDropdown.classList.add('opacity-100', 'scale-100');
                    userArrow.classList.remove('bi-chevron-down');
                    userArrow.classList.add('bi-chevron-up');
                }
            });

            // Cierra el menú si se hace click fuera
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target)) {
                    userDropdown.classList.remove('opacity-100', 'scale-100');
                    userDropdown.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                    userArrow.classList.add('bi-chevron-down');
                    userArrow.classList.remove('bi-chevron-up');
                }
            });
        }

        const navbar = this.querySelector('#navbar');
        const darkToggle = this.querySelector('#dark-toggle');
        const iconMoon = this.querySelector('#icon-moon');
        const iconSun = this.querySelector('#icon-sun');

        let isDark = false;

        if (darkToggle) {
            darkToggle.addEventListener('click', () => {
                isDark = !isDark;
                if (isDark) {
                    navbar.classList.remove('bg-[#344350]');
                    navbar.classList.add('bg-black');
                    iconMoon.classList.add('hidden');
                    iconSun.classList.remove('hidden');
                } else {
                    navbar.classList.remove('bg-black');
                    navbar.classList.add('bg-[#344350]');
                    iconMoon.classList.remove('hidden');
                    iconSun.classList.add('hidden');
                }

                const langSelect = this.querySelector('select');
                if (isDark) {
                    langSelect.classList.remove('bg-[#3e5263]');
                    langSelect.classList.add('bg-black');
                } else {
                    langSelect.classList.remove('bg-black');
                    langSelect.classList.add('bg-[#3e5263]');
                }
            });
        }

        const hamburgerBtn = this.querySelector('#hamburger-btn');
        const navLinks = this.querySelector('#nav-links');

        if (hamburgerBtn && navLinks) {
            hamburgerBtn.addEventListener('click', () => {
                const isOpen = !navLinks.classList.contains('hidden');
                if (isOpen) {
                    navLinks.classList.remove('opacity-100', 'scale-100');
                    navLinks.classList.add('opacity-0', 'scale-95');
                    setTimeout(() => navLinks.classList.add('hidden'), 300);
                } else {
                    navLinks.classList.remove('hidden');
                    setTimeout(() => {
                        navLinks.classList.remove('opacity-0', 'scale-95');
                        navLinks.classList.add('opacity-100', 'scale-100');
                    }, 10);
                }
            });

            // Cierra el menú al hacer click en un link (opcional)
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 768) {
                        navLinks.classList.remove('opacity-100', 'scale-100');
                        navLinks.classList.add('opacity-0', 'scale-95');
                        setTimeout(() => navLinks.classList.add('hidden'), 300);
                    }
                });
            });
        }
    }
}

customElements.define('nav-bar', NavBar);