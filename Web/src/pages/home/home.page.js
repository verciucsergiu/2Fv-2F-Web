var rt = require('../../../framework/router');
(() => {
    rt.route('/', {
        templateUrl: './src/pages/home/home.page.html',
        styleUrl: './src/pages/home/home.page.css'
    },
        function () {
        });
})();