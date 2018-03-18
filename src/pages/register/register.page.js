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

        });
})();
