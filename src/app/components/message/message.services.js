class MessageService {
  constructor($log, TagService, AppCardService, $http, $q, $timeout) {
    'ngInject';
    this.$log = $log;
    this.$timeout = $timeout;
    this.$http = $http;
    this.$q = $q;
    this.AppCardService = AppCardService;
    this.messages = [];
    this._getMessageTree()
      .then((tree) => {
        this.messageTree = tree;
        this.addMessage();
        this.addMessage();
      });
  }

  getMessages(){
    this.$log.debug('getting messages');
    return this.messages;
  }

  addMessage() {
    let cards = this.AppCardService.getAppCards()
    if (cards[0]) {

      let card = cards[_.random(0, cards.length - 1)];

      let choices = this.messageTree[card.mentalState];

      let high = card.timeSpentRaw > 100000;
      let low = card.timeSpentRaw < 10000;

      var templateText = '';
      if (high && !_.isEmpty(choices.high_time)) {
        templateText = choices.high_time[_.random(0, choices.high_time.length - 1)];
      } else if (low && !_.isEmpty(choices.low_time)) {
        templateText = choices.low_time[_.random(0, choices.low_time.length - 1)];
      } else {
        templateText = choices.general[_.random(0, choices.general.length - 1)];
      }

      let text = templateText.replace('[x]', card.app);


      this.messages.push({text: text});
    }

  }

  _getMessageTree() {
    let deferred = this.$q.defer();
    this.$http.get('./app/components/message/messages.json')
      .then((json) => {
        deferred.resolve(json.data);
      });
    return deferred.promise;
  }

  static messageFactory(){
    return new MessageService();
  }
}

export default MessageService;
