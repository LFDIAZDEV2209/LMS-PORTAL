class CoursesView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="courses-view">
        <h1 class="text-2xl font-bold text-center">Courses</h1>
        <p class="text-center text-gray-500 text-lg">Aqui crean la vista de courses :D</p>
      </div>
    `;
  }
}

customElements.define('courses-view', CoursesView); 