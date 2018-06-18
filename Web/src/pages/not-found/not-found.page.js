var rt = require('../../../framework/router');
(() => {
    rt.route('*',
        {
            templateUrl: './src/pages/not-found/not-found.page.html',
            styleUrl: './src/pages/not-found/not-found.page.css'
        },
        function () {
        });
})();
