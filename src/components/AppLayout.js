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
                <main id="app" class="flex-1 container mx-auto px-4 py-8">

                </main>
            </div>
        `;
    }
}

customElements.define('app-layout', AppLayout); 