/**
 * Created by danielsilhavy on 05.09.16.
 */
(function () {
    "use strict";
    // Make this model a singleton
    var instance;

    App.models.StatisticModel = function () {

    };

    App.models.StatisticModel.getInstance = function () {
        if (!instance) {
            instance = new App.models.StatisticModel();
        }
        return instance;
    };

    App.models.StatisticModel.prototype.getSize = function () {
        var q = Q.defer();

        App.utils.HTTPUtils.get(App.constants.requestParameter.statistic.SIZE)
          .then(function (data) {
              q.resolve(data);
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };

    App.models.StatisticModel.prototype.getTestvectorTypes = function () {
        var q = Q.defer();

        App.utils.HTTPUtils.get(App.constants.requestParameter.statistic.TESTVECTOR_TYPES)
          .then(function (data) {
              q.resolve(data);
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };

    App.models.StatisticModel.prototype.getTestcontentTypes = function () {
        var q = Q.defer();

        App.utils.HTTPUtils.get(App.constants.requestParameter.statistic.TESTCONTENT_TYPES)
          .then(function (data) {
              q.resolve(data);
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };


})();
