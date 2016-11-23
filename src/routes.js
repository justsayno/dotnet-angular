function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('primary', {
      url: '/',
      component: 'primary'
    })
    .state('secondary', {
      url: '/secondary',
      component: 'secondary'
    });
}
export default routesConfig;
