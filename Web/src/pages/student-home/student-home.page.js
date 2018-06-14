(() => {
    route('/student-home', {
        templateUrl: './src/pages/student-home/student-home.page.html',
        styleUrl: './src/pages/student-home/student-home.page.css',
        guard: {
            canEnter: [StudentGuard],
            redirectTo: '/'
        }
    },

        function () {
            this.group = "b4";
            this.username = "jack23";
            this.studentName = "";
            this.showPopup = false;
            this.info = [];
            this.attendanceArray = [];
            this.id = 1;
            this.computeChance = (prezente) => {
                if (prezente > 2) return "DA";
                return "NU";
            }
            this.$onInit = () => {
                StudentService.getStudentDetails((response) => {
                    console.log(response.body);
                });
                StudentService.getStudentsFromGroup(this.group, this.callback, this.lookuperr);
            }

            this.callback = (response) => {
                let jsonResponse = response.body;
                for (let student of jsonResponse) {
                    this.studentName = student.firstName + ' ' + student.lastName;
                    this.info.push(student);
                    if (this.id = student.id) {
                        for (let attendance of student.attendanceComments) {
                            this.attendanceArray.push(attendance);
                        }
                    }
                }

                this.attendanceArray.sort((a, b) => {
                    retrun(a.weekNumber > b.weekNumber);
                });
                this.$refresh();

            }

            this.lookuperr = () => {
            }


            this.tableHeader = ["First name", "Last name", "Cnp", "Sansa Promovare"];
            this.attendance = ["*", "-", "*", "*", "*", "-", "*", "*", "-", "*", "-", "*"];
            this.recommendations = ["https://www.w3schools.com/", "google.com", "TudorSorin PaginiWeb"];


        },
    );
})();