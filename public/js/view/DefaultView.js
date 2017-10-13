/**
 * Created by danielsilhavy on 04.08.16.
 */

App.views.DefaultView = function () {
    App.views.MainView.call(this, 'default');
};

App.views.DefaultView.prototype = new App.views.MainView();
App.views.DefaultView.prototype.constructor = App.views.DefaultView;

App.views.DefaultView.prototype.renderIndex = function (data) {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter.default_template.INDEX)
      .then(function (templateData) {
          data = self.setActivities(data);
          self.renderHandlebars(templateData, data);
          //self.createDonutTc(data.testcontentTypes);
          //self.createDonutTv(data.testvectorTypes);
          self.createDonutTvTcF(data.testvectorTypes);
      })
      .catch(function (err) {
          throw new Error(err);
      });
};

App.views.DefaultView.prototype.renderFAQ = function () {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter.default_template.FAQ)
      .then(function (templateData) {
          self.renderHandlebars(templateData);
      });
};

App.views.DefaultView.prototype.setActivities = function (data) {
    var additions = [];
    var updates = [];
    var self = this;

    data.testvectorTypes.forEach(function (elem) {
        self.createActivityEntry(elem, 'Testvector', additions, updates);
    });
    data.testcontentTypes.forEach(function (elem) {
        self.createActivityEntry(elem, 'Testcontent', additions, updates);
    });
    data.additions = additions.sort(this.sortByDate).slice(0, 5);
    data.updates = updates.sort(this.sortByDate).slice(0, 5);
    return data;
};

App.views.DefaultView.prototype.createActivityEntry = function (elem, type, additions, updates) {
    var createdAt = new Date(1970, 1, 1);
    var updatedAt = new Date(1970, 1, 1);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var urlTypes = {
        'Testcontent': 'testcontent',
        'Testvector': 'testvector'
    };
    var detailsUrl = '#' + urlTypes[type] + '/details/' + elem._id;

    if (elem.createdAt) {
        createdAt = new Date(elem.createdAt);
    }
    if (elem.updatedAt) {
        updatedAt = new Date(elem.updatedAt);
    }
    additions.push({
        type: type,
        date: {full: createdAt, month: months[createdAt.getMonth()], day: createdAt.getDate()},
        name: elem.name,
        detailsUrl: detailsUrl
    });
    updates.push({
        type: type,
        date: {full: updatedAt, month: months[updatedAt.getMonth()], day: updatedAt.getDate()},
        name: elem.name,
        detailsUrl: detailsUrl
    });
};


App.views.DefaultView.prototype.sortByDate = function (a, b) {
    return new Date(b.date.full) - new Date(a.date.full);
};

App.views.DefaultView.prototype.createDonutF = function (data) {
    var currentFeatureGroups = [];
    var featureGroups = [];
    var featureGroupNames = [];
    var myChart = echarts.init(document.getElementById('donutF'));

    data = data || [];
    data.forEach(function (item) {
        if (!currentFeatureGroups[item.featureGroup._id]) {
            currentFeatureGroups[item.featureGroup._id] = {
                value: 1,
                name: item.featureGroup.name
            };
        } else {
            currentFeatureGroups[item.featureGroup._id].value += 1;
        }
    });


    for (var fg in currentFeatureGroups) {
        if (currentFeatureGroups.hasOwnProperty(fg)) {
            featureGroupNames.push(currentFeatureGroups[fg].name);
            featureGroups.push(currentFeatureGroups[fg]);
        }
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: featureGroupNames
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        calculable: true,
        series: [{
            name: 'Features per Feature Group',
            type: 'pie',
            radius: [25, 90],
            center: ['50%', 170],
            roseType: 'area',
            x: '50%',
            max: 40,
            sort: 'ascending',
            data: featureGroups,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    }
                }
            },
        }]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);
};

