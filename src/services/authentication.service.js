var AuthService = class {
    constructor() {
        this.adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.nN67GfxbNqRbd0AD09Jl-VcK0Q9SExX9NR0XloBnENI';
        this.localStorageUserTokeItem = 'userToken';
    }

    static login(loginObject, resolve, reject) {
        if (loginObject.password === '1q2w3e4' && loginObject.username === 'admin') {
            this.addTokenLocalStorage(this.adminToken);
            resolve();
        } else {
            reject();
        }
    }

    static getUserRole() {
        let token = localStorage.getItem(this.localStorageUserTokeItem);
        if (!token) {
            return null;
        } else if (token === this.adminToken) {
            return 'admin';
        } else {
            return 'user';
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
    }

    static addTokenLocalStorage(token) {
        localStorage.setItem(this.localStorageUserTokeItem, token);
    }
};