class DashboardView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="block p-4 md:w-2/3 justify-center-safe m-auto">
        <h1 class="text-2xl font-bold text-center">Dashboard</h1
        <dashboard-card></dashboard-card>
        <app-enrolled></app-enrolled>
      </div>
    `;
  }
}

customElements.define('dashboard-view', DashboardView); 