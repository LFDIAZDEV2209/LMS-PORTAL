export class RecentActivity extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML = `
            <div class="gap-8 p-5 content-center mt-6 justify-center md:justify-between bg-white shadow-md rounded">
                <h2 class="text-lg">Recent Activity</h2>
                <div class="flex p-4 bg-white shadow-md rounded mb-1">
                    <div class="h-10 w-10 rounded-full bg-[#E1F0FA]">📚</div>
                    <div class="ml-3 overflow-hidden w-1/1">
                        <h5 class="truncate text-sm font-medium text-gray-900">Completed chapter 5 in Unity Game Development</h5>
                        <p class="truncate text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                </div>
                <div class="flex p-4  bg-white shadow-md rounded mb-1">
                    <div>
                        <img class="h-10 w-10 rounded-full bg-[#E1F0FA]" />
                    </div>
                    <div class="ml-3 overflow-hidden  w-1/1">
                        <h5 class="truncate text-sm font-medium text-gray-900">Completed chapter 5 in Unity Game Development</h5>
                        <p class="truncate text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                </div>
                <div class="flex p-4 bg-white shadow-md rounded">
                    <div>
                        <img class="h-10 w-10 rounded-full bg-[#E1F0FA]"/>
                    </div>
                    <div class="ml-3 overflow-hidden  w-1/1">
                        <h5 class="truncate text-sm font-medium text-gray-900">Completed chapter 5 in Unity Game Development</h5>
                        <p class="truncate text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define("app-recent", RecentActivity);