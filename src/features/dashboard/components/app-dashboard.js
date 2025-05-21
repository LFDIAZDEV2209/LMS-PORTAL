class DashboardCard extends HTMLElement {
  constructor() {
        super();
        this.render();
  }

  render() {
    this.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div class="bg-white shadow-md rounded p-4 h-24 gap-6 ">
            <h2 class="text-xl font-semibold">Active Course</h2>
            <p class="count text-[#3498d8]">3</p>
          </div>
          <div class="bg-white shadow-md rounded p-4 h-24 gap-6 ">
            <h2 class="text-xl font-semibold">Pending Assigments</h2>
            <p class="count text-[#3498d8]">3</p>
          </div>
          <div class="bg-white shadow-md rounded p-4 h-24 gap-6">
            <h2 class="text-xl font-semibold">Overrall progress</h2>
            <p class="count text-[#3498d8]">75%</p>
          </div>
      </div>
    `;
  }
}
customElements.define('dashboard-card', DashboardCard);