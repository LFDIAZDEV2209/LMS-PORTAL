class AdminView extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.render();
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    this.querySelector('admin-header').addEventListener('search', (e) => {
      this.querySelector('admin-list').setAttribute('search', e.detail);
    });
    this.querySelector('admin-header').addEventListener('filter', (e) => {
      this.querySelector('admin-list').setAttribute('filter', e.detail);
    });
  }

  render() {
    this.innerHTML = `
      <div class="admin-view">
        <admin-header></admin-header>
        <admin-list></admin-list>
        <admin-edit></admin-edit>
        <admin-delete></admin-delete>
      </div>
    `;
  }
}

customElements.define("admin-view", AdminView);
