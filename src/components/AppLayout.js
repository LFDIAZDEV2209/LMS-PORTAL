class AppLayout extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="min-h-screen flex flex-col box-border w-auto">
                <nav-bar class="sticky top-0 z-50 w-full"></nav-bar>
                <main id="app" class="flex-1 container mx-auto w-auto " > <!-- modificacion para centrar el conendor del seccion  -->

                </main>
            </div>
        `;
    }
}

customElements.define('app-layout', AppLayout); 