var StudentService = class {
    static getStudentsFromGroup(group, callback, errorCallback)
    {
        HttpClient.get(AppConfig.apiUri + 'api/students/groups/' + group, callback, errorCallback);
    }
    static getStudents(group,callback,errorCallback)
    {
        HttpClient.get(AppConfig.apiUri+'api/students/group'+ group,callback,errorCallback);
    }
}