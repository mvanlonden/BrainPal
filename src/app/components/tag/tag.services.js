var moduleName='tag.services';

const HTTP = new WeakMap();
const USER_ID = 'brainpal_user';
const DEVICE_ID = 'brainpal_demo';
const DEVICE_TYPE = 'muse';
const METRICS = [ 'alpha_absolute',
                  'beta_absolute',
                  'gamma_absolute',
                  'delta_absolute',
                  'theta_absolute'];
const CLOUDBRAIN = 'http://demo.apiserver.cloudbrain.rocks/api/v1.0/users/' + USER_ID;

class TagService {
  constructor($log, $http) {
    'ngInject';
    HTTP.set(this, $http);
  }

  getTags(){
    return HTTP.get(this).get(CLOUDBRAIN + '/tags/')
      .then(result => result.data )
      .catch((error) => {
        this.$log.error('XHR Failed for getTags.\n' + angular.toJson(error.data, true));
      });
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
      device_id: DEVICE_ID,
      device_type: DEVICE_TYPE,
      metric: METRICS
    };
    return HTTP.get(this).get(CLOUDBRAIN + `/tags/${tagId}/aggregates`, { filter_params })
      .then(result => result.data )
      .catch((error) => {
        this.$log.error('XHR Failed for getTagAggregates.\n' + angular.toJson(error.data, true));
      });
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
