class ProgressView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="progress-view">
        <h1 class="text-2xl font-bold text-center">Progress</h1>
        <p class="text-center text-gray-500 text-lg">Aqui crean la vista de progress :D</p>
      </div>
    `;
  }
}

customElements.define('progress-view', ProgressView); 