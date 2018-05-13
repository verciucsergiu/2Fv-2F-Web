var ProfessorService = class {
    static getProfessor(idProfessor, callback, errorCallback) {
        HttpClient.get('http://localhost:4200/api/professors/' + idProfessor, null, callback, errorCallback);
    }

    static getAllProfessors(callback,errorCallback) {
        HttpClient.get('http://localhost:4200/api/professors/all',null,callback,errorCallback);
    }

    static addGroupToProfessor(idGroup, idProfessor, callback, errorCallback) {
        let body = JSON.stringify({ "groupId": idGroup });
        HttpClient.post('http://localhost:4200/api/professors/' + idProfessor + '/groups', body, callback, errorCallback);
    }

    static removeGroupFromProfessor(idGroup,idProfessor,callback,errorCallback){
        let body = JSON.stringify({ "groupId": idGroup });
        HttpClient.delete('http://localhost:4200/api/professors/' + idProfessor + '/groups', body, callback, errorCallback);
    }

    //return a ProfessorModel from object
    static parseProfessor(professor){
        return new ProfessorModel(
            professor.groups,
            professor.firstName,
            professor.lastName,
            professor.email,
            professor.rank,
            professor.id
        )
    }

    static groupsAsString(groups){
        this.result="";
        for(let group of groups){
            this.result = this.result + group.name + ' ';
        }
        return this.result;
    }
}