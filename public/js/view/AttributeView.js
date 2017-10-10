/**
 * Created by danielsilhavy on 02.08.16.
 */
App.views.AttributeView = function () {
    App.views.MainView.call(this, 'attribute');
};

App.views.AttributeView.prototype = new App.views.MainView();
App.views.AttributeView.prototype.constructor = App.views.AttributeView;


App.views.AttributeView.prototype.renderList = function (data, filterPreferences) {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].LIST)
      .then(function (templateData) {
          data.entries = self.formatDate(data.entries);
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences, 0);
      });
};

App.views.AttributeView.prototype.renderMyList = function (data, filterPreferences) {
    var self = this;
    var button;

    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].MYLIST)
      .then(function (templateData) {
          data.entries = self.formatDate(data.entries);
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences, 1);
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


App.views.AttributeView.prototype.getFieldValues = function () {
    var values = {};

    values.description = $('#description').val();
    values.uiName = $('#ui-name').val();
    values.type = $("#type-select option:selected").val();
    values.active = $('input[name=active]:checked').val();
    values.shownByDefault = $('input[name=shown-by-default]:checked').val();
    values.defaultValue = $('#default-value').val();
    values.deletable = $('input[name=deletable]:checked').val();
    values.active = values.active === 'true';
    values.deletable = values.deletable === 'true';
    values.shownByDefault = values.shownByDefault === 'true';
    return values;
};

App.views.AttributeView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.description = $('#description').val();
    values.uiName = $('#ui-name').val();
    values.type = $("#type-select option:selected").val();
    values.active = $('input[name=active]:checked').val();
    values.shownByDefault = $('input[name=shown-by-default]:checked').val();
    values.defaultValue = $('#default-value').val();
    values.deletable = $('input[name=deletable]:checked').val();
    values.active = values.active === 'true';
    values.deletable = values.deletable === 'true';
    values.shownByDefault = values.shownByDefault === 'true';
    values.id = self.getIdFromHiddenField();
    return values;
};

App.views.AttributeView.prototype.getIdFromHiddenField = function () {
    return $('#element-id').val() || null;
};

App.views.AttributeView.prototype.getIdFromButton = function (element) {
    return element.attributes['element-id'].value;
};

