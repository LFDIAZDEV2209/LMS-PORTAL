class AdminView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="admin-view">
        <h1 class="text-2xl font-bold text-center">Admin</h1>
        <p class="text-center text-gray-500 text-lg">Aqui crean la vista de admin :D</p>
      </div>
    `;
  }
}

customElements.define('admin-view', AdminView); 