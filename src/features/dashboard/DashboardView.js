class DashboardView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="dashboard-view">
        <h1 class="text-2xl font-bold text-center">Dashboard</h1>
        <app-enrolled></app-enrolled>
      </div>
    `;
  }
}

customElements.define('dashboard-view', DashboardView); 