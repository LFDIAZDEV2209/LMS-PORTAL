class DashboardView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="bg-gray-100 min-h-screen p-8 py-">
        <h1 class="text-5xl font-semibold text-[#2C3E50] pt-2">Dashboard</h1>
        <dashboard-card></dashboard-card>
        <app-enrolled></app-enrolled>
        <app-recent></app-recent>
      </div>
    `;
  }
}

customElements.define('dashboard-view', DashboardView); 