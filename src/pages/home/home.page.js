(() => {
    route('/',
        {
            templateUrl: './src/pages/home/home.page.html',
            styleUrl: './src/pages/home/home.page.css'
        },
        function () {
            this.$onInit = function () {
                console.log('home page init');
            };
            this.$onLeave = function () {
                console.log('leaving home page! :(');
            }
        });
})();