class AppCardDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      scope: {

      },
      templateUrl: 'app/components/appCard/appCard.html',
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
    }

  }
}

export default AppCardDirective;
