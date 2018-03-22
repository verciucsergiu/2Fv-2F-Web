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
        if (loginObject.password === '1q2w3e4' && loginObject.username === 'admin') {
            this.addTokenLocalStorage(this.adminToken);
            this.addUsernameLocalStorage(loginObject.username);
            resolve();
        } else {
            if (loginObject.password === '1qwer' && loginObject.username === 'prof123') {
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

    static setupVision() {
        document.getElementById('nav-prof').style.display = "none";
        document.getElementById('nav-admin').style.display = "none";
        document.getElementById('nav-stud').style.display = "none";
        if (this.isLoggedIn() == true) {
            document.getElementById('nav-log').style.display = "none";
            document.getElementById('nav-reg').style.display = "none";
            if (this.getUserRole() == "admin") {
                document.getElementById('nav-admin').style.display = "block";
            }
            if (this.getUserRole() == "prof") {
                document.getElementById('nav-prof').style.display = "block";
            }
            if(this.getUserRole() == "user"){
                document.getElementById('nav-stud').style.display = "block";
            }
        } else {
            document.getElementById('nav-log').style.display = "block";
            document.getElementById('nav-reg').style.display = "block";
        }
    }
};