App.views.DefaultView.prototype.createDonutTc = function (data) {
    var currentFeatureGroups = [];
    var currentFeatures = [];
    var features = [];
    var featureGroups = [];
    var myChart = echarts.init(document.getElementById('donutTc'));

    data = data || [];
    data.forEach(function (item) {
        if (!currentFeatures[item.feature._id]) {
            currentFeatures[item.feature._id] = {
                value: 1,
                name: item.feature.name
            };
        } else {
            currentFeatures[item.feature._id].value += 1;
        }
        if (!currentFeatureGroups[item.feature.featureGroup._id]) {
            currentFeatureGroups[item.feature.featureGroup._id] = {
                value: 1,
                name: item.feature.featureGroup.name
            };
        } else {
            currentFeatureGroups[item.feature.featureGroup._id].value += 1;
        }
    });


    for (var f in currentFeatures) {
        if (currentFeatures.hasOwnProperty(f)) {
            features.push(currentFeatures[f]);
        }
    }
    for (var fg in currentFeatureGroups) {
        if (currentFeatureGroups.hasOwnProperty(fg)) {
            featureGroups.push(currentFeatureGroups[fg]);
        }
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'left',
            data: featureGroups
        },
        calculable: false,
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        series: [
            {
                name: 'Feature Group',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, 70],

                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,

                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    }
                },
                data: featureGroups
            },
            {
                name: 'Feature',
                type: 'pie',
                radius: [100, 140],

                // for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,

                data: features
            }
        ]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);
};

App.views.DefaultView.prototype.createDonutTv = function (data) {
    var currentFeatureGroups = [];
    var currentFeatures = [];
    var features = [];
    var featureGroups = [];
    var myChart = echarts.init(document.getElementById('donutTv'));

    data = data || [];
    data.forEach(function (item) {
        item.testcontents.forEach(function (tc) {
            if (!currentFeatures[tc.feature._id]) {
                currentFeatures[tc.feature._id] = {
                    value: 1,
                    name: tc.feature.name
                };
            } else {
                currentFeatures[tc.feature._id].value += 1;
            }
            if (!currentFeatureGroups[tc.feature.featureGroup._id]) {
                currentFeatureGroups[tc.feature.featureGroup._id] = {
                    value: 1,
                    name: tc.feature.featureGroup.name
                };
            } else {
                currentFeatureGroups[tc.feature.featureGroup._id].value += 1;
            }
        });
    });

    for (var f in currentFeatures) {
        if (currentFeatures.hasOwnProperty(f)) {
            features.push(currentFeatures[f]);
        }
    }
    for (var fg in currentFeatureGroups) {
        if (currentFeatureGroups.hasOwnProperty(fg)) {
            featureGroups.push(currentFeatureGroups[fg]);
        }
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'left',
            data: featureGroups
        },
        calculable: false,
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        series: [
            {
                name: 'Feature Group',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, 70],

                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,

                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    }
                },
                data: featureGroups
            },
            {
                name: 'Feature',
                type: 'pie',
                radius: [100, 140],

                // for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,

                data: features
            }
        ]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);
};

App.views.DefaultView.prototype.createDonutTvTcF = function (data) {
    var currentTestcontents = [];
    var testcontents = [];
    var myChart = echarts.init(document.getElementById('donutTvTcF'));

    data = data || [];
    data.forEach(function (item) {
        item.testcontents.forEach(function (tc) {
            if (!currentTestcontents[tc._id]) {
                currentTestcontents[tc._id] = {
                    value: 1,
                    name: tc.name
                };
            } else {
                currentTestcontents[tc._id].value += 1;
            }
        });
    });

    for (var tc in currentTestcontents) {
        if (currentTestcontents.hasOwnProperty(tc)) {
            testcontents.push(currentTestcontents[tc]);
        }
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        calculable: false,
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        series: [
            {
                name: 'Testcontent',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, 70],

                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,

                data: testcontents
            },
        ]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);

};





