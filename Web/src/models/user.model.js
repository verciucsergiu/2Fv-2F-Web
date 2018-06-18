var UserModel = class {
    constructor(username, nume, prezente, obs, sanse) {
        this.username = username;
        this.nume = nume;
        this.prezente = prezente;
        this.obs = obs;
        this.sanse = sanse;
    }
}

module.exports.UserModel = UserModel;