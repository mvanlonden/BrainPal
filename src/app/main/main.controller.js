class MainController {
  constructor ($interval, $timeout, MessageService, AppCardService) {
    'ngInject';

    this.messages = MessageService.getMessages();
    this.speaking = true;

    let loops = 0;

    AppCardService.populateAppCards().then((apps) => {
      this.apps = apps
      for (let i = 0; i < 1; i++) {
        $timeout(() => {
          MessageService.addMessage();
          this.messages = MessageService.getMessages();
        }, i * 1000);
      }

      $interval(() => {
        while(loops < 4) {
          this.speaking = !this.speaking;
          if (this.speaking) {
            for (let i = 0; i < 1; i++) {
              $timeout(() => {
                MessageService.addMessage();
                this.messages = MessageService.getMessages();
              }, i * 1000);
            }
          }
          loops++;
        }
      }, 5000);

    });

  }

}

export default MainController;
