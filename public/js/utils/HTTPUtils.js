/**
 * Created by danielsilhavy on 01.08.16.
 */


App.utils.HTTPUtils = {};

App.utils.HTTPUtils.get = function (url,token) {
    var q = Q.defer();

    $.ajax({
        method: "GET",
        url: url,
        timeout: 10000,
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        }
    })
      .done(function (data) {
          q.resolve(data);

      })
      .fail(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.utils.HTTPUtils.post = function (url, params, token) {
    var q = Q.defer();
    token = token || null;

    $.ajax({
        method: "POST",
        url: url,
        type: 'json',
        contentType: 'application/json',
        timeout: 10000,
        data: JSON.stringify(params),
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        }
    })
      .done(function (data) {
          q.resolve(data);

      })
      .fail(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.utils.HTTPUtils.put = function (url,params,token) {
    var q = Q.defer();
    token = token || null;

    $.ajax({
        method: "PUT",
        url: url,
        type: 'json',
        contentType: 'application/json',
        timeout: 10000,
        data: JSON.stringify(params),
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        }
    })
      .done(function (data) {
          q.resolve(data);

      })
      .fail(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.utils.HTTPUtils.delete = function (url,token) {
    var q = Q.defer();
    token = token || null;

    $.ajax({
        method: "DELETE",
        url: url,
        timeout: 10000,
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        }
    })
      .done(function (data) {
          q.resolve(data);

      })
      .fail(function (error) {
          q.reject(error);
      });

    return q.promise;
};


