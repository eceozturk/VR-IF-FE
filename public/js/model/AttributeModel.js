/**
 * Created by danielsilhavy on 02.08.16.
 */


App.models.AttributeModel = function () {
    App.models.MainModel.call(this, 'attribute');
};



App.models.AttributeModel.prototype = new App.models.MainModel();
App.models.AttributeModel.prototype.constructor = App.models.AttributeModel;