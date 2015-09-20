var moduleName='tag.services';

const HTTP = new WeakMap();
const USER_ID = 'brainpal_user';
const DEVICE_TYPE = 'muse';
const METRICS = [ 'alpha_absolute',
                  'beta_absolute',
                  'gamma_absolute',
                  'delta_absolute',
                  'theta_absolute'];
const CLOUDBRAIN = 'http://demo.apiserver.cloudbrain.rocks/api/v1.0/users/' + USER_ID;

class TagService {
  constructor($log, $q, $http) {
    'ngInject';
    this.$q = $q;
    HTTP.set(this, $http);
  }

  getTags(tagName){
    let params = {
      tag_name: tagName
    };
    let deferred = this.$q.defer();
    HTTP.get(this).get(CLOUDBRAIN + '/tags', { params: params })
      .then((result) => {
        deferred.resolve(result.data);
      })
      .catch((error) => {
        // $log.error('XHR Failed for getTags.\n' + angular.toJson(error.data, true));
      });
    return deferred.promise;
  }

  getTag(tagId){
    return HTTP.get(this).get(CLOUDBRAIN + `/tags/${tagId}`)
      .then(result => result.data )
      .catch((error) => {
        this.$log.error('XHR Failed for getTag.\n' + angular.toJson(error.data, true));
      });
  }

  addTag(tag){
    return HTTP.get(this).post(CLOUDBRAIN + '/tags/', tag)
      .then(result => result.data )
      .catch((error) => {
        this.$log.error('XHR Failed for addTag.\n' + angular.toJson(error.data, true));
      });
  }

  getTagAggregates(tagId){
    let filter_params = {
      device_type: DEVICE_TYPE,
      metric: METRICS
    };
    let deferred = this.$q.defer();
    HTTP.get(this).get(CLOUDBRAIN + `/tags/${tagId}/aggregates`, { params: filter_params })
      .then((result) => {
        deferred.resolve(result.data);
      })
      .catch((error) => {
        // this.$log.error('XHR Failed for getTagAggregates.\n' + angular.toJson(error.data, true));
      });
    return deferred.promise;
  }

  getTagAggregate(tagId, aggregateId){
    return HTTP.get(this).get(CLOUDBRAIN + `/tags/${tagId}/aggregates/${aggregateId}`)
      .then(result => result.data )
      .catch((error) => {
        this.$log.error('XHR Failed for getTagAggregate.\n' + angular.toJson(error.data, true));
      });
  }

  static tagFactory($http){
    return new TagService($http);
  }
}

export default TagService;
