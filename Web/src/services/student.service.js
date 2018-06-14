var StudentService = class {
    static getStudentsFromGroup(group, callback, errorCallback)
    {
        HttpClient.get(AppConfig.apiUri + 'api/students/groups/' + group, callback, errorCallback);
    }
    static getStudents(callback,errorCallback)
    {
        HttpClient.get(AppConfig.apiUri+'api/students/',callback,errorCallback);
    }

    static addStudent(student, callback,errorCallback)
    {
        HttpClient.post(AppConfig.apiUri+'api/students/', JSON.stringify(student), callback,errorCallback);
    }
}