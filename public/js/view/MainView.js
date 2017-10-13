/**
 * Created by danielsilhavy on 01.08.16.
 */

var $BODY = $('body'),
  $SIDEBAR_FOOTER = $('.sidebar-footer'),
  $LEFT_COL = $('.left_col'),
  $RIGHT_COL = $('.right_col'),
  $NAV_MENU = $('.nav_menu'),
  $FOOTER = $('footer');

App.views.MainView = function (type) {
    this.type = type;
};


App.views.MainView.prototype.renderList = function (data, filterPreferences) {
    var self = this;
    data.printableElems = [];

    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].LIST)
      .then(function (templateData) {
          data = self.getPrintableAttributes(data);
          data.printableElems = self.formatDate(data.printableElems);
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences, 0);
      });
};

App.views.MainView.prototype.renderMyList = function (data, filterPreferences) {
    var self = this;

    data.printableElems = [];
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].MYLIST)
      .then(function (templateData) {
          data = self.getPrintableAttributes(data);
          data.printableElems = self.formatDate(data.printableElems);
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences, 1);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.views.MainView.prototype.renderCreate = function (data) {
    var q = Q.defer();
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].CREATE)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          $('#create-form').parsley().on('form:submit', function () {
              EventBus.dispatch(App.constants.events[self.type].CREATE, this, self.getFieldValues());
              return false;
          });
          q.resolve();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });

    return q.promise;
};

App.views.MainView.prototype.renderEdit = function (data) {
    var q = Q.defer();
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].EDIT)
      .then(function (templateData) {
          self.registerHandlebarsSelectHelper();
          self.renderHandlebars(templateData, data);
          $('#edit-form').parsley().on('form:submit', function () {
              EventBus.dispatch(App.constants.events[self.type].EDIT, this, self.getEditFieldValues());
              return false;
          });
          q.resolve();
      });

    return q.promise;
};

App.views.MainView.prototype.renderUploadContent = function () {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].UPLOADCONTENT)
      .then(function (templateData) {
          self.render(templateData);
      });

};

App.views.MainView.prototype.getIdFromHiddenField = function () {
    return $('#element-id').val() || null;
};

App.views.MainView.prototype.getIdFromButton = function (element) {
    return element.attributes['element-id'].value;
};

/**
 * Override this abstract method
 */
App.views.MainView.prototype.getFieldValues = function () {

};
/**
 * Override this abstract method
 */
App.views.MainView.prototype.getEditFieldValues = function () {

};

App.views.MainView.prototype.renderHandlebars = function (templateData, data) {
    var template = Handlebars.compile(templateData);

    data = data || [];
    this.render(template(data));
};

App.views.MainView.prototype.renderLoadingAnimation = function () {
    this.render('<div class="row" style="margin-top: 200px"><div class="col-sm-4 col-sm-offset-5"><img src="img/loading.svg"></div></div>');
};

App.views.MainView.prototype.renderDisclaimer = function () {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter.default_template.DISCLAIMER)
      .then(function (templateData) {
          self.renderHandlebars(templateData);
          $('#disclaimer-agree-button').bind('click', function () {
              EventBus.dispatch(App.constants.events.DISCLAIMER, this, true);
          });
      });

};

App.views.MainView.prototype.render = function (html) {
    $(App.constants.targetContainer).html(html);
    this.setContentHeight();
};

App.views.MainView.prototype.setContentHeight = function () {
    $RIGHT_COL.css('min-height', $(window).height());

    var bodyHeight = $BODY.outerHeight(),
      footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
      leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
      contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;

    $RIGHT_COL.css('min-height', contentHeight);
};


App.views.MainView.prototype.toggleMenuState = function (loginData) {
    var link = $('#login-menu-link');
    var role = null;

    // Show respective menu items
    if (!loginData) {
        link.html('Login');
        link.attr('href', '#login');
        $('.member').hide();
        $('.admin').hide();
    } else {
        role = loginData.roles[0] || '';
        link.html('Logout');
        link.attr('href', '#logout');
        if (role === 'member') {
            $('.member').show();
            $('.admin').hide();
        }
        else if (role === 'admin' || role === 'superuser') {
            $('.member').show();
            $('.admin').show();
        }
    }
};

App.views.MainView.prototype.setActiveItem = function (route) {
    var type = route[0] || '';
    var action = route[1] || '';

    $('li').removeClass('current-page');
    $('a[href$="' + type + '/' + action + '"]').parent().addClass('current-page');
};

App.views.MainView.prototype.clearView = function () {
    $(App.constants.messageContainer).html('');
    $(App.constants.targetContainer).html('');
};

App.views.MainView.prototype.createDatatableFilters = function (id) {
    // Setup - add a text input to each footer cell
    $('#' + id + ' tfoot th').each(function () {
        var title = $(this).text();
        $(this).html(title + '<input type="text" placeholder="Search" />');
    });

    // Create the column selection
    $('#filter_columns').append('<select id="select-column-filter" class="selectpicker" data-actions-box="true" multiple data-live-search="true"> </select>');
    $('#' + id + ' thead th').each(function (index) {
        var title = $(this).text();
        $('#select-column-filter').append('<option selected class="toggle-vis" uiName="' + title + '" data-column="' + index + '" >' + title + ' </option> ');
    });
};

