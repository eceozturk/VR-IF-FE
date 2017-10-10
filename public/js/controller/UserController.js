/**
 * Created by danielsilhavy on 20.07.16.
 */


App.controller.UserController = function () {
    var model = new App.models.UserModel();
    var view = new App.views.UserView();
    App.controller.MainController.call(this, model, view, 'user');
    this.registerEvents();
};

App.controller.UserController.prototype = new App.controller.MainController();

App.controller.UserController.prototype.onEditElement = function (callee, data) {
    var self = this;

    self.model.editElement(data)
      .then(function () {
          self.view.clearView();
          return App.views.MessageView.renderSuccessMessage({message: 'Edited element'});
      })
      .then(function () {
          self.view.setRoute(self.type.toLowerCase() + '/list');
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.UserController.prototype.onDeleteElement = function (callee,id) {
    var self = this;

    self.model.deleteElement(id)
      .then(function () {
          self.view.clearView();
          return App.views.MessageView.renderSuccessMessage({message: 'Deleted User'});
      })
      .then(function () {
          self.actionList();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.UserController.prototype.constructor = App.controller.UserController;


