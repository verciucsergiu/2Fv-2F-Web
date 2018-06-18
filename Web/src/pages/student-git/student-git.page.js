var g = require('../../guards/student.guard');
var rt = require('../../../framework/router');

(() => {
    rt.route('/student-add-git', {
        templateUrl: './src/pages/student-git/student-git.page.html',
        styleUrl: './src/pages/student-git/student-git.page.css',
        guard: {
            canEnter: [g.StudentGuard],
            redirectTo: '/'
        }
    },

    
        function () {
            this.token = '';

            this.$on('#submit-add-token', 'click', function () {
                if (this.token) {
                    services.StudentService.addToken(this.token, () => {
                        rt.Router.navigate('');
                    });
                }
            }.bind(this));
        }
    );
})();