var moduleName='tag.services';

const HTTP = new WeakMap();
const CLOUDBRAIN = 'http://demo.apiserver.cloudbrain.rocks/api/v1.0';

class TagService
{
  constructor($log, $http)
  {
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

  getTag(tagName){
    return HTTP.get(this).get(CLOUDBRAIN + `/tags/${tagName}`)
      .then(result => result.data )
      .catch((error) => {
        this.$log.error('XHR Failed for getTag.\n' + angular.toJson(error.data, true));
      });
  }

  getTagAggregates(tagId, type, metric, start_time, end_time){
    type = type || 'sum';
    
    let params = {
      aggregate_type: type,
      metric: metric,
      start: start_time,
      end: end_time
    };
    return HTTP.get(this).get(CLOUDBRAIN + `/tags/${tagId}/aggregates`, { params: params })
      .then(result => result.data )
      .catch((error) => {
        this.$log.error('XHR Failed for getTagAggregates.\n' + angular.toJson(error.data, true));
      });
  }

  addTag(tag){
    return HTTP.get(this).post(CLOUDBRAIN + '/tags/', tag)
      .then(result => result.data )
      .catch((error) => {
        this.$log.error('XHR Failed for addTag.\n' + angular.toJson(error.data, true));
      });
  }

  static tagFactory($http){
    return new TagService($http);
  }
}

TagService.tagFactory.$inject = ['$http'];

export default TagService;
