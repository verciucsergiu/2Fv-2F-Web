var g = require('../../guards/student.guard');
var rt = require('../../../framework/router');
var services = require('../../services/index');

(() => {
    rt.route('/download-group/:group',
        {
            templateUrl: './src/pages/download-group/download-group.html',
            styleUrl: './src/pages/download-group/download-group.css',
            guard:
                {
                    canEnter: [g.StudentGuard],
                    redirectTo: '/'
                }
        },
        function (group) {

            this.students = {};

            this.$onInit = () => {
                services.StudentService.getStudentsFromGroup(group, (response) => {
                    this.students = response.body;
                    this.students.map((x) => x.attendanceComments.sort((a, b) => {
                        return a.weekNumber > b.weekNumber;
                    }));
                    services.ExporterService.exportStudentListCSV(this.students);
                }, (response) => {
                    console.log("err");
                })
            }
        });
})();
