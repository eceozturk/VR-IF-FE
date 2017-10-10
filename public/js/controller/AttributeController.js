/**
 * Created by danielsilhavy on 01.08.16.
 */

App.controller.AttributeController = function () {
    var model = new App.models.AttributeModel();
    var view = new App.views.AttributeView();
    App.controller.MainController.call(this, model, view, 'attribute');
    this.registerEvents();
};

App.controller.AttributeController.prototype = new App.controller.MainController();
App.controller.AttributeController.prototype.constructor = App.controller.AttributeController;


