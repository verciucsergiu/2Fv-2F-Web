(() => {
    route('/login',
        {
            templateUrl: './src/pages/login/login.page.html',
            styleUrl: './src/pages/login/login.page.css',
            guard: {
                canEnter: () => !authService.isLoggedIn(),
                redirectTo: '/'
            }
        },
        function () {
            this.username = '';
            this.password = '';

            this.loginError = false;
            this.$on('#submit', 'click', function () {
                authService.login(new LoginModel(this.username, this.password),
                    () => {
                        router.navigate('/');
                    },
                    () => {
                        this.loginError = true;
                        this.$refresh();
                    }
                );
            }.bind(this));

        });
})();
