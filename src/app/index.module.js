/* global */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import MainController from './main/main.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';
import AppCardDirective from '../app/components/appCard/appCard.directive';
import MessageDirective from '../app/components/message/message.directive';
import TagService from '../app/components/tag/tag.services';
import MessageService from '../app/components/message/message.services';
import AppCardService from '../app/components/appCard/appCard.services';
import HistogramDirective from '../app/components/histogram/histogram.directive';

angular.module('eegappdata', ['ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial'])
  .config(config)
  .constant('toastr', toastr)

  .config(routerConfig)

  .run(runBlock)
  .controller('MainController', MainController)
  .service('TagService', TagService)
  .service('MessageService', MessageService)
  .service('AppCardService', AppCardService)
  .directive('navbar', () => new NavbarDirective())
  .directive('histogram', () => new HistogramDirective())
  .directive('appCard', () => new AppCardDirective())
  .directive('message', () => new MessageDirective());
