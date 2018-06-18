var RegisterModel = class {
    constructor(username, password, email, cnp, role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.cnp = cnp;
        this.role = role;
    }
}

var ProfRegisterModel = class {
    constructor(username, firstname, lastname, password, email, cnp, role) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.cnp = cnp;
        this.role = role;
    }
}

module.exports.ProfRegisterModel = ProfRegisterModel;
module.exports.RegisterModel = RegisterModel;