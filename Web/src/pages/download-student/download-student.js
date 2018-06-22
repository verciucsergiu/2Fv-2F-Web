var g = require('../../guards/student.guard');
var rt = require('../../../framework/router');
var services = require('../../services/index');

(() => {
    rt.route('/download-student/:student',
        {
            templateUrl: './src/pages/download-student/download-student.html',
            styleUrl: './src/pages/download-student/download-student.css',
            guard:
                {
                    canEnter: [g.StudentGuard],
                    redirectTo: '/'
                }
        },
        function (student) {

            this.studentid = student;
            this.students = {};
            this.identity = {};

            this.$onInit = () => {


                let group = this.studentid.slice(this.studentid.length - 2);
                this.studentid = this.studentid.split("_")[0];

                console.log(group);
                console.log(this.studentid);

                services.StudentService.getStudentsFromGroup(group, (response) => {
                    this.students = response.body;
                    this.students.map((x) => x.attendanceComments.sort((a, b) => {
                        return a.weekNumber > b.weekNumber;
                    }));

                    for (let stud of this.students) {
                        if (stud.id == this.studentid)
                            this.identity = stud;
                    }

                    this.$refresh();

                }, (response) => {
                    console.log("err");
                })
            }

            // ---- exports ---------

            this.$on('#exportcsvstd', 'click', function () {
                this.exportcsvstd();
            }.bind(this));

            this.$on('#exportxmlstd', 'click', function () {
                this.exportxmlstd();
            }.bind(this));

            this.$on('#exporthtmlstd', 'click', function () {
                this.exporthtmlstd();
            }.bind(this));

            // ----------------------

            this.exportcsvstd = () => {
                let loneArray = [];
                loneArray.push(this.identity);
                services.ExporterService.exportStudentListCSVWithSocialMedia(loneArray);
            }

            this.exportxmlstd = () => {
                let loneArray = [];
                loneArray.push(this.identity);
                services.ExporterService.exportStudentListXMLWithSocialMedia(loneArray);
            }

            this.exporthtmlstd = () => {
                let loneArray = [];
                loneArray.push(this.identity);
                services.ExporterService.exportStudentListHTMLWithSocialMedia(loneArray);
            }
        });
})();
