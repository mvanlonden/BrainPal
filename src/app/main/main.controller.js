class MainController {
  constructor ($interval, $timeout, MessageService, AppCardService) {
    'ngInject';

    this.messages = MessageService.getMessages();
    this.speaking = true;
    for (let i = 0; i < 2; i++) {
      console.log(i);
      $timeout(() => {
        console.log('timeout');
        MessageService.addMessage();
        this.messages = MessageService.getMessages();
      }, i * 1000);
    }

    $interval(() => {
      this.speaking = !this.speaking;
      if (this.speaking) {
        console.log(this.speaking);
        for (let i = 0; i < 2; i++) {
          console.log(i);
          $timeout(() => {
            console.log('timeout');
            MessageService.addMessage();
            this.messages = MessageService.getMessages();
          }, i * 1000);
        }
      }

    }, 10000);

    AppCardService.populateAppCards().then((apps) => this.apps = apps);

  }

}

export default MainController;
