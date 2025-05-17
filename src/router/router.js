export class Router {
    constructor(routes) {
      this.routes = routes;
      this.navigate = this.navigate.bind(this);
      window.addEventListener('popstate', () => this.handleRouting());
    }
  
    navigate(path, data = {}) {
      window.history.pushState(data, '', path);
      this.handleRouting();
    }
  
    async handleRouting() {
      const path = window.location.pathname;
      const matchingRoute = this.routes.find(route => {
        if (route.exact) {
          return route.path === path;
        }
        return path.startsWith(route.path);
      }) || this.routes.find(route => route.path === '/404');
      
      if (matchingRoute) {
        const app = document.querySelector('#app');
        if (app) {
          app.innerHTML = '';
          const element = document.createElement(matchingRoute.component);
          app.appendChild(element);
          
          // Forzar un reflow para asegurar que el componente se renderice
          element.offsetHeight;
        }
      }
    }
  }