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
            this.group = "";
            this.username = "";
            this.studentName = "";
            this.showPopup = false;
            this.info = [];
            this.attendanceArray = [];
            this.id = 1;
            this.attendances = 0;
            this.currentStudent
            this.maxAttendances = 0;
            this.studentAttendancies = 0;
            this.cnp = "";
            this.chances=[];
            this.promovare="";
            this.currentAttendancies=0;

            this.$on('#add-git-token', 'click', function () {
                Router.navigate('/student-add-git');
            }.bind(this));

            this.$onInit = () => {
                StudentService.getStudentDetails((response) => {
                    console.log(response.body);
                    let jsonResponse = response.body;
                    this.studentName = jsonResponse.firstName + ' ' + jsonResponse.lastName;
                    this.currentStudent=this.studentName;
                    this.group = jsonResponse.group;
                    this.cnp = jsonResponse.cnp;
                    StudentService.getStudentsFromGroup(response.body.group, this.callback, this.lookuperr);
                });
            }

            this.callback = (response) => {
                let jsonResponse = response.body;
                console.log(response.body);
                for (let student of jsonResponse) {
                    this.studentName = student.firstName + ' ' + student.lastName;
                    this.info.push(student);
                    for (let attendance of student.attendanceComments) {
                        if (this.id = student.id) {
                            this.attendanceArray.push(attendance);
                            this.studentAttendancies++;
                        }
                        if(attendance.value!=="")
                             this.attendances++;
                    }
                    if (this.attendances > this.maxAttendances) this.maxAttendances = this.attendances;
                    if (this.studentName===this.currentStudent) this.currentAttendances= this.attendances;    
                    this.chances.push(this.attendances);
                    this.attendances=0;
                }

                this.attendanceArray.sort((a, b) => {
                    return (a.weekNumber > b.weekNumber);
                });

                this.currentAttendancies=this.currentAttendancies/this.maxAttendances;
                for(let [index, chance] of this.chances.entries())
                {
                   this.chances[index]=this.chances[index]/this.maxAttendances; 
                }
                
                this.$refresh();

            }
            this.lookuperr = () => {
            }


            this.tableHeader = ["First name", "Last name", "Sansa Promovare"];

            this.recommendations = ["https://www.w3schools.com/", "google.com", "TudorSorin PaginiWeb"];


        },
    );
})();