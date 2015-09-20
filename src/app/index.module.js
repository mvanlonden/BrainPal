/* global */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import MainController from './main/main.controller';
import AppCardDirective from '../app/components/appCard/appCard.directive';
import MessageDirective from '../app/components/message/message.directive';
import TagService from '../app/components/tag/tag.services';
import HistogramDirective from '../app/components/histogram/histogram.directive';

angular.module('eegappdata', ['ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial'])
  .config(config)
  .constant('toastr', toastr)

  .config(routerConfig)

  .run(runBlock)
  .controller('MainController', MainController)
  .services('TagService', () => new TagService())
  .directive('histogram', () => new HistogramDirective())
  .directive('appCard', () => new AppCardDirective())
  .directive('message', () => new MessageDirective());
