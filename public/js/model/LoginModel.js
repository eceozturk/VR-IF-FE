/**
 * Created by danielsilhavy on 02.08.16.
 */

// Make this model a singleton
(function () {
    var instance;

    App.models.LoginModel = function () {

    };

    App.models.LoginModel.getInstance = function () {
        if (!instance) {
            instance = new App.models.LoginModel();
        }
        return instance;
    };

    App.models.LoginModel.prototype.loginUser = function (data) {
        var q = Q.defer();
        var self = this;

        App.utils.HTTPUtils.post(App.constants.requestParameter.LOGIN_USER, data)
          .then(function (data) {
              self.saveLoginData(data);
              q.resolve();
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };

    App.models.LoginModel.prototype.logoutUser = function () {
        localStorage.removeItem('dashtoken');
        Cookies.remove('dashtoken');
    };

    App.models.LoginModel.prototype.getLoginData = function () {
        if (localStorage.getItem('dashtoken')) {
            return $.parseJSON(localStorage.getItem('dashtoken'));
        } else if (Cookies.get('dashtoken')) {
            return $.parseJSON(Cookies.get('dashtoken'));
        }
        else {
            return null;
        }
    };

    App.models.LoginModel.prototype.saveLoginData = function (data) {
        localStorage.setItem('dashtoken', JSON.stringify(data));
        // we also store it in a cookie in case the user opens a protected page in a new tab
        Cookies.set('dashtoken', JSON.stringify(data));
    };

    App.models.LoginModel.prototype.getFilterPreferences = function () {
        var user = this.getLoginData();
        var username = 'nouser';
        var item;

        if (user && user.username) {
            username = user.username;
        }

        if (localStorage.getItem('filterPreferences')) {
            item = $.parseJSON(localStorage.getItem('filterPreferences'));
            if (item[username]) {
                return item[username];
            } else {
                return {};
            }
        } else {
            return {};
        }
    };

    App.models.LoginModel.prototype.setFilterPreferences = function (type, attributes) {
        var preferences;
        var user = this.getLoginData();
        var username = 'nouser';

        if (user && user.username) {
            username = user.username;
        }
        if (localStorage.getItem('filterPreferences')) {
            preferences = $.parseJSON(localStorage.getItem('filterPreferences'));
            preferences = preferences || {};
        } else {
            preferences = {};
        }

        if (!preferences[username]) {
            preferences[username] = {};
        }

        if (!preferences[username][type]) {
            preferences[username][type] = {};
        }

        attributes.forEach(function (item) {
            preferences[username][type][item.name] = item.selected;
        });
        localStorage.setItem('filterPreferences', JSON.stringify(preferences));

    };

    App.models.LoginModel.prototype.getDisclaimer = function (loginData) {
        var username = 'nouser';
        var item;

        if (loginData && loginData.username) {
            username = loginData.username;
        }

        if (localStorage.getItem('disclaimer')) {
            item = $.parseJSON(localStorage.getItem('disclaimer'));
            if (item[username]) {
                return item[username];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    App.models.LoginModel.prototype.setDisclaimer = function (value) {
        var user = this.getLoginData();
        var username = 'nouser';
        var disclaimer;

        if (user && user.username) {
            username = user.username;
        }

        if (localStorage.getItem('disclaimer')) {
            disclaimer = $.parseJSON(localStorage.getItem('disclaimer'));
            disclaimer = disclaimer || {};
        } else {
            disclaimer = {};
        }

        disclaimer[username] = value;
        // TODO Remove that this is only for users who used the old dev page and have an outdated local storage
        if (!disclaimer[username]) {
            localStorage.removeItem('disclaimer');
            disclaimer = {};
            disclaimer[username] = value;
        }
        localStorage.setItem('disclaimer', JSON.stringify(disclaimer));
    };

    App.models.LoginModel.prototype.getToken = function () {
        var token = null;

        if (localStorage.getItem('dashtoken')) {
            token = $.parseJSON(localStorage.getItem('dashtoken')).token || null;
        } else if (Cookies.get('dashtoken')) {
            token = $.parseJSON(Cookies.get('dashtoken')).token || null;
        }

        return token;
    };

    App.models.LoginModel.prototype.isAdmin = function () {
        var loginData = this.getLoginData();

        if (!loginData || !loginData.roles || !loginData.roles.length) {
            return false;
        }

        return loginData.roles.filter(function (role) {
            return role === 'superuser' || role === 'admin';
        }).length;
    };
})();




