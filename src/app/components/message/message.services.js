class MessageService {
  constructor($log, TagService, AppCardService, $http, $q, $timeout) {
    'ngInject';
    this.$log = $log;
    this.$timeout = $timeout;
    this.$http = $http;
    this.$q = $q;
    this.AppCardService = AppCardService;
    this.messages = [];
    this.messageTree = this._getMessageTree();
  }

  getMessages(){
    this.$log.debug('getting messages');
    return this.messages;
  }

  addMessage() {
    console.log('adding message');
    let cards = this.AppCardService.getAppCards();
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
    return {
      "calm": {
        "general": [
          "Ooooohmmmm. Looks like you’re feeling pretty zen when visiting [x]. Could be a good application for decompression."
        ],
        "high_time": [],
        "low_time": []
      },
      "tense": {
        "general": [
          "Woah there tiger! Let's take a breather and try to cut back on using [x]. It's getting you pretty worked up.",
          "You are getting a little agitated when on [x]. You might want to consider spending less time there."
        ],
        "high_time": [
          "Whew. Take a few deep breaths because you've spent a lot of time using [x]."
        ],
        "low_time": [
          "Good job staying away from [x]."
        ]
      },
      "focused": {
        "general": [
          "Woohoo you're in the zone on [x].",
          "Looks like you’ve been very focused while at [x]. Keep it up!"
        ],
        "high_time": [],
        "low_time": [
          "Hey seems like you get pretty engaged when using [x] but you don't use it often. Have you thought about using more often?",
          "Get in the zooone! Don't forget about [x]."
        ]
      },
      "relaxed": {
        "general": [
          "Using [x] allows you to take a load off."
        ],
        "high_time": [],
        "low_time": [
          "If you're feeling tense use [x]."
        ]
      },
      "very relaxed": {
        "general": [
          "Hmmm. Did you fall asleep while using [x]?"
        ],
        "high_time": [],
        "low_time": [
          "Trouble sleeping? [x] is here to help you.",
          "Feel the power of deep relaxation with by using [x]."
        ]
      }
    }

  }

  static messageFactory(){
    return new MessageService();
  }
}

export default MessageService;
