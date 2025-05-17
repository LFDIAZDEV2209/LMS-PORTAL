class AssignmentsView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="assignments-view">
        <h1 class="text-2xl font-bold text-center">Assignments</h1>
        <p class="text-center text-gray-500 text-lg">Aqui crean la vista de assignments :D</p>
      </div>
    `;
  }
}

customElements.define('assignments-view', AssignmentsView); 