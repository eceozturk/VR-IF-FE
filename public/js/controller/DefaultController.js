/**
 * Created by danielsilhavy on 01.08.16.
 */

App.controller.DefaultController = function () {
    this.view = new App.views.DefaultView();
    this.statisticModel = App.models.StatisticModel.getInstance();
};

App.controller.DefaultController.prototype.handleRequest = function (route) {
    var action;

    action = typeof route[1] !== 'undefined' ? route[1] : 'default';
    switch (action) {
        case 'faq':
            this.actionFAQ();
            break;
        default:
            this.actionDefault();
    }
};

App.controller.DefaultController.prototype.actionDefault = function () {
    var self = this;
    var data = {};
    var promises = [];

    promises.push(this.statisticModel.getTestvectorTypes());
    promises.push(this.statisticModel.getTestcontentTypes());
    Q.all(promises)
      .then(function (result) {
          data.testvectorTypes = self.filterTestvectors(result[0]);
          data.testcontentTypes = self.filterTestcontents(result[1]);
          data.size = {
              testcontents: data.testcontentTypes.length,
              testvectors: data.testvectorTypes.length
          };
          // Filter the items which parent/parents are inactive
          self.view.renderIndex(data);
      })
      .catch(function (err) {
          App.handler.Errorhandler.handleError(err);
      });
};

App.controller.DefaultController.prototype.actionFAQ = function () {
    this.view.renderFAQ();
};

App.controller.DefaultController.prototype.filterTestvectors = function (elems) {
    var result;

    result = elems.filter(function (item) {
        var valid = false;

        if (item.hasOwnProperty('testcontents')) {
            item.testcontents.forEach(function (tc) {
                if (tc.active) {
                    if (tc.hasOwnProperty('feature') && tc.feature.active) {
                        if (tc.feature.hasOwnProperty('featureGroup') && tc.feature.featureGroup.active) {
                            valid = true;
                        }
                    }
                    else{
                        valid=true;
                    }
                }
            });
        } else {
            valid = true;
        }
        return valid;
    });
    return result;
};

App.controller.DefaultController.prototype.filterTestcontents = function (elems) {
    var result;

    result = elems.filter(function (tc) {
        var valid = false;

        if (tc.hasOwnProperty('feature')) {
            if (tc.feature.active && tc.feature.hasOwnProperty('featureGroup') && tc.feature.featureGroup.active) {
                valid = true;
            }
        } else {
            valid = true;
        }
        return valid;
    });
    return result;
};

App.controller.DefaultController.prototype.filterFeatures = function (elems) {
    var result;

    result = elems.filter(function (feature) {
          var valid = false;

          if (feature.hasOwnProperty('featureGroup')) {
              if (feature.featureGroup.active) {
                  valid = true;
              }
          } else {
              valid = true;
          }
          return valid;
      }
    );
    return result;
};


