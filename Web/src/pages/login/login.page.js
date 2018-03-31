(() => {
    route('/login',
        {
            templateUrl: './src/pages/login/login.page.html',
            styleUrl: './src/pages/login/login.page.css',
            guard: {
                canEnter: [AuthGuard],
                redirectTo: '/'
            }
        },
        function () {
            this.$onInit = function () {
                AuthService.setupVision();
            }
            
            this.username = '';
            this.password = '';

            this.loginError = false;
            this.$on('#submit', 'click', function () {
                AuthService.login(new LoginModel(this.username, this.password),
                    () => {
                        Router.navigate('/');
                    },
                    () => {
                        this.loginError = true;
                        this.$refresh();
                    }
                );
            }.bind(this));

        });
})();
