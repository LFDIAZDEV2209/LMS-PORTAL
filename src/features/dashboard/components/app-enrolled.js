export class AppEnrolled extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render() {
        this.innerHTML = `
            <div class="">
                <div class="flex justify-between">
                    <h3 class="text-2xl">My Enrolled Courses</h3>
                    <button class="bg-[#3498db] text-white font-bold py-3 px-3 rounded">Browse More Courses</button>
                </div>
                <div class="grid grid-cols-3">
                    <div>
                        <img src="./assets/img_section-Dashboard/img-1.jpeg"/>
                        <h4>Unity Game Development</h4>
                        <p>Dr. John Smith</p>
                        <div class="flex justify-between">
                            <span>65% complete</span>
                            <span>13/20 Lessons</span>
                        </div>
                        <button class="bg-[#3498db] text-white font-bold py-3 px-3 rounded">Continue Learning</button>
                    </div>
                    <div>
                        <img src="./assets/img_section-Dashboard/img-2.jpeg"/>
                        <h4>Node.js Development</h4>
                        <p>Sarah Johnson</p>
                        <div class="flex justify-between">
                            <span>30% complete</span>
                            <span>6/20 Lessons</span>
                        </div>
                        <button class="bg-[#3498db] text-white font-bold py-3 px-3 rounded">Continue Learning</button>
                    </div>
                    <div>
                        <img src="./assets/img_section-Dashboard/img-3.jpeg" class="w-438 h=160"/>
                        <h4>React Mastery</h4>
                        <p>Mike Wilson</p>
                        <div class="flex justify-between">
                            <span>85% complete</span>
                            <span>17/20 Lessons</span>
                        </div>
                        <button class="bg-[#3498db] text-white font-bold py-3 px-3 rounded">Continue Learning</button>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('app-enrolled', AppEnrolled);