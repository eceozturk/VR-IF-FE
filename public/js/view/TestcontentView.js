/**
 * Created by danielsilhavy on 04.08.16.
 */

App.views.TestcontentView = function () {
    App.views.MainView.call(this,'testcontent');
};

App.views.TestcontentView.prototype = new App.views.MainView();
App.views.TestcontentView.prototype.constructor = App.views.FeatureGroupView;


App.views.TestcontentView.prototype.renderDetails = function (data) {
    var self = this;

    data.testcontent = self.formatDate([data.testcontent])[0];
    data.testvectors = self.formatDate(data.testvectors);
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].DETAILS)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
      });
};

App.views.TestcontentView.prototype.getFieldValues = function () {
    var values = {};

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            attribute: obj.attributes['attribute-id'].value
        });
    });
    values.feature = $( "#feature-select option:selected" ).val();
    return values;
};

App.views.TestcontentView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            '_id': obj.attributes['attribute-instance-id'].value
        });
    });
    values.feature = $( "#feature-select option:selected").val();
    values.id = self.getIdFromHiddenField();

    return values;
};



