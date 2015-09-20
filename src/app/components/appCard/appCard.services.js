class AppCardService
{
  constructor($log, $q, TagService) {
    'ngInject';
    this.$log = $log;
    this.$q = $q;
    this.TagService = TagService;
    this.appCards = [
      {
        app: 'Kahn Academy',
        timeSpent: '2h',
        mentalState: 'focused',
        graph: {
          data: [
            {
              name: 'alpha',
              value: 20
            },
            {
              name: 'beta',
              value: 40
            },
            {
              name: 'delta',
              value: 40
            },
            {
              name: 'theta',
              value: 40
            },
            {
              name: 'gamma',
              value: 40
            }
          ]
        }
      },
      {
        app: 'Facebook',
        timeSpent: '30m',
        mentalState: 'agitated',
        graph: {
          data: [
            {
              name: 'alpha',
              value: 10
            },
            {
              name: 'beta',
              value: 60
            },
            {
              name: 'delta',
              value: 10
            },
            {
              name: 'theta',
              value: 70
            },
            {
              name: 'gamma',
              value: 40
            }
          ]
        }
      }
    ];
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

  getTotalTime(tags) {
    //TODO: complete this
    let totalTime = 0;
    tags.forEach((tag) => {
      totalTime += tag.end - tag.start;
    });
    return `${totalTime/1000}m`;
  }

  getMentalState(tags) {
    //TODO: complete this
    return 'agitated';
  }

  getPowerBands(aggregates) {
    var self = this;
    debugger
    //TODO: Pull bands from api data
    let graph = {
      data: [
        {
          name: 'alpha',
          value: 10
        },
        {
          name: 'beta',
          value: 60
        },
        {
          name: 'delta',
          value: 10
        },
        {
          name: 'theta',
          value: 70
        },
        {
          name: 'gamma',
          value: 40
        }
      ]
    };
    return graph;
  }

  getAppCard(app) {
    var self = this;
    let deferred = self.$q.defer();
    self.TagService.getTags(app).then((appTags) => {
      self.TagService.getTagAggregates(app).then((aggregates) => {
        let appCard = {
          app: app,
          timeSpent: self.getTotalTime(appTags),
          mentalState: self.getMentalState(appTags),
          graph: self.getPowerBands(aggregates)
        };
        deferred.resolve(appCard);
      });
    });
    return deferred.promise;
  }

  getAppCards() {
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
