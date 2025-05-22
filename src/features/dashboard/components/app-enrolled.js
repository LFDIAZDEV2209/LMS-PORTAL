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
                <div class="gap-8 px-5 content-center mt-6 justify-center md:flex md:justify-between">
                    <h3 class="text-2xl content-center text-center">My Enrolled Courses</h3>
                    <div class="flex justify-center py-1 pt-2">
                        <button class="bg-[#3498db] hover:bg-blue-400 text-white font-bold py-3 px-3 rounded shadow-lg transform transition-transform duration-900 hover:-translate-y-0.5 hover:shadow-xl w-full">Browse More Courses</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 ">
                    ${filteredCourse.map(course => {
                        return `
                        <div class="bg-white shadow-md rounded transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <img src="${course.imageUrl}" class="w-full h-24"/>
                            <div class="w-full h-0.5 bg-gray-200 rounded">
                                <div class="h-full w-[50%] bg-green-500 rounded"></div>
                            </div>
                            <div class="p-4">
                                <div class="py-1"> 
                                    <h4>${course.title}</h4>
                                    <p>${course.instructor}</p>
                                </div>
                                <div class="flex justify-between">
                                    <span>65% complete</span>
                                    <span>13/${course.structure.lessons} Lessons</span>
                                </div>
                                <div class="flex justify-center pt-2">
                                    <a href="/courses-details?id=${course.id}" data-link class="bg-[#3498db] hover:bg-blue-400 text-white font-bold py-3 px-3 rounded w-42">Continue Learning</a>
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