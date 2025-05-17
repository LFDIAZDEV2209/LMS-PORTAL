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
        <p class="text-center text-gray-500 text-lg">Aqui crean la vista de dashboard :D</p>
      </div>
    `;
  }
}

customElements.define('dashboard-view', DashboardView); 