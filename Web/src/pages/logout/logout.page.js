
var rt = require('../../../framework/router');
var services = require('../../services/index');
(() => {
    rt.route('/logout',
        {
            template: ''
        },
        function () {
            services.AuthService.logout();
            rt.Router.navigate('');
        });
})();
