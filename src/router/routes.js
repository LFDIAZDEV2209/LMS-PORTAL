export default [
    {
      path: '/',
      component: 'dashboard-view',
      exact: true
    },
    {
      path: '/courses',
      component: 'courses-view'
    },
    {
      path: '/assignments',
      component: 'assignments-view'
    },
    {
      path: '/progress',
      component: 'progress-view'
    },
    {
      path: '/profile',
      component: 'profile-view'
    },
    {
      path: '/admin',
      component: 'admin-view'
    },
    {
      path: '/404',
      component: 'not-found-page'
    }
  ];