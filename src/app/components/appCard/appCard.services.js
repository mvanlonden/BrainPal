class AppCardService
{
  constructor($log, $q, TagService) {
    'ngInject';
    this.$log = $log;
    this.$q = $q;
    this.TagService = TagService;
    this.appCards = [];
  }

  getUniqueApps() {
    let deferred = this.$q.defer();
    this.TagService.getTags().then(function (tags) {
      let uniqueApps = [];
      tags.forEach(function (tag) {
        if(tag.tag_name && uniqueApps.indexOf(tag.tag_name) < 0){
          uniqueApps.push(tag.tag_name);
        }
      });
      deferred.resolve(uniqueApps);
    });
    return deferred.promise;
  }

  getTotalTime(tags, raw) {
    let totalTime = 0;
    tags.forEach((tag) => {
      totalTime += tag.end - tag.start;
    });
    if (raw) {
      return totalTime;
    }
    return moment.duration(totalTime).humanize();
  }

  getMentalState(aggregates) {
    let highestMetric;
    let highestValue = 0;
    aggregates.forEach((aggregate) => {
      if (aggregate.aggregate_value > highestValue && aggregate.metric.split('_')[1] === 'absolute') {
        highestValue = aggregate.aggregate_value;
        highestMetric = aggregate.metric;
      }
    })
    switch (highestMetric) {
      case 'alpha_absolute':
        return 'relaxed';
      case 'beta_absolute':
        return 'tense';
      case 'gamma_absolute':
        return 'focused';
      case 'delta_absolute':
        return 'very relaxed';
      case 'theta_absolute':
        return 'calm';
    }
    return 'no data';
  }

  getPowerBands(aggregates) {
    let data = new Array(5);
    aggregates.forEach((aggregate) => {
      switch (aggregate.metric) {
        case 'alpha_absolute':
          data[0] = {
            name: 'α',
            value: aggregate.aggregate_value * 10
          };
          break;
        case 'beta_absolute':
          data[1] = {
            name: 'β',
            value: aggregate.aggregate_value * 10
          };
          break;
        case 'gamma_absolute':
          data[2] = {
            name: 'γ',
            value: aggregate.aggregate_value * 10
          };
          break;
        case 'delta_absolute':
          data[3] = {
            name: 'δ',
            value: aggregate.aggregate_value * 10
          };
          break;
        case 'theta_absolute':
          data[4] = {
            name: 'θ',
            value: aggregate.aggregate_value * 10
          };
          break;
      }
    });
    return { data: data };
  }

  getAppCard(app) {
    var self = this;
    let deferred = self.$q.defer();
    self.TagService.getTags(app).then((appTags) => {
      self.TagService.getTagAggregates(app).then((aggregates) => {
        let appCard = {
          app: app,
          timeSpent: self.getTotalTime(appTags),
          timeSpentRaw: self.getTotalTime(appTags, true),
          mentalState: self.getMentalState(aggregates),
          graph: self.getPowerBands(aggregates)
        };
        deferred.resolve(appCard);
      });
    });
    return deferred.promise;
  }

  getAppCards() {
    return this.appCards;
  }

  populateAppCards() {
    var self = this;
    let deferred = self.$q.defer();
    self.getUniqueApps().then((uniqueApps) => {
      uniqueApps.forEach((app) => {
        self.getAppCard(app).then((appCard) => {
          self.appCards.push(appCard);
        });
      });
      deferred.resolve(self.appCards);
    });
    return deferred.promise;
  }

  static appCardFactory(){
    return new AppCardService();
  }
}

export default AppCardService;
