export class RecentActivity extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML = `
            <div class="gap-8 px-5 content-center mt-6 justify-center md:flex md:justify-between">
                <h2>Recent Activity</h2>
                <div class="flex justify-center py-1 pt-2">
                    <img class="h-10 w-10 rounded-full"/>
                    <div class="ml-3 overflow-hidden">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">Completed chapter 5 in Unity Game Development</p>
                        <p class="truncate text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                </div
            </div>
        `;
    }
}
customElements.define("app-recent", RecentActivity);