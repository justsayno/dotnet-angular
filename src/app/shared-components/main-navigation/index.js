import './main-navigation.scss';
import angular from 'angular';

class mainNavigationController {
  constructor() {
    'ngInject';
  }
}

export default () => {
  'ngInject';

  const directive = {
    restrict: 'E',
    template: require('./main-navigation.html'),
    scope: {
    },
    controller: mainNavigationController,
    controllerAs: 'vm',
    bindToController: true,
    link: () => {
      let menuIsVisible = false;
      const ciNavigationShowId = '#main-navigation-show';
      const ciNavigationHideId = '#main-navigation-hide';
      const pageContentId = '#page-content';
      const navigationSlideOutId = '#main-navigation-slide-out';
      angular.element(ciNavigationHideId).click(() => {
        if (menuIsVisible) {
          angular.element(navigationSlideOutId).css('transform', 'translateX(-100%)');
          menuIsVisible = false;
        }
      });
      angular.element(ciNavigationShowId).click((event) => {
        if (!menuIsVisible) {
          event.stopPropagation();
          angular.element(navigationSlideOutId).css('transform', 'translateX(0%)');
          menuIsVisible = true;
        }
      });
      angular.element(pageContentId).click(() => {
        if (menuIsVisible) {
          angular.element(navigationSlideOutId).css('transform', 'translateX(-100%)');
          menuIsVisible = false;
        }
      });
    }
  };
  return directive;
};

