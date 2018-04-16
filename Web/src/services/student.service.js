var StudentService = class {
    static getStudents(grupa) {
        let studsB4 = [
            new Student('user1', 'Ursu Cristi', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user12', 'Ursu Vasile', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user13', 'Ursu Miron', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user14', 'Ursu ++', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user15', 'Ursu --', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
        ];
        let studsB6 = [
            new Student('Florin', 'Harbuzariu Alexandru Florin', 100, 'nici o obs', 'DA', 10, 10, 10, 10, 'M'),
            new Student('user2', 'Mihail Andrei', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user3', 'Verciuc Sergiu', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user4', 'Un doi Trei', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user5', 'Banda Continua', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
        ];
        if (grupa == 'B4') {
            return studsB4;
        } else {
            return studsB6;
        }
    }
}