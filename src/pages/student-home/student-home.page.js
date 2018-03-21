(() => {
    route('/student-home', {
            templateUrl: './src/pages/student-home/student-home.page.html',
            styleUrl: './src/pages/student-home/student-home.page.css',
            guard: {
                canEnter: [StudentGuard],
                redirectTo: '/'
            }
        },
        function () {});

})();
(() => {

    this.username = "jack23";
    this.studentName = "Jack Smith";
    this.info = [
        ["jack23", "Jack Smith", "3", "nimic de remarcat", "NU"],
        ["andrew", "Andrew", "5", "nimic de remarcat", "DA"],
        ["jasmine23", "Jasmine", "4", "nimic de remarcat", "DA"],

    ]
    this.studentsNumber = 3;
    this.numberOfColumns = 5;
    this.tableHeader = ["Username", "Name", "Numar Prezente", "Observatii", "Sansa Promovare"];
    this.group="B6";

})();