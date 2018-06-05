
(() => {
    route('/', {
            templateUrl: './src/pages/home/home.page.html',
            styleUrl: './src/pages/home/home.page.css'
        },
        function () {
            this.demo = '';
            this.isLoggedIn = true;
            this.$onInit = function () {
                this.isLoggedIn = AuthService.isLoggedIn();
            };
            this.$on('#modify', 'click', function () {
                this.demo = 'Priviledge: ***' + AuthService.getUserRole() + '*** with name: ***' + AuthService.getUsername() + '***';
                this.$refresh();
            }.bind(this));
            this.$on('#logout', 'click', function () {
                AuthService.logout();
                this.isLoggedIn = AuthService.isLoggedIn();
                this.$refresh();
            }.bind(this));
        });
})();