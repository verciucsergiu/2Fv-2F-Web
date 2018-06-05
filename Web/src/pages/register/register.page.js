(() => {
    route('/register',
        {
            templateUrl: './src/pages/register/register.page.html',
            styleUrl: './src/pages/register/register.page.css',
            guard: 
            {
                canEnter: [AuthGuard],
                redirectTo: '/'
            }
        },
        function () {
            this.groups = [];
            this.t = 'dsa0';
            this.$onInit = () => {
                GroupService.getAllGroups((response) => {
                    this.groups = response.body;
                    this.$refresh();
                },
                () => {
                    this.groups = [];
                });
            }
        });
})();
