class MessageService {
  constructor($log, TagService) {
    'ngInject';
    this.$log = $log;
  }

  getMessages(){
    this.$log.debug('getting messages');
    let messages = [
      {
        text: 'You are getting a little agitated when on facebook.com. You might want to consider spending less time there.',
      },
      {
        text: 'Looks like you’ve been very focused while at Kahn Academy. Keep it up!'
      }
    ];
    return messages;
  }

  static messageFactory(){
    return new MessageService();
  }
}

export default MessageService;
