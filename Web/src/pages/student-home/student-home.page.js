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
            this.group = "B4";
            this.username = "";
            this.studentName = "";
            this.showPopup = false;
            this.info = [];
            this.attendanceArray = [];
            this.id = 1;
            this.attendances=0;
            this.maxAttendances=0;
            this.studentAttendancies=0;
            this.cnp="";
            this.computeChance = (prezente) => {
                if (prezente > 2) return "DA";
                return "NU";
            }
            this.$onInit = () => {
                StudentService.getStudentDetails((response) => {
                    console.log(response.body);
                    let jsonResponse = response.body;
                    this.studentName = jsonResponse.firstName + ' ' + jsonResponse.lastName;
                    this.group=jsonResponse.group;
                    this.cnp=jsonResponse.cnp;
                
                });
                StudentService.getStudentsFromGroup(this.group, this.callback, this.lookuperr);
            }

            this.callback = (response) => {
                let jsonResponse = response.body;
                for (let student of jsonResponse) {
                    this.studentName = student.firstName + ' ' + student.lastName;
                    this.info.push(student);
                        for (let attendance of student.attendanceComments) {
                            if (this.id = student.id) 
                            { 
                                this.attendanceArray.push(attendance); 
                                this.studentAttendancies++;
                            }
                            this.attendances++;
                        }
                if(this.attendances>this.maxAttendances) this.maxAttendances=this.attendances;    
                }

                this.attendanceArray.sort((a, b) => {
                    retrun(a.weekNumber > b.weekNumber);
                });
                this.$refresh();

            }

            this.lookuperr = () => {
            }
            this.tableHeader = ["First name", "Last name", "Cnp", "Sansa Promovare"];
            
            this.recommendations = ["https://www.w3schools.com/", "google.com", "TudorSorin PaginiWeb"];


        },
    );
})();