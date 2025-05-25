export class Router {
    constructor(routes) {
      this.routes = routes;
      this.navigate = this.navigate.bind(this);
      window.addEventListener('popstate', () => this.handleRouting());
    }
  
    navigate(path, data = {}) {
      console.log('Router navigate:', path);
      window.history.pushState(data, '', path);
      this.handleRouting();
    }
  
    async handleRouting() {
      const path = window.location.pathname;
      console.log('Router handleRouting - path:', path);
      console.log('Router handleRouting - routes:', this.routes);
      
      // Primero intentamos encontrar una coincidencia exacta
      let matchingRoute = this.routes.find(route => route.path === path);
      
      // Si no hay coincidencia exacta, buscamos una coincidencia parcial
      if (!matchingRoute) {
        matchingRoute = this.routes.find(route => {
          if (route.exact) {
            return false; // Si la ruta requiere coincidencia exacta, la ignoramos
          }
          return path.startsWith(route.path);
        });
      }
      
      // Si aún no hay coincidencia, usamos la ruta 404
      if (!matchingRoute) {
        matchingRoute = this.routes.find(route => route.path === '/404');
      }
      
      console.log('Router handleRouting - matchingRoute:', matchingRoute);
      
      if (matchingRoute) {
        const app = document.querySelector('#app');
        if (app) {
          console.log('Router handleRouting - creating component:', matchingRoute.component);
          app.innerHTML = '';
          const element = document.createElement(matchingRoute.component);
          app.appendChild(element);
          
          // Forzar un reflow para asegurar que el componente se renderice
          element.offsetHeight;
        }
      }
    }
  }