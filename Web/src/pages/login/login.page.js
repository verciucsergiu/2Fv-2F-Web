var g = require('../../guards/auth.guard');
var rt = require('../../../framework/router');
var services = require('../../services/index');
var models = require('../../models');
(() => {
    rt.route('/login',
        {
            templateUrl: './src/pages/login/login.page.html',
            styleUrl: './src/pages/login/login.page.css',
            guard: {
                canEnter: [g.AuthGuard],
                redirectTo: '/'
            }
        },
        function () {

            this.username = '';
            this.password = '';

            this.loginError = false;
            this.$on('#submit', 'click', function () {
                let loginModel = new models.LoginModel(this.username, this.password);
                services.AuthService.login(loginModel,
                    () => {
                        rt.Router.navigate('/');
                    },
                    () => {
                        this.loginError = true;
                        this.$refresh();
                    }
                );
            }.bind(this));

        });
})();
