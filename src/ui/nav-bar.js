class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        this.innerHTML = `
            <nav class="bg-gray-800 text-white p-4 sticky top-0 z-1000 transition-all duration-300">
                <div class="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="/" data-link class="text-xl font-bold">LMS Portal</a>
                    <ul class="flex list-none gap-4 mx-8">
                        <li><a href="/" data-link class="hover:underline">Dashboard</a></li>
                        <li><a href="/courses" data-link class="hover:underline">Courses</a></li>
                        <li><a href="/assignments" data-link class="hover:underline">Assignments</a></li>
                        <li><a href="/profile" data-link class="hover:underline">Profile</a></li>
                        <li><a href="/admin" data-link class="hover:underline">Admin</a></li>
                    </ul>
                    <div class="flex items-center gap-6">
                        <div class="flex items-center">
                            <button class="bg-transparent border-0 text-white text-xl cursor-pointer p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-700">
                                <i class="bi bi-moon-fill text-yellow-500"></i>
                            </button>
                        </div>
                        <div>
                            <select class="bg-white/10 text-white border border-white/20 p-2 rounded cursor-pointer text-sm hover:bg-white/20 transition-all duration-300">
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                        <div class="relative">
                            <button class="flex items-center gap-3 bg-transparent border-0 text-white cursor-pointer p-2 rounded transition-all duration-300 ease-in-out hover:bg-gray-700">
                                <img src="/src/assets/user.jpg" alt="User" class="w-8 h-8 rounded-full object-cover">
                                <span class="text-sm">John Doe</span>
                                <i class="bi bi-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('nav-bar', NavBar);