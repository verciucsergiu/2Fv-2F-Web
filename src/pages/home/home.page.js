(() => {
    route('/',
        {
            templateUrl: './src/pages/home/home.page.html',
            styleUrl: './src/pages/home/home.page.css'
        },
        function () {
            this.demo = '';
            this.isLoggedIn = true;
            this.$onInit = function () {
                this.isLoggedIn = authService.isLoggedIn();
            };
            this.$on('#modify', 'click', function () {
                this.demo = 'modified from javascript!';
                this.$refresh()
            }.bind(this));
            this.$on('#logout', 'click', function () {
                authService.logout();
                this.isLoggedIn = authService.isLoggedIn();
                this.$refresh();
            }.bind(this));
        });
})();
