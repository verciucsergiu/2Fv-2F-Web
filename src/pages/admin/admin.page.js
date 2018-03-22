(() => {
    route('/admin',
        {
            templateUrl: './src/pages/admin/admin.page.html',
            styleUrl: './src/pages/admin/admin.page.css',
            guard: {
                canEnter: [AdminGuard],
                redirectTo: '/'
            }
        },
        function () {
            this.$onInit = function () {
                AuthService.setupVision();
            }
            this.$on('#invite','click',function () {
                alert('invited');
            }.bind(this));
            
        });
})();
