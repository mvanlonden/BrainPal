class MessageDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      scope: {
        message: '@'
      },
      templateUrl: 'app/components/message/message.html',
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      console.log(scope.message);
    }

  }
}

export default MessageDirective;
