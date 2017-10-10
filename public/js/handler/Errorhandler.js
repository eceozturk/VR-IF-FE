/**
 * Created by danielsilhavy on 02.08.16.
 */
App.handler.Errorhandler = function () {
};

App.handler.Errorhandler.handleError = function (error) {
    var q = Q.defer();

    if(error.responseText) {
        App.handler.Errorhandler.handleHTTPError(error);
    } else {
        App.handler.Errorhandler.handleInputError(error);
    }

    return q.promise;
};

App.handler.Errorhandler.handleHTTPError = function (error) {
    var message;
    var loginModel = App.models.LoginModel.getInstance();

    switch(error.status) {
        case 400:
            message = error.responseJSON.err.message;
            break;
        case 401:
            message = error.responseJSON.err.message;
            break;
        default:
            message = 'An error occured';
    }
    App.views.MessageView.renderErrorMessage({message:message});
    if(message === 'jwt expired') {
        loginModel.logoutUser();
    }
};

App.handler.Errorhandler.handleInputError = function (error) {
    var message = error.message || 'An error occured';

    App.views.MessageView.renderErrorMessage({message:message});
};