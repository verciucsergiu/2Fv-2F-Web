(() => {
    route('/',
        {
            templateUrl: './src/pages/home/home.page.html',
            styleUrl: './src/pages/home/home.page.css'
        },
        function () {
            this.isLoggedIn = true;
            this.$onInit = function () {
                console.log('home page init');
                this.isLoggedIn = authService.isLoggedIn();
            };
            this.$onLeave = function () {
                console.log('leaving home page! :(');
            }
            this.$on('#logout', 'click', function () {
                authService.logout();
                this.isLoggedIn = authService.isLoggedIn();
                this.$refresh();
            }.bind(this));
        });
})();
