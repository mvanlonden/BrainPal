class AppCardDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      scope: {
        appName: '@',
        timeSpent: '@',
        mentalState: '@',
        eegData: '='
      },
      templateUrl: 'app/components/appCard/appCard.html',
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr) {
    }

  }
}

export default AppCardDirective;
