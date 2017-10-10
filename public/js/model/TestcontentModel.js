/**
 * Created by danielsilhavy on 02.08.16.
 */

App.models.TestcontentModel = function () {
    App.models.MainModel.call(this, 'testcontent');
};

App.models.TestcontentModel.prototype = new App.models.MainModel();

App.models.TestcontentModel.prototype.getAttributes = function () {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.attribute.GET_MULTI + '?type=' + App.constants.types.TESTCONTENT)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestcontentModel.prototype.getTestvectors = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.testcontent.GET + '/' + id + '/testvectors')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestcontentModel.prototype.getDetails = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.testcontent.GET + '/' + id + '/details')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestcontentModel.prototype.constructor = App.models.TestcontentModel;