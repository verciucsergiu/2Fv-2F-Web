var AuthService = class {

    static get adminToken() {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.nN67GfxbNqRbd0AD09Jl-VcK0Q9SExX9NR0XloBnENI';
    }

    static get profToken() {
        return '123';
    }

    static get studToken() {
        return '1234';
    }

    static get localStorageUserTokeItem() {
        return 'userToken';
    }

    static login(loginObject, resolve, reject) {
        if (loginObject.password === 'admin' && loginObject.username === 'admin') {
            this.addTokenLocalStorage(this.adminToken);
            this.addUsernameLocalStorage(loginObject.username);
            resolve();
        } else {
            if (loginObject.password === 'prof' && loginObject.username === 'prof') {
                this.addTokenLocalStorage(this.profToken);
                this.addUsernameLocalStorage(loginObject.username);
                resolve();
            } else if (loginObject.password === 'stud' && loginObject.username === 'stud') {
                this.addTokenLocalStorage(this.studToken);
                this.addUsernameLocalStorage(loginObject.username);
                resolve();
            }
            else {
                reject();
            }
        }
    }

    static getUserID() {
        return 8;
    }

    static getUserRole() {
        let token = localStorage.getItem(this.localStorageUserTokeItem);
        if (!token) {
            return null;
        } else if (token == this.adminToken) {
            return 'admin';
        } else {
            if (token == this.profToken) {
                return 'prof';
            }
            else {
                return 'user';
            }
        }
    }

    static isLoggedIn() {
        let token = localStorage.getItem(this.localStorageUserTokeItem);
        if (token) {
            return true;
        }
        return false;
    }

    static logout() {
        localStorage.removeItem(this.localStorageUserTokeItem);
        localStorage.removeItem('username');
    }

    static addTokenLocalStorage(token) {
        localStorage.setItem(this.localStorageUserTokeItem, token);
    }

    static addUsernameLocalStorage(username) {
        localStorage.setItem('username', username);
    }

    static getUsername() {
        let user = localStorage.getItem('username');
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
        console.log(loginModel);
        let body = JSON.stringify({ "username": loginModel.username, "password": loginModel.password });
        HttpClient.post(AppConfig.apiUri + 'api/auth/login', body, callback, errorCallback);
    }
    //----------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------
    static requestRegister(registerModel, callback, errorCallback) {
        this.postRegister(registerModel, callback, errorCallback);
    }

    static postRegister(registerModel, callback, errorCallback) {
        console.log(registerModel);
        let body = JSON.stringify({
            "username": registerModel.username,
            "password": registerModel.password,
            "email": registerModel.email,
            "cnp": registerModel.cnp,
            "role": registerModel.role
        });
        HttpClient.post(AppConfig.apiUri + 'api/auth/register', body, callback, errorCallback);
    }
    //----------------------------------------------------------------------------------------------------------------------------
};