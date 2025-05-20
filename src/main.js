import { initializeApp } from './app.js';
import './components/AppLayout.js';
import './ui/nav-bar.js';
import './features/dashboard/DashboardView.js';
import './features/courses/CoursesView.js';
import './features/courses/CoursesDetails.js';
import './features/assignments/AssignmentsView.js';
import './features/progress/ProgressView.js';
import './features/profile/ProfileView.js';
import './features/admin/AdminView.js';

document.addEventListener('DOMContentLoaded', () => {
  // Crear y agregar el layout principal
  const layout = document.createElement('app-layout');
  document.body.appendChild(layout);
  
  // Inicializar la aplicación
  initializeApp();
});