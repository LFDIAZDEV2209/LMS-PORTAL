class ProfileView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="profile-view">
        <h1 class="text-2xl font-bold text-center">Profile</h1>
        <p class="text-center text-gray-500 text-lg">Aqui crean la vista de profile :D</p>
      </div>
    `;
  }
}

customElements.define('profile-view', ProfileView); 