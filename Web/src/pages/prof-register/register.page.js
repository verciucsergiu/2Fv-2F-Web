(() => {
    route('/register/professor/:registerid',
        {
            templateUrl: './src/pages/prof-register/register.page.html',
            styleUrl: './src/pages/register/register.page.css',
            guard:
                {
                    canEnter: [AuthGuard],
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
                if (AuthService.isLoggedIn()) {
                    Router.navigate('');
                    this.$refresh();
                }

                InvitationService.lookup(this.registerid, this.lookupcb, this.lookuperr)
            }

            this.lookupcb = (response) => {

                if (response.statusCode == 200) {
                    this.regemail = response.body.emailModel.email;
                } else {
                    alert("Invite Expired")
                    Router.navigate('');
                }

                this.$refresh();
            }

            this.lookuperr = () => {
                alert("Something went wrong. Please try again later or contact an admin!");
                Router.navigate('');
            }

            this.$on('#regsubmit', 'click', function () {
                this.startRegister(new ProfRegisterModel(this.regusername, this.regfirstname, this.reglastname, this.regpassword, this.regemail, this.role));
            }.bind(this));

            this.startRegister = (registerModel) => {
                if (registerModel.password === this.regpasswordCheck && registerModel.password != null)
                    if (registerModel.username != null && registerModel.email != null)
                        if (registerModel.email.includes("@") == true) {
                            AuthService.requestProfessorRegister(registerModel, this.registerCallback, this.errRegisterCallback);
                            return;
                        }
                this.registerError = true;
                this.$refresh();
            }

            this.registerCallback = (response) => {
                this.regend = true;
                Router.navigate('');
                this.$refresh();
            }

            this.errRegisterCallback = (response) => {
                console.log("error" + response);
            }
        });
})();
