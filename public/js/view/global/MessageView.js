/**
 * Created by danielsilhavy on 01.08.16.
*/

App.views.MessageView = function () {

};

App.views.MessageView.renderSuccessMessage = function (message) {
    alertify.success(message.message);
};

App.views.MessageView.renderErrorMessage = function (message) {
    alertify.error(message.message);
};

