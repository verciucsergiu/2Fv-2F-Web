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

            this.clicked = false;
            this.studentToEdit = {};
            this.studentToEditID = "";

            this.idGrupa = idGrupa;
            this.students = [];
            this.$onInit = () => {
                StudentService.getStudentsFromGroup(idGrupa, (response) => {
                    this.students = response.body;
                    this.students.map((x) => x.attendanceComments.sort((a, b) => {
                        return a.weekNumber > b.weekNumber;
                    }));
                    console.log(this.students);
                    this.initTableButtons();
                    this.studentToEdit = this.students[0];
                    this.$refresh();
                }, (response) => {
                    console.log("err");
                })
            }

            this.$on('#group-back', 'click', function () {
                Router.navigate('/prof');
            }.bind(this));

            this.initTableButtons = () => {

                for (let student of this.students) {
                    this.$on('#editstudent' + student.id, 'click', function () {
                        this.valuesTableClicked(student.id);
                    }.bind(this));
                }

                this.$on('#edit-save', 'click', function () {
                    this.saveChanges();
                }.bind(this));
            }

            this.valuesTableClicked = (sid) => {
                console.log("vtable " + sid);
                this.studentToEdit = this.getStudentOfID(sid);

                this.clicked = true;
                this.$refresh();
            }

            this.obsTableClicked = (sid) => {
                console.log("obstable " + sid);
                this.studentToEdit = this.getStudentOfID(sid);

                this.clicked = true;
                this.$refresh();
            }

            this.getStudentOfID = (id) => {
                for (let [index, stud] of this.students.entries()) {
                    if (stud.id == id) {
                        this.studentToEditID = index;
                        return stud;
                    }
                }
            }

            this.saveChanges = () => {
                this.clicked = false;

                for (i = 0; i < 13; i++) {
                    this.studentToEdit.attendanceComments[i].comment = document.getElementById("editC" + i).value ? document.getElementById("editC" + i).value : "";
                    this.studentToEdit.attendanceComments[i].value = document.getElementById("editV" + i).value ? document.getElementById("editV" + i).value : "";
                }

                this.students[this.studentToEditID] = this.studentToEdit;

                this.updateStudentAttendance();
                this.$refresh();
            }

            this.updateStudentAttendance = () => {
                StudentService.updateAttendance(this.students[this.studentToEditID].id, this.students[this.studentToEditID].attendanceComments, 
                    (response) => {
                        if(response.statusCode == 204){
                            this.$refresh();
                        }
                },  (response) => {
                        alert(response.statusCode);
                });
            }
        });
})();
