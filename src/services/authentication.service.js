(() => {
    let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.nN67GfxbNqRbd0AD09Jl-VcK0Q9SExX9NR0XloBnENI';
    let localStorageUserTokeItem = 'userToken';

    function login(loginObject, resolve, reject) {
        if (loginObject.password === '1q2w3e4' && loginObject.username === 'admin') {
            addTokenLocalStorage(adminToken);
            resolve();
        } else {
            reject();
        }
    }

    function getUserRole() {
        let token = localStorage.getItem(localStorageUserTokeItem);
        if (!token) {
            return null;
        } else if (token === adminToken) {
            return 'admin';
        } else {
            return 'user';
        }
    }

    function isLoggedIn() {
        let token = localStorage.getItem(localStorageUserTokeItem);
        if (token) {
            return true;
        }
        return false;
    }
    
    function logout() {
        localStorage.removeItem(localStorageUserTokeItem);
    }

    function addTokenLocalStorage(token) {
        localStorage.setItem(localStorageUserTokeItem, adminToken);
    }

    this.authService = function () { };
    Object.defineProperty(this.authService, 'login', { value: login });
    Object.defineProperty(this.authService, 'isLoggedIn', { value: isLoggedIn });
    Object.defineProperty(this.authService, 'getUserRole', { value: getUserRole });
    Object.defineProperty(this.authService, 'logout', { value: logout });

})();