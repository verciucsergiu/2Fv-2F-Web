(() => {
    route('/page1',
        {
            templateUrl: './src/pages/login/login.page.html',
            styleUrl: './src/pages/login/login.page.css'
        },
        function () {
            this.loginTitle = 'login title from javascript';
        });
})();
