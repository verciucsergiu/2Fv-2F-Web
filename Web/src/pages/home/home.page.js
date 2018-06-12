
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
                this.switchDisplayHeaders();
                this.isLoggedIn = AuthService.isLoggedIn();
                this.$refresh();
            }.bind(this));

            this.switchDisplayHeaders = () => {
                document.getElementById('nav-prof').style.display = "none";
                document.getElementById('nav-admin').style.display = "none";
                document.getElementById('nav-stud').style.display = "none";
                document.getElementById('nav-log').style.display = "block";
                document.getElementById('nav-reg').style.display = "block";
            }
        });
})();