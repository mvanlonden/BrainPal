/* global */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import lodash from 'lodash';
import MainController from './main/main.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';
import AppCardDirective from '../app/components/appCard/appCard.directive';
import MessageDirective from '../app/components/message/message.directive';
import TagService from '../app/components/tag/tag.services';
import MessageService from '../app/components/message/message.services';
import AppCardService from '../app/components/appCard/appCard.services';
import HistogramDirective from '../app/components/histogram/histogram.directive';

angular.module('eegappdata', ['ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial', 'luegg.directives'])
  .config(config)
  .constant('toastr', toastr)
  .constant('moment', moment)
  .constant('_', lodash)

  .config(routerConfig)

  .run(runBlock)
  .controller('MainController', MainController)
  .service('TagService', TagService)
  .service('AppCardService', AppCardService)
  .service('MessageService', MessageService)
  .directive('navbar', () => new NavbarDirective())
  .directive('histogram', () => new HistogramDirective())
  .directive('appCard', () => new AppCardDirective())
  .directive('message', () => new MessageDirective());
