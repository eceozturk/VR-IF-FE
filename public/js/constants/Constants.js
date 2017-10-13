/**
 * Created by danielsilhavy on 01.08.16.
 */
var BASE_URL = 'http://127.0.0.1:3000/v1/';
//var BASE_URL = 'http://testassets.dashif.org:3000/v1/';

App.constants.requestParameter = {
    attribute: {
        GET: BASE_URL + 'attributes',
        CREATE: BASE_URL + 'myattributes',
        EDIT: BASE_URL + 'attributes',
        DELETE: BASE_URL + 'attributes',
        GET_MULTI: BASE_URL + 'attributes',
        MYLIST: BASE_URL + 'myattributes',
    },

    attribute_template: {
        LIST: 'template/attribute/list.html',
        CREATE: 'template/attribute/create.html',
        EDIT: 'template/attribute/edit.html',
        MYLIST: 'template/attribute/mylist.html',
    },


    testcontent: {
        GET: BASE_URL + 'testcontents',
        CREATE: BASE_URL + 'mytestcontents',
        EDIT: BASE_URL + 'testcontents',
        DELETE: BASE_URL + 'testcontents',
        GET_MULTI: BASE_URL + 'testcontents',
        MYLIST: BASE_URL + 'mytestcontents',
    },

    testcontent_template: {
        LIST: 'template/testcontent/list.html',
        CREATE: 'template/testcontent/create.html',
        EDIT: 'template/testcontent/edit.html',
        MYLIST: 'template/testcontent/mylist.html',
        DETAILS: 'template/testcontent/details.html',
        UPLOADCONTENT: 'template/testcontent/uploadcontent.html',
    },
    testvector: {
        GET: BASE_URL + 'testvectors',
        CREATE: BASE_URL + 'mytestvectors',
        EDIT: BASE_URL + 'testvectors',
        DELETE: BASE_URL + 'testvectors',
        GET_MULTI: BASE_URL + 'testvectors',
        MYLIST: BASE_URL + 'mytestvectors',
        GROUPED_LIST: BASE_URL + 'testvectors/groupedlist',
    },

    testvector_template: {
        LIST: 'template/testvector/list.html',
        CREATE: 'template/testvector/create.html',
        EDIT: 'template/testvector/edit.html',
        MYLIST: 'template/testvector/mylist.html',
        GROUPED_LIST: 'template/testvector/groupedList.html',
        DETAILS: 'template/testvector/details.html',
    },

    user: {
        GET: BASE_URL + 'users',
        CREATE: BASE_URL + 'users',
        EDIT: BASE_URL + 'users',
        DELETE: BASE_URL + 'users',
        GET_MULTI: BASE_URL + 'users',
    },

    user_template: {
        LIST: 'template/user/list.html',
        CREATE: 'template/user/create.html',
        EDIT: 'template/user/edit.html',
    },

    default_template: {
        INDEX: 'template/default/index.html',
        FAQ: 'template/default/faq.html',
        DISCLAIMER: 'template/default/disclaimer.html'
    },

    statistic: {
        SIZE: BASE_URL + 'statistics/size',
        TESTVECTOR_TYPES: BASE_URL + 'statistics/testvector/types',
        TESTCONTENT_TYPES: BASE_URL + 'statistics/testcontents/types'
    },

    LOGIN_USER: BASE_URL + 'users/login',
    LOGIN_TEMPLATE: 'template/login/login.html',
    ERROR_TEMPLATE: 'template/notifications/error.html',
    SUCCESS_TEMPLATE: 'template/notifications/success.html'
};

App.constants.targetContainer = '#mainContainer';
App.constants.messageContainer = '#messageContainer';

App.constants.events = {
    attribute: {
        CREATE: 'createAttribute',
        DELETE: 'deleteAttribute',
        EDIT: 'editAttribute',
    },
    testcontent: {
        CREATE: 'createTestcontent',
        DELETE: 'deleteTestcontent',
        EDIT: 'editTestcontent',
        TOGGLE_COLUMN: 'toggleColumnTestcontent'
    },
    testvector: {
        CREATE: 'createTestvector',
        DELETE: 'deleteTestvector',
        EDIT: 'editTestvector',
        TOGGLE_COLUMN: 'toggleColumnTestvector'
    },
    user: {
        CREATE: 'createUser',
        DELETE: 'deleteUser',
        EDIT: 'editUser',
    },
    LOGIN: 'login',
    DISCLAIMER: 'disclaimer'
};

App.constants.types = {
    TESTCONTENT: 'Testcontent',
    TESTVECTOR: 'Testvector'
};

App.constants.pagination = {
    LIMIT: 25
};