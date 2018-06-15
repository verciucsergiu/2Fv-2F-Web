(() => {
    route('/student-add-git', {
        templateUrl: './src/pages/student-git/student-git.page.html',
        styleUrl: './src/pages/student-git/student-git.page.css',
        guard: {
            canEnter: [StudentGuard],
            redirectTo: '/'
        }
    },

        function () {
            this.token = '';

            this.$on('#submit-add-token', 'click', function () {
                if (this.token) {
                    StudentService.addToken(this.token, () => {
                        Router.navigate('');
                    });
                }
            }.bind(this));
        }
    );
})();