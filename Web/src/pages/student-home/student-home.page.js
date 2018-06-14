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
            this.showPopup = false;
            this.studentName = "Jack Smith";
            this.info = [];
            this.attendanceArray=[];
            this.id = 1;
            this.computeChance = (prezente) => {
                    //  alert(prezente);
                    if (prezente > 2) return "DA";

                    return "NU";
                },

                this.info = StudentService.getStudentsFromGroup(this.group, this.callback, this.lookuperr);


            this.callback = (response) => {
                let jsonResponse = response.body;
                for (let student of jsonResponse.students)
                    this.username = student.firstName + ' ' + student.lastName;
                if (this.id = student.id) {
                    for (let attendance of student.attendanceComments) {
                        this.attendanceArray.push(attendance);
                    }
                }
                this.attendanceArray.sort((a,b)=>{
                    retrun(a.weekNumber>b.weekNumber);
                });
                this._initButtons();
                this.$refresh();

            }


            this.lookuperr = () => {
                alert("Server Error");
                Router.navigate('#');
            }


            this.tableHeader = ["Username", "Name", "Numar Prezente", "Observatii", "Sansa Promovare"];
            this.group = "B6";
            this.attendance = ["*", "-", "*", "*", "*", "-", "*", "*", "-", "*", "-", "*"]
            this.recommendations = ["https://www.w3schools.com/", "google.com", "TudorSorin PaginiWeb"];


        },
    );
})();