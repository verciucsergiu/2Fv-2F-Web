var StudentService = class {
    static getStudents(grupa) {
        let studsB4 = [
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
        ];
        let studsB6 = [
            new Student('Florin', 'Harbuzariu Alexandru Florin', 100, 'za best', 'DA', 10, 10, 10, 10, 'M'),
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
            new Student('user1', 'nume1', 3, 'nici o obs', 'nu', 9, 3, 4, 10, 'M'),
        ];
        if(grupa == 'B4') {
            return studsB4;
        } else {
            return studsB6;
        }
    }
}