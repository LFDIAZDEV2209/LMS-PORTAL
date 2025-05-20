import { initializeApp } from './app.js';
import './components/AppLayout.js';
import './ui/nav-bar.js';
import './features/dashboard/DashboardView.js';
import './features/courses/CoursesView.js';
import './features/assignments/AssignmentsView.js';
import './features/progress/ProgressView.js';
import './features/profile/ProfileView.js';
import './features/admin/AdminView.js';
import './features/dashboard/components/app-enrolled.js'
import './features/admin/components/admin-header.js';
import './features/admin/components/admin-list.js';
import './features/admin/components/admin-edit.js';
import './features/admin/components/admin-delete.js';
import './features/admin/components/admin-add.js';

document.addEventListener('DOMContentLoaded', () => {
  // Crear y agregar el layout principal
  const layout = document.createElement('app-layout');
  document.body.appendChild(layout);
  
  // Inicializar la aplicación
  initializeApp();
});