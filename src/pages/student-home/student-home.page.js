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
            AuthService.setupVision();
            this.username = "jack23";
            this.showPopup = false;
            this.studentName = "Jack Smith";
            this.info = [
                {
                    username: "jack23",
                    nume: "Jack Smith",
                    prezente: "3",
                    obs: "nimic de remarcat",
                    sanse: "NU"
                },
                {
                    username: "maria",
                    nume: "Jack Smith",
                    prezente: "3",
                    obs: "nimic de remarcat",
                    sanse: "NU"
                },
                {
                    username: "test2",
                    nume: "Jack Smith",
                    prezente: "3",
                    obs: "nimic de remarcat",
                    sanse: "NU"
                }
            ]
            this.tableHeader = ["Username", "Name", "Numar Prezente", "Observatii", "Sansa Promovare"];
            this.group="B6";
            this.attendance=["*","-","*","*","*","-","*","*","-","*","-","*"]
        },
    );
})();