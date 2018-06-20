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
                    //console.log(this.students);
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

            this.$on('#importcsv', 'change', function () {
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
                //console.log("vtable " + sid);
                this.studentToEdit = this.getStudentOfID(sid);

                this.clicked = true;
                this.$refresh();
            }

            this.obsTableClicked = (sid) => {
                //console.log("obstable " + sid);
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
                let file = document.getElementById('importcsv').files[0];

                let fr = new FileReader();
                fr.onload = (event) => {
                    this.processcsv(event.target.result);
                }
                fr.readAsText(file);
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

            this.processcsv = (text) => {
                processed = text.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);

                if (processed[0] == "firstName,lastName,group,cnp,id,W0,W0,W1,W1,W2,W2,W3,W3,W4,W4,W5,W5,W6,W6,W7,W7,W8,W8,W9,W9,W10,W10,W11,W11,W12,W12") {
                    for (let i = 1; i < processed.length - 1; i++) {
                        let lineElements = processed[i].split(",");
                        //console.log(lineElements);

                        let id = this.searchID(lineElements[4]); // see if csv student exists in current group
                        if (id != -1) {
                            if (this.verifyIntegrity(lineElements, id) == true) { // see if the data in csv respects our "standard"
                                for (j = 0; j < 12; j++) {  // proceed
                                    this.students[id].attendanceComments[j].comment = lineElements[5 + j * 2];
                                    this.students[id].attendanceComments[j].value = lineElements[5 + j * 2 + 1];
                                }
                            } // a correct student was found
                        } // id if
                    } // for end
                    this.updateDB();
                } else {
                    alert("incompatible csv format");
                }
                this.$refresh();
                //console.log(this.students);
            }

            this.searchID = (id) => {
                for (let [index, stud] of this.students.entries()) {
                    if (stud.id == id) {
                        return index;
                    }
                }
                alert("Student from .csv file with id=[" + id + "] does not exist in this group.");
                return -1;
            }

            this.verifyIntegrity = (line, id) => {
                if (line[0] != this.students[id].firstName) { this.throwIntegrity(line[0], id); return false; }
                if (line[1] != this.students[id].lastName) { this.throwIntegrity(line[1], id); return false; }
                if (line[2] != this.students[id].group) { this.throwIntegrity(line[2], id); return false; }
                if (line[3] != this.students[id].cnp) { this.throwIntegrity(line[3], id); return false; }
                for (j = 0; j < 12; j++) {
                    if (line[5 + j * 2 + 1] != "")
                        if (!String(line[5 + j * 2 + 1]).match("^[0-9]*$")) { this.throwIntegrity(line[5 + j * 2 + 1] + " => only digits allowed", id); return false; }
                }
                return true;
            }

            this.throwIntegrity = (message, id) => {
                alert("Invalid field [" + message + "] at student row [" + id + "]");
            }

            this.updateDB = () => {
                for (let stud of this.students) {
                    services.StudentService.updateAttendance(stud.id, stud.attendanceComments,
                        (response) => {
                            if (response.statusCode == 204) {
                                this.$refresh();
                            }
                        }, (response) => {
                            console.log(response);
                            alert("update failed at student id [" + stud.id + "]. check console");
                        });
                }
            }
        });
})();
