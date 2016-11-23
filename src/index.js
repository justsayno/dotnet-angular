// import base styles
import 'materialize-css';
import './styles/index.scss';

// import babel polyfil
import 'babel-polyfill';

// require jquery
require('jquery');

// import global javascript dependencies and angular modules
import angular from 'angular';
import 'angular-ui-router';
import 'angular-un-svg';

// route config
import routesConfig from './routes';

// components
import primary from './app/primary';
import secondary from './app/secondary';

import {
    pageHeader,
    mainNavigation
} from './app/shared-components';

// configure app
angular
  .module('app', [
    'ui.router',
    'wyvernzora.un-svg'
  ])
  .config(routesConfig)
  .component('primary', primary)
  .component('secondary', secondary)
  .component('pageHeader', pageHeader)
  .directive('mainNavigation', mainNavigation);
