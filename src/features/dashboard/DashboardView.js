class DashboardView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class=" item-center justify-center h-screen">
        <div class="dashboard-view item-center justify-center mx-auto w-full max-w-4xl p-4">
          <h1 class="text-2xl font-bold text-center">Dashboard</h1>
          <dashboard-card></dashboard-card>
        </div>
      </div>
    `;
  }
}

customElements.define('dashboard-view', DashboardView); 