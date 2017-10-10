/**
 * Created by danielsilhavy on 02.08.16.
 */
App.views.LoginView = function () {
    App.views.MainView.call(this,'login');
};

App.views.LoginView.prototype = new App.views.MainView();
App.views.LoginView.prototype.constructor = App.views.LoginView;

App.views.LoginView.prototype.renderLogin = function () {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter.LOGIN_TEMPLATE)
      .then(function (templateData) {
          self.renderHandlebars(templateData, null);
          // add Event Listener to the submit button
          $('#login-form').parsley().on('form:submit', function () {
              EventBus.dispatch(App.constants.events.LOGIN, this, self.getFieldValues());
              return false;
          });
      });
};

App.views.LoginView.prototype.getFieldValues = function () {
    var values = {};

    values.username = $('#username').val();
    values.password = $('#password').val();
    return values;
};



