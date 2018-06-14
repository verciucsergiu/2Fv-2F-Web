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

            this.username = '';
            this.password = '';

            this.loginError = false;
            this.$on('#submit', 'click', function () {
                let loginModel = new LoginModel(this.username, this.password);
                AuthService.login(loginModel,
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
