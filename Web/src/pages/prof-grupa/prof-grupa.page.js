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
                StudentService.getStudentsFromGroup(idGrupa, (response) => {
                    this.students = response.body;
                    console.log(this.students);
                }, (response) => {
                    console.log("err");
                })
            }

            this.$on('#group-back', 'click', function () {
                Router.navigate('/prof');
            }.bind(this));
        });
})();
