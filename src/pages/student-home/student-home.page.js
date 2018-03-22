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

            this.computeChance = (prezente) => {
                  //  alert(prezente);
                    if (prezente > 2) return "DA";

                    return "NU";
                },


                this.info = [{
                        username: "jack23",
                        nume: "Jack Smith",
                        prezente: 3,
                        obs: "nimic de remarcat",
                        sanse: this.computeChance(2)
                    },
                    {
                        username: "maria",
                        nume: "Jack Smith",
                        prezente: 1,
                        obs: "nimic de remarcat",
                        sanse: this.computeChance(1)
                    },
                    {
                        username: "test2",
                        nume: "Jack Smith",
                        prezente: 5,
                        obs: "nimic de remarcat",
                        sanse: this.computeChance(5)
                    }
                ]
            this.tableHeader = ["Username", "Name", "Numar Prezente", "Observatii", "Sansa Promovare"];
            this.group = "B6";
            this.attendance = ["*", "-", "*", "*", "*", "-", "*", "*", "-", "*", "-", "*"]
            this.recommendations=["https://www.w3schools.com/","google.com","TudorSorin PaginiWeb"];    
                
        
        },
    );
})();