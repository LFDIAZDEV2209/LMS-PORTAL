import { Router } from './router/router.js';
import routes from './router/routes.js';

export function initializeApp() {
  // Inicializar el router
  const router = new Router(routes);
  
  // Manejar clics en enlaces
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      router.navigate(e.target.href);
    }
  });
  
  // Manejar ruta inicial
  router.handleRouting();
}
