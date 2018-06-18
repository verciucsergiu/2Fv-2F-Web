var ProfessorModel = class {
    constructor(groups,firstName,lastName,email,rank,id){
        this.groups = groups;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.rank = rank;
        this.id = id;
    }
}

module.exports.ProfessorModel = ProfessorModel;