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
                    this.students.map((x) => x.attendanceComments.sort((a, b) => {
                        return a.weekNumber > b.weekNumber;
                    }));
                    console.log(this.students);
                    this.$refresh();
                }, (response) => {
                    console.log("err");
                })
            }

            this.$on('#group-back', 'click', function () {
                Router.navigate('/prof');
            }.bind(this));
        });
})();
