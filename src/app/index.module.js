/* global malarkey:false, toastr:false, moment:false */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import MainController from './main/main.controller';
import AppCardDirective from '../app/components/appCard/appCard.directive';
import MessageDirective from '../app/components/message/message.directive';

angular.module('eegappdata', ['ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial'])
  .config(config)
  .constant('toastr', toastr)

  .config(routerConfig)

  .run(runBlock)
  .controller('MainController', MainController)
  .directive('appCard', () => new AppCardDirective())
  .directive('message', () => new MessageDirective());
