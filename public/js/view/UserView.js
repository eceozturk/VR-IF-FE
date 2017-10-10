/**
 * Created by danielsilhavy on 09.08.16.
 */

App.views.UserView = function () {
    App.views.MainView.call(this, 'user');
};

App.views.UserView.prototype = new App.views.MainView();
App.views.UserView.prototype.constructor = App.views.UserView;

App.views.UserView.prototype.renderList = function (data, filterPreferences) {
    var self = this;
    var button;

    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].LIST)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences);
          $('.delete-button').on('click', function () {
              button = this;
              alertify.confirm('Delete an element', 'Are you sure you want to delete the element?', function () {
                  EventBus.dispatch(App.constants.events[self.type].DELETE, self, self.getIdFromButton(button));
              }, function () {
                  alertify.error('Canceled');
              });
          });
      });
};

App.views.UserView.prototype.getFieldValues = function () {
    var values = {};

    values.username = $('#username').val();
    values.password = $('#password').val();
    values.firstname = $('#firstname').val();
    values.lastname = $('#lastname').val();
    values.role = $("#role-select option:selected").val();
    values.email = $('#email').val();
    values.companyname = $('#company-name').val();
    return values;
};

App.views.UserView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.username = $('#username').val();
    values.password = $('#password').val();
    values.firstname = $('#firstname').val();
    values.lastname = $('#lastname').val();
    values.role = $("#role-select option:selected").val();
    values.email = $('#email').val();
    values.companyname = $('#company-name').val();
    values.id = self.getIdFromHiddenField();
    return values;
};

App.views.UserView.prototype.getIdFromHiddenField = function () {
    return $('#element-id').val() || null;
};

App.views.UserView.prototype.getIdFromButton = function (element) {
    return element.attributes['element-id'].value;
};

