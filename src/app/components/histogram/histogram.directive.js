class HistogramDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      scope: {
        charData: '='
      },
      templateUrl: 'app/components/histogram/histogram.html',
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr) {
    }

  }
}

export default HistogramDirective;
