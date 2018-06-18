var g = require('../../guards/auth.guard');
var rt = require('../../../framework/router');
var services = require('../../services/index');
var models = require('../../models');
(() => {
    rt.route('/register',
        {
            templateUrl: './src/pages/register/register.page.html',
            styleUrl: './src/pages/register/register.page.css',
            guard:
                {
                    canEnter: [g.AuthGuard],
                    redirectTo: '/'
                }
        },
        function () {

            this.regusername;
            this.regpassword;
            this.regpasswordCheck;
            this.regemail;
            this.regcnp;
            this.role = "stud";

            this.registerError = false;
            this.regend = false;
            this.t = 'dsa0';

            this.$on('#regsubmit', 'click', function () {
                this.startRegister(new models.RegisterModel(this.regusername, this.regpassword, this.regemail, this.regcnp, this.role));
            }.bind(this));

            this.startRegister = (registerModel) => {
                if (registerModel.password === this.regpasswordCheck && registerModel.password != null)
                    if (registerModel.cnp != null && registerModel.username != null && registerModel.email != null)
                        if (registerModel.email.includes("@") == true) {
                            services.AuthService.requestRegister(registerModel, this.registerCallback, this.errRegisterCallback);
                            return;
                        }
                this.registerError = true;
                this.$refresh();
            }

            this.registerCallback = (response) => {
                this.regend = true;
                rt.Router.navigate('');
                this.$refresh();
            }

            this.errRegisterCallback = (response) => {
                console.log("error" + response);
            }
        });
})();
