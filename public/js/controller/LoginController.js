/**
 * Created by danielsilhavy on 02.08.16.
 */

App.controller.LoginController = function () {
    this.view = new App.views.LoginView();
    this.model = App.models.LoginModel.getInstance();
    this.mainView = new App.views.MainView();
    this.registerEvents();

};

App.controller.LoginController.prototype.registerEvents = function () {
    var self = this;

    EventBus.addEventListener(App.constants.events.LOGIN, self.onLogin.bind(this));
};

App.controller.LoginController.prototype.handleRequest = function (route) {
    var action;

    action = typeof route[0] !== 'undefined' ? route[0] : 'default';
    switch (action) {
      // get all the attributes and list them
        case '#login':
            this.actionLogin();
            break;
        case '#logout':
            this.actionLogout();
            break;
    }
};

App.controller.LoginController.prototype.actionLogin = function () {
    if (!this.model.getLoginData()) {
        this.view.renderLogin();
    }
};

App.controller.LoginController.prototype.actionLogout = function () {
    this.model.logoutUser();
    App.views.MessageView.renderSuccessMessage({message:'Logged out'});
    this.mainView.setRoute('login');
};

App.controller.LoginController.prototype.onLogin = function (callee, data) {
    var self = this;

    self.model.loginUser(data)
      .then(function () {
          App.views.MessageView.renderSuccessMessage({message:'Logged in'});
          self.mainView.setRoute('');
      })
      .catch(function (error) {
        App.handler.Errorhandler.handleError(error);
      });
};

