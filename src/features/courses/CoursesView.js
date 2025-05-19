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
        <div>
          <h1 class='text-4xl'>Aviable Courses</h1>
        </div>
        <section>
        <div>
          <h2 class='text-2xl'>Video Games</h2>
        </div>
        <div class='' >

        </div>
        <section>
      </div>
    `;
  }
}

customElements.define('courses-view', CoursesView); 