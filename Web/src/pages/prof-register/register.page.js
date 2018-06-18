var g = require('../../guards/auth.guard');
var rt = require('../../../framework/router');
var services = require('../../services/index');
var models = require('../../models');
(() => {
    rt.route('/register/professor/:registerid',
        {
            templateUrl: './src/pages/prof-register/register.page.html',
            styleUrl: './src/pages/register/register.page.css',
            guard:
                {
                    canEnter: [g.AuthGuard],
                    redirectTo: '/'
                }
        },
        function (registerid) {

            this.registerid = registerid;

            this.regusername = '';
            this.regfirstname = '';
            this.reglastname = '';
            this.regpassword = '';
            this.regpasswordCheck = '';
            this.regemail = '';
            this.role = "prof";

            this.registerError = false;
            this.regend = false;

            this.$onInit = () => {
                if (services.AuthService.isLoggedIn()) {
                    rt.Router.navigate('');
                    this.$refresh();
                }

                services.InvitationService.lookup(this.registerid, this.lookupcb, this.lookuperr)
            }

            this.lookupcb = (response) => {

                if (response.statusCode == 200) {
                    this.regemail = response.body.emailModel.email;
                } else {
                    alert("Invite Expired")
                    rt.Router.navigate('');
                }

                this.$refresh();
            }

            this.lookuperr = () => {
                alert("Something went wrong. Please try again later or contact an admin!");
                rt.Router.navigate('');
            }

            this.$on('#regsubmit', 'click', function () {
                this.startRegister(new models.ProfRegisterModel(this.regusername, this.regfirstname, this.reglastname, this.regpassword, this.regemail, this.role));
            }.bind(this));

            this.startRegister = (registerModel) => {
                if (registerModel.password === this.regpasswordCheck && registerModel.password != null)
                    if (registerModel.username != null && registerModel.email != null)
                        if (registerModel.email.includes("@") == true) {
                            services.AuthService.requestProfessorRegister(registerModel, this.registerCallback, this.errRegisterCallback);
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
