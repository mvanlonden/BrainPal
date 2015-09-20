class MainController {
  constructor ($timeout, MessageService, AppCardService) {
    'ngInject';

    this.messages = MessageService.getMessages();

    AppCardService.getAppCards().then((apps) => this.apps = apps);

  }

}

export default MainController;
