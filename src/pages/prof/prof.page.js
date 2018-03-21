(() => {
    route('/prof',
        {
            templateUrl: './src/pages/prof/prof.page.html',
            styleUrl: './src/pages/prof/prof.page.css',
            guard: {
                canEnter: [ProfGuard],
                redirectTo: '/'
            }
        },
        function () {
            this.username = '';
            this.groups = ['B4', 'B6']
            this.$onInit = function () {
                this.username = AuthService.getUsername();
                for (let group of this.groups) {
                    this.$on('#' + group, 'click', function () {
                        this.clickGroup(group);
                    }.bind(this));
                }
            };

            this.clickGroup = (id) => {
                Router.navigate('/prof-grupa', id);
            }
        });
})();
