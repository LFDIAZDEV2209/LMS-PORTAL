class AppLayout extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="min-h-screen flex flex-col">
                <nav-bar class="sticky top-0 z-50"></nav-bar>
                <main id="app" class="flex-1 container mx-auto px-0 sm:px-15 py-10 "> <!-- modificacion para centrar el conendor del seccion  -->

                </main>
            </div>
        `;
    }
}

customElements.define('app-layout', AppLayout); 