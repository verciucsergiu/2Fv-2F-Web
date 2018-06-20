var g = require('../../guards/prof.guard');
var rt = require('../../../framework/router');
var services = require('../../services/index');
var codebird = require('../../../node_modules/codebird');

(() => {
    rt.route('/prof-grupa/:idGrupa',
        {
            templateUrl: './src/pages/prof-grupa/prof-grupa.page.html',
            styleUrl: './src/pages/prof-grupa/prof-grupa.page.css',
            guard:
                {
                    canEnter: [g.ProfGuard],
                    redirectTo: '/'
                }
        },
        function (idGrupa) {

            this.cb = new codebird;
            this.clicked = false;
            this.studentToEdit = {};
            this.studentToEditID = "";

            this.idGrupa = idGrupa;
            this.students = [];
            this.$onInit = () => {
                //codebird
                if (services.AuthService.getTwitterSecret() != false) {
                    this.cb.setConsumerKey('qNmVG4mMKW76TNI9pPhSRwt1h', 'HDqJqH47FVNnb8PATfaTHEQiqnmQcpWS77sVNZNNaJwBPF1nBE');
                    this.cb.setToken(services.AuthService.getTwitterToken(), services.AuthService.getTwitterSecret());
                }
                //codebird

                services.StudentService.getStudentsFromGroup(idGrupa, (response) => {
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

            // ---------------------------------------------
            this.$on('#group-back', 'click', function () {
                rt.Router.navigate('/prof');
            }.bind(this));

            this.$on('#importcsv', 'click', function () {
                this.importcsv();
            }.bind(this));

            this.$on('#exportcsv', 'click', function () {
                this.exportcsv();
            }.bind(this));

            this.$on('#exportxml', 'click', function () {
                this.exportxml();
            }.bind(this));

            this.$on('#exporthtml', 'click', function () {
                this.exporthtml();
            }.bind(this));
            this.$on('#share-group-status', 'click', function () {
                this.shareGroup();
            }.bind(this));
            // ---------------------------------------------
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
                services.StudentService.updateAttendance(this.students[this.studentToEditID].id, this.students[this.studentToEditID].attendanceComments,
                    (response) => {
                        if (response.statusCode == 204) {
                            this.$refresh();
                        }
                    }, (response) => {
                        alert(response.statusCode);
                    });
            }

            this.importcsv = () => {
                alert("import csv");
            }

            this.exportcsv = () => {
                services.ExporterService.exportStudentListCSV(this.students);
            }

            this.exportxml = () => {
                services.ExporterService.exportStudentListXML(this.students);
            }

            this.exporthtml = () => {
                services.ExporterService.exportStudentListHTML(this.students);
            }

            this.shareGroup = () => {
                this.cb.__call(
                    "statuses_update",
                    { "status": "Status updated! \n" + "http://localhost:3000/#/download-group/" + idGrupa },
                    (reply) => {
                        alert('succes');
                    }
                );
            }
        });
})();
