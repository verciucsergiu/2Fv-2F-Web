var ProfessorService = class {
    static getProfessor(idProfessor, callback, errorCallback) {
        HttpClient.get('http://localhost:4200/api/professors/' + idProfessor, null, callback, errorCallback);
    }
}