App.views.MainView.prototype.addDatatablesSelect = function (table) {
    var self = this;

    $('#select-column-filter').on('changed.bs.select', function (e, clickedIndex, newValue) {
        var column;
        var visible = true;
        var attributes = [];
        var targets;

        if (typeof clickedIndex !== 'undefined') {
            column = table.column(clickedIndex);
            attributes.push({
                name: $('#select-column-filter option').eq(clickedIndex).attr('uiName'),
                selected: newValue
            });
            // Toggle the visibility
            column.visible(!column.visible());
        } else {
            // hide or show multiple columns
            targets = e.target || [];
            $.each(targets, function (index, item) {
                column = table.column(index);
                visible = item.selected;
                column.visible(visible);
                attributes.push({name: item.attributes.uiName.value, selected: visible});
            });
        }
        // Inform the controller that an item has been toggled
        EventBus.dispatch(App.constants.events[self.type].TOGGLE_COLUMN, self, {
            type: self.type,
            attributes: attributes
        });

    });

    table.buttons().container()
      .appendTo('#example_wrapper .col-sm-6:eq(0)');
};

App.views.MainView.prototype.addDatatablesSearch = function (table, data, filterPreferences) {
    var self = this;

    table.columns().every(function (index) {
        var that = this;
        var header = this.header();
        var currentColumn;
        var shownByDefault = true;
        var found = false;
        var i = 0;
        var item;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                  .search(this.value)
                  .draw();
            }
        });

        currentColumn = header.innerText;
        data.attributes = data.attributes || [];
        while (!found && i < data.attributes.length) {
            item = data.attributes[i];
            if (item.type.toLowerCase() === self.type && item.uiName === currentColumn) {
                shownByDefault = item.shownByDefault;
                found = true;
            }
            i++;
        }

        if ((filterPreferences[self.type] && filterPreferences[self.type][currentColumn] === false) || (!shownByDefault && (!filterPreferences || !filterPreferences[self.type] || !filterPreferences[self.type][currentColumn]))) {
            that.visible(false);
            $('#select-column-filter option').eq(index).prop('selected', false);
        }

    });
    $('.selectpicker').selectpicker();
};

App.views.MainView.prototype.initializeDataTable = function (id, data, filterPreferences, columnToOrderBy) {
    var self = this;
    var button;

    columnToOrderBy = columnToOrderBy || 0;
    self.createDatatableFilters(id);
    // DataTable
    var table = $('#' + id).DataTable({
        pageLength: 50,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        scrollX: true,
        order: [[columnToOrderBy, 'asc']],
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'copy', 'csv', 'excel'
        ],
        drawCallback: function () {
            $('.delete-button').on('click', function () {
                button = this;
                alertify.confirm('Delete an element', 'Are you sure you want to delete the element?', function () {
                    EventBus.dispatch(App.constants.events[self.type].DELETE, self, self.getIdFromButton(button));
                }, function () {
                    alertify.error('Canceled');
                });
            });
        }
    });

    self.addDatatablesSelect(table);
    self.addDatatablesSearch(table, data, filterPreferences);
    self.setContentHeight();
};

App.views.MainView.prototype.setRoute = function (route) {
    window.location.hash = route;
};


App.views.MainView.prototype.registerHandlebarsSelectHelper = function () {
    Handlebars.registerHelper("select", function (value, options) {
        return options.fn(this)
          .split('\n')
          .map(function (v) {
              var t = 'value="' + value + '"';
              return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"');
          })
          .join('\n');
    });
};

App.views.MainView.prototype.getPrintableAttributes = function (data) {
    var current;
    var currentAttribute;

    // copy the properties of each item
    data.entries.forEach(function (entry) {
        current = {};
        for (var property in entry) {
            if (entry.hasOwnProperty(property) && property !== 'attributes') {
                current[property] = entry[property];
            }
        }
        current.attributes = [];
        // check if the current entry has this Attribute otherwise set it to empty string
        data.attributes.forEach(function (attribute) {
            currentAttribute = {'attribute': attribute, 'value': 'Undefined'};
            entry.attributeInstances.forEach(function (attributeInstance) {
                if (attribute._id === attributeInstance.attribute._id) {
                    currentAttribute.value = attributeInstance.value;
                }
            });
            current.attributes.push(currentAttribute);
        });
        data.printableElems.push(current);
    });
    return data;
};

App.views.MainView.prototype.resizeChart = function (chart) {
    $(window).on('resize', function () {
        if (chart !== null && chart !== undefined) {
            chart.resize();
        }
    });
};

App.views.MainView.prototype.formatDate = function (entries) {
    var date;

    entries.map(function (item) {
        if (item.hasOwnProperty('createdAt')) {
            date = new Date(item.createdAt);
            item.createdAt = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }
        if (item.hasOwnProperty('updatedAt')) {
            date = new Date(item.updatedAt);
            item.updatedAt = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }
    });
    return entries;
};


