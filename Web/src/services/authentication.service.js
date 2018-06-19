var fr = require('../../framework/main');
var app = require('./app.config');
var AuthService = class {

    static get localStorageUserTokeItem() {
        return 'userToken';
    }

    static login(loginObject, resolve, reject) {
        this.requestLogin(loginObject, (response) => {
            const token = response.body.auth_token;
            this.addTokenLocalStorage(token);
            resolve();
        },
            () => {
                reject();
            })
    }

    static getUserID() { 
        return this.getDecodedToken().id;
    }

    static getFK() {
        return this.getDecodedToken().foreignid;
    }

    static getUserRole() {
        let role = this.getDecodedToken().role;
        return role.toLowerCase();
    }

    static isLoggedIn() {
        let token = localStorage.getItem(this.localStorageUserTokeItem);
        if (token) {
            return true;
        }
        return false;
    }

    static getDecodedToken() {
        let token = localStorage.getItem(this.localStorageUserTokeItem);
        if(token) {
            return this.parseJwt(token);
        }
        
        return {};
    }

    static parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    static logout() {
        localStorage.removeItem(this.localStorageUserTokeItem);
        localStorage.removeItem('username');
    }

    static addTokenLocalStorage(token) {
        localStorage.setItem(this.localStorageUserTokeItem, token);
    }

    static getUsername() {
        let user = this.getDecodedToken().username;
        if (user) {
            return user;
        } else {
            return 'not logged in';
        }
    }

    //----------------------------------------------------------------------------------------------------------------------------
    static requestLogin(loginModel, callback, errorCallback) {
        this.postLogin(loginModel, callback, errorCallback);
    }

    static postLogin(loginModel, callback, errorCallback) {
        let body = JSON.stringify({ "username": loginModel.username, "password": loginModel.password });
        fr.HttpClient.post(app.AppConfig.apiUri + 'api/auth/login', body, callback, errorCallback);
    }
    //----------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------
    static requestRegister(registerModel, callback, errorCallback) {
        this.postRegister(registerModel, callback, errorCallback);
    }

    static requestProfessorRegister(registerModel, callback, errorCallback) {
        this.postProfessorRegister(registerModel, callback, errorCallback);
    }

    static postRegister(registerModel, callback, errorCallback) {
        let body = JSON.stringify({
            "username": registerModel.username,
            "password": registerModel.password,
            "email": registerModel.email,
            "cnp": registerModel.cnp
        });
        fr.HttpClient.post(app.AppConfig.apiUri + 'api/auth/register', body, callback, errorCallback);
    }

    static postProfessorRegister(registerModel, callback, errorCallback) {
        let body = JSON.stringify({
            "username": registerModel.username,
            "firstname": registerModel.firstname,
            "lastname": registerModel.lastname,
            "password": registerModel.password,
            "email": registerModel.email
        });
        fr.HttpClient.post(app.AppConfig.apiUri + 'api/auth/register/professor', body, callback, errorCallback);
    }
    //----------------------------------------------------------------------------------------------------------------------------
};

module.exports.AuthService = AuthService;