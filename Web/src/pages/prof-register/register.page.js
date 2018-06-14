(() => {
    route('/register/professor/:registerid',
        {
            templateUrl: './src/pages/prof-register/register.page.html',
            styleUrl: './src/pages/prof-register/register.page.css',
            guard:
                {
                    canEnter: [AuthGuard],
                    redirectTo: '/'
                }
        },
        function (registerid) {

            this.registerid = registerid;

            this.regusername;
            this.regpassword;
            this.regpasswordCheck;
            this.regemail;
            this.regcnp;
            this.role = "prof";

            this.registerError = false;
            this.regend = false;
            this.t = 'dsa0';

            this.$onInit = () => {
                InvitationService.lookup(this.registerid, this.lookupcb, this.lookuperr)
            }

            this.lookupcb = (response) => {
                if (response.statusCode == 200) {
                    this.regemail = response.body.emailModel.email;
                } else {
                    alert("Invite Expired")
                    Router.navigate('#');
                }
            }

            this.lookuperr = () => {
                alert("Server Error");
                Router.navigate('#');
            }

            this.$on('#regsubmit', 'click', function () {
                this.startRegister(new RegisterModel(this.regusername, this.regpassword, this.regemail, this.regcnp, this.role));
            }.bind(this));

            this.startRegister = (registerModel) => {
                if (registerModel.password === this.regpasswordCheck && registerModel.password != null)
                    if (registerModel.cnp != null && registerModel.username != null && registerModel.email != null)
                        if (registerModel.email.includes("@") == true) {
                            AuthService.requestProfessorRegister(registerModel, this.registerCallback, this.errRegisterCallback);
                            return;
                        }
                this.registerError = true;
                this.$refresh();
            }

            this.registerCallback = (response) => {
                this.regend = true;
                console.log(response);
                this.$refresh();
            }

            this.errRegisterCallback = (response) => {
                console.log("error" + response);
            }
        });
})();
