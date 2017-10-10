/**
 * Created by danielsilhavy on 01.08.16.
 */

App.models.UserModel = function () {
    App.models.MainModel.call(this, 'user');
};

App.models.UserModel.prototype = new App.models.MainModel();
App.models.UserModel.prototype.constructor = App.models.UserModel;