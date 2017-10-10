/**
 * Created by Daniel Silhavy on 27.07.16.
 */


App.Router = function () {
    this.attributeController = new App.controller.AttributeController();
    this.loginController = new App.controller.LoginController();
    this.testcontentController = new App.controller.TestcontentController();
    this.testvectorController = new App.controller.TestvectorController();
    this.defaultController = new App.controller.DefaultController();
    this.userController = new App.controller.UserController();
    this.helperView = new App.views.MainView();
    this.loginModel = App.models.LoginModel.getInstance();
};

App.Router.prototype.init = function () {
    this.registerEventHandler();
};

App.Router.prototype.registerEventHandler = function () {
    var self = this;

    $(window).on('hashchange', function () {
        self.startupRoutine();
    });
    $(window).on('load', function () {
        self.startupRoutine();
    });

    EventBus.addEventListener(App.constants.events.DISCLAIMER, self.onDisclaimerAgree.bind(this));
};

App.Router.prototype.onDisclaimerAgree = function (callee,value) {
    var self = this;

    self.loginModel.setDisclaimer(value);
    self.defaultController.handleRequest('');
};

App.Router.prototype.startupRoutine = function () {
    this.route(decodeURI(window.location.hash));
};

App.Router.prototype.route = function (url) {
    var self = this;
    var route = url.split('/');
    var disclaimer;
    var loginData = self.loginModel.getLoginData();

    disclaimer = self.loginModel.getDisclaimer(loginData);
    self.helperView.toggleMenuState(loginData);
    self.helperView.setActiveItem(route);

    if (!disclaimer || disclaimer === 'false') {
        self.helperView.renderDisclaimer();
    } else {
        self.helperView.renderLoadingAnimation();

        switch (route[0]) {
            case '#testcontent':
                self.testcontentController.handleRequest(route);
                break;
            case '#testvector':
                self.testvectorController.handleRequest(route);
                break;
            case '#attribute':
                self.attributeController.handleRequest(route);
                break;
            case '#user':
                self.userController.handleRequest(route);
                break;
            case '#login':
                self.loginController.handleRequest(route);
                break;
            case '#logout':
                self.loginController.handleRequest(route);
                break;
            default :
                self.defaultController.handleRequest(route);

        }
    }
};


