import { getCourseById } from "../../../services/coursesService";

export class AppEnrolled extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    async render() {
        //Seleccionamos los cursos a mostrar
        const selectedCourse = ["1", "4", "7"];
        //Obtienen los cursos uno a uno
        const courses = selectedCourse.map(id => getCourseById(id)); 
        //Filtramos los cursos para mostrarlos
        const filteredCourse = await Promise.all(courses);
        //Renderizamos
        this.innerHTML = `
            <div class=" gap-4 content-center mt-6 justify-center md:justify-between">
                <div class="gap-8 mt-6 md:flex md:justify-between">
                    <h3 class="text-2xl content-center">My Enrolled Courses</h3>
                    <div class="flex justify-center py-1 pt-2">
                        <a href="/courses-view" data link class="bg-[#3498db] text-center hover:bg-blue-400 text-white font-bold py-3 px-3 rounded shadow-lg transform transition-transform duration-900 hover:-translate-y-0.5 hover:shadow-xl w-full">Browse More Courses</a>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 rounded">
                    ${filteredCourse.map(course => {
                        return `
                        <div class="bg-white shadow-md rounded-2 transform h-[380px] rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <img src="${course.imageUrl}" class="w-full h-[180px] object-cover rounded-t-lg"/>
                            <div class="w-full h-1 bg-gray-200 rounded">
                                <div class="h-full w-[50%] bg-green-500 rounded-r-lg"></div>
                            </div>
                            <div class="px-6 pt-3">
                                <div class="py-1 gap-4"> 
                                    <h4 class="font-semibold text-base font-sans">${course.title}</h4>
                                    <p  class="opacity-50 pb-2 text-sm">${course.instructor}</p>
                                </div>
                                <hr>
                                <div class="flex justify-between py-4">
                                    <span class="text-green-400">65% complete</span>
                                    <span>13/24 Lessons</span>
                                </div>
                                <div class="flex justify-center w-full">
                                    <a href="/courses-details?id=${course.id}" data-link class="bg-[#3498db] hover:bg-blue-400 text-white font-bold py-3 px-3 rounded w-full text-center">Continue Learning</a>
                                </div>
                            </div>
                        </div>
                    `}).join("")}
                </div>
            </div>
        `;
    }
    
}
customElements.define('app-enrolled', AppEnrolled);