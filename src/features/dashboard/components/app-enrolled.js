export class AppEnrolled extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render() {
        this.innerHTML = `
            <div class="gap-4 p-4">
                <div class="gap-8 px-5 mt-6 justify-center md:flex md:justify-between">
                    <h3 class="text-2xl text-center">My Enrolled Courses</h3>
                    <div class="flex justify-center pt-2">
                        <button class="bg-[#3498db] text-white font-bold py-3 px-3 rounded">Browse More Courses</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 mt-6">
                    <div class="bg-white shadow-md rounded">
                        <img src="./assets/img_section-Dashboard/img-1.jpeg" class="w-full h-24"/>
                        <div class="w-full h-0.5 bg-gray-200 rounded">
                            <div class="h-full w-[50%] bg-green-500 rounded"> 
                            </div>
                        </div>
                        <div class="p-4">
                            <div class="py-1"> 
                                <h4>Unity Game Development</h4>
                                <p>Dr. John Smith</p>
                            </div>
                            <div class="flex justify-between">
                                <span>65% complete</span>
                                <span>13/20 Lessons</span>
                            </div>
                            <div class="flex justify-center pt-2">
                                <button class="bg-[#3498db] text-white font-bold py-3 px-3 rounded w-42">Continue Learning</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white shadow-md rounded">
                        <img src="./assets/img_section-Dashboard/img-1.jpeg" class="w-full h-24"/>
                        <div class="w-full h-0.5 bg-gray-200 rounded">
                            <div class="h-full w-[50%] bg-green-500 rounded"> 
                            </div>
                        </div>
                        <div class="p-4">
                            <div class="py-1"> 
                                <h4>Node.js Development</h4>
                                <p>Sarah Johnson</p>
                            </div>
                            <div class="flex justify-between">
                                <span>30% complete</span>
                                <span>6/20 Lessons</span>
                            </div>
                            <div class="flex justify-center pt-2">
                                <button class="bg-[#3498db] text-white font-bold py-3 px-3 rounded w-42">Continue Learning</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white shadow-md rounded">
                        <img src="./assets/img_section-Dashboard/img-1.jpeg" class="w-full h-24"/>
                        <div class="w-full h-0.5 bg-gray-200 rounded">
                            <div class="h-full w-[50%] bg-green-500 rounded"> 
                            </div>
                        </div>
                        <div class="p-4">
                            <div class="py-1"> 
                                <h4>Reack Mastery</h4>
                                <p>Mike Wilson</p>
                            </div>
                            <div class="flex justify-between">
                                <span>85% complete</span>
                                <span>17/20 Lessons</span>
                            </div>
                            <div class="flex justify-center pt-2">
                                <button class="bg-[#3498db] text-white font-bold py-3 px-3 rounded w-42">Continue Learning</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('app-enrolled', AppEnrolled);