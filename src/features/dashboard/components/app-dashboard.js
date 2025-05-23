class DashboardCard extends HTMLElement {
  constructor() {
        super();
        this.render();
  }

  render() {
    this.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-7">
          <div class="bg-[#FFFFFF] rounded-lg shadow p-6">
            <h2 class="text-[35px] font-sans text-[#2C3E50]">Active Course</h2>
            <p class="text-blue-500 text-[38px] font-bold">3</p>
          </div>
          <div class="bg-[#FFFFFF] rounded-lg shadow p-6">
            <h2 class="text-[35px] font-sans text-[#2C3E50]">Pending Assigments</h2>
            <p class="text-blue-500 text-[38px] font-bold">2</p>
          </div>
          <div class="bg-[#FFFFFF] rounded-lg shadow p-6">
            <h2 class="text-[35px] font-sans text-[#2C3E50]">Overrall progress</h2>
            <p class="text-blue-500 text-[38px] font-bold">75%</p>
          </div>
      </div>
    `;
  }
}
customElements.define('dashboard-card', DashboardCard);