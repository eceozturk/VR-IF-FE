/**
 * Created by danielsilhavy on 02.08.16.
 */

App.models.TestvectorModel = function () {
    App.models.MainModel.call(this, 'testvector');
};

App.models.TestvectorModel.prototype = new App.models.MainModel();

App.models.TestvectorModel.prototype.getAttributes = function () {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.attribute.GET_MULTI + '?type=' + App.constants.types.TESTVECTOR)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestvectorModel.prototype.getTestvectors = function (id) {
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

App.models.TestvectorModel.prototype.getDetails = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.testvector.GET + '/' + id + '/details')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};
App.models.TestvectorModel.prototype.constructor = App.models.TestvectorModel;