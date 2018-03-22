(() => {
    route('/prof-grupa/:idGrupa',
        {
            templateUrl: './src/pages/prof-grupa/prof-grupa.page.html',
            styleUrl: './src/pages/prof-grupa/prof-grupa.page.css',
            guard: 
            {
                canEnter: [ProfGuard],
                redirectTo: '/'
            }
        },
        function (idGrupa) {
            this.idGrupa = idGrupa;
            this.students = [];
            this.$onInit = () => {
                AuthService.setupVision();
                this.students = StudentService.getStudents(this.idGrupa);
            }

            this.$on('#group-back', 'click', function() {
                Router.navigate('/prof');
            }.bind(this));
        });
})